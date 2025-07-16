export interface ServiceBulletPoint {
  title: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  buttonText?: string;
  backgroundImage: string;
  bulletPoints?: ServiceBulletPoint[];
}