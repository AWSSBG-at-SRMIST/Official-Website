export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}

export interface ModelBenchmark {
  modelName: string;
  accuracy: number;
  f1Score: number;
  isPrimary?: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publication: string;
  publicationDate: string;
  doi?: string;
  ieeeUrl: string;
  abstract: string;
  summary: string;
  coverImage: string;
  keywords: string[];
  metrics?: {
    accuracy?: string;
    f1Score?: string;
    datasetSize?: string;
  };
  pipeline?: string[];
  benchmarks?: ModelBenchmark[];
  bibtex?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
}
