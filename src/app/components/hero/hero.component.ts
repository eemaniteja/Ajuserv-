import { Component, OnInit ,HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  particles: any[] = [];
  showBackToTop = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }
 
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  showCookieBanner = !sessionStorage.getItem('cookiesPreference');
  cookiesAccepted = false;

  acceptCookies() {
    this.cookiesAccepted = true;
    sessionStorage.setItem('cookiesPreference', 'accepted');
    this.showCookieBanner = false;
  }

  rejectCookies() {
    sessionStorage.setItem('cookiesPreference', 'rejected');
    this.showCookieBanner = false;
  }




  ngOnInit() {
    this.generateParticles();
  }

  generateParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 1
      });
    }
  }

  scrollToProjects() {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}