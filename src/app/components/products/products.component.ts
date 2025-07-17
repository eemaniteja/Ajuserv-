import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  status = 'Development In Progress';
  showBackToTop = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  products: Product[] = [
    {
      title: 'Fintrix',
      description: 'AI-Powered Financial Statements Analyser',
      status: 'Development In Progress'
    },
    {
      title: 'AjuLMS',
      description: 'AI-Powered Learning Management System',
      status: 'Development In Progress'
    },
    {
      title: 'AjuRec',
      description: 'AI-Powered Recruitment System',
      status: 'Development In Progress'
    },
    {
      title: 'SYNCRO',
      description: 'AI-Powered Contact Centre',
      status: 'Development In Progress'
    },
    {
      title: 'AjuAgent',
      description: 'AI-Powered Customer Service Agent',
      status: 'Development In Progress'
    }
  ];
}