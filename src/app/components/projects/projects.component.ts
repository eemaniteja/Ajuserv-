// // import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // // Update the path below if your ApiService is located elsewhere
// // import { ApiService } from '../../services/api.service';
// // import { Project } from '../../models/project.model';
// // import { interval, Subscription } from 'rxjs';

// // @Component({
// //   selector: 'app-projects',
// //   standalone: true,
// //   imports: [CommonModule],
// //   templateUrl: './projects.component.html',
// //   styleUrls: ['./projects.component.css']
// // })
// // export class ProjectsComponent implements OnInit, OnDestroy {
// //   projects: Project[] = [];
// //   filteredProjects: Project[] = [];
// //   selectedCategory: string = 'All';
// //   categories: string[] = ['All', 'AI', 'Web', 'Mobile', 'Data Engineer', 'Power Platform'];
// //   Math = Math;
  
// //   // Carousel variables
// //   currentOffset = 0;
// //   currentSlide = 0;
// //   cardWidth = 316; // 300px width + 16px gap
// //   visibleCards = 3;
// //   carouselDots: number[] = [];
// //   private carouselInterval!: Subscription;

// //   constructor(@Inject(ApiService) private apiService: ApiService) {}

// //   ngOnInit() {
// //     this.loadProjects();
// //   }

// //   loadProjects() {
// //     this.apiService.getProjects().subscribe({
// //       next: (projects: Project[]) => {
// //         this.projects = projects.map(project => ({
// //           ...project,
// //           demoUrl: project.demoUrl || '#',
// //           githubUrl: project.githubUrl || '#',
// //           isExpanded: false // Initialize read more state for each project
// //         }));
// //         this.filteredProjects = this.projects;
        
// //         // Initialize carousel
// //         this.calculateCarouselDots();
// //         this.startAutoCarousel();
// //       },
// //       error: (error: any) => {
// //         console.error('Error loading projects:', error);
// //       }
// //     });
// //   }

// //   // Read More functionality
// //   getTruncatedText(text: string, maxLength: number): string {
// //     if (text.length <= maxLength) {
// //       return text;
// //     }
// //     return text.substring(0, maxLength);
// //   }

// //   shouldShowReadMore(text: string, maxLength: number): boolean {
// //     return text.length > maxLength;
// //   }

// //   toggleReadMore(project: any): void {
// //     project.isExpanded = !project.isExpanded;
// //   }

// //   calculateCarouselDots() {
// //     const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
// //     this.carouselDots = Array(totalSlides).fill(0).map((x, i) => i);
// //   }

// //   startAutoCarousel() {
// //     this.carouselInterval = interval(5000).subscribe(() => {
// //       this.nextSlide();
// //     });
// //   }

// //   nextSlide() {
// //     this.currentSlide = (this.currentSlide + 1) % this.carouselDots.length;
// //     this.updateCarouselPosition();
// //   }

// //   prevSlide() {
// //     this.currentSlide = (this.currentSlide - 1 + this.carouselDots.length) % this.carouselDots.length;
// //     this.updateCarouselPosition();
// //   }

// //   goToSlide(index: number) {
// //     this.currentSlide = index;
// //     this.updateCarouselPosition();
// //     // Reset the auto carousel timer when manually navigating
// //     this.resetAutoCarousel();
// //   }

// //   updateCarouselPosition() {
// //     this.currentOffset = -this.currentSlide * this.visibleCards * this.cardWidth;
// //   }

// //   resetAutoCarousel() {
// //     this.carouselInterval?.unsubscribe();
// //     this.startAutoCarousel();
// //   }

// //   filterProjects(category: string) {
// //     this.selectedCategory = category;
// //     if (category === 'All') {
// //       this.filteredProjects = this.projects;
// //       this.calculateCarouselDots();
// //       this.resetAutoCarousel();
// //     } else {
// //       this.filteredProjects = this.projects.filter(project => 
// //         project.category.toLowerCase() === category.toLowerCase()
// //       );
// //     }
// //     this.currentSlide = 0;
// //     this.currentOffset = 0;
// //   }

// //   ngOnDestroy() {
// //     if (this.carouselInterval) {
// //       this.carouselInterval.unsubscribe();
// //     }
// //   }
// // }


// import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ApiService } from '../../services/api.service';
// import { Project } from '../../models/project.model';
// import { interval, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-projects',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css']
// })
// export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
//   @ViewChild('carouselContainer') carouselContainer!: ElementRef;

//   projects: Project[] = [];
//   filteredProjects: Project[] = [];
//   selectedCategory: string = 'All';
//   categories: string[] = ['All', 'AI', 'Web', 'Mobile', 'Data Engineer', 'Power Platform'];
  
//   // Carousel variables
//   currentSlide = 0;
//   cardWidth = 300; // Base card width in pixels
//   cardGap = 16; // Gap between cards in pixels
//   visibleCards = 4;
//   carouselDots: number[] = [];
//   private carouselInterval!: Subscription;

//   constructor(private apiService: ApiService) {}

//   ngOnInit() {
//     this.calculateVisibleCards();
//     this.loadProjects();
//   }

//   ngAfterViewInit() {
//     this.setupScrollSnap();
//   }

//   @HostListener('window:resize')
//   onWindowResize() {
//     this.calculateVisibleCards();
//     this.calculateCarouselDots();
//   }

//   private calculateVisibleCards() {
//     const width = window.innerWidth;
//     if (width < 768) this.visibleCards = 1;
//     else if (width < 1024) this.visibleCards = 2;
//     else if (width < 1280) this.visibleCards = 3;
//     else this.visibleCards = 4;
//   }

//   private setupScrollSnap() {
//     const container = this.carouselContainer?.nativeElement;
//     if (!container) return;

//     container.addEventListener('scroll', () => {
//       const scrollPosition = container.scrollLeft;
//       const cardWidthWithGap = this.cardWidth + this.cardGap;
//       this.currentSlide = Math.round(scrollPosition / (cardWidthWithGap * this.visibleCards));
//       this.currentSlide = Math.max(0, Math.min(this.currentSlide, this.carouselDots.length - 1));
//       this.resetAutoCarousel();
//     });
//   }

//   loadProjects() {
//     this.apiService.getProjects().subscribe({
//       next: (projects: Project[]) => {
//         this.projects = projects.map(project => ({
//           ...project,
//           demoUrl: project.demoUrl || '#',
//           githubUrl: project.githubUrl || '#',
//           isExpanded: false
//         }));
//         this.filteredProjects = this.projects;
//         this.calculateCarouselDots();
//         this.startAutoCarousel();
//       },
//       error: (error: any) => {
//         console.error('Error loading projects:', error);
//       }
//     });
//   }

//   calculateCarouselDots() {
//     const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
//     this.carouselDots = Array(totalSlides).fill(0).map((x, i) => i);
//   }

//   startAutoCarousel() {
//     this.carouselInterval?.unsubscribe();
//     this.carouselInterval = interval(5000).subscribe(() => {
//       this.nextSlide();
//     });
//   }

//   nextSlide() {
//     const nextSlide = (this.currentSlide + 1) % this.carouselDots.length;
//     this.goToSlide(nextSlide);
//   }

//   prevSlide() {
//     const prevSlide = (this.currentSlide - 1 + this.carouselDots.length) % this.carouselDots.length;
//     this.goToSlide(prevSlide);
//   }

//   goToSlide(index: number) {
//     this.currentSlide = index;
//     const container = this.carouselContainer?.nativeElement;
//     if (!container) return;

//     const scrollTo = this.currentSlide * this.visibleCards * (this.cardWidth + this.cardGap);
//     container.scrollTo({
//       left: scrollTo,
//       behavior: 'smooth'
//     });
//     this.resetAutoCarousel();
//   }

//   resetAutoCarousel() {
//     this.carouselInterval?.unsubscribe();
//     this.startAutoCarousel();
//   }

//   filterProjects(category: string) {
//     this.selectedCategory = category;
//     if (category === 'All') {
//       this.filteredProjects = this.projects;
//     } else {
//       this.filteredProjects = this.projects.filter(project => 
//         project.category.toLowerCase() === category.toLowerCase()
//       );
//     }
//     this.currentSlide = 0;
//     this.calculateCarouselDots();
//     setTimeout(() => this.goToSlide(0), 100); // Small delay to ensure DOM update
//   }

//   getTruncatedText(text: string, maxLength: number): string {
//     return text.length <= maxLength ? text : text.substring(0, maxLength);
//   }

//   shouldShowReadMore(text: string, maxLength: number): boolean {
//     return text.length > maxLength;
//   }

//   toggleReadMore(project: Project): void {
//     project.isExpanded = !project.isExpanded;
//   }

//   ngOnDestroy() {
//     this.carouselInterval?.unsubscribe();
//     window.removeEventListener('resize', this.onWindowResize);
//   }
// }



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
  categories: string[] = ['All', 'AI', 'Web', 'Mobile', 'Data Engineering', 'Power Platform'];
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
    project.isExpanded = !project.isExpanded;
  }

  calculateCarouselDots() {
    const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
    this.carouselDots = Array(totalSlides).fill(0).map((x, i) => i);
  }

  startAutoCarousel() {
    this.carouselInterval = interval(5000).subscribe(() => {
      if (!this.isScrolling) {
        this.nextSlide();
      }
    });
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