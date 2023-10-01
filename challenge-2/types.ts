export interface Company {
  companyName: string;
  ycUrl: string;
}

export interface Founder {
  name: string;
  imageUrl?: string | null;
  /**
   * This is the founder's position at the company or their current company
   */
  position?: string | null;
  description?: string | null;
  socials?: Record<string, string> | null;
}

export interface Job {
  role: string;
  location: string | null;
  salary: string | null;
  equity: string | null;
  eligibility: string | null;
}

export interface LaunchPost {
  title: string;
  link: string;
  description: string;
  votes?: number;
  createdAt?: string;
  post?: string;
  sources?: string[];
}

// These are the only social media links that are available on the YC pages
// Although my code dynamically scrapes all social media links, I'm only including these
// NOTE: Opting to use optional operator vs Partial<...> because people/companies may not have any social media
export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  github?: string;
  crunchbase?: string;
}

export interface News {
  title: string;
  link: string;
  date: string;
}

export interface Startup {
  ycUrl: string;
  name: string | null;
  shortDescription: string | null;
  description: string | null;
  logo: string | null;
  banner: string | null;
  founded: string | null;
  teamSize: number | null;
  location: string | null;
  url: string | null;
  ycBatch: string | null;
  badges: string[];
  numJobs: number | null;
  jobs: Job[];
  founders: Founder[];
  // The LaunchPost | null is for error handling and shouldn't be hit in practice
  launchPosts: (LaunchPost | null)[];
  socialMedia: SocialMedia;
  news: News[];
  images: string[];
}
