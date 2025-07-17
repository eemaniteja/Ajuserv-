import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import * as AOS from 'aos';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent],
  template: `
    <app-header></app-header>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    
    <app-footer *ngIf="shouldShowFooter"></app-footer>
    
    <!-- Chatbot Component -->
    <app-chatbot></app-chatbot>
    
    <!-- Welcome Bot Animation -->
    <div
      class="welcome-bot-container"
      [ngClass]="{
        'entering': botState === 'entering',
        'displaying': botState === 'displaying',
        'exiting': botState === 'exiting'
      }"
    >
      <div class="bot-figure">
        <img
          src="assets/Bot1.gif"
          alt="Welcome to Ajuserv!"
          class="bot-image"
        />
        <div class="bot-banner">Welcome to Ajuserv!</div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private loadingScreen: HTMLElement | null = null;
  private particles: any[] = [];
  private particleInterval: any;
  botState: 'hidden' | 'entering' | 'displaying' | 'exiting' = 'hidden';
  private botEnterTimeout: any;
  private botDisplayTimeout: any;
  private botExitTimeout: any;
  shouldShowFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeLoadingScreen();
    this.initializeAOS();
    this.setupRouterSubscription();
  }

  ngAfterViewInit(): void {
    this.hideLoadingScreen();
    this.initializeParticleSystem();
  }

  ngOnDestroy(): void {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    // Clear bot timeouts to prevent memory leaks
    clearTimeout(this.botEnterTimeout);
    clearTimeout(this.botDisplayTimeout);
    clearTimeout(this.botExitTimeout);
  }

  private initializeLoadingScreen(): void {
    this.loadingScreen = document.getElementById('loading-screen');
  }

  private initializeAOS(): void {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      easing: 'ease-in-out-cubic'
    });
  }

  private setupRouterSubscription(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.shouldShowFooter = event.url !== '/products';
    });
  }

  private hideLoadingScreen(): void {
    this.simulateLoadingProgress();
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          if (this.loadingScreen) {
            this.loadingScreen.remove();
          }
          // Start bot animation after loading screen is removed
          this.initiateBotAnimation();
        }, 800);
      }
    }, 2500);
  }

  private simulateLoadingProgress(): void {
    const percentageElement = document.querySelector('.loading-percentage');
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    if (!percentageElement || !progressBar) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 8; // Faster progress
      if (progress > 100) progress = 100;
      
      percentageElement.textContent = `${Math.floor(progress)}%`;
      progressBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 150); // Faster updates
  }

  private initializeParticleSystem(): void {
    // Reduce particle frequency for better performance
    this.createParticles();
    this.particleInterval = setInterval(() => {
      if (this.particles.length < 6) { // Limit total particles
        this.createParticle();
      }
    }, 2000); // Less frequent particles
  }

  private createParticles(): void {
    const container = document.querySelector('.main-content');
    if (!container) return;

    // Create fewer initial particles
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.createParticle(), i * 500);
    }
  }

  private createParticle(): void {
    const container = document.querySelector('.main-content');
    if (!container) return;

    const particle = document.createElement('div');
    particle.className = 'particle optimized-particle';
    
    // Create simpler particles for better performance
    const size = Math.random() * 6 + 8; // 8-14px
    const animationDuration = Math.random() * 2 + 5; // 5-7s
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = animationDuration + 's';
    particle.style.borderRadius = '50%';
    
    // Simplified colors - fewer options for better performance
    const colors = [
      'rgba(102, 126, 234, 0.7)',
      'rgba(118, 75, 162, 0.7)',
      'rgba(59, 130, 246, 0.7)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Simpler glow effect
    particle.style.boxShadow = `0 0 ${size}px rgba(102, 126, 234, 0.4)`;
    
    // Track particles for cleanup
    this.particles.push(particle);
    container.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        const index = this.particles.indexOf(particle);
        if (index > -1) {
          this.particles.splice(index, 1);
        }
      }
    }, animationDuration * 1000);
  }

  private initiateBotAnimation(): void {
    // Phase 1: Bot enters after loading screen with a delay
    this.botEnterTimeout = setTimeout(() => {
      this.botState = 'entering';

      // Phase 2: Bot displays for a duration (e.g., 4 seconds)
      this.botDisplayTimeout = setTimeout(() => {
        this.botState = 'exiting';

        // Phase 3: Bot disappears (animation duration in CSS)
        const exitAnimationDuration = 1000;
        this.botExitTimeout = setTimeout(() => {
          this.botState = 'hidden';
        }, exitAnimationDuration);

      }, 4000); // Bot stays for 4 seconds
    }, 500); // Initial delay after loading screen
  }
}