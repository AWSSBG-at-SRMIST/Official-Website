export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  domains?: string[];
  initials?: string;
  linkedinUrl?: string;
  level?: 'presidium' | 'director' | 'manager' | 'associate';
}

export interface OrgNode {
  member: TeamMember;
  children?: OrgNode[];
}

// Presidium Members (Root)
const presidiumMembers: TeamMember[] = [
  {
    id: 'pres-1',
    name: 'President Name',
    role: 'President',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3uID_Fz9AOr4OWtpPiHyE5nhdYdwk-r9_MejaxBfzG_seFs68Cdsz0tEFevrLaUnKC3ThBD9re_oWZKXTOeWSnt9ob6cnkwWHPjHSA2JbkAFPvOWmrrfjzVrgQmQ7tkqXr_k_wEkGAWIpKKUg28nPfihpftakWQFGg64B915vNtMaomTs9_tBYojQVlFvbK0Fmk7FmarATI0rIlrhBzgMj69T8ozPAjBiVFnrz_6V90kXF6Ds-qROO9P_SiH5ZXXKHlZJZlKuSSyT',
    imageAlt: 'President headshot',
    level: 'presidium',
    domains: ['Leadership', 'Vision'],
    linkedinUrl: '#',
  },
  {
    id: 'pres-2',
    name: 'VP Name',
    role: 'Vice President',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2FSrC6sfJwWfLrrJHcCcTTdm1XSyKxcX8Wt87kRvV1FWFgWMCflljcfSL7yBWE5hzJioS3mgAzXdPrS_Aw3opyshpwuGKpvDWvwpPmFejoYchy7MkZPv6ETI86T3uPP4EtbqsEoC6SSBUb3B0cAokPZkcXgVJMEkmYy1N3Ig02iXHjrgrcu56-DVwRzBl5QHJ34EnEbT1anBrQBzhMuLVEhLZHcRiJyoJTdCgJ5B07Lv2E_9jSVFK0iGQroN7Rm3wC-JViMHxkmM',
    imageAlt: 'VP headshot',
    level: 'presidium',
    domains: ['Operations', 'Strategy'],
    linkedinUrl: '#',
  },
];

// Directors
const technicalDirector: TeamMember = {
  id: 'dir-tech',
  name: 'Technical Director',
  role: 'Director - Technical',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
  imageAlt: 'Technical Director',
  level: 'director',
  domains: ['Tech', 'Development'],
  linkedinUrl: '#',
};

const corporateDirector: TeamMember = {
  id: 'dir-corp',
  name: 'Corporate Director',
  role: 'Director - Corporate',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2YZOm8KUSzzFXFcS2Qh_-cDwvZKQALkjNclaI8OZ1FqtFt1zx-8A8hNfdKPvC5PTCqF-p0E1cCGCDQF8QVoBGih8GIu9VFF1VkLxZ6Ibf0y14HcMLMfO_-DSZ3_RF2BZ2X-oVy1Vzx4hQiCg3TjCnt7Au9r_lJM5Kl_gNDrWZOAVR3XVDwI6D5sRDvukI_66XE5Rur4ZNIDjkKz79Epqd0GQuLB83untU1_ST9aSIijKKn866eysrnHjEJ0-xNxE9y9hpAuhs9CD',
  imageAlt: 'Corporate Director',
  level: 'director',
  domains: ['Corporate', 'Management'],
  linkedinUrl: '#',
};

const creativesDirector: TeamMember = {
  id: 'dir-creative',
  name: 'Creatives Director',
  role: 'Director - Creatives',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
  imageAlt: 'Creatives Director',
  level: 'director',
  domains: ['Design', 'Creative'],
  linkedinUrl: '#',
};

// Presidium & Directors Category
export const presidiumAndDirectors: OrgNode[] = [
  {
    member: presidiumMembers[0],
    children: [
      { member: technicalDirector },
      { member: corporateDirector },
      { member: creativesDirector },
    ],
  },
  {
    member: presidiumMembers[1],
  },
];

// Technical Category - Director -> Managers -> Associates
export const technicalCategory: OrgNode[] = [
  {
    member: technicalDirector,
    children: [
      {
        member: {
          id: 'tech-mgr-dev',
          name: 'Development Manager',
          role: 'Manager - Development',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
          imageAlt: 'Development Manager',
          level: 'manager',
          initials: 'DM',
          domains: ['Backend', 'Frontend'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'tech-dev-assoc-1',
              name: 'Jane Doe',
              role: 'Associate - Frontend',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'JD',
              domains: ['React', 'Tailwind'],
              linkedinUrl: '#',
            },
          },
          {
            member: {
              id: 'tech-dev-assoc-2',
              name: 'Mike K.',
              role: 'Associate - Backend',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'MK',
              domains: ['Node.js', 'DynamoDB'],
              linkedinUrl: '#',
            },
          },
        ],
      },
      {
        member: {
          id: 'tech-mgr-ai',
          name: 'AI/ML Manager',
          role: 'Manager - AI/ML',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2YZOm8KUSzzFXFcS2Qh_-cDwvZKQALkjNclaI8OZ1FqtFt1zx-8A8hNfdKPvC5PTCqF-p0E1cCGCDQF8QVoBGih8GIu9VFF1VkLxZ6Ibf0y14HcMLMfO_-DSZ3_RF2BZ2X-oVy1Vzx4hQiCg3TjCnt7Au9r_lJM5Kl_gNDrWZOAVR3XVDwI6D5sRDvukI_66XE5Rur4ZNIDjkKz79Epqd0GQuLB83untU1_ST9aSIijKKn866eysrnHjEJ0-xNxE9y9hpAuhs9CD',
          imageAlt: 'AI/ML Manager',
          level: 'manager',
          initials: 'AM',
          domains: ['SageMaker', 'PyTorch'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'tech-ai-assoc-1',
              name: 'Sarah Chen',
              role: 'Associate - ML Engineer',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'SC',
              domains: ['TensorFlow', 'Python'],
              linkedinUrl: '#',
            },
          },
        ],
      },
      {
        member: {
          id: 'tech-mgr-cloud',
          name: 'Cloud & DevOps Manager',
          role: 'Manager - Cloud',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
          imageAlt: 'Cloud Manager',
          level: 'manager',
          initials: 'CM',
          domains: ['AWS', 'Kubernetes'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'tech-cloud-assoc-1',
              name: 'Alex Rodriguez',
              role: 'Associate - DevOps',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'AR',
              domains: ['CI/CD', 'Docker'],
              linkedinUrl: '#',
            },
          },
        ],
      },
    ],
  },
];

// Corporate Category - Director -> Managers -> Associates
export const corporateCategory: OrgNode[] = [
  {
    member: corporateDirector,
    children: [
      {
        member: {
          id: 'corp-mgr-events',
          name: 'Events Manager',
          role: 'Manager - Events',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
          imageAlt: 'Events Manager',
          level: 'manager',
          initials: 'EM',
          domains: ['Event Planning', 'Coordination'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'corp-events-assoc-1',
              name: 'Lisa Park',
              role: 'Associate - Events',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'LP',
              domains: ['Planning', 'Logistics'],
              linkedinUrl: '#',
            },
          },
        ],
      },
      {
        member: {
          id: 'corp-mgr-pr',
          name: 'PR Manager',
          role: 'Manager - Public Relations',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2YZOm8KUSzzFXFcS2Qh_-cDwvZKQALkjNclaI8OZ1FqtFt1zx-8A8hNfdKPvC5PTCqF-p0E1cCGCDQF8QVoBGih8GIu9VFF1VkLxZ6Ibf0y14HcMLMfO_-DSZ3_RF2BZ2X-oVy1Vzx4hQiCg3TjCnt7Au9r_lJM5Kl_gNDrWZOAVR3XVDwI6D5sRDvukI_66XE5Rur4ZNIDjkKz79Epqd0GQuLB83untU1_ST9aSIijKKn866eysrnHjEJ0-xNxE9y9hpAuhs9CD',
          imageAlt: 'PR Manager',
          level: 'manager',
          initials: 'PM',
          domains: ['Communications', 'Media'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'corp-pr-assoc-1',
              name: 'Emma Wilson',
              role: 'Associate - PR',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'EW',
              domains: ['Social Media', 'Content'],
              linkedinUrl: '#',
            },
          },
        ],
      },
      {
        member: {
          id: 'corp-mgr-hr',
          name: 'HR & Admin Manager',
          role: 'Manager - HR & Admin',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
          imageAlt: 'HR Manager',
          level: 'manager',
          initials: 'HM',
          domains: ['HR', 'Administration'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'corp-hr-assoc-1',
              name: 'Chris Lee',
              role: 'Associate - HR',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'CL',
              domains: ['Recruitment', 'Admin'],
              linkedinUrl: '#',
            },
          },
        ],
      },
      {
        member: {
          id: 'corp-mgr-sponsor',
          name: 'Sponsorship Manager',
          role: 'Manager - Sponsorship',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2YZOm8KUSzzFXFcS2Qh_-cDwvZKQALkjNclaI8OZ1FqtFt1zx-8A8hNfdKPvC5PTCqF-p0E1cCGCDQF8QVoBGih8GIu9VFF1VkLxZ6Ibf0y14HcMLMfO_-DSZ3_RF2BZ2X-oVy1Vzx4hQiCg3TjCnt7Au9r_lJM5Kl_gNDrWZOAVR3XVDwI6D5sRDvukI_66XE5Rur4ZNIDjkKz79Epqd0GQuLB83untU1_ST9aSIijKKn866eysrnHjEJ0-xNxE9y9hpAuhs9CD',
          imageAlt: 'Sponsorship Manager',
          level: 'manager',
          initials: 'SM',
          domains: ['Sponsorship', 'Partnerships'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'corp-sponsor-assoc-1',
              name: 'David Kumar',
              role: 'Associate - Sponsorship',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'DK',
              domains: ['Partnerships', 'Relations'],
              linkedinUrl: '#',
            },
          },
        ],
      },
    ],
  },
];

// Creatives Category - Director -> Managers -> Associates
export const creativesCategory: OrgNode[] = [
  {
    member: creativesDirector,
    children: [
      {
        member: {
          id: 'creative-mgr-design',
          name: 'Digital Design Manager',
          role: 'Manager - Digital Design',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ETxyLXBx-CeSyZeTdciG_RLd6w8gz4fTYnM2Sknvtjkvylt3omhysaGwEGBuVJ72iFc_U_zI5JwXZNPlaPod_JdeMB8e1MUbvSft8UWnYRJXTEIBc0QcCUBrMftPX_OdXhH6XYpttpZi1n1o1UiHUNJxvXpDAdvlcVbZ4VMblHJ8KD5uLRvEl3aDiW9DFtqETgctqgfKjba9tTMfSVhjguUZrlqZq4413Y3CBjzCc3eD6oGHAPnj212RUYMmuGi36J6Dlo_BXxzV',
          imageAlt: 'Design Manager',
          level: 'manager',
          initials: 'DM',
          domains: ['UI/UX', 'Branding'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'creative-design-assoc-1',
              name: 'Priya Sharma',
              role: 'Associate - UI/UX Designer',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'PS',
              domains: ['Figma', 'Design'],
              linkedinUrl: '#',
            },
          },
        ],
      },
      {
        member: {
          id: 'creative-mgr-media',
          name: 'Media Manager',
          role: 'Manager - Media',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2YZOm8KUSzzFXFcS2Qh_-cDwvZKQALkjNclaI8OZ1FqtFt1zx-8A8hNfdKPvC5PTCqF-p0E1cCGCDQF8QVoBGih8GIu9VFF1VkLxZ6Ibf0y14HcMLMfO_-DSZ3_RF2BZ2X-oVy1Vzx4hQiCg3TjCnt7Au9r_lJM5Kl_gNDrWZOAVR3XVDwI6D5sRDvukI_66XE5Rur4ZNIDjkKz79Epqd0GQuLB83untU1_ST9aSIijKKn866eysrnHjEJ0-xNxE9y9hpAuhs9CD',
          imageAlt: 'Media Manager',
          level: 'manager',
          initials: 'MM',
          domains: ['Video', 'Photography'],
          linkedinUrl: '#',
        },
        children: [
          {
            member: {
              id: 'creative-media-assoc-1',
              name: 'Anil Patel',
              role: 'Associate - Content Creator',
              image: '',
              imageAlt: '',
              level: 'associate',
              initials: 'AP',
              domains: ['Videography', 'Editing'],
              linkedinUrl: '#',
            },
          },
        ],
      },
    ],
  },
];
