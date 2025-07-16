import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  currentTheme: Theme = 'light';
  isPortfolioOpen = false;
  private scrollTimeout: any;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit() {
    this.updateActiveSection();
    
    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    
    // Debounce the active section update for better performance
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      this.updateActiveSection();
    }, 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Close mobile menu when resizing to larger screens
    if (window.innerWidth > 992 && this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Toggle body scroll when mobile menu is open
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  scrollToSection(sectionId: string) {
    // Close dropdowns and mobile menu first
    this.isPortfolioOpen = false;
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }

    // If not on home page, navigate to home first, then scroll
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          this.performScroll(sectionId);
        }, 100);
      });
    } else {
      // Already on home page, scroll directly
      this.performScroll(sectionId);
    }
  }

  onDropdownItemClick(sectionId: string) {
    // Handle dropdown item clicks for mobile
    this.scrollToSection(sectionId);
  }

  private performScroll(sectionId: string) {
    // Add transition effect before scrolling
    this.addSectionTransition();
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for fixed header
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      // Smooth scroll with custom implementation for better control
      this.smoothScrollTo(offsetPosition, 800);
      
      // Update active section immediately
      this.activeSection = sectionId;
    }
  }

  private smoothScrollTo(targetPosition: number, duration: number) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  private updateActiveSection() {
    const sections = ['home', 'services', 'solutions', 'about', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for header

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        this.activeSection = sections[i];
        break;
      }
    }
  }

  private addSectionTransition() {
    const body = document.body;
    body.classList.add('section-transitioning');
    setTimeout(() => {
      body.classList.remove('section-transitioning');
    }, 100);
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  togglePortfolio(): void {
    this.isPortfolioOpen = !this.isPortfolioOpen;
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
    this.isPortfolioOpen = false;
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  isPortfolioActive(): boolean {
    return this.activeSection === 'services' || this.activeSection === 'solutions' || this.router.url === '/products';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown');
    
    // Only close dropdown if clicking outside and not on mobile menu
    if (dropdown && !dropdown.contains(target) && !this.isMobileMenuOpen) {
      this.isPortfolioOpen = false;
    }
  }
}