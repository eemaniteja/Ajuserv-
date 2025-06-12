import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'AI Development'
  };

  isSubmitting = false;
  submitMessage = '';

  services = [
    'AI Development',
    'Full-Stack Development', 
    'Data Analytics',
    'Technical Consulting',
    'Other'
  ];

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      this.apiService.submitContact(this.contactForm).subscribe({
        next: (response) => {
          this.submitMessage = 'Thank you! Your message has been sent successfully.';
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitMessage = 'Sorry, there was an error sending your message. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  isValidForm(): boolean {
    return !!(this.contactForm.name && 
              this.contactForm.email && 
              this.contactForm.message);
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      company: '',
      message: '',
      service: 'AI Development'
    };
  }
}