
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  categories: string[] = ['All', 'AI/Gen AI', 'Full Stack', 'Data Engineering', 'Power Platform'];
  Math = Math;
  
  // Carousel variables
  currentSlide = 0;
  cardWidth = 316; // 300px width + 16px gap
  visibleCards = 3;
  carouselDots: number[] = [];
  private carouselInterval!: Subscription;
  private isScrolling = false;
  private scrollTimeout: any;

  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.apiService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects.map(project => ({
          ...project,
          demoUrl: project.demoUrl || '#',
          githubUrl: project.githubUrl || '#',
          isExpanded: false
        }));
        this.filteredProjects = this.projects;
        this.calculateCarouselDots();
        this.startAutoCarousel();
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  getTruncatedText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  }

  shouldShowReadMore(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }

  toggleReadMore(project: any): void {
    const wasExpanded = project.isExpanded;
    project.isExpanded = !project.isExpanded;
    
    if (project.isExpanded && !wasExpanded) {
      // Pause carousel when expanding
      if (this.carouselInterval) {
        this.carouselInterval.unsubscribe();
      }
    } else if (!project.isExpanded && wasExpanded) {
      // Resume carousel when collapsing
      this.startAutoCarousel();
    }
  }

  calculateCarouselDots() {
    const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
    this.carouselDots = Array(totalSlides).fill(0).map((x, i) => i);
  }

  startAutoCarousel() {
    // Only start if no project is expanded
    if (!this.projects.some(p => p.isExpanded)) {
      this.carouselInterval = interval(5000).subscribe(() => {
        if (!this.isScrolling) {
          this.nextSlide();
        }
      });
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselDots.length;
    this.scrollToSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselDots.length) % this.carouselDots.length;
    this.scrollToSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.scrollToSlide();
    this.resetAutoCarousel();
  }

  scrollToSlide() {
    const scrollPosition = this.currentSlide * this.visibleCards * this.cardWidth;
    this.carousel.nativeElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

   scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  handleScroll() {
    this.isScrolling = true;
    
    // Clear any existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    // Set a new timeout
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      this.updateCurrentSlide();
    }, 100);
  }

  updateCurrentSlide() {
    if (!this.carousel) return;
    
    const scrollPosition = this.carousel.nativeElement.scrollLeft;
    this.currentSlide = Math.round(scrollPosition / (this.visibleCards * this.cardWidth));
    
    // Ensure currentSlide stays within bounds
    this.currentSlide = Math.max(0, Math.min(this.currentSlide, this.carouselDots.length - 1));
  }

  resetAutoCarousel() {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
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
    if (this.carousel) {
      this.carousel.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.calculateVisibleCards();
    this.calculateCarouselDots();
  }

  calculateVisibleCards() {
    if (window.innerWidth < 769) {
      this.visibleCards = 1;
    } else if (window.innerWidth < 1025) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 3;
    }
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}