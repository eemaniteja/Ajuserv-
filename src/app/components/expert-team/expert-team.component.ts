import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

@Component({
  selector: 'app-expert-team',
  standalone: true,
  templateUrl: './expert-team.component.html',
  styleUrls: ['./expert-team.component.css'],
  imports: [CommonModule]
})
export class ExpertTeamComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dinesh Vitakula',
      position: 'Technical Consultant',
      image: 'assets/Expert_Team/Dinesh.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/dineshvitakula?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        email: 'Dinesh_Vitakula@ajuserv.com'
      }
    },
        {
      id: '2',
      name: 'Prajwal Sankar Kolakaluri',
      position: 'Sr .Software Engineer',
      image: 'assets/Expert_Team/Prajwal.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/prajwal-sankar-kolakaluri/',
        email: 'PrajwalSankar_Kolakaluri@ajuserv.com'
      }
    },
    {
      id: '3',
      name: 'Sai Achyuth Chittemsetty',
      position: 'Software Engineer',
      image: 'assets/Expert_Team/Achuth.jpeg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/sai-achyuth',
        email: 'SaiAchyuth_Chittemsetty@ajuserv.com'
      }
    },
    {
      id: '4',
      name: 'Ragini Daram',
      position: 'Software Engineer',
      image: 'assets/Expert_Team/Ragini.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ragini-d-502b70265',
        email: 'Ragini_Daram@ajuserv.com'
      }
    },
    {
      id: '5',
      name: 'Ravindra Reddy Varra',
      position: 'Software Engineer',
      image: 'assets/Expert_Team/Ravi.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ravindra-reddy-8a6ba92a3/',
        email: 'RavindraReddy_Varra@ajuserv.com'
      }
    },
    {
      id: '6',
      name: 'KumaraSwamy Pacharla',
      position: 'Software Engineer',
      image: 'assets/Expert_Team/Kumar.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/kumar-swamy-pacharla/',
        email: 'KumarSwamy_Pacharla@ajuserv.com'
      }
    },
    {
      id: '7',
      name: 'Sri Varshini Reddy Kaku',
      position: 'Associate Software Engineer',
      image: 'assets/Expert_Team/Varsha.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/sri-varshini-reddy-kaku-7872022a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        email: 'SriVarshiniReddy_Kaku@ajuserv.com'
      }
    },
    {
      id: '8',
      name: 'Vamsi Thallapelli',
      position: 'Associate Software Engineer',
      image: 'assets/Expert_Team/Vamsi.jpg',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/vamsi-thallapelli/',
        email: 'Vamsi_Thallapelli@ajuserv.com'
      }
    }
  ];

  currentSlide = 0;
  itemsPerSlide = 4;
  screenWidth = 0;

  ngOnInit() {
    this.updateItemsPerSlide();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemsPerSlide();
  }

  updateItemsPerSlide() {
    this.screenWidth = window.innerWidth;
    
    if (this.screenWidth >= 1200) {
      this.itemsPerSlide = 4;
    } else if (this.screenWidth >= 768) {
      this.itemsPerSlide = 3;
    } else if (this.screenWidth >= 480) {
      this.itemsPerSlide = 2;
    } else {
      this.itemsPerSlide = 1;
    }

    // Adjust current slide if necessary
    const maxSlide = Math.ceil(this.teamMembers.length / this.itemsPerSlide) - 1;
    if (this.currentSlide > maxSlide) {
      this.currentSlide = maxSlide;
    }
  }

  get totalSlides(): number {
    return Math.ceil(this.teamMembers.length / this.itemsPerSlide);
  }

  get visibleMembers(): TeamMember[] {
    const start = this.currentSlide * this.itemsPerSlide;
    const end = start + this.itemsPerSlide;
    return this.teamMembers.slice(start, end);
  }

  get canGoPrevious(): boolean {
    return this.currentSlide > 0;
  }

  get canGoNext(): boolean {
    return this.currentSlide < this.totalSlides - 1;
  }

  previousSlide(): void {
    if (this.canGoPrevious) {
      this.currentSlide--;
    }
  }

  nextSlide(): void {
    if (this.canGoNext) {
      this.currentSlide++;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlide = index;
    }
  }

  onSocialLinkClick(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  trackByMemberId(index: number, member: TeamMember): string {
    return member.id;
  }
}