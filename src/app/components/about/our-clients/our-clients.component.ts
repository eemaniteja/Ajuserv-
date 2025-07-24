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
      name: 'Tgsrtc',
      image: 'https://th-i.thgim.com/public/migration_catalog/article10538854.ece/alternates/FREE_1200/13hyskm06-TSRTChy14TSRTC-emblem.jp.jpg'
    }
  ];
}