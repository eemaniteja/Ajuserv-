export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'AI' | 'Web' | 'Mobile' | 'Data Enginner' | 'Power Platform';
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  stats?: {
    views: number;
    likes: number;
  };
  showFullDescription?: boolean;
  isExpanded?: boolean;
}