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
export class HeroComponent implements OnInit, OnDestroy { // Implement OnDestroy
  particles: any[] = [];
  showBackToTop = false;
  botState: 'hidden' | 'entering' | 'displaying' | 'exiting' = 'hidden'; // More granular bot state

  private botEnterTimeout: any; // To clear timeout on component destruction
  private botDisplayTimeout: any;
  private botExitTimeout: any;

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
    this.initiateBotAnimation(); // Call the new method to manage bot animation
  }

  ngOnDestroy() {
    // Clear timeouts to prevent memory leaks if the component is destroyed
    clearTimeout(this.botEnterTimeout);
    clearTimeout(this.botDisplayTimeout);
    clearTimeout(this.botExitTimeout);
  }

  generateParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 1
      });
    }
  }

  scrollToProjects() {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  initiateBotAnimation() {
    // Phase 1: Bot enters after a delay (e.g., 0.5 seconds after page load)
    this.botEnterTimeout = setTimeout(() => {
      this.botState = 'entering';

      // Phase 2: Bot displays for a duration (e.g., 3 seconds)
      this.botDisplayTimeout = setTimeout(() => {
        this.botState = 'exiting';

        // Phase 3: Bot disappears (animation duration in CSS)
        // Then set to hidden completely after exit animation finishes
        const exitAnimationDuration = 1000; // Match .bot-figure.exiting transition duration in CSS
        this.botExitTimeout = setTimeout(() => {
          this.botState = 'hidden';
        }, exitAnimationDuration);

      }, 3000); // Bot stays in the middle for 3 seconds
    }, 500); // Initial delay before bot starts entering
  }
}