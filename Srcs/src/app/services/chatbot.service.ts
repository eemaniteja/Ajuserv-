import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

interface ChatResponse {
  response: string;
  confidence: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private responses: { [key: string]: string[] } = {
    greeting: [
      "Hello! Welcome to Ajuserv IT Solutions. I'm here to help you with information about our company and services. How can I assist you today?",
      "Hi there! I'm the Ajuserv assistant. Feel free to ask me about our AI solutions, web development, cloud services, or anything else about our company.",
      "Welcome to Ajuserv! We're a technology company specializing in AI, ML, and digital solutions. What would you like to know about us?"
    ],
    services: [
      "Ajuserv specializes in several key areas: 🔹 AI Strategy & Consulting 🔹 AI and ML Services 🔹 Generative AI Solutions 🔹 Web Development 🔹 Power Platform Development 🔹 Azure Cloud Services 🔹 Chatbot & Conversational AI. Which service interests you most?",
      "Our main services include AI/ML solutions, web development, cloud services (Azure), Power Platform integration, and chatbot development. We also provide AI strategy consulting to help businesses implement AI effectively.",
      "We offer comprehensive digital solutions: custom software development, artificial intelligence implementation, machine learning models, cloud migration, and conversational AI. What type of solution are you looking for?"
    ],
    team: [
      "Our expert team includes skilled professionals: Achuth, Dinesh, Kumar, Prajwal, Ragini, Ravi, Vamsi, and Varsha. Each brings specialized expertise in AI, software development, and digital transformation to deliver exceptional results.",
      "We have a diverse team of AI specialists, software engineers, cloud architects, and digital consultants who are passionate about creating innovative solutions for our clients.",
      "Our team combines deep technical knowledge with industry experience to tackle complex challenges in AI, web development, and cloud technologies."
    ],
    projects: [
      "We work on diverse projects including AI-powered web applications, machine learning models, cloud-based solutions, chatbots, speech recognition systems, and enterprise digital transformation initiatives.",
      "Our project portfolio spans from simple websites to complex AI systems, including generative AI applications, conversational AI platforms, and cloud-native solutions on Azure.",
      "We've delivered projects in areas like AI integration, custom software development, Power Platform solutions, and cloud migrations. What kind of project do you have in mind?"
    ],
    contact: [
      "You can reach us at ajuservitsolutions@gmail.com or call +91 758541236. We're located in Jubilee Hills, Hyderabad. We offer free consultations with a 24-hour response time guarantee!",
      "For detailed inquiries, email us at ajuservitsolutions@gmail.com or visit our office at Plot No 39, Durga Bhavani Nagar, Jubilee Hills, Hyderabad. We provide free consultations!",
      "Contact Ajuserv: 📧 ajuservitsolutions@gmail.com 📞 +91 758541236. We're in Hyderabad and offer free consultations with quick 24-hour response times."
    ],
    location: [
      "Ajuserv is located in Hyderabad, Telangana. Our office address is: Plot No 39, Road Number 5, Durga Bhavani Nagar, Women's Welfare Housing Society, Jubilee Hills, Hyderabad, Telangana 500033.",
      "We're based in Jubilee Hills, Hyderabad - one of the major IT hubs in India. This location helps us stay connected with the latest technology trends and talent.",
      "Our Hyderabad office is strategically located in Jubilee Hills, providing easy access for clients across the city and region."
    ],
    technology: [
      "We work with cutting-edge technologies including Angular, React, Node.js, Python, TensorFlow, Azure Cloud Platform, Power Platform, and various AI/ML frameworks. Our tech stack is carefully chosen based on project requirements.",
      "Our technology expertise includes frontend frameworks (Angular, React), backend development (Node.js, Python), cloud platforms (Azure), AI/ML libraries (TensorFlow, PyTorch), and Microsoft Power Platform.",
      "We stay updated with the latest technologies in AI, web development, and cloud computing to ensure our clients get modern, scalable, and efficient solutions."
    ],
    pricing: [
      "Our pricing is customized based on project scope and requirements. We offer competitive rates and flexible payment options. For a detailed quote, please contact us at ajuservitsolutions@gmail.com - we provide free consultations!",
      "We provide transparent, project-based pricing with no hidden costs. Contact us at ajuservitsolutions@gmail.com for a personalized quote. We guarantee a response within 24 hours!",
      "Pricing varies based on project complexity and timeline. We offer free consultations to understand your needs and provide accurate estimates. Email us at ajuservitsolutions@gmail.com to get started."
    ],
    ai: [
      "Ajuserv specializes in comprehensive AI solutions: AI Strategy & Consulting, Machine Learning implementation, Generative AI applications, Natural Language Processing, Computer Vision, and Conversational AI (like chatbots). We help businesses leverage AI for competitive advantage.",
      "Our AI services include custom ML model development, AI integration into existing systems, generative AI solutions, chatbot development, and AI strategy consulting. We make AI accessible and practical for businesses of all sizes.",
      "We offer end-to-end AI solutions from strategy to implementation: predictive analytics, automation, intelligent chatbots, recommendation systems, and custom AI applications tailored to your business needs."
    ],
    cloud: [
      "We're Azure cloud specialists offering cloud migration, architecture design, deployment, and ongoing management. Our cloud services help businesses scale efficiently while reducing infrastructure costs.",
      "Our Azure Cloud Services include cloud strategy, migration planning, infrastructure setup, security implementation, and optimization. We help businesses modernize their IT infrastructure.",
      "We provide comprehensive cloud solutions on Microsoft Azure: from initial assessment and migration to ongoing support and optimization. Let us help you leverage the power of cloud computing."
    ],
    consultation: [
      "Yes! We offer FREE consultations to understand your needs and provide expert guidance. Contact us at ajuservitsolutions@gmail.com or call +91 758541236. We guarantee a response within 24 hours!",
      "Absolutely! Our free consultation includes project assessment, technology recommendations, and solution design. Email ajuservitsolutions@gmail.com to schedule your complimentary consultation.",
      "We provide free consultations to discuss your project requirements, challenges, and goals. This helps us create tailored solutions that fit your needs and budget. Reach out to ajuservitsolutions@gmail.com!"
    ],
    hours: [
      "We maintain flexible working hours to accommodate our clients' needs. For specific availability and urgent matters, please contact us at ajuservitsolutions@gmail.com or +91 758541236. We guarantee a response within 24 hours.",
      "Our team is available during standard business hours and can accommodate different time zones for international clients. Contact us at ajuservitsolutions@gmail.com for scheduling.",
      "We work flexible hours to serve our clients effectively. For immediate needs or to schedule consultations, reach out via ajuservitsolutions@gmail.com or call +91 758541236."
    ],
    outOfScope: [
      "I specialize in providing information about Ajuserv's services, team, and capabilities. For detailed discussions about your specific requirements, technical implementations, or topics outside our company scope, please contact our team directly at ajuservitsolutions@gmail.com or call +91 758541236. We offer free consultations with 24-hour response time!",
      "While I can help with general information about Ajuserv, for complex technical queries, specific project requirements, or topics beyond our company information, I'd recommend reaching out to our experts directly. Email ajuservitsolutions@gmail.com for personalized assistance - we guarantee a response within 24 hours!",
      "For detailed technical discussions, custom project planning, or queries outside Ajuserv's company information, our specialists can provide better assistance. Please contact ajuservitsolutions@gmail.com or call +91 758541236. We offer free consultations and respond within 24 hours!"
    ],
    default: [
      "I'm here to help with information about Ajuserv's services, team, and capabilities. If your question is outside our company scope or requires detailed technical discussion, please contact our team at ajuservitsolutions@gmail.com or call +91 758541236. We offer free consultations with 24-hour response guarantee!",
      "That's an interesting question! While I focus on Ajuserv company information, our expert team can help with broader topics. For detailed assistance, please email ajuservitsolutions@gmail.com - we provide free consultations and respond within 24 hours.",
      "I can help with questions about Ajuserv's services, team, and company information. For specialized queries or detailed project discussions, our experts at ajuservitsolutions@gmail.com would be better positioned to assist you. We guarantee 24-hour response time!"
    ]
  };

  private keywords: { [key: string]: string[] } = {
    greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'start', 'begin'],
    services: ['service', 'services', 'what do you do', 'solutions', 'offerings', 'products', 'development', 'web development', 'power platform', 'generative ai'],
    team: ['team', 'staff', 'employees', 'who are you', 'developers', 'experts', 'people', 'achuth', 'dinesh', 'kumar', 'prajwal', 'ragini', 'ravi', 'vamsi', 'varsha'],
    projects: ['project', 'projects', 'work', 'portfolio', 'examples', 'case studies', 'what have you built', 'previous work'],
    contact: ['contact', 'reach', 'phone', 'email', 'address', 'call', 'get in touch', 'ajuservitsolutions', 'contact information'],
    location: ['location', 'address', 'where are you', 'office', 'hyderabad', 'jubilee hills', 'where located', 'based'],
    technology: ['technology', 'tech', 'stack', 'tools', 'framework', 'programming', 'languages', 'angular', 'react', 'nodejs', 'python', 'tensorflow'],
    pricing: ['price', 'pricing', 'cost', 'budget', 'quote', 'estimate', 'fee', 'how much', 'rates', 'charges'],
    ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'automation', 'nlp', 'generative ai', 'conversational ai', 'computer vision'],
    cloud: ['cloud', 'azure', 'cloud services', 'cloud migration', 'infrastructure', 'cloud computing', 'microsoft azure'],
    consultation: ['consultation', 'free consultation', 'consult', 'advice', 'guidance', 'discuss', 'talk', 'meeting'],
    hours: ['hours', 'time', 'availability', 'when open', 'working hours', 'schedule', 'timing'],
    outOfScope: ['weather', 'news', 'politics', 'sports', 'entertainment', 'personal', 'unrelated', 'joke', 'game']
  };

  constructor() {}

  getResponse(userMessage: string): Observable<string> {
    const category = this.categorizeMessage(userMessage.toLowerCase());
    const responses = this.responses[category];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return of(randomResponse).pipe(delay(500 + Math.random() * 1000));
  }

  private categorizeMessage(message: string): string {
    let bestMatch = 'default';
    let maxScore = 0;

    // First check for out-of-scope queries
    const outOfScopeScore = this.calculateScore(message, this.keywords['outOfScope']);
    if (outOfScopeScore > 0) {
      return 'outOfScope';
    }

    // Check for company-related queries
    for (const [category, keywords] of Object.entries(this.keywords)) {
      if (category === 'outOfScope') continue;
      
      const score = this.calculateScore(message, keywords);
      if (score > maxScore) {
        maxScore = score;
        bestMatch = category;
      }
    }

    // If no good match found and message seems unrelated to business, use outOfScope
    if (maxScore === 0 && this.isLikelyOutOfScope(message)) {
      return 'outOfScope';
    }

    return bestMatch;
  }

  private isLikelyOutOfScope(message: string): boolean {
    const businessKeywords = [
      'ajuserv', 'company', 'business', 'service', 'solution', 'team', 'project', 
      'technology', 'ai', 'development', 'cloud', 'azure', 'contact', 'price', 
      'cost', 'help', 'information', 'about'
    ];
    
    const messageWords = message.toLowerCase().split(/\s+/);
    const hasBusinessKeyword = messageWords.some(word => 
      businessKeywords.some(keyword => 
        word.includes(keyword) || keyword.includes(word)
      )
    );
    
    // If no business keywords and message is not a question, likely out of scope
    return !hasBusinessKeyword && !message.includes('?') && message.length > 10;
  }

  private calculateScore(message: string, keywords: string[]): number {
    let score = 0;
    const messageWords = message.split(/\s+/);
    
    for (const keyword of keywords) {
      const keywordWords = keyword.split(/\s+/);
      
      if (keywordWords.length === 1) {
        if (messageWords.some(word => word.includes(keyword) || keyword.includes(word))) {
          score += 1;
        }
      } else {
        if (message.includes(keyword)) {
          score += keywordWords.length;
        }
      }
    }
    
    return score;
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}