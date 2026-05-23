import type { Experience } from "@/types/experience";

export const experience: Experience[] = [
  {
    id: 1,
    company: "FAST-NUCES",
    position: "Mobile App Developer Intern",
    duration: {
      start: new Date("2025-07-01"),
      end: new Date("2025-08-31"),
    },
    description:
      "Built a cross-platform Point-of-Sale application with React Native, MVVM architecture, and Firebase backend.",
    highlights: [
      "Designed complete mobile UI prototypes in Figma including navigation flow and reusable components",
      "Developed cross-platform POS application using React Native with MVVM architecture",
      "Integrated Firebase Authentication and Firestore for real-time data synchronization",
      "Improved usability through optimized UI layouts and intuitive interaction design",
    ],
  },
  {
    id: 2,
    company: "Bright Beginnings Academy",
    position: "Graphic Designer (Remote)",
    duration: {
      start: new Date("2025-01-01"),
      end: null,
    },
    description:
      "Designing visual assets and marketing graphics for digital campaigns.",
    highlights: [
      "Designed visual assets and marketing graphics supporting digital campaigns",
    ],
  },
  {
    id: 3,
    company: "SS Consultancy Services",
    position: "Graphic Designer (Remote)",
    duration: {
      start: new Date("2024-06-01"),
      end: new Date("2024-09-30"),
    },
    description:
      "Produced promotional materials for client outreach and branding initiatives.",
    highlights: [
      "Created promotional materials for client outreach and branding initiatives",
    ],
  },
];
