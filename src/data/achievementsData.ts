// TODO: placeholder data for the visual redesign pass — replace with real
// entries once the achievements admin backend exists.

export interface Certification {
  id: string;
  memberName: string;
  certTitle: string;
  issuer: string;
  date: string;
}

export interface CareerAchievement {
  id: string;
  memberName: string;
  company: string;
  role: string;
  type: "Internship" | "PPO" | "Placement";
  date: string;
}

export const certifications: Certification[] = [
  { id: "c1", memberName: "Aarohi Sahu", certTitle: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "Mar 2026" },
  { id: "c2", memberName: "Mridul Mathur", certTitle: "AWS Certified Machine Learning – Specialty", issuer: "Amazon Web Services", date: "Feb 2026" },
  { id: "c3", memberName: "Nikhil Ganesh", certTitle: "AWS Certified SysOps Administrator – Associate", issuer: "Amazon Web Services", date: "Jan 2026" },
  { id: "c4", memberName: "Hemish Jain", certTitle: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "Dec 2025" },
  { id: "c5", memberName: "Desai Prathmesh Prakash", certTitle: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Nov 2025" },
  { id: "c6", memberName: "Riya Kandhari", certTitle: "AWS Certified Security – Specialty", issuer: "Amazon Web Services", date: "Oct 2025" },
  { id: "c7", memberName: "Krish Nakul Gohel", certTitle: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Sep 2025" },
  { id: "c8", memberName: "Aakarsh Kumar", certTitle: "AWS Certified DevOps Engineer – Professional", issuer: "Amazon Web Services", date: "Aug 2025" },
];

export const careerAchievements: CareerAchievement[] = [
  { id: "a1", memberName: "Aarohi Sahu", company: "Amazon", role: "SDE Intern", type: "Internship", date: "Summer 2026" },
  { id: "a2", memberName: "Mridul Mathur", company: "Microsoft", role: "Software Engineer", type: "PPO", date: "2026" },
  { id: "a3", memberName: "Nikhil Ganesh", company: "Razorpay", role: "Backend Engineer", type: "Placement", date: "2026" },
  { id: "a4", memberName: "Hemish Jain", company: "Google", role: "ML Intern", type: "Internship", date: "Summer 2026" },
  { id: "a5", memberName: "Riya Kandhari", company: "Atlassian", role: "Product Intern", type: "Internship", date: "Winter 2025" },
  { id: "a6", memberName: "Krish Nakul Gohel", company: "Flipkart", role: "SDE-1", type: "Placement", date: "2025" },
];
