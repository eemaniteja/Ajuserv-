import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Update the path below if your ApiService is located elsewhere
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'AI', 'Web', 'Mobile', 'Analytics'];
  Math = Math;
  
  // Carousel variables
  currentOffset = 0;
  currentSlide = 0;
  cardWidth = 316; // 300px width + 16px gap
  visibleCards = 3;
  carouselDots: number[] = [];
  private carouselInterval!: Subscription;

  constructor(@Inject(ApiService) private apiService: ApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        this.filteredProjects = projects;
        this.projects.forEach(project => {
          project.demoUrl = project.demoUrl || '#';
          project.githubUrl = project.githubUrl || '#';
        }); 
        
        // Initialize carousel
        this.calculateCarouselDots();
        this.startAutoCarousel();
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  calculateCarouselDots() {
    const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
    this.carouselDots = Array(totalSlides).fill(0).map((x, i) => i);
  }

  startAutoCarousel() {
    this.carouselInterval = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselDots.length;
    this.updateCarouselPosition();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselDots.length) % this.carouselDots.length;
    this.updateCarouselPosition();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateCarouselPosition();
    // Reset the auto carousel timer when manually navigating
    this.resetAutoCarousel();
  }

  updateCarouselPosition() {
    this.currentOffset = -this.currentSlide * this.visibleCards * this.cardWidth;
  }

  resetAutoCarousel() {
    this.carouselInterval?.unsubscribe();
    this.startAutoCarousel();
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProjects = this.projects;
      this.calculateCarouselDots();
      this.resetAutoCarousel();
    } else {
      this.filteredProjects = this.projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }
    this.currentSlide = 0;
    this.currentOffset = 0;
  }
  ngOnDestroy() {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
  }
}