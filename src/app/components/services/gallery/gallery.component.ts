import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit, OnDestroy {
  private carouselInterval: any;
  currentIndex = 0;
  private startX = 0;
  private isDragging = false;
  private track!: HTMLElement;
  private slides!: NodeListOf<HTMLElement>;
  private _currentTranslate = 0;
  private _prevTranslate = 0;

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
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    this.track.addEventListener('touchmove', this.drag.bind(this), { passive: false });
    this.track.addEventListener('touchend', this.endDrag.bind(this));
    this.track.addEventListener('mouseleave', this.endDrag.bind(this));

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
    this.startAutoSlide();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
    this.startAutoSlide();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
    this.startAutoSlide();
  }

  updateCarousel() {
    this._currentTranslate = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${this._currentTranslate}%)`;
  }

  startDrag(e: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    this.track.classList.add('grabbing');
    this._prevTranslate = this._currentTranslate;
    clearInterval(this.carouselInterval);
  }

  drag(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault();

    const currentX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const movedBy = currentX - this.startX;

    const slideWidth = this.slides[0].offsetWidth;
    if (slideWidth === 0) return;

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
    if (slideWidth === 0) {
      this.updateCarousel();
      this.startAutoSlide();
      return;
    }

    const draggedSlides = movedBy / slideWidth;
    const currentSlidePosition = -this._prevTranslate / 100;
    const targetIndex = Math.round(currentSlidePosition - draggedSlides);

    this.currentIndex = Math.max(0, Math.min(this.slides.length - 1, targetIndex));

    this.updateCarousel();
    this.startAutoSlide();
  }
}