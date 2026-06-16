export type EventCategory = "workshop" | "certification-camp" | "hackathon";
export type EventStatus = "upcoming" | "past";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  date: string;       // e.g. "Oct 24 - Oct 26"
  startDate: string;  // Format: "YYYY-MM-DD"
  endDate: string;    // Format: "YYYY-MM-DD"
  location: string;   // e.g. "Main Tech Hub" or "Virtual"
  image: string;      // Unsplash image URL or design asset
  isFeatured?: boolean;
  isHighDemand?: boolean;
  registrantsCount?: number;
  detailsLink?: string;
}
