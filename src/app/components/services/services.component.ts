
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  services: Service[] = [];
  selectedService: Service | null = null;
  loading = false;
  error: string | null = null;
  
  private carouselInterval: any;
  private currentIndex = 0;
  private startX = 0;
  private isDragging = false;
  private track!: HTMLElement;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadServices();
  }

  ngAfterViewInit() {
    this.initCarousel();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  initCarousel() {
    this.track = document.querySelector('.carousel-track') as HTMLElement;
    if (!this.track) return;

    // Auto-slide functionality
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);

    // Touch and mouse events
    this.track.addEventListener('mousedown', this.startDrag.bind(this));
    this.track.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
    this.track.addEventListener('mousemove', this.drag.bind(this));
    this.track.addEventListener('touchmove', this.drag.bind(this), { passive: false });
    this.track.addEventListener('mouseup', this.endDrag.bind(this));
    this.track.addEventListener('touchend', this.endDrag.bind(this));
    this.track.addEventListener('mouseleave', this.endDrag.bind(this));
  }

  nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    this.currentIndex = (this.currentIndex + 1) % slides.length;
    this.updateCarousel();
  }

  updateCarousel() {
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  startDrag(e: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    this.track.classList.add('grabbing');
    clearInterval(this.carouselInterval);
  }

  drag(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const walk = (x - this.startX) * 2;
    this.track.style.transform = `translateX(calc(-${this.currentIndex * 100}% + ${walk}px))`;
  }

  endDrag(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.classList.remove('grabbing');
    
    const x = e instanceof MouseEvent ? e.pageX : (e as TouchEvent).changedTouches[0].pageX;
    const walk = x - this.startX;
    
    if (walk < -50 && this.currentIndex < document.querySelectorAll('.carousel-slide').length - 1) {
      this.currentIndex++;
    } else if (walk > 50 && this.currentIndex > 0) {
      this.currentIndex--;
    }
    
    this.updateCarousel();
    this.carouselInterval = setInterval(() => this.nextSlide(), 5000);
  }

  loadServices() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.error = 'Failed to load services. Please try again later.';
        this.loading = false;
      }
    });
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id.toString();
  }

  selectService(service: Service): void {
    this.selectedService = this.selectedService?.id === service.id ? null : service;
  }
}