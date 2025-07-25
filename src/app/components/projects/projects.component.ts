
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
  
  // Cache for emoji icons to ensure consistency
  private emojiCache = new Map<string, string>();
  
  // Carousel variables for All Categories
  currentSlide = 0;
  cardWidth = 316; // 300px width + 16px gap
  visibleCards = 3;
  carouselDots: number[] = [];
  private carouselInterval!: Subscription;
  private isScrolling = false;
  private scrollTimeout: any;

  // Carousel variables for Sub-Categories
  categoryCurrentSlide = 0;
  categoryCarouselDots: number[] = [];
  private categoryCarouselInterval!: Subscription;
  private isCategoryScrolling = false;
  private categoryScrollTimeout: any;

  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;
  @ViewChild('categoryCarousel') categoryCarousel!: ElementRef<HTMLElement>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.calculateVisibleCards();
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
        this.calculateCategoryCarouselDots();
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

  getProjectIcon(title: string): string {
    // Validate input
    if (!title || typeof title !== 'string') {
      return '💼'; // Default fallback
    }

    // Check cache first for consistency
    if (this.emojiCache.has(title)) {
      return this.emojiCache.get(title)!;
    }

    // Comprehensive emoji pool for unique project icons
    const emojiPool = [
      '🚀', '💡', '⚡', '🔥', '✨', '🎯', '🌟', '💎', '🔮', '🎨',
      '🛠️', '⚙️', '🔧', '🔨', '⚗️', '🧪', '🔬', '🖥️', '💻', '📱',
      '🌐', '🔗', '📊', '📈', '📉', '🎲', '🧩', '🎮', '🎪', '🎭',
      '🌈', '🔆', '💫', '🌠', '🎆', '🎇', '🏆', '🥇', '🎖️', '🏅',
      '🔑', '🗝️', '🎁', '📦', '🎪', '🎨', '🖌️', '✏️', '📝', '📋',
      '🚗', '✈️', '🚁', '🛸', '🌊', '🏔️', '🌋', '🏠', '🏢', '🏭',
      '💰', '💳', '📈', '📊', '🎯', '🔍', '🔎', '📡', '📺', '📻',
      '⭐', '🌟', '💥', '🔥', '⚡', '💎', '🔮', '🎈', '🎊', '🎉'
    ];

    // Create a more sophisticated hash function for better distribution
    let hash = 0;
    const normalizedTitle = title.toLowerCase().trim();
    
    // Enhanced hash calculation for better uniqueness
    for (let i = 0; i < normalizedTitle.length; i++) {
      const char = normalizedTitle.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Add title length as additional entropy
    hash = hash + normalizedTitle.length * 31;
    
    // Use absolute value and modulo to get consistent positive index
    const emojiIndex = Math.abs(hash) % emojiPool.length;
    
    // Fallback mapping for common project types to ensure meaningful icons
    const titleLower = normalizedTitle;
    const keywordMappings: { [key: string]: string } = {
      'ai': '🤖', 'artificial': '🤖', 'machine': '🤖', 'neural': '🧠',
      'web': '🌐', 'website': '🌐', 'frontend': '💻', 'backend': '⚙️',
      'mobile': '📱', 'app': '📱', 'android': '🤖', 'ios': '📱',
      'data': '📊', 'analytics': '📈', 'dashboard': '📊', 'chart': '📉',
      'ecommerce': '🛒', 'shop': '🛍️', 'store': '🏪', 'payment': '💳',
      'game': '🎮', 'gaming': '🎮', 'unity': '🎮', 'puzzle': '🧩',
      'social': '👥', 'chat': '💬', 'message': '📨', 'communication': '📞',
      'finance': '💰', 'bank': '🏦', 'crypto': '₿', 'blockchain': '⛓️',
      'health': '🏥', 'medical': '⚕️', 'fitness': '💪', 'wellness': '🧘',
      'education': '📚', 'learn': '🎓', 'course': '📖', 'training': '🏋️',
      'travel': '✈️', 'booking': '🎫', 'hotel': '🏨', 'map': '🗺️',
      'food': '🍽️', 'recipe': '👨‍🍳', 'restaurant': '🍕', 'delivery': '🚚',
      'music': '🎵', 'audio': '🎧', 'sound': '🔊', 'player': '▶️',
      'video': '🎬', 'stream': '📹', 'camera': '📸', 'photo': '📷',
      'security': '🔒', 'auth': '🔐', 'login': '🗝️', 'password': '🔑',
      'cloud': '☁️', 'server': '🖥️', 'api': '🔌', 'database': '🗄️',
      'iot': '🌐', 'sensor': '📡', 'smart': '🏠', 'automation': '🤖',
      'ar': '🥽', 'vr': '🥽', 'reality': '🌍', '3d': '📐',
      'cms': '📝', 'blog': '📰', 'news': '📺', 'content': '📄',
      'crm': '👥', 'customer': '🤝', 'sales': '📈', 'lead': '🎯',
      'inventory': '📦', 'warehouse': '🏭', 'logistics': '🚛', 'supply': '📋',
      'portfolio': '💼', 'showcase': '🖼️', 'gallery': '🎨', 'creative': '✨'
    };

    // Check for keyword matches first
    let selectedEmoji: string = emojiPool[emojiIndex];
    
    // Priority: keyword-based mapping
    for (const [keyword, emoji] of Object.entries(keywordMappings)) {
      if (titleLower.includes(keyword)) {
        selectedEmoji = emoji;
        break;
      }
    }
    
    // Cache the result for consistency
    this.emojiCache.set(title, selectedEmoji);
    
    return selectedEmoji;
  }



  expandWithDetails(project: Project, event: Event): void {
    event.stopPropagation();
    
    if (project.isExpanded) {
      // If already expanded, collapse it
      project.isExpanded = false;
      this.startAutoCarousel();
    } else {
      // First, collapse all other cards
      this.projects.forEach(p => {
        if (p !== project) {
          p.isExpanded = false;
        }
      });
      
      // Then expand the clicked card
      project.isExpanded = true;
      
      // Pause carousel when expanding
      if (this.carouselInterval) {
        this.carouselInterval.unsubscribe();
      }
      if (this.categoryCarouselInterval) {
        this.categoryCarouselInterval.unsubscribe();
      }
    }
  }

  collapseProject(project: Project, event: Event): void {
    event.stopPropagation();
    
    // Only collapse if the project is currently expanded
    if (project.isExpanded) {
      project.isExpanded = false;
      this.startAutoCarousel();
    }
  }



  calculateCarouselDots() {
    const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
    this.carouselDots = Array(totalSlides).fill(0).map((x, i) => i);
  }

  calculateCategoryCarouselDots() {
    const totalSlides = Math.ceil(this.filteredProjects.length / this.visibleCards);
    this.categoryCarouselDots = Array(totalSlides).fill(0).map((x, i) => i);
  }

  startAutoCarousel() {
    // Only start if no project is expanded
    if (!this.projects.some(p => p.isExpanded)) {
      if (this.selectedCategory === 'All') {
        this.carouselInterval = interval(5000).subscribe(() => {
          if (!this.isScrolling) {
            this.nextSlide();
          }
        });
      } else {
        this.categoryCarouselInterval = interval(5000).subscribe(() => {
          if (!this.isCategoryScrolling) {
            this.nextCategorySlide();
          }
        });
      }
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

  nextCategorySlide() {
    this.categoryCurrentSlide = (this.categoryCurrentSlide + 1) % this.categoryCarouselDots.length;
    this.scrollToCategorySlide();
  }

  prevCategorySlide() {
    this.categoryCurrentSlide = (this.categoryCurrentSlide - 1 + this.categoryCarouselDots.length) % this.categoryCarouselDots.length;
    this.scrollToCategorySlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.scrollToSlide();
    this.resetAutoCarousel();
  }

  goToCategorySlide(index: number) {
    this.categoryCurrentSlide = index;
    this.scrollToCategorySlide();
    this.resetCategoryAutoCarousel();
  }

  scrollToSlide() {
    const scrollPosition = this.currentSlide * this.visibleCards * this.cardWidth;
    this.carousel.nativeElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  scrollToCategorySlide() {
    const scrollPosition = this.categoryCurrentSlide * this.visibleCards * this.cardWidth;
    if (this.categoryCarousel && this.categoryCarousel.nativeElement) {
      this.categoryCarousel.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
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

  handleCategoryScroll() {
    this.isCategoryScrolling = true;
    
    // Clear any existing timeout
    if (this.categoryScrollTimeout) {
      clearTimeout(this.categoryScrollTimeout);
    }
    
    // Set a new timeout
    this.categoryScrollTimeout = setTimeout(() => {
      this.isCategoryScrolling = false;
      this.updateCategoryCurrentSlide();
    }, 100);
  }

  updateCurrentSlide() {
    if (!this.carousel) return;
    
    const scrollPosition = this.carousel.nativeElement.scrollLeft;
    this.currentSlide = Math.round(scrollPosition / (this.visibleCards * this.cardWidth));
    
    // Ensure currentSlide stays within bounds
    this.currentSlide = Math.max(0, Math.min(this.currentSlide, this.carouselDots.length - 1));
  }

  updateCategoryCurrentSlide() {
    if (!this.categoryCarousel) return;
    
    const scrollPosition = this.categoryCarousel.nativeElement.scrollLeft;
    this.categoryCurrentSlide = Math.round(scrollPosition / (this.visibleCards * this.cardWidth));
    
    // Ensure categoryCurrentSlide stays within bounds
    this.categoryCurrentSlide = Math.max(0, Math.min(this.categoryCurrentSlide, this.categoryCarouselDots.length - 1));
  }

  resetAutoCarousel() {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
    if (this.categoryCarouselInterval) {
      this.categoryCarouselInterval.unsubscribe();
    }
    this.startAutoCarousel();
  }

  resetCategoryAutoCarousel() {
    if (this.categoryCarouselInterval) {
      this.categoryCarouselInterval.unsubscribe();
    }
    this.startAutoCarousel();
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
    
    // Stop all carousel intervals
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
    if (this.categoryCarouselInterval) {
      this.categoryCarouselInterval.unsubscribe();
    }
    
    if (category === 'All') {
      this.filteredProjects = this.projects;
      this.calculateCarouselDots();
      this.currentSlide = 0;
      if (this.carousel) {
        this.carousel.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
      }
    } else {
      this.filteredProjects = this.projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
      this.calculateCategoryCarouselDots();
      this.categoryCurrentSlide = 0;
      if (this.categoryCarousel) {
        this.categoryCarousel.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
    
    // Start appropriate carousel
    this.startAutoCarousel();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.calculateVisibleCards();
    this.calculateCarouselDots();
    this.calculateCategoryCarouselDots();
  }

  calculateVisibleCards() {
    if (window.innerWidth <= 567) {
      this.visibleCards = 1;
      if (window.innerWidth <= 359) {
        this.cardWidth = 241; // 240px width + 1px gap for Mobile S
      } else if (window.innerWidth <= 413) {
        this.cardWidth = 261; // 260px width + 1px gap for Small Mobile
      } else {
        this.cardWidth = 281; // 280px width + 1px gap for Mobile L
      }
    } else if (window.innerWidth < 769) {
      this.visibleCards = 1;
      this.cardWidth = 281; // 280px width + 1px gap
    } else if (window.innerWidth < 1025) {
      this.visibleCards = 2;
      this.cardWidth = 296; // Adjusted for tablet
    } else {
      this.visibleCards = 3;
      this.cardWidth = 316; // 300px width + 16px gap for desktop
    }
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
    if (this.categoryCarouselInterval) {
      this.categoryCarouselInterval.unsubscribe();
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.categoryScrollTimeout) {
      clearTimeout(this.categoryScrollTimeout);
    }
  }
}