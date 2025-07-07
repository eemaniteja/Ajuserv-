import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private performanceObserver: PerformanceObserver | null = null;

  constructor() {
    this.initPerformanceMonitoring();
  }

  // Preload critical resources
  preloadResource(href: string, as: string = 'fetch'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }

  // Lazy load non-critical CSS
  loadCSS(href: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  }

  // Check if user prefers reduced motion
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Get device performance level
  getDevicePerformanceLevel(): 'low' | 'medium' | 'high' {
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const deviceMemory = (navigator as any).deviceMemory || 4;
    
    if (hardwareConcurrency <= 2 || deviceMemory <= 2) {
      return 'low';
    } else if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
      return 'medium';
    }
    
    return 'high';
  }

  // Optimize images based on device capabilities
  getOptimalImageQuality(): number {
    const performanceLevel = this.getDevicePerformanceLevel();
    const connectionType = this.getConnectionType();
    
    if (performanceLevel === 'low' || connectionType === 'slow') {
      return 0.6; // 60% quality
    } else if (performanceLevel === 'medium' || connectionType === 'moderate') {
      return 0.8; // 80% quality
    }
    
    return 1.0; // 100% quality
  }

  // Get connection type
  private getConnectionType(): 'fast' | 'moderate' | 'slow' {
    const connection = (navigator as any).connection;
    if (!connection) return 'moderate';
    
    if (connection.effectiveType === '4g') return 'fast';
    if (connection.effectiveType === '3g') return 'moderate';
    return 'slow';
  }

  // Initialize performance monitoring
  private initPerformanceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        });
      });

      this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // Debounce utility
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Throttle utility
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Enable hardware acceleration for element
  enableHardwareAcceleration(element: HTMLElement): void {
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.willChange = 'transform';
  }

  // Disable hardware acceleration
  disableHardwareAcceleration(element: HTMLElement): void {
    element.style.transform = '';
    element.style.willChange = 'auto';
  }

  // Cleanup
  destroy(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}