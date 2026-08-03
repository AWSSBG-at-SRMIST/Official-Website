import type { ResearchPaper, FeaturedProject } from "./types";

export const researchPapersData: ResearchPaper[] = [
  {
    id: "11234688",
    title: "Suicidal Text Detection Using Machine Learning and Large Language Model",
    authors: [
      "Hemish Jain",
      "Anukool Kashyap",
      "Soubraylu Sivakumar",
      "V Deeban Chakravarthy",
      "P Selvaraju",
      "Fitri Yakub"
    ],
    publication: "2025 3rd International Conference on Recent Advances in Information Technology for Sustainable Development (ICRAIS)",
    publicationDate: "September 2025",
    doi: "10.1109/ICRAIS66073.2025.11234688",
    ieeeUrl: "https://ieeexplore.ieee.org/document/11234688",
    coverImage: "/images/projects/suicidal_text_detection.png",
    summary: "Presents an early detection system identifying suicidal intent from user-generated Reddit posts using NLP, Naive Bayes, Logistic Regression, and a fine-tuned BERT Transformer achieving 97.68% accuracy.",
    abstract: "The growing prevalence of suicidal ideation in online communities calls for robust and accessible early detection systems. This study presents a machine learning-based approach for identifying suicidal intent from user-generated text, specifically Reddit posts. A curated dataset of approximately 348,000 posts—consolidated to 232,074 unique entries—was collected from r/SuicideWatch, r/depression, and r/teenagers subreddits using the Pushshift API. Several model architectures were evaluated including Gaussian Naive Bayes, Logistic Regression, and a fine-tuned BERT transformer. Bidirectional Encoder Representations from Transformers (BERT) achieved 97.68% accuracy and 97.66% F1-score.",
    keywords: ["Suicidal Text Classification", "BERT", "Large Language Models", "Natural Language Processing", "Logistic Regression", "Mental Health AI"],
    metrics: {
      accuracy: "97.68%",
      f1Score: "97.66%",
      datasetSize: "232k Posts"
    },
    pipeline: [
      "Pushshift API Extraction (r/SuicideWatch, r/depression, r/teenagers)",
      "Text Normalization, Lemmatization & Deduplication (232,074 Entries)",
      "Feature Engineering (CountVectorizer & TF-IDF Extraction)",
      "Fine-Tuned BERT Transformer & Deep Neural Classification"
    ],
    benchmarks: [
      { modelName: "BERT Transformer", accuracy: 97.68, f1Score: 97.66, isPrimary: true },
      { modelName: "Logistic Regression", accuracy: 89.40, f1Score: 89.10 },
      { modelName: "Gaussian Naive Bayes", accuracy: 81.25, f1Score: 80.80 }
    ],
    bibtex: `@INPROCEEDINGS{11234688,
  author={Jain, Hemish and Kashyap, Anukool and Sivakumar, Soubraylu and Chakravarthy, V Deeban and Selvaraju, P and Yakub, Fitri},
  booktitle={2025 3rd International Conference on Recent Advances in Information Technology for Sustainable Development (ICRAIS)}, 
  title={Suicidal Text Detection Using Machine Learning and Large Language Model}, 
  year={2025},
  volume={},
  number={},
  pages={149-154},
  keywords={Suicidal text classification; Large Language Model; BERT; Logistic regression; Gaussian Naive Bayes},
  doi={10.1109/ICRAIS66073.2025.11234688}
}`
  }
];

export const featuredProjectsData: FeaturedProject[] = [
  {
    id: "hiree-ai",
    title: "Hiree AI",
    tagline: "AI-Powered Recruitment & Interview Prep Platform",
    description: "An intelligent platform streamlining talent acquisition, candidate evaluation, and automated mock interview practice using advanced AI feedback loops.",
    coverImage: "/images/projects/hiree_ai_ss.png",
    tags: ["Next.js", "AI / LLM", "TypeScript", "Interview Prep", "Recruitment"],
    liveUrl: "https://hireeai.vercel.app/",
    githubUrl: "https://github.com/hemish22/hiree",
    badge: "AI Product"
  },
  {
    id: "connextaa",
    title: "Connextaa",
    tagline: "Local Community Collaboration & Activity Network",
    description: "A secure community platform connecting individuals for shared activities, ridesharing, study groups, sports, and neighborhood events with verified authentication and reputation scores.",
    coverImage: "/images/projects/connextaa_ss.png",
    tags: ["React", "Community Tech", "Google Auth", "Realtime Chat", "Geolocation"],
    liveUrl: "https://www.connextaa.in/",
    badge: "Live Platform"
  }
];
