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
      image: 'assets/Our_Clients/tesync.jpg'
    },
    {
      name: 'Robo soft',
      image: 'assets/Our_Clients/robosoft.jpg'
    },
    {
      name: 'ahana',
      image: 'assets/Our_Clients/ahana.jpg'
    },
    {
      name: 'Technogen',
      image: 'assets/Our_Clients/technogen.jpg'
    },
    {
      name: 'Multiverse Solutions',
      image: 'assets/Our_Clients/multiverse.jpg'
    },
    {
      name: 'SBIOA',
      image: 'assets/Our_Clients/sbi.jpg'
    },
    {
      name: 'Pi',
      image: 'assets/Our_Clients/pi.jpg'
    },
    {
      name: 'Tgsrtc',
      image: 'assets/Our_Clients/tgsrtc.jpg'
    }
  ];
}