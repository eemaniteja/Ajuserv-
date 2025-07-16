import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CounterItem {
  number: number;
  suffix: string;
  title: string;
  currentValue: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  stats = [
    { number: '25+', label: 'Projects Completed', icon: '🚀' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '15+', label: 'AI Models Deployed', icon: '🤖' },
    { number: '24/7', label: 'Support Available', icon: '💬' }
  ];

  partners = [
   {
   name: 'Tesync',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZD8pwPqGHSWVDxv-JqaFkXwc2nRjXTIRqwQ&s'
    },
    {
      name: 'Robo soft',
      image: 'https://www.topdevelopers.co/upload/20190211103124611698604.jpg'
    },
    {
      name: 'ahana',
      image: 'https://ahanait.com/wp-content/uploads/2024/02/New1-Ahana-2024-website-Logo-Medium.svg'
    },
    {
      name: 'Technogen',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRZ-4dmMX1cr55KMmnZ0HG_xo41Fe7_R7xrTUraV8lkDQRkEtgsir8f_L5Dr8wakBWA&usqp=CAU'
    },
    {
      name: 'Multiverse Solutions',
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQFLPPAY1STFuQ/company-logo_200_200/company-logo_200_200/0/1675362164060/multiversesolutions_logo?e=2147483647&v=beta&t=_vV2flTJ0niCyjoJju_5arQ2XBEjNE2gKGa1OffL5Q4'
    },
    {
      name: 'SBIOA',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJECm7dGZo91pIL9jDYWVLN7tRobdAzLloSxhaoL1HjW2Ch-oe06IPQS3138YGPGrP_pA&usqp=CAU'
    },
    {
      name: 'Pi',
      image: 'https://www.equitypandit.com/wp-content/uploads/2023/08/pi-industries-ltd-2.png'
    },
    {
      name:'Tgsrtc',
      image:'https://th-i.thgim.com/public/migration_catalog/article10538854.ece/alternates/FREE_1200/13hyskm06-TSRTChy14TSRTC-emblem.jp.jpg'
    },

    
  ];

  currentIndex = 0;
  visibleCards = 5;
  private intervalId: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateVisibleCards();
  }

  ngOnInit() {
    this.updateVisibleCards();
    this.startCarousel();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  updateVisibleCards() {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleCards = 1;
    } else if (width < 1024) {
      this.visibleCards = 3;
    } else {
      this.visibleCards = 5;
    }
    // Adjust currentIndex to prevent out-of-bounds
    this.currentIndex = Math.min(this.currentIndex, this.partners.length - this.visibleCards);
    if (this.currentIndex < 0) this.currentIndex = 0;
  }


  
  
  startCarousel() {
  let isForward = true; 
  
  this.intervalId = setInterval(() => {
    if (isForward) {
      this.currentIndex++;
      if (this.currentIndex >= this.partners.length - this.visibleCards+1) {
        isForward = false;
        this.currentIndex--; 
      }
    } else {
      this.currentIndex--;
      if (this.currentIndex+1 <= 0) {
        isForward = true;
        this.currentIndex++; 
      }
    }
  }, 2000); // 2-second interval
}

  getVisiblePartners() {
    const visible = [];
    for (let i = 0; i < this.visibleCards; i++) {
      const index = (this.currentIndex + i) % this.partners.length;
      visible.push(this.partners[index]);
    }
    return visible;
  }

   Math = Math;
  
  counterItems: CounterItem[] = [
    { number: 5, suffix: '+', title: 'Years in Business', currentValue: 0 },
    { number: 98, suffix: '%', title: 'Client Satisfaction', currentValue: 0 },
    { number: 20, suffix: '+', title: 'Projects Delivered', currentValue: 0 },
    { number: 10, suffix: '+', title: 'Global Clients', currentValue: 0 }
  ];

  private animationFrameId: number | null = null;
  private observer: IntersectionObserver | null = null;

  // ngOnInit() {
  //   this.setupIntersectionObserver();
  // }

  // ngOnDestroy() {
  //   if (this.animationFrameId) {
  //     cancelAnimationFrame(this.animationFrameId);
  //   }
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }

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

    // We'll observe the component after the view is ready
    setTimeout(() => {
      const section = document.querySelector('.counter-section');
      if (section && this.observer) {
        this.observer.observe(section);
      }
    }, 100);
  }

  private startCounterAnimation() {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
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