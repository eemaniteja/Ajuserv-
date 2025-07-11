import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  particles: any[] = [];
  showBackToTop = false;

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

  showCookieBanner = !sessionStorage.getItem('cookiesPreference');
  cookiesAccepted = false;

  acceptCookies() {
    this.cookiesAccepted = true;
    sessionStorage.setItem('cookiesPreference', 'accepted');
    this.showCookieBanner = false;
  }

  rejectCookies() {
    sessionStorage.setItem('cookiesPreference', 'rejected');
    this.showCookieBanner = false;
  }

  ngOnInit() {
    this.generateParticles();
  }

  ngOnDestroy() {
    // Component cleanup if needed
  }

  generateParticles() {
    // Reduce particles based on device performance
    const particleCount = this.getParticleCount();
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5
      });
    }
  }

  private getParticleCount(): number {
    const width = window.innerWidth;
    if (width < 768) return 15; // Mobile
    if (width < 1024) return 25; // Tablet
    return 35; // Desktop (reduced from 50)
  }

  scrollToProjects() {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}