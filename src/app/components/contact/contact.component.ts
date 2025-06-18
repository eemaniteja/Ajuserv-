// src/app/contact/contact.component.ts
import { Component, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http'; // <--- IMPORT THIS

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule // <--- ADD HttpClientModule HERE for standalone component
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {
  @ViewChild('contactFormRef') contactFormRef!: NgForm;

  contactForm = {
    name: '',
    email: '',
    subject: '', // Keeping 'company' as per your HTML and using it for email subject
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

   // Inject ChangeDetectorRef
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  // Lifecycle hook to clear timeout when component is destroyed
  ngOnDestroy(): void {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = null;
    }
  }


  onSubmit() {
    // Clear any existing popup timeout to prevent conflicts if a new submission happens quickly
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = null; // Important to reset
    }
    // Clear any previous popup state at the start of submission attempt
    this.showPopup = false;
    this.popupMessage = '';
    this.isSuccessPopup = false;

    // Mark all fields as touched for validation display
    this.markAllFieldsTouched();

    if (this.isValidForm()) {
      this.isSubmitting = true;
      this.submitMessage = ''; // Clear previous regular message

      this.apiService.sendContactForm(this.contactForm).subscribe({
        next: (response) => {
          this.popupMessage =
            'Your message has been sent successfully! We will get back to you soon.';
          this.isSuccessPopup = true;
          this.showPopup = true; // Show popup on success
          this.isSubmitting = false;
          this.resetForm();
          console.log('Backend response:', response);

          // Automatically hide popup after 4 seconds (3000 milliseconds)
           this.popupTimeout = setTimeout(() => {
            console.log('Success popup timeout fired. Hiding popup.');
            this.showPopup = false; // Directly set to false
            this.cdr.detectChanges(); // Manually trigger change detection
            this.popupMessage = ''; // Clear message after hiding
          }, 2000); // Changed to 2 seconds
        },
        error: (error) => {
          console.error('Error sending message:', error);
          const errorMessage =
            error.error && error.error.message
              ? error.error.message
              : 'Something went wrong. Please try again later.';
          this.popupMessage = `Failed to send message: ${errorMessage}`;
          this.isSuccessPopup = false;
          this.showPopup = true; // Show popup on error
          this.isSubmitting = false;

          // Automatically hide popup after 4 seconds for error too
          this.popupTimeout = setTimeout(() => {
            console.log('Error popup timeout fired. Hiding popup.');
            this.showPopup = false; // Directly set to false
            this.cdr.detectChanges(); // Manually trigger change detection
            this.popupMessage = ''; // Clear message after hiding
          }, 2000); // Changed to 2 seconds
        },
      });
    } else {
      // If form is not valid, the user can see inline validation messages.
      // We don't need to pop up a generic "form invalid" message every time
      // they click submit when there are already inline errors.
    }
  }

  // New method to close the popup
  closePopup() {
  
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = null; // Reset the timeout ID
    }
  }

  // --- Your existing validation and helper methods (no changes needed here) ---
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
    // Re-run all validations to ensure accuracy before final check
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
    // Use setTimeout to ensure Angular has a chance to update the DOM
    // before attempting to reset the native form element.
    // This is often needed with NgForm.
    setTimeout(() => {
      this.contactFormRef.resetForm();
    }, 0);
    this.submitMessage = '';
  }
}