export interface Contributor {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  categories: string[];
  status: 'Deployed' | 'Active' | 'Beta' | 'Open Source';
  statusLabel?: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  stars?: number;
  contributorsCount?: number;
  contributors: Contributor[];
  githubUrl: string;
  demoUrl?: string;
}

export const projectCategories = [
  'All Projects',
  'AI & ML',
  'Web',
  'Cloud & DevOps',
  'IoT',
  'Open Source'
];

export const projectsData: Project[] = [
  {
    id: 'nexus-ai',
    title: 'Nexus AI Framework',
    description: 'A high-performance inference engine built for edge computing, optimizing AWS Lambda functions for low-latency machine learning tasks.',
    categories: ['AI & ML', 'Cloud & DevOps'],
    status: 'Deployed',
    statusLabel: 'Deployed',
    tags: ['AWS Lambda', 'Rust', 'PyTorch'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9BPtPaoIFAgzOSXSl3rpYk4FnJbtCDD6rioAJvLHqX7PFamKhQNppiO3BJHS2JM5TSzuRcl_OFb83NFwfCn0JnKUAhRVgmMgiki08c25UNwPsR3eCn1x8ypRFJlpSQS52JWs4KBb3lEntzRgOG3Drht8nieuaLEMhke81vQM7j4o71-NLudvQrCyCK4UT0fyGR0EFYXp52Bhaehw8oBgCL4TuCRotGSSDNc-3ar0Qd7sAUDTAwrM5qb-_alVJH2pZDF_plufwQf8',
    imageAlt: 'Nexus AI Dashboard showing glowing data visualizations on a dark minimalist UI',
    featured: true,
    contributors: [
      {
        name: 'Alex C.',
      },
      {
        name: 'Sarah D.',
      }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com'
  },
  {
    id: 'autodeploy-cli',
    title: 'AutoDeploy CLI',
    description: 'A command-line tool for instantaneous AWS S3 and CloudFront deployments with automatic cache invalidation.',
    categories: ['Cloud & DevOps', 'Open Source'],
    status: 'Deployed',
    statusLabel: 'v2.1',
    tags: ['Go', 'AWS SDK'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLYLHdx7FILdhH8-fji2leSqoTKbVZe8vrXorZfFg1VFvwNF4umF97po1ihILdVMU_m_Gl1kUBl4qARZibOj_GXNUopfbGMcZOl8z70f0emDzyrCiOPUkN1JMd6JKj4LWl8u3VICc39ikkZdtNihhHzR--gJSo_fGhOMW0o6xC9K8NNwAz_N3U6-vslA5gDB4GyVcVgFWLlx4BvxZgSKhp2UZGVb7TINiOxaR98IxOcqY6JzAKbsfU8TbbtdV0PADzVzDPp3g5e2U',
    imageAlt: 'Floating geometric blocks in shades of blue representing cloud architecture databases',
    stars: 142,
    contributors: [
      {
        name: 'sam_builder',
      }
    ],
    githubUrl: 'https://github.com'
  },
  {
    id: 'sentinel-guard',
    title: 'Sentinel Guard',
    description: 'Real-time threat monitoring for AWS IAM roles with automated policy remediation and alerting.',
    categories: ['Cloud & DevOps', 'Open Source'],
    status: 'Active',
    statusLabel: 'Open Source',
    tags: ['Python', 'Boto3'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlMj0u1UttpbrYuLwxVAiZD_3TIkHqBU0Pm3yEacd53J5F3eBX5BOWtWcT4iHxoGwrY7MsFQG0U7WdcGUAPa3AxzCkTIVLxVhWYuE_wITGY3zqAEy1eIQmN48L-sZM4N1j72Bpb7mUs6kRvtqrGCsMlfCPp5QvybordUCf-c6frg1QaRN2AwaV6OkADOYx0bYPYBpyThijr4HWqOMRcSxSVvYu9BIbKPVG8kZoFtuSMz8uZSVxzSFvTqsZJ6LNN9IYHZkIVHUeFhA',
    imageAlt: 'Sleek monitor displaying lines of code in a darkly lit developer room',
    contributors: [
      {
        name: 'dev_lisa',
      }
    ],
    githubUrl: 'https://github.com'
  },
  {
    id: 'eco-monitor',
    title: 'Eco-Monitor IoT',
    description: 'A network of smart sensors monitoring air quality across campus, streaming data to an AWS IoT Core dashboard.',
    categories: ['IoT', 'Web'],
    status: 'Beta',
    statusLabel: 'Beta',
    tags: ['C++', 'AWS IoT'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9_OiN5ma-6ybEVx0hh7_6sGdwGx1soE0EeCQ3cw3RkUg_PxZU_BfU6C9dLu0iQtjGlgkjDbF3m7Rf_8g06oZOQBa8ou_YOJmfM-6kQkB2_aTgok-ZIXA-ZjvGcg0rYMUJ3G3wHClGjvFw8J0pGjgmR_8pQDmbFTeDl2JFqBvZssCZM4XkqJ3PDfVK0720KYcaPWJ8XxGxEmaU75_cLFrqt6hoP6Fx74kg5SsDjTEC6v7wvSYznHZk2bAQuA0Y2GpAHV9iTHG55eg',
    imageAlt: 'Clean server racks inside a data center with blue and green indicator lights',
    contributorsCount: 8,
    contributors: [
      {
        name: 'iot_pioneer',
      }
    ],
    githubUrl: 'https://github.com'
  },
  {
    id: 'serverless-shop',
    title: 'Serverless Storefront',
    description: 'A lightning-fast, secure e-commerce storefront utilizing AWS Amplify, Next.js, and Amazon DynamoDB.',
    categories: ['Web'],
    status: 'Deployed',
    statusLabel: 'Deployed',
    tags: ['Next.js', 'DynamoDB', 'AWS Amplify'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9BPtPaoIFAgzOSXSl3rpYk4FnJbtCDD6rioAJvLHqX7PFamKhQNppiO3BJHS2JM5TSzuRcl_OFb83NFwfCn0JnKUAhRVgmMgiki08c25UNwPsR3eCn1x8ypRFJlpSQS52JWs4KBb3lEntzRgOG3Drht8nieuaLEMhke81vQM7j4o71-NLudvQrCyCK4UT0fyGR0EFYXp52Bhaehw8oBgCL4TuCRotGSSDNc-3ar0Qd7sAUDTAwrM5qb-_alVJH2pZDF_plufwQf8',
    imageAlt: 'Futuristic clean dashboard mockup showcasing software analytics',
    contributors: [
      {
        name: 'web_wizard',
      }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com'
  },
  {
    id: 'rekognition-lock',
    title: 'Rekognition Lock',
    description: 'A smart biometric security lock using AWS Rekognition facial identification API, Raspberry Pi, and DynamoDB log indexing.',
    categories: ['IoT', 'AI & ML'],
    status: 'Active',
    statusLabel: 'Beta',
    tags: ['Raspberry Pi', 'AWS Rekognition', 'Python'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLYLHdx7FILdhH8-fji2leSqoTKbVZe8vrXorZfFg1VFvwNF4umF97po1ihILdVMU_m_Gl1kUBl4qARZibOj_GXNUopfbGMcZOl8z70f0emDzyrCiOPUkN1JMd6JKj4LWl8u3VICc39ikkZdtNihhHzR--gJSo_fGhOMW0o6xC9K8NNwAz_N3U6-vslA5gDB4GyVcVgFWLlx4BvxZgSKhp2UZGVb7TINiOxaR98IxOcqY6JzAKbsfU8TbbtdV0PADzVzDPp3g5e2U',
    imageAlt: 'Floating geometric blocks conveying modular technology architecture',
    contributors: [
      {
        name: 'iot_genius',
      }
    ],
    githubUrl: 'https://github.com'
  }
];
