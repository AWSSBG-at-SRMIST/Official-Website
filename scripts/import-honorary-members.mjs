// Bulk-imports honorary-members-template.csv into the sbg-honorary-members
// DynamoDB table (Faculty/Industry mentors and founding members shown on the
// website's Team page). Upserts by name+tag: a re-run only refreshes the
// description/linkedin of an existing entry, it never duplicates it or
// touches photoUrl (that's filled in later by a separate Drive-matching job).
//
// Usage:
//   node --env-file=.env.local scripts/import-honorary-members.mjs [path-to.csv] [--dry-run]
//
// Only logs name + tag + outcome — never AWS credentials, which are read
// from env and never printed.

import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_HONORARY_MEMBERS = 'sbg-honorary-members';

const TAG_ALIASES = {
  'faculty mentor': 'FACULTY_MENTOR',
  'industry mentor': 'INDUSTRIAL_MENTOR',
  'industrial mentor': 'INDUSTRIAL_MENTOR',
  'founding member': 'FOUNDING_MEMBER',
};

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const csvPath = resolve(process.cwd(), args.find(a => !a.startsWith('--')) || 'honorary-members-template.csv');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name} (run via "node --env-file=.env.local ...")`);
  return value;
}

const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: requireEnv('AWS_REGION'),
    credentials: {
      accessKeyId: requireEnv('AWS_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('AWS_SECRET_ACCESS_KEY'),
    },
  })
);

// Minimal RFC4180 parser: handles quoted fields with embedded commas/quotes
// (descriptions are free text and may contain commas).
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false; }
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c === '\r') { /* skip, \n follows */ }
    else field += c;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function rowsToObjects(rows) {
  const [header, ...data] = rows;
  return data
    .filter(r => r.some(cell => cell.trim() !== ''))
    .map(r => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch { return false; }
}

async function main() {
  console.log(`Reading ${csvPath}${dryRun ? ' (dry run — no writes will be made)' : ''}`);
  const text = await readFile(csvPath, 'utf8');
  const records = rowsToObjects(parseCSV(text));

  const existingResult = await db.send(new ScanCommand({ TableName: TABLE_HONORARY_MEMBERS }));
  const existingByKey = new Map(
    (existingResult.Items || []).map(item => [`${item.name.toLowerCase()}|${item.tag}`, item])
  );

  let created = 0, updated = 0, skipped = 0, errored = 0;

  for (const [idx, rec] of records.entries()) {
    const rowLabel = `row ${idx + 2}`; // +2: 1-indexed plus header line
    const name = rec['Name'];
    const tag = TAG_ALIASES[(rec['Tag'] || '').trim().toLowerCase()];
    const description = rec['Description'] || '';
    const linkedin = rec['LinkedIn'] || '';

    if (!name) { console.warn(`⚠ Skipped ${rowLabel}: missing name`); skipped++; continue; }
    if (!tag) {
      console.warn(`⚠ Skipped ${rowLabel} (${name}): tag must be "Faculty Mentor", "Industry Mentor", or "Founding Member"`);
      skipped++; continue;
    }
    if (linkedin && !isValidHttpUrl(linkedin)) {
      console.warn(`⚠ Skipped ${rowLabel} (${name}): LinkedIn must be a valid http or https URL`);
      skipped++; continue;
    }

    try {
      const existing = existingByKey.get(`${name.toLowerCase()}|${tag}`);

      if (existing) {
        if (dryRun) { console.log(`↻ Would update: ${name} (${tag})`); updated++; continue; }
        await db.send(new UpdateCommand({
          TableName: TABLE_HONORARY_MEMBERS,
          Key: { id: existing.id },
          UpdateExpression: 'SET description = :d, linkedin = :l',
          ExpressionAttributeValues: { ':d': description, ':l': linkedin },
        }));
        console.log(`↻ Updated: ${name} (${tag})`);
        updated++;
      } else {
        if (dryRun) { console.log(`✓ Would create: ${name} (${tag})`); created++; continue; }
        const member = {
          id: randomUUID(),
          name,
          tag,
          description,
          linkedin,
          photoUrl: null, // filled in later by the Drive-matching job
          createdAt: new Date().toISOString(),
        };
        await db.send(new PutCommand({ TableName: TABLE_HONORARY_MEMBERS, Item: member }));
        console.log(`✓ Created: ${name} (${tag})`);
        created++;
      }
    } catch (err) {
      console.error(`✗ Error on ${rowLabel} (${name}): ${err.message}`);
      errored++;
    }
  }

  console.log(`\nDone. ${created} created, ${updated} updated, ${skipped} skipped, ${errored} errored.`);
  if (errored > 0) process.exitCode = 1;
}

main().catch(err => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
