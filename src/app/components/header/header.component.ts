import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMobileMenuOpen = false;
    }
  }
}

// import { Component, OnInit, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   isScrolled = false;
//   isMobileMenuOpen = false;
//   logoLoaded = false;

//   ngOnInit() {
//     this.checkScroll();
//   }

//   onLogoLoad() {
//     this.logoLoaded = true;
//   }

//   @HostListener('window:scroll', [])
//   checkScroll() {
//     this.isScrolled = window.scrollY > 50;
//   }

//   toggleMobileMenu() {
//     this.isMobileMenuOpen = !this.isMobileMenuOpen;
//     // Toggle body scroll when mobile menu is open
//     document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
//   }

//   scrollToSection(sectionId: string) {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//       });
//       this.isMobileMenuOpen = false;
//       document.body.style.overflow = '';
//     }
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: Event) {
//     // Close mobile menu when resizing to larger screens
//     if (window.innerWidth > 992 && this.isMobileMenuOpen) {
//       this.isMobileMenuOpen = false;
//       document.body.style.overflow = '';
//     }
//   }
// }