export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'AI' | 'Web' | 'Mobile' | 'Analytics';
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
}