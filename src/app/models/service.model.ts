// export interface Service {
//   id: number;
//   title: string;
//   description: string;
//   icon: string;
//   features: string[];
//   category: 'AI' | 'Development' | 'Consulting' | 'Analytics';
//   buttonText?: string;
// }



export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: 'AI' | 'Development' | 'Consulting' | 'Analytics';
  buttonText?: string;
  backgroundImage: string;
}