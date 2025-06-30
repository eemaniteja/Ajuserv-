import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container" [class.open]="isOpen">
      <div class="chatbot-toggle" (click)="toggleChat()">
        <img src="assets/Bot.gif" alt="Chat" class="bot-icon">
        <span class="chat-text">Chat with us</span>
        <div class="notification-dot" *ngIf="hasNewMessage && !isOpen"></div>
      </div>
      
      <div class="chatbot-window" *ngIf="isOpen">
        <div class="chatbot-header">
          <div class="header-content">
            <img src="assets/Bot.gif" alt="Bot" class="header-bot-icon">
            <div class="header-text">
              <h3>Ajuserv Assistant</h3>
              <p>Ask me about our services!</p>
            </div>
          </div>
          <button class="close-btn" (click)="toggleChat()">×</button>
        </div>
        
        <div class="chatbot-messages" #messagesContainer>
          <div class="welcome-message" *ngIf="messages.length === 0">
            <p>Hello! I'm here to help you with information about Ajuserv. Feel free to ask me about:</p>
            <ul>
              <li>Our services and solutions</li>
              <li>Our expert team</li>
              <li>Project inquiries</li>
              <li>Contact information</li>
            </ul>
          </div>
          
          <div 
            *ngFor="let message of messages" 
            class="message"
            [class.user-message]="message.isUser"
            [class.bot-message]="!message.isUser"
          >
            <div class="message-content">
              <p>{{ message.text }}</p>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            </div>
          </div>
          
          <div class="typing-indicator" *ngIf="isTyping">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div class="chatbot-input">
          <div class="input-container">
            <input 
              type="text" 
              [(ngModel)]="userInput" 
              (keyup.enter)="sendMessage()"
              placeholder="Type your message..."
              class="message-input"
              [disabled]="isTyping"
              maxlength="500"
            >
            <button 
              (click)="sendMessage()" 
              class="send-btn"
              [disabled]="!userInput.trim() || isTyping"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  isOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  hasNewMessage = false;
  private shouldScrollToBottom = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.loadChatHistory();
  }

  ngOnDestroy(): void {
    this.saveChatHistory();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hasNewMessage = false;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage(): void {
    const trimmedInput = this.userInput.trim();
    
    if (!trimmedInput || this.isTyping) {
      return;
    }

    if (!this.isValidQuery(trimmedInput)) {
      this.showInvalidQueryMessage();
      this.userInput = '';
      return;
    }

    const userMessage: ChatMessage = {
      id: this.generateId(),
      text: trimmedInput,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.userInput = '';
    this.shouldScrollToBottom = true;
    this.isTyping = true;

    this.chatbotService.getResponse(trimmedInput).subscribe({
      next: (response) => {
        setTimeout(() => {
          const botMessage: ChatMessage = {
            id: this.generateId(),
            text: response,
            isUser: false,
            timestamp: new Date()
          };
          
          this.messages.push(botMessage);
          this.isTyping = false;
          this.shouldScrollToBottom = true;
          
          if (!this.isOpen) {
            this.hasNewMessage = true;
          }
        }, 1000);
      },
      error: (error) => {
        setTimeout(() => {
          const errorMessage: ChatMessage = {
            id: this.generateId(),
            text: 'Sorry, I encountered an error. Please try again later.',
            isUser: false,
            timestamp: new Date()
          };
          
          this.messages.push(errorMessage);
          this.isTyping = false;
          this.shouldScrollToBottom = true;
        }, 1000);
      }
    });
  }

  private isValidQuery(query: string): boolean {
    const minLength = 3;
    const maxLength = 500;
    
    if (query.length < minLength || query.length > maxLength) {
      return false;
    }

    const containsLetters = /[a-zA-Z]/.test(query);
    if (!containsLetters) {
      return false;
    }

    const spamPatterns = [
      /(.)\1{4,}/,
      /^[^a-zA-Z0-9\s]+$/,
      /^\s*[!@#$%^&*()]+\s*$/
    ];

    for (const pattern of spamPatterns) {
      if (pattern.test(query)) {
        return false;
      }
    }

    const inappropriateWords = [
      'spam', 'hack', 'virus', 'malware', 'phishing'
    ];

    const lowerQuery = query.toLowerCase();
    for (const word of inappropriateWords) {
      if (lowerQuery.includes(word)) {
        return false;
      }
    }

    return true;
  }

  private showInvalidQueryMessage(): void {
    const invalidMessage: ChatMessage = {
      id: this.generateId(),
      text: 'Please enter a valid question or message. Make sure it\'s between 3-500 characters and contains meaningful content.',
      isUser: false,
      timestamp: new Date()
    };
    
    this.messages.push(invalidMessage);
    this.shouldScrollToBottom = true;
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private loadChatHistory(): void {
    const savedMessages = localStorage.getItem('chatbot-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        this.messages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }

  private saveChatHistory(): void {
    try {
      localStorage.setItem('chatbot-messages', JSON.stringify(this.messages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }
}