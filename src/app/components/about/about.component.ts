import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { ContainerGridComponent } from './container-grid/container-grid.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, OurClientsComponent, ContainerGridComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  stats = [
    { number: '25+', label: 'Projects Completed', icon: '🚀' },
    { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '15+', label: 'AI Models Deployed', icon: '🤖' },
    { number: '24/7', label: 'Support Available', icon: '💬' }
  ];
}