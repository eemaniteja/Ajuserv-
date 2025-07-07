import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input() appLazyLoad: string = '';
  @Input() placeholder: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NzQ4YiIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';

  private observer: IntersectionObserver | null = null;

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    this.setPlaceholder();
    this.createObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setPlaceholder() {
    const img = this.elementRef.nativeElement;
    img.src = this.placeholder;
    img.loading = 'lazy';
  }

  private createObserver() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage();
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      this.observer.observe(this.elementRef.nativeElement);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadImage();
    }
  }

  private loadImage() {
    const img = this.elementRef.nativeElement;
    const imageToLoad = new Image();
    
    imageToLoad.onload = () => {
      img.src = this.appLazyLoad;
      img.classList.add('loaded');
    };
    
    imageToLoad.onerror = () => {
      img.classList.add('error');
    };
    
    imageToLoad.src = this.appLazyLoad;
  }
}