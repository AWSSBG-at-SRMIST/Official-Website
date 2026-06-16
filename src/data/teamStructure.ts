export const presidiumAndDirectors: OrgNode[] = [
  {
    member: {
      id: "captain",
      name: "Tanish Poddar",
      role: "Captain",
      image: "/team/tanish.png",
      imageAlt: "Tanish Poddar",
      level: "presidium",
      linkedinUrl: "#",
    },
    children: [
      {
        member: {
          id: "director-tech",
          name: "Aakarsh Kumar",
          role: "Technical Director",
          image: "/team/aakarsh-kumar.png",
          imageAlt: "Aakarsh Kumar",
          level: "director",
          linkedinUrl: "#",
        },
      },
      {
        member: {
          id: "director-corporate",
          name: "Animesh Rai",
          role: "Corporate Director",
          image: "/team/animesh-rai.png",
          imageAlt: "Animesh Rai",
          level: "director",
          linkedinUrl: "#",
        },
      },
      {
        member: {
          id: "director-creatives",
          name: "Praveen Saravanan",
          role: "Creatives Director",
          image: "/team/praveen-saravanan.png",
          imageAlt: "Praveen Saravanan",
          level: "director",
          linkedinUrl: "#",
        },
      },
    ],
  },
  {
    member: {
      id: "executive",
      name: "Siddharth Agarwal",
      role: "Executive",
      image: "/team/siddharth.png",
      imageAlt: "Siddharth Agarwal",
      level: "presidium",
      linkedinUrl: "#",
    },
  },
];

export const technicalCategory: OrgNode[] = [
  {
    member: presidiumAndDirectors[0].children![0].member,
    children: [
      {
        member: {
          id: "dev-manager",
          name: "Nishant Ranjan",
          role: "Dev Manager",
          image: "/team/nishant-ranjan.png",
          imageAlt: "Nishant Ranjan",
          level: "associate",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "dev-associate",
              name: "Aarohi Sahu",
              role: "Dev Associate",
              image: "/team/aarohi-sahu.png",
              imageAlt: "Aarohi Sahu",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
      {
        member: {
          id: "aiml-manager",
          name: "Hemish Jain",
          role: "AI/ML Manager",
          image: "/team/hemish-jain.png",
          imageAlt: "Hemish Jain",
          level: "Manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "aiml-associate",
              name: "Mridul Mathur",
              role: "AI/ML Associate",
              image: "/team/mridul-mathur.png",
              imageAlt: "Mridul Mathur",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
      {
        member: {
          id: "cloud-manager",
          name: "Desai Prathmesh Prakash",
          role: "Cloud & DevOps Manager",
          image: "/team/prathmesh-desai.png",
          imageAlt: "Prathmesh Desai",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "cloud-associate",
              name: "Nikhil Ganesh",
              role: "Cloud Associate",
              image: "/team/nikhil-ganesh.png",
              imageAlt: "Nikhil Ganesh",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
    ],
  },
];

export const corporateCategory: OrgNode[] = [
  {
    member: presidiumAndDirectors[0].children![1].member,
    children: [
      {
        member: {
          id: "events-manager",
          name: "Riya Kandhari",
          role: "Events Manager",
          image: "/team/riya-kandhari.png",
          imageAlt: "Riya Kandhari",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "events-associate",
              name: "Atharv Raj Pandab",
              role: "Events Associate",
              image: "/team/atharv-pandab.png",
              imageAlt: "Atharv Raj Pandab",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
      {
        member: {
          id: "pr-manager",
          name: "Mohak Dhawan",
          role: "PR Manager",
          image: "/team/mohak-dhawan.png",
          imageAlt: "Mohak Dhawan",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "pr-associate",
              name: "Samidha Lade",
              role: "PR Associate",
              image: "/team/samidha-lade.png",
              imageAlt: "Samidha Lade",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
      {
        member: {
          id: "hr-manager",
          name: "Rohit Sunkari",
          role: "HR & Admin Manager",
          image: "/team/rohit-sunkari.png",
          imageAlt: "Rohit Sunkari",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "hr-associate",
              name: "Rajni",
              role: "HR & Admin Associate",
              image: "/team/rajni.png",
              imageAlt: "Rajni",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
      {
        member: {
          id: "sponsorship-manager",
          name: "Shreyash Mishra",
          role: "Sponsorship Manager",
          image: "/team/shreyash-mishra.png",
          imageAlt: "Shreyash Mishra",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "sponsorship-associate",
              name: "Siddhi Jadhav",
              role: "Sponsorship Associate",
              image: "/team/siddhi-jadhav.png",
              imageAlt: "Siddhi Jadhav",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
    ],
  },
];

export const creativesCategory: OrgNode[] = [
  {
    member: presidiumAndDirectors[0].children![2].member,
    children: [
      {
        member: {
          id: "design-manager",
          name: "Krish Nakul Gohel",
          role: "Design Manager",
          image: "/team/krish-gohel.jpg",
          imageAlt: "Krish Nakul Gohel",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "design-associate",
              name: "Ritesh Rajpal",
              role: "Design Associate",
              image: "/team/ritesh-rajpal.png",
              imageAlt: "Ritesh Rajpal",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
      {
        member: {
          id: "media-manager",
          name: "Piyush Kumar",
          role: "Media Manager",
          image: "/team/piyush-kumar.png",
          imageAlt: "Piyush Kumar",
          level: "manager",
          linkedinUrl: "#",
        },
        children: [
          {
            member: {
              id: "media-associate",
              name: "Arnav Thakur",
              role: "Media Associate",
              image: "/team/arnav-thakur.png",
              imageAlt: "Arnav Thakur",
              level: "associate",
              linkedinUrl: "#",
            },
          },
        ],
      },
    ],
  },
];
