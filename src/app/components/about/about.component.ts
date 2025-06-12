import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  stats = [
    { number: '500+', label: 'Projects Completed', icon: '🚀' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '50+', label: 'AI Models Deployed', icon: '🤖' },
    { number: '24/7', label: 'Support Available', icon: '💬' }
  ];

  team = [
    {
      name: 'Alex Johnson',
      role: 'AI Research Director',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Leading AI innovations with 10+ years in machine learning and deep neural networks.'
    },
    {
      name: 'Sarah Chen',
      role: 'Full-Stack Architect',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in scalable web architectures and modern development frameworks.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Data Science Lead',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specializing in big data analytics and predictive modeling solutions.'
    }
  ];
}