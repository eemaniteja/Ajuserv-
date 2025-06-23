import { Component, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {
  @ViewChild('contactFormRef') contactFormRef!: NgForm;

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = false;
  submitMessage = '';
  showPopup = false;
  popupMessage = '';
  isSuccessPopup = false;

  private popupTimeout: any;

  // Validation states
  validationErrors: any = {};
  touched: any = {
    name: false,
    email: false,
    message: false
  };

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.clearPopupTimeout();
  }

  private clearPopupTimeout(): void {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = null;
    }
  }

  private showSuccessPopupWithPageReload(message: string): void {
    // Clear any existing timeout first
    this.clearPopupTimeout();
    
    // Set success popup state
    this.popupMessage = message;
    this.isSuccessPopup = true;
    this.showPopup = true;
    
    // Force change detection to ensure popup is shown
    this.cdr.detectChanges();
    
    console.log('Success popup shown. Page will reload in 2 seconds.');
    
    // Set timeout to reload page after 2 seconds
    this.popupTimeout = setTimeout(() => {
      console.log('2 seconds elapsed. Reloading page...');
      window.location.reload();
    }, 2000); // 2 seconds as requested
  }

  private showErrorPopupWithAutoHide(message: string): void {
    // Clear any existing timeout first
    this.clearPopupTimeout();
    
    // Set error popup state
    this.popupMessage = message;
    this.isSuccessPopup = false;
    this.showPopup = true;
    
    // Force change detection to ensure popup is shown
    this.cdr.detectChanges();
    
    console.log('Error popup shown. Will hide in 2 seconds.');
    
    // Set timeout to hide popup after 2 seconds
    this.popupTimeout = setTimeout(() => {
      console.log('Error popup timeout fired. Hiding popup.');
      this.hidePopup();
    }, 2000);
  }

  private hidePopup(): void {
    this.showPopup = false;
    this.popupMessage = '';
    this.cdr.detectChanges();
    this.clearPopupTimeout();
  }

  onSubmit() {
    // Clear any existing popup and timeout
    this.clearPopupTimeout();
    this.showPopup = false;
    this.popupMessage = '';
    this.isSuccessPopup = false;

    // Mark all fields as touched for validation display
    this.markAllFieldsTouched();

    if (this.isValidForm()) {
      this.isSubmitting = true;
      this.submitMessage = '';

      this.apiService.sendContactForm(this.contactForm).subscribe({
        next: (response) => {
          console.log('Backend response:', response);
          this.isSubmitting = false;
          
          // Show success popup and reload page after 2 seconds
          this.showSuccessPopupWithPageReload(
            'Your message has been sent successfully! We will get back to you soon.'
          );
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.isSubmitting = false;
          
          const errorMessage = error.error && error.error.message
            ? error.error.message
            : 'Something went wrong. Please try again later.';
          
          // Show error popup with auto-hide (no page reload for errors)
          this.showErrorPopupWithAutoHide(
            `Failed to send message: ${errorMessage}`
          );
        },
      });
    }
  }

  // Method to manually close the popup (if you want to add a close button)
  closePopup() {
    if (this.isSuccessPopup) {
      // If it's a success popup, reload the page immediately
      window.location.reload();
    } else {
      // If it's an error popup, just hide it
      this.hidePopup();
    }
  }

  // Validation methods remain the same
  validateName() {
    const name = this.contactForm.name.trim();
    if (!name) {
      this.validationErrors.name = 'Full name is required';
      return false;
    } else if (name.length < 2) {
      this.validationErrors.name = 'Name must be at least 2 characters';
      return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      this.validationErrors.name = 'Name can only contain letters and spaces';
      return false;
    }
    delete this.validationErrors.name;
    return true;
  }

  validateEmail() {
    const email = this.contactForm.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.validationErrors.email = 'Email address is required';
      return false;
    } else if (!emailRegex.test(email)) {
      this.validationErrors.email = 'Please enter a valid email address';
      return false;
    }
    delete this.validationErrors.email;
    return true;
  }

  validateMessage() {
    const message = this.contactForm.message.trim();
    if (!message) {
      this.validationErrors.message = 'Message is required';
      return false;
    } else if (message.length < 10) {
      this.validationErrors.message = 'Message must be at least 10 characters';
      return false;
    } else if (message.length > 1000) {
      this.validationErrors.message = 'Message must be less than 1000 characters';
      return false;
    }
    delete this.validationErrors.message;
    return true;
  }

  onNameChange() {
    if (this.touched.name) {
      this.validateName();
    }
  }

  onEmailChange() {
    if (this.touched.email) {
      this.validateEmail();
    }
  }

  onMessageChange() {
    if (this.touched.message) {
      this.validateMessage();
    }
  }

  onFieldBlur(fieldName: string) {
    this.touched[fieldName] = true;
    switch (fieldName) {
      case 'name':
        this.validateName();
        break;
      case 'email':
        this.validateEmail();
        break;
      case 'message':
        this.validateMessage();
        break;
    }
  }

  markAllFieldsTouched() {
    this.touched = {
      name: true,
      email: true,
      message: true
    };
    this.validateName();
    this.validateEmail();
    this.validateMessage();
  }

  isValidForm(): boolean {
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isMessageValid = this.validateMessage();
    
    return isNameValid && isEmailValid && isMessageValid;
  }

  hasError(fieldName: string): boolean {
    return this.touched[fieldName] && this.validationErrors[fieldName];
  }

  getError(fieldName: string): string {
    return this.validationErrors[fieldName] || '';
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
    this.validationErrors = {};
    this.touched = {
      name: false,
      email: false,
      message: false
    };
    
    setTimeout(() => {
      if (this.contactFormRef) {
        this.contactFormRef.resetForm();
      }
    }, 0);
    this.submitMessage = '';
  }
}