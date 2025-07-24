import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-clients.component.html',
  styleUrls: ['./our-clients.component.css']
})
export class OurClientsComponent {
  partners = [
    {
      name: 'Tesync',
      image: 'assets/client-logos/tesync.jpg'
    },
    {
      name: 'Robo soft',
      image: 'assets/client-logos/robosoft.jpg'
    },
    {
      name: 'ahana',
      image: 'assets/client-logos/ahana.jpg'
    },
    {
      name: 'Technogen',
      image: 'assets/client-logos/technogen.jpg'
    },
    {
      name: 'Multiverse Solutions',
      image: 'assets/client-logos/multiverse.jpg'
    },
    {
      name: 'SBIOA',
      image: 'assets/client-logos/sbi.jpg'
    },
    {
      name: 'Pi',
      image: 'assets/client-logos/pi.jpg'
    },
    {
      name: 'Tgsrtc',
      image: 'assets/client-logos/tgsrtc.jpg'
    }
  ];
}