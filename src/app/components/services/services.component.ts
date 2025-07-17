import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Service, ServiceBulletPoint } from '../../models/service.model';
import { GalleryComponent } from './gallery/gallery.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, GalleryComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  serviceRows: Service[][] = [];
  selectedService: Service | null = null;
  selectedRowIndex: number = -1;
  selectedCardIndex: number = -1;
  loading = false;
  error: string | null = null;
  isExpandedWithDetails = false;
  selectedBulletPoint: ServiceBulletPoint | null = null;

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
        this.createServiceRows();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.error = 'Failed to load services. Please try again later.';
        this.loading = false;
      }
    });
  }

  createServiceRows(): void {
    this.serviceRows = [];
    const cardsPerRow = 4;
    
    for (let i = 0; i < this.services.length; i += cardsPerRow) {
      this.serviceRows.push(this.services.slice(i, i + cardsPerRow));
    }
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id.toString();
  }

  selectService(service: Service, rowIndex: number, cardIndex: number, event?: Event): void {
    if (this.selectedService?.id === service.id) {
      this.selectedService = null;
      this.selectedRowIndex = -1;
      this.selectedCardIndex = -1;
      this.isExpandedWithDetails = false;
      this.selectedBulletPoint = null;
      return;
    }

    this.selectedService = service;
    this.selectedRowIndex = rowIndex;
    this.selectedCardIndex = cardIndex;
    this.isExpandedWithDetails = false;
    this.selectedBulletPoint = null;
  }

  expandWithDetails(service: Service, event: Event): void {
    event.stopPropagation();
    this.isExpandedWithDetails = true;
    this.selectedBulletPoint = null;
  }

  collapseDetails(event: Event): void {
    event.stopPropagation();
    this.isExpandedWithDetails = false;
    this.selectedBulletPoint = null;
  }

  selectBulletPoint(bulletPoint: ServiceBulletPoint, event: Event): void {
    event.stopPropagation();
    this.selectedBulletPoint = bulletPoint;
  }

  isCardCompressed(service: Service, rowIndex: number): boolean {
    // Only compress cards in the same row as the selected card
    return this.selectedService !== null && 
           this.selectedRowIndex === rowIndex && 
           this.selectedService.id !== service.id;
  }

}