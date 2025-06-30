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
  currentIndex = 0;
  private startX = 0;
  private isDragging = false;
  private track!: HTMLElement;
  private slides!: NodeListOf<HTMLElement>;
  private _currentTranslate = 0; // New: stores the current translate position during drag
  private _prevTranslate = 0;   // New: stores the translate position before dragging

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
    if (this.track) {
      this.track.removeEventListener('mousedown', this.startDrag.bind(this));
      this.track.removeEventListener('touchstart', this.startDrag.bind(this));
      this.track.removeEventListener('mousemove', this.drag.bind(this));
      this.track.removeEventListener('touchmove', this.drag.bind(this));
      this.track.removeEventListener('mouseup', this.endDrag.bind(this));
      this.track.removeEventListener('touchend', this.endDrag.bind(this));
      this.track.removeEventListener('mouseleave', this.endDrag.bind(this));
    }
  }

  initCarousel() {
    this.track = document.querySelector('.carousel-track') as HTMLElement;
    this.slides = document.querySelectorAll('.carousel-slide');

    if (!this.track || this.slides.length === 0) return;

    this.startAutoSlide();

    this.track.addEventListener('mousedown', this.startDrag.bind(this));
    this.track.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
    // Using global document listeners for mousemove/mouseup to handle cases where drag goes off the track
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    this.track.addEventListener('touchmove', this.drag.bind(this), { passive: false });
    this.track.addEventListener('touchend', this.endDrag.bind(this));
    this.track.addEventListener('mouseleave', this.endDrag.bind(this)); // For desktop users

    this.updateCarousel();
  }

  startAutoSlide() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateCarousel();
    this.startAutoSlide(); // Restart timer
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
    this.startAutoSlide(); // Restart timer
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
    this.startAutoSlide(); // Reset auto-slide timer when manually navigating
  }

  updateCarousel() {
    this._currentTranslate = -this.currentIndex * 100; // Store percentage for accurate snap
    this.track.style.transform = `translateX(${this._currentTranslate}%)`;
  }

  startDrag(e: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    this.track.classList.add('grabbing');
    this._prevTranslate = this._currentTranslate; // Save current position before starting drag
    clearInterval(this.carouselInterval); // Stop auto-slide during drag
  }

  drag(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault(); // Prevent scrolling on mobile during drag

    const currentX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const movedBy = currentX - this.startX;

    // Calculate translation based on pixels, then convert to percentage
    // Get the actual width of one slide (e.g., the first one)
    const slideWidth = this.slides[0].offsetWidth;
    if (slideWidth === 0) return; // Avoid division by zero

    // Calculate the new translate in pixels, then convert back to percentage
    const newTranslatePx = (-this.currentIndex * slideWidth) + movedBy;
    this._currentTranslate = (newTranslatePx / slideWidth) * 100;

    this.track.style.transform = `translateX(${this._currentTranslate}%)`;
  }

  endDrag(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.classList.remove('grabbing');

    const endX = e instanceof MouseEvent ? e.pageX : (e as TouchEvent).changedTouches[0].pageX;
    const movedBy = endX - this.startX;

    const slideWidth = this.slides[0].offsetWidth;
    if (slideWidth === 0) { // Should not happen if carousel is visible
      this.updateCarousel();
      this.startAutoSlide();
      return;
    }

    // Determine how many slides were "dragged" based on pixel movement
    const draggedSlides = movedBy / slideWidth;

    // Calculate the target index by rounding the current visual position
    // _prevTranslate is in percentage, convert it to 'slide units' (e.g., -0, -1, -2 for current index)
    const currentSlidePosition = -this._prevTranslate / 100;
    const targetIndex = Math.round(currentSlidePosition - draggedSlides);

    // Ensure the target index is within bounds
    this.currentIndex = Math.max(0, Math.min(this.slides.length - 1, targetIndex));

    this.updateCarousel();
    this.startAutoSlide(); // Restart auto-slide after drag
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

  selectService(service: Service, event?: Event): void {
    // Add immediate visual feedback for better responsiveness
    if (event) {
      const cardElement = (event.target as HTMLElement).closest('.service-card') as HTMLElement;
      if (cardElement) {
        cardElement.style.transform = 'scale(0.98)';
        setTimeout(() => {
          cardElement.style.transform = '';
        }, 150);
      }
    }
    
    this.selectedService = this.selectedService?.id === service.id ? null : service;
  }
}