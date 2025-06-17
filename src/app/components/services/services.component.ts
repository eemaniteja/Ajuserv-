// import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ApiService } from '../../services/api.service';
// import { Service } from '../../models/service.model';

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './services.component.html',
//   styleUrls: ['./services.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class ServicesComponent implements OnInit {
//   services: Service[] = [];
//   // selectedService: Service | null = null;

//   constructor(private apiService: ApiService) {}

//   ngOnInit() {
//     this.loadServices();
//   }

//   loadServices() {
//     this.apiService.getServices().subscribe({
//       next: (services) => {
//         this.services = services;
//       },
//       error: (error) => {
//         console.error('Error loading services:', error);
//       }
//     });
//   }

//  selectedService: any = null;

//   selectService(service: any): void {
//     // If already selected, collapse it
//     if (this.selectedService?.id === service.id) {
//       this.selectedService = null;
//     } else {
//       this.selectedService = service;
//     }
//   }
// }
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  selectedService: Service | null = null;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.error = 'Failed to load services. Please try again later.';
        this.loading = false;
      }
    });
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id.toString();
  }

  selectService(service: Service): void {
    this.selectedService = this.selectedService?.id === service.id ? null : service;
  }
}