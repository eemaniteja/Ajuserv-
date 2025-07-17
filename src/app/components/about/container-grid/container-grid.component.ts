import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CounterItem {
  number: number;
  suffix: string;
  title: string;
  currentValue: number;
}

@Component({
  selector: 'app-container-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container-grid.component.html',
  styleUrls: ['./container-grid.component.css']
})
export class ContainerGridComponent implements OnInit, OnDestroy {
  Math = Math;
  
  counterItems: CounterItem[] = [
    { number: 5, suffix: '+', title: 'Years in Business', currentValue: 0 },
    { number: 98, suffix: '%', title: 'Client Satisfaction', currentValue: 0 },
    { number: 20, suffix: '+', title: 'Projects Delivered', currentValue: 0 },
    { number: 10, suffix: '+', title: 'Global Clients', currentValue: 0 }
  ];

  private animationFrameId: number | null = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startCounterAnimation();
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    setTimeout(() => {
      const section = document.querySelector('.counter-section');
      if (section && this.observer) {
        this.observer.observe(section);
      }
    }, 100);
  }

  private startCounterAnimation() {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      this.counterItems.forEach((item) => {
        item.currentValue = item.number * easeOutCubic;
      });

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}