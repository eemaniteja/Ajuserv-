import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
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
}