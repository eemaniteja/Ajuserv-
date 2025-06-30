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
   name: 'Infosys',
      image: 'https://1000logos.net/wp-content/uploads/2020/08/Infosys-Logo.jpg'
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
      name: 'TCS',
      image: 'https://i.pinimg.com/736x/87/86/45/878645d72068089487aca9e4779a48f1.jpg'
    },
    {
      name: 'Cognizant',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/1280px-Cognizant_logo_2022.svg.png'
    },
    {
      name: 'Capgemini',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Capgemini_201x_logo.svg/2560px-Capgemini_201x_logo.svg.png'
    },
    {
      name: 'Accenture',
      image: 'https://www.clutch.com/wp-content/uploads/2018/04/Accenture-logo-no-background.png'
    },
    {
      name:'Deloitee',
      image:'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg'
    },
    {
      name:'Amazon',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png'
    },
    {
      name:'Oracle',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/1280px-Oracle_logo.svg.png'
    },
    {
      name:'Flipkart',
      image: 'https://brandlogos.net/wp-content/uploads/2020/11/Flipkart-logo-1.png'
    }
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
    { number: 18, suffix: '+', title: 'Years in Business', currentValue: 0 },
    { number: 98, suffix: '%', title: 'Client Satisfaction', currentValue: 0 },
    { number: 500, suffix: '+', title: 'Projects Delivered', currentValue: 0 },
    { number: 200, suffix: '+', title: 'Global Clients', currentValue: 0 }
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