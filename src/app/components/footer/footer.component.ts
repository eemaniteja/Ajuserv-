import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showAllServices = false;

  links = {
    services: [
      { name: 'AI/Gen AI & Analytics', href: '#services' },
      { name: 'Microsoft Modern Work', href: '#services' },
      { name: 'LCNC-Power Platform/RPA', href: '#services' },
      { name: 'Azure Cloud and Data', href: '#services' },
      { name: 'Azure Infrastructure and Security', href: '#services' },
      { name: 'Digital Apps and App Modernization', href: '#services' },
      { name: 'Full Stack Development', href: '#services' },
      { name: 'Staffing Services', href: '#services' }
    ],
    company: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#expert-team' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' }
    ]
  };

  getDisplayedServices() {
    return this.showAllServices ? this.links.services : this.links.services.slice(0, 3);
  }

  toggleServicesView() {
    this.showAllServices = !this.showAllServices;
  }

  scrollToSection(sectionId: string) {
    if (sectionId.startsWith('#')) {
      const targetId = sectionId.substring(1);
      
      // Special handling for sections that might need top scroll
      if (targetId === 'home' || targetId === 'hero' || targetId === '') {
        // Scroll to very top for hero section
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Refresh AOS animations after scroll completes
        setTimeout(() => {
          if (typeof (window as any).AOS !== 'undefined') {
            (window as any).AOS.refresh();
          }
        }, 800);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          // Add offset for better visibility
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - 80; // Account for any fixed headers
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Refresh AOS animations after scroll completes
          setTimeout(() => {
            if (typeof (window as any).AOS !== 'undefined') {
              (window as any).AOS.refresh();
            }
          }, 800);
        }
      }
    }
  }
}