import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // For demo purposes, returning mock data. Replace with actual HTTP calls
  getProjects(): Observable<Project[]> {
    const mockProjects: Project[] = [
      {
        id: 1,
        title: 'Speech Translation using Azure Cognitive Services',
        description: 'Experience seamless language translation with our Speech Translation solution powered by Azure Cognitive Services. Using a robust tech stack including Python and Visual Studio Code, we have automated the translation process, allowing real-time transcription and translation of spoken language. By integrating Azure Speech-to-Text and Text Translation APIs, we ensure accurate and timely translations, breaking down language barriers and enabling effective communication. Our solution offers scalability, efficiency, and continuous improvement, guaranteeing reliable translation services tailored to your needs.',
        image: 'https://images.pexels.com/photos/6797307/pexels-photo-6797307.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['TensorFlow', 'Python', 'React', 'PostgreSQL'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#',
        showFullDescription: false 
      },
      {
        id: 2,
        title: 'Text to speech And Speech to Text',
        description: 'Our solution leverages cutting-edge technology to automate text-to-speech and speech-to-text conversions, addressing the challenges of manual conversion, accessibility, workflow inefficiencies, and scalability limitations. By integrating Azure Cognitive Services APIs, specifically Text-to-Speech and Speech-to-Text, with custom Python scripts developed in Visual Studio Code, we enable seamless and efficient conversion workflows. Our approach prioritizes real-time capabilities, allowing instant communication through accurate and reliable conversion services. Error handling mechanisms are embedded within the scripts to ensure robustness and reliability, while continuous improvement efforts drive enhancements in accuracy, efficiency, and user experience based on feedback and performance metrics. With our solution, we empower businesses to streamline communication processes and provide inclusive access to information for individuals with visual or hearing impairments.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['PyTorch', 'Redis', 'FastAPI', 'MongoDB'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 3,
        title: 'Confidential Document Reading Chatbot',
        description: 'Our solution addresses the critical need for efficient and secure access to information contained within confidential documents for organizations. By leveraging cutting-edge technologies such as natural language processing (NLP) and machine learning, our chatbot acts as a virtual assistant, adeptly navigating through documents to extract relevant insights. The integration of the OpenAI API enhances the chatbots understanding of user queries, while advanced techniques like sentence embeddings and similarity search algorithms ensure pinpoint accuracy in retrieving pertinent passages from the documents. Built using Streamlit, our web-based interface provides a seamless user experience, allowing effortless interaction with the chatbot. Crucially, our solution prioritizes data privacy and security by processing documents locally, safeguarding sensitive information from unauthorized access. With our innovative approach, organizations can streamline workflows, enhance decision-making, and uphold the utmost confidentiality and security standards.',
        image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Angular', 'Node.js', 'Docker', 'Kubernetes'],
        category: 'AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: 'Streamlit Pro',
        description: 'Streamlit Pro offers an unparalleled solution for showcasing data-driven insights through dynamic and interactive web applications. Utilizing Python for powerful data processing and Streamlit as the premier framework for creating elegant web apps, Streamlit Pro enables seamless public deployment on professional-grade hosting platforms. This ensures reliability, scalability, and security, allowing users to explore, analyze, and interact with visualizations and analyses in real-time. By transforming Python scripts into engaging web apps, Streamlit Pro overcomes the limitations of static reports and complex deployment processes, providing a user-friendly and efficient way to share data insights with a global audience.',
        image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['OpenCV', 'YOLO', 'C++', 'CUDA'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 5,
        title: 'StoryForge' ,
        description: 'StoryForge is an innovative platform that revolutionizes storytelling by leveraging cutting-edge AI technologies. Built on a robust tech stack including Python, the Transformers library, Streamlit, Hugging Face Hub, and OpenAI API, StoryForge seamlessly transforms images into captivating narratives and converts text into immersive audio experiences. Users can effortlessly upload images to generate descriptive texts, which are then expanded into engaging stories using advanced language models. These stories can be experienced through audio narration, enhancing accessibility and engagement. StoryForge addresses the inefficiencies of traditional storytelling by automating the conversion process and providing a user-friendly interface for creating and sharing dynamic tales. Whether for personal anecdotes, fictional stories, or educational content, StoryForge empowers users to craft and enjoy rich, interactive storytelling experiences.',
        image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['OpenCV', 'YOLO', 'C++', 'CUDA'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 6,
        title: 'Mortgage Master',
        description: 'Empowering Financial Decision-Making with Streamlit and Azure Integration" revolutionizes mortgage management by seamlessly integrating Streamlits interactive interface and Azures scalability. Utilizing Python and Pandas for data processing and Matplotlib for visualizations, the application simplifies complex mortgage calculations and presents repayment schedules in a user-friendly format. Traditional manual methods are replaced, ensuring accuracy and efficiency while empowering users to make informed decisions about their housing investments. By automating calculations and offering intuitive visualizations, Mortgage Master eliminates errors and provides users with a clear understanding of their financial obligations, ultimately enhancing their ability to plan and manage their finances effectively.',
        image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Flutter', 'Firebase', 'Dart'],
        category: 'AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },

       {
        id: 7,
        title: 'HugChat',
        description: 'HugChat presents a streamlined solution to the limitations of traditional chat applications, harnessing the prowess of Hugging Faces chatbot API within a user-friendly interface developed on Streamlit. Users engage with the virtual assistant effortlessly, receiving intelligent and contextually relevant responses to their queries. By abstracting complexities in setting up and integrating chatbot services, HugChat simplifies the process, making it accessible for various applications and workflows. This dynamic platform enhances communication efficiency, offering personalized assistance and information retrieval, ultimately addressing the frustrations associated with conventional chat interfaces.',
        image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Flutter', 'Firebase', 'Dart'],
        category: 'AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
       {
        id: 7,
        title: 'Mirror Chatbot',
        description: 'MirrorChatbot revolutionizes the landscape of conversational tools with its innovative approach, offering users an immersive experience where their input is mirrored back to them in real-time. Powered by Streamlit, its intuitive interface ensures seamless engagement, inviting users into dynamic conversations rich with spontaneity and creativity. Unlike traditional chatbots constrained by scripted responses, MirrorChat fosters interactive storytelling, self-reflection, and exploration of conversational dynamics. With Python at its core and a suite of NLP libraries, MirrorChat simplifies chatbot development, democratizing access to this technology across diverse skill levels. Say goodbye to the complexities of setup and deployment; MirrorChat streamlines the process, empowering users to dive into engaging conversations effortlessly.',
        image: 'https://images.pexels.com/photos/8386423/pexels-photo-8386423.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Flutter', 'Firebase', 'Dart'],
        category: 'AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 8,
        title: 'Invoice Processing ',
        description: 'Revolutionize your document processing with our comprehensive solution leveraging Microsoft Power Automate and AI Builder. Say goodbye to manual data entry woes as our automated workflows seamlessly extract structured data from diverse document types including forms, invoices, and receipts, drastically reducing errors and accelerating processing times. Integrating effortlessly with your existing data systems, our solution ensures smooth data transfer for further analysis and processing. Designed for scalability and flexibility, our custom workflows adapt to varying document formats and structures, catering to your evolving needs as document volumes grow. Experience enhanced efficiency and accuracy with continuous improvement cycles, refining workflows based on feedback and performance metrics. Streamline your operations and unlock new levels of productivity with our innovative document processing solution.',
        image: 'https://images.pexels.com/photos/8386424/pexels-photo-8386424.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 9,
        title: 'Document Processing for Structured data',
        description: 'Our document processing solution leverages Microsoft Power Automate and Azure Document Intelligence, specifically Azure Form Recognizer, to automate the extraction of structured data from unstructured documents like contracts, resumes, and emails. By integrating these technologies seamlessly, we eliminate the need for manual data extraction, reducing errors and accelerating data processing tasks. With Azure Document Intelligence continuously trained on diverse sample documents, our solution ensures high accuracy and adaptability to various document formats, enhancing efficiency and scalability. Through iterative refinement and integration with Power Automate workflows, we deliver a robust solution that optimizes accuracy, minimizes manual effort, and accommodates the growing volume of unstructured documents with ease.',
        image: 'https://images.pexels.com/photos/8386425/pexels-photo-8386425.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Arduino', 'MQTT', 'React Native'],
        category: 'Power Platform',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 10,
        title: 'Document Processing for Unstructured data',
        description: 'Our solution addresses the challenges of manual invoice processing by leveraging Microsoft Power Automate and AI Builder to automate data extraction from invoices with both standardized and non-standardized templates. With custom workflows, we efficiently extract relevant information from invoices, whether they follow consistent layouts or vary in structure. By incorporating error handling mechanisms and validation checks, we ensure the accuracy and reliability of extracted data, minimizing errors and streamlining the entire process. Through continuous refinement and adaptation, our solution optimizes efficiency, scalability, and accuracy, offering a robust framework for invoice processing that significantly reduces manual effort and accelerates data extraction tasks.',
        image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['D3.js', 'Python', 'Flask'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 11,
        title: 'Image to Text Conversion',
        description: 'The Image-to-Text Conversion Workflow with Email Notification presents a robust solution to the challenges posed by manual text extraction from images. By harnessing the power of Power Automate, Microsoft Azure, and Azure Cognitive Services, this workflow streamlines the conversion process, benefiting organizations across various sectors. Tedious manual tasks are replaced with automated procedures, significantly reducing time and effort while minimizing errors. Integration with Azure Cognitive Services ensures accurate optical character recognition, while the incorporation of email notifications ensures timely communication and eliminates workflow bottlenecks. Ultimately, this solution enhances productivity, facilitates information accessibility, and fosters seamless collaboration within organizations, marking a significant advancement in document digitization and workflow efficiency.',
        image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['D3.js', 'Python', 'Flask'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 12,
        title: 'Enginnering Change Request',
        description: 'Our Engineering Change Request (ECR) solution integrates Power Apps, Power Automate, and SharePoint to streamline and modernize the ECR process. By replacing manual forms and disconnected systems with a centralized platform, we enhance efficiency, reduce errors, and improve collaboration among engineering, localization, vendor management, and quality teams. Automated workflows ensure timely routing of ECRs and trigger actions based on status changes, while real-time access to information increases transparency and visibility into ECR progress. This comprehensive solution addresses the inefficiencies, errors, and lack of transparency often associated with traditional ECR processes, empowering teams to drive impactful changes effectively.',
        image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['Power Apps', 'SharePoint', 'Power Automate'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 13,
        title: 'Batch Data Processing in Azure',
        description :'Our solution employs Azure Data Lake Storage (ADLS) and Azure Databricks to streamline batch data processing, addressing challenges of inefficiency, errors, and transparency. Leveraging Apache Spark, we automate data ingestion, transformation, and loading, enhancing efficiency and ensuring consistent data quality. Through Azure Data Factory, we orchestrate scheduled transfers to ADLS, while Databricks notebooks handle data transformation tasks such as cleaning, schema definition, and validation. Our approach incorporates dimension and fact tables for robust data modelling, utilizing Spark SQL for complex transformations and aggregations. The integration with Power BI enables interactive dashboards for insightful data visualization, empowering users with self-service BI capabilities. This comprehensive solution offers improved efficiency, reduced errors, enhanced transparency, and scalability, catering to evolving data needs with agility and reliability.',
        image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['D3.js', 'Python', 'Flask'],
        category: 'Data Enginner',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      
      {
        id: 14,
        title: 'Real-time Log Processing and Reporting in Azure',
        description :'Introducing our cutting-edge solution: Real-time Log Processing and Reporting. Leveraging Azure Event Hubs for seamless ingestion of high-volume log files, Azure Stream Analytics for real-time data processing and insights extraction through T-SQL queries, and Power BI for dynamic visualization and sharing of live reports and dashboards, our solution empowers organizations to handle 10,000 files per second, enabling immediate action and informed decision-making. With our integrated approach, we ensure scalability, reliability, and actionable insights, transforming log data into valuable assets for real-time monitoring and analysis.',
        image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['D3.js', 'Python', 'Flask'],
        category: 'Data Enginner',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 15,
        title: 'Inventory Plugin CloudDeployment',
        description :'Utilizing Visual Studio Code (VSCode) for coding and editing and Python for backend development, the project aims to deploy the Inventory Co-Pilot Plugin to Microsoft Azures cloud infrastructure, ensuring seamless functionality and accessibility. This involves migrating the database to enable scalability, reliability, and efficient storage utilizing Azure services such as Blob Storage, Data Explorer, Repos, and Web App. Challenges include the need for scalable infrastructure, database performance optimization, limited plugin functionality, and collaboration inefficiencies. To address these, the project focuses on cloud deployment for scalability, leveraging Azure services for storage and analytics, implementing smooth migration processes, and enhancing collaboration using Azure Repos, thus streamlining development workflows and ensuring continuous operation of the plugin.',
        image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
        technologies: ['D3.js', 'Python', 'Flask'],
        category: 'AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      // {
      //   id: 12,
      //   title: 'Enginnering Change Request',
      //   description :'',
      //   image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
      //   technologies: ['D3.js', 'Python', 'Flask'],
      //   category: 'Power Platform',
      //   featured: true,
      //   demoUrl: '#',
      //   githubUrl: '#'
      // },
      // {
      //   id: 12,
      //   title: 'Enginnering Change Request',
      //   description :'',
      //   image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
      //   technologies: ['D3.js', 'Python', 'Flask'],
      //   category: 'Power Platform',
      //   featured: true,
      //   demoUrl: '#',
      //   githubUrl: '#'
      // },
      // {
      //   id: 12,
      //   title: 'Enginnering Change Request',
      //   description :'',
      //   image: 'https://images.pexels.com/photos/8386426/pexels-photo-8386426.jpeg?auto=compress&cs=tinysrgb&w=800',
      //   technologies: ['D3.js', 'Python', 'Flask'],
      //   category: 'Power Platform',
      //   featured: true,
      //   demoUrl: '#',
      //   githubUrl: '#'
      // },


    ];
    return of(mockProjects);
  }

  getServices(): Observable<Service[]> {
    const mockServices: Service[] = [
      {
        id: 1,
        icon: '💡', // Example emoji icon
        title: 'AI Strategy & Consulting',
        description: 'We provide AI strategy and consulting services to help you identify opportunities, design solutions, and implement AI effectively. Our experts guide you in aligning AI initiatives with your business goals for maximum impact.',
        features: [
          'AI Readiness Assessment',
          'Use Case Identification',
          'ROI Projections',
          'Ethical AI Frameworks'
        ],
        category: 'AI'
      },
      {
        id: 2,
        icon: '🧠',
        title: 'AI and ML Services', // Your requested card
        description: 'Our data science team uses AI to deliver insights, automate tasks, and improve decision-making. We offer services like predictive analytics, NLP, Document Intelligence, and computer vision.',
        features: [
          'Azure Cognitive Services',
          'Microsoft fabric implantation',
          'Building and implementing customer ML models',
          'Co-pilot implementation'
        ],
        category: 'AI'
      },
      {
        id: 3,
        icon: '✨', // New icon for Generative AI
        title: 'Generative AI Solutions', // Your requested card
        description: 'Our AI experts specialize in generative models to deliver innovative solutions like content creation, synthetic data, and automation. We provide customized services to meet diverse business needs.',
        features: [
          'Content Generation ',
          'Creative Automation',
          'Synthetic Data Generation',
          'Chatboits and Virtual Assistants'
        ],
        category: 'AI'
      },
      {
        id: 4,
        icon: '💻',
        title: 'Web Development', // Your requested card
        description: 'We offer end-to-end web development services to build responsive, user-friendly websites and web apps. Our solutions are tailored to meet your business goals with modern design and robust functionality.',
        features: [
          'Frontend Development (Angular, React, Vue)',
          'Backend Development (Node.js, Python, .NET)',
          'API Design & Integration',
          'E-commerce Solutions'
        ],
        category: 'Development'
      },
      {
        id: 5,
        icon: '⚙️', // Icon for Power Platform
        title: 'Power Platform Development and Integration Services', // Your requested card
        description: 'We build custom business apps using Microsoft PowerApps for mobile, web, and desktop to streamline your processes. Our services include automation with Power Automate and Azure Logic Apps, and reporting with Power BI.',
        features: [
          'Power Apps ',
          'Power Automate ',
          'Power Automate Desktop',
          'Azure Logic Apps',
          'Azure Function Apps', 
          'Power BI '
          
        ],
        category: 'Development'
      },
      {
        id: 6,
        icon: '☁️', // Icon for Azure Cloud
        title: 'Azure Cloud Services', // Your requested card
        description: 'We offer Azure cloud solutions to help you scale your business and boost efficiency. Our services include cloud migration, management, optimization, and custom app development on Azure.',
        features: [
          'Cloud Migration Services',
          'Devops Services',
          'Application Modernization Services',
          'Data Engineering and Data Migration Services', 
        ],
        category: 'Development'
      },
      {
        id: 7,
        icon: '💬', // Icon for Chatbot
        title: 'Chatbot & Conversational AI', // Your requested card
        description: 'Building intelligent conversational agents for enhanced customer and employee experiences.',
        features: [
          'Custom Chatbot Development',
          'Natural Language Understanding (NLU)',
          'Voice Assistant Integration',
          'Multi-channel Deployment'
        ],
        category: 'AI'
      },
      {
        id: 8,
        icon: '📱',
        title: 'Mobile App Development',
        description: 'Crafting intuitive and high-performance mobile experiences for iOS and Android.',
        features: [
          'Native iOS/Android Apps',
          'Cross-Platform Development (React Native, Flutter)',
          'UI/UX Design',
          'App Store Optimization'
        ],
        category: 'Development'
      },
      {
        id: 9,
        icon: '🛡️',
        title: 'Cybersecurity Solutions',
        description: 'Protecting your digital assets with advanced security measures and proactive strategies.',
        features: [
          'Security Audits & Assessments',
          'Threat Detection & Response',
          'Data Protection & Privacy',
          'Compliance Consulting'
        ],
        category: 'Consulting'
      }
    ];
    return of(mockServices);
  }

  // Replace with actual backend calls
  submitContact(data: any): Observable<any> {
    // return this.http.post(`${this.baseUrl}/contact`, data);
    return of({ success: true, message: 'Message sent successfully!' });
  }
}