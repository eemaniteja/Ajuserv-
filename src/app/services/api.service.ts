import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // For demo purposes, returning mock data. Replace with actual HTTP calls
  getProjects(): Observable<Project[]> {
    const mockProjects: Project[] = [
      {
        id: 1,
        title: 'AI-Powered Analytics Dashboard',
        description: 'Advanced machine learning dashboard for real-time business intelligence and predictive analytics.',
        image: 'https://images.pexels.com/photos/6797307/pexels-photo-6797307.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['TensorFlow', 'Python', 'React', 'PostgreSQL'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 2,
        title: 'Smart Recommendation Engine',
        description: 'Deep learning recommendation system that increases user engagement by 300%.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['PyTorch', 'Redis', 'FastAPI', 'MongoDB'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 3,
        title: 'Enterprise Web Platform',
        description: 'Scalable enterprise solution with microservices architecture and cloud deployment.',
        image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Angular', 'Node.js', 'Docker', 'Kubernetes'],
        category: 'Web',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: 'Computer Vision System',
        description: 'Real-time object detection and recognition system for industrial automation.',
        image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['OpenCV', 'YOLO', 'C++', 'CUDA'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      }
    ];
    return of(mockProjects);
  }

  getServices(): Observable<Service[]> {
    const mockServices: Service[] = [
      {
        id: 1,
        icon: '💡', // Example emoji icon
        title: 'AI Strategy & Consulting',
        description: 'We provide AI strategy and consulting services to help you identify opportunities, design solutions, and implement AI effectively. Our experts guide you in aligning AI initiatives with your business goals for maximum impact.',
        features: [
          'AI Readiness Assessment',
          'Use Case Identification',
          'ROI Projections',
          'Ethical AI Frameworks'
        ],
        category: 'AI'
      },
      {
        id: 2,
        icon: '🧠',
        title: 'AI and ML Services', // Your requested card
        description: 'Our data science team uses AI to deliver insights, automate tasks, and improve decision-making. We offer services like predictive analytics, NLP, Document Intelligence, and computer vision.',
        features: [
          'Azure Cognitive Services',
          'Microsoft fabric implantation',
          'Building and implementing customer ML models',
          'Co-pilot implementation'
        ],
        category: 'AI'
      },
      {
        id: 3,
        icon: '✨', // New icon for Generative AI
        title: 'Generative AI Solutions', // Your requested card
        description: 'Our AI experts specialize in generative models to deliver innovative solutions like content creation, synthetic data, and automation. We provide customized services to meet diverse business needs.',
        features: [
          'Content Generation ',
          'Creative Automation',
          'Synthetic Data Generation',
          'Chatboits and Virtual Assistants'
        ],
        category: 'AI'
      },
      {
        id: 4,
        icon: '💻',
        title: 'Web Development', // Your requested card
        description: 'We offer end-to-end web development services to build responsive, user-friendly websites and web apps. Our solutions are tailored to meet your business goals with modern design and robust functionality.',
        features: [
          'Frontend Development (Angular, React, Vue)',
          'Backend Development (Node.js, Python, .NET)',
          'API Design & Integration',
          'E-commerce Solutions'
        ],
        category: 'Development'
      },
      {
        id: 5,
        icon: '⚙️', // Icon for Power Platform
        title: 'Power Platform Development and Integration Services', // Your requested card
        description: 'We build custom business apps using Microsoft PowerApps for mobile, web, and desktop to streamline your processes. Our services include automation with Power Automate and Azure Logic Apps, and reporting with Power BI.',
        features: [
          'Power Apps ',
          'Power Automate ',
          'Power Automate Desktop',
          'Azure Logic Apps',
          'Azure Function Apps', 
          'Power BI '
          
        ],
        category: 'Development'
      },
      {
        id: 6,
        icon: '☁️', // Icon for Azure Cloud
        title: 'Azure Cloud Services', // Your requested card
        description: 'We offer Azure cloud solutions to help you scale your business and boost efficiency. Our services include cloud migration, management, optimization, and custom app development on Azure.',
        features: [
          'Cloud Migration Services',
          'Devops Services',
          'Application Modernization Services',
          'Data Engineering and Data Migration Services', 
        ],
        category: 'Development'
      },
      {
        id: 7,
        icon: '💬', // Icon for Chatbot
        title: 'Chatbot & Conversational AI', // Your requested card
        description: 'Building intelligent conversational agents for enhanced customer and employee experiences.',
        features: [
          'Custom Chatbot Development',
          'Natural Language Understanding (NLU)',
          'Voice Assistant Integration',
          'Multi-channel Deployment'
        ],
        category: 'AI'
      },
      {
        id: 8,
        icon: '📱',
        title: 'Mobile App Development',
        description: 'Crafting intuitive and high-performance mobile experiences for iOS and Android.',
        features: [
          'Native iOS/Android Apps',
          'Cross-Platform Development (React Native, Flutter)',
          'UI/UX Design',
          'App Store Optimization'
        ],
        category: 'Development'
      },
      {
        id: 9,
        icon: '🛡️',
        title: 'Cybersecurity Solutions',
        description: 'Protecting your digital assets with advanced security measures and proactive strategies.',
        features: [
          'Security Audits & Assessments',
          'Threat Detection & Response',
          'Data Protection & Privacy',
          'Compliance Consulting'
        ],
        category: 'Consulting'
      }
    ];
    return of(mockServices);
  }

  // Replace with actual backend calls
  submitContact(data: any): Observable<any> {
    // return this.http.post(`${this.baseUrl}/contact`, data);
    return of({ success: true, message: 'Message sent successfully!' });
  }
}