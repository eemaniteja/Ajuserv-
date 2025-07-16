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
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}