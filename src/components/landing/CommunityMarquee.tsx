const ITEMS = [
  "SOFTWARE ENGINEERING",
  "AI & MACHINE LEARNING",
  "CLOUD COMPUTING",
  "OPEN SOURCE",
  "DEVOPS",
  "HACKATHONS",
];

function MarqueeGroup() {
  return (
    <div className="flex items-center">
      {ITEMS.map((item, idx) => (
        <div key={item} className="flex items-center gap-4 px-8 border-l border-on-surface/10 first:border-l-0">
          <span className="font-display text-xs text-primary tracking-[0.2em]">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="font-headline-md text-lg sm:text-xl font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 tracking-tight">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CommunityMarquee() {
  return (
    <section className="border-y-2 border-on-surface/10 bg-surface-container-lowest overflow-hidden py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </section>
  );
}
