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

  constructor(private http: HttpClient) {}

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
        title: 'AI Development',
        description: 'Custom AI solutions powered by machine learning and deep learning technologies.',
        icon: '🤖',
        features: ['Machine Learning Models', 'Neural Networks', 'Computer Vision', 'NLP Processing'],
        category: 'AI'
      },
      {
        id: 2,
        title: 'Full-Stack Development',
        description: 'End-to-end web and mobile application development with modern frameworks.',
        icon: '💻',
        features: ['React/Angular/Vue', 'Node.js/Python/Java', 'Cloud Deployment', 'API Development'],
        category: 'Development'
      },
      {
        id: 3,
        title: 'Data Analytics',
        description: 'Transform your data into actionable insights with advanced analytics solutions.',
        icon: '📊',
        features: ['Data Visualization', 'Predictive Analytics', 'Big Data Processing', 'Business Intelligence'],
        category: 'AI'
      },
      {
        id: 4,
        title: 'Technical Consulting',
        description: 'Strategic technology consulting to accelerate your digital transformation.',
        icon: '🎯',
        features: ['Architecture Design', 'Code Review', 'Performance Optimization', 'Team Training'],
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