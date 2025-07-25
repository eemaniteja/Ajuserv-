import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = 'http://localhost:3000';
  
  sendContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/send-email`, formData);
  }

  constructor(private http: HttpClient) { }

  // For demo purposes, returning mock data. Replace with actual HTTP calls
  getProjects(): Observable<Project[]> {
    const mockProjects: Project[] = [
      {
        id: 1,
        title: 'Speech Translation using Azure Cognitive Services',
        description: 'Experience seamless language translation with our Speech Translation solution powered by Azure Cognitive Services. Using a robust tech stack including Python and Visual Studio Code, we have automated the translation process, allowing real-time transcription and translation of spoken language. By integrating Azure Speech-to-Text and Text Translation APIs, we ensure accurate and timely translations, breaking down language barriers and enabling effective communication. Our solution offers scalability, efficiency, and continuous improvement, guaranteeing reliable translation services tailored to your needs.',
        image: 'assets/Projects/AI/SPT_Ai.avif',
        technologies: ['TensorFlow', 'Python', 'React', 'PostgreSQL'],
        category: 'AI/Gen AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#',
        showFullDescription: false
      },
      {
        id: 2,
        title: 'Text to speech And Speech to Text',
        description: 'Our solution leverages cutting-edge technology to automate text-to-speech and speech-to-text conversions, addressing the challenges of manual conversion, accessibility, workflow inefficiencies, and scalability limitations. By integrating Azure Cognitive Services APIs, specifically Text-to-Speech and Speech-to-Text, with custom Python scripts developed in Visual Studio Code, we enable seamless and efficient conversion workflows. Our approach prioritizes real-time capabilities, allowing instant communication through accurate and reliable conversion services. Error handling mechanisms are embedded within the scripts to ensure robustness and reliability, while continuous improvement efforts drive enhancements in accuracy, efficiency, and user experience based on feedback and performance metrics. With our solution, we empower businesses to streamline communication processes and provide inclusive access to information for individuals with visual or hearing impairments.',
        image: "assets/Projects/AI/TTS.avif",
        technologies: ['PyTorch', 'Redis', 'FastAPI', 'MongoDB'],
        category: 'AI/Gen AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 3,
        title: 'Confidential Document Reading Chatbot',
        description: 'Our solution addresses the critical need for efficient and secure access to information contained within confidential documents for organizations. By leveraging cutting-edge technologies such as natural language processing (NLP) and machine learning, our chatbot acts as a virtual assistant, adeptly navigating through documents to extract relevant insights. The integration of the OpenAI API enhances the chatbots understanding of user queries, while advanced techniques like sentence embeddings and similarity search algorithms ensure pinpoint accuracy in retrieving pertinent passages from the documents. Built using Streamlit, our web-based interface provides a seamless user experience, allowing effortless interaction with the chatbot. Crucially, our solution prioritizes data privacy and security by processing documents locally, safeguarding sensitive information from unauthorized access. With our innovative approach, organizations can streamline workflows, enhance decision-making, and uphold the utmost confidentiality and security standards.',
        image: 'assets/Projects/AI/CD.avif',
        technologies: ['OpenAI', 'LangChain', 'Streamlit'],
        category: 'AI/Gen AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: 'Streamlit Pro',
        description: 'Streamlit Pro offers an unparalleled solution for showcasing data-driven insights through dynamic and interactive web applications. Utilizing Python for powerful data processing and Streamlit as the premier framework for creating elegant web apps, Streamlit Pro enables seamless public deployment on professional-grade hosting platforms. This ensures reliability, scalability, and security, allowing users to explore, analyze, and interact with visualizations and analyses in real-time. By transforming Python scripts into engaging web apps, Streamlit Pro overcomes the limitations of static reports and complex deployment processes, providing a user-friendly and efficient way to share data insights with a global audience.',
        image: "assets/Projects/AI/SP.avif",
        technologies: ['Python', 'Streamlit'],
        category: 'AI/Gen AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 5,
        title: 'StoryForge',
        description: 'StoryForge is an innovative platform that revolutionizes storytelling by leveraging cutting-edge AI technologies. Built on a robust tech stack including Python, the Transformers library, Streamlit, Hugging Face Hub, and OpenAI API, StoryForge seamlessly transforms images into captivating narratives and converts text into immersive audio experiences. Users can effortlessly upload images to generate descriptive texts, which are then expanded into engaging stories using advanced language models. These stories can be experienced through audio narration, enhancing accessibility and engagement. StoryForge addresses the inefficiencies of traditional storytelling by automating the conversion process and providing a user-friendly interface for creating and sharing dynamic tales. Whether for personal anecdotes, fictional stories, or educational content, StoryForge empowers users to craft and enjoy rich, interactive storytelling experiences.',
        image: 'assets/Projects/AI/SF.avif',
        technologies: ['Hugging Face', 'OpenAI',],
        category: 'AI/Gen AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 6,
        title: 'Mortgage Master',
        description: 'Empowering Financial Decision-Making with Streamlit and Azure Integration" revolutionizes mortgage management by seamlessly integrating Streamlits interactive interface and Azures scalability. Utilizing Python and Pandas for data processing and Matplotlib for visualizations, the application simplifies complex mortgage calculations and presents repayment schedules in a user-friendly format. Traditional manual methods are replaced, ensuring accuracy and efficiency while empowering users to make informed decisions about their housing investments. By automating calculations and offering intuitive visualizations, Mortgage Master eliminates errors and provides users with a clear understanding of their financial obligations, ultimately enhancing their ability to plan and manage their finances effectively.',
        image: "assets/Projects/AI/MM.avif",
        technologies: ['Microsoft Azure', 'Streamlit', 'Matplotlib'],
        category: 'AI/Gen AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 7,
        title: 'HugChat',
        description: 'HugChat presents a streamlined solution to the limitations of traditional chat applications, harnessing the prowess of Hugging Faces chatbot API within a user-friendly interface developed on Streamlit. Users engage with the virtual assistant effortlessly, receiving intelligent and contextually relevant responses to their queries. By abstracting complexities in setting up and integrating chatbot services, HugChat simplifies the process, making it accessible for various applications and workflows. This dynamic platform enhances communication efficiency, offering personalized assistance and information retrieval, ultimately addressing the frustrations associated with conventional chat interfaces.',
        image: "assets/Projects/AI/HugChat.avif",
        technologies: ['Flutter', 'Firebase', 'Dart'],
        category: 'AI/Gen AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 8,
        title: 'Mirror Chatbot',
        description: 'MirrorChatbot revolutionizes the landscape of conversational tools with its innovative approach, offering users an immersive experience where their input is mirrored back to them in real-time. Powered by Streamlit, its intuitive interface ensures seamless engagement, inviting users into dynamic conversations rich with spontaneity and creativity. Unlike traditional chatbots constrained by scripted responses, MirrorChat fosters interactive storytelling, self-reflection, and exploration of conversational dynamics. With Python at its core and a suite of NLP libraries, MirrorChat simplifies chatbot development, democratizing access to this technology across diverse skill levels. Say goodbye to the complexities of setup and deployment; MirrorChat streamlines the process, empowering users to dive into engaging conversations effortlessly.',
        image: "assets/Projects/AI/MC.avif",
        technologies: ['Flutter', 'Firebase', 'Dart'],
        category: 'AI/Gen AI',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 9,
        title: 'Invoice Processing ',
        description: 'Revolutionize your document processing with our comprehensive solution leveraging Microsoft Power Automate and AI Builder. Say goodbye to manual data entry woes as our automated workflows seamlessly extract structured data from diverse document types including forms, invoices, and receipts, drastically reducing errors and accelerating processing times. Integrating effortlessly with your existing data systems, our solution ensures smooth data transfer for further analysis and processing. Designed for scalability and flexibility, our custom workflows adapt to varying document formats and structures, catering to your evolving needs as document volumes grow. Experience enhanced efficiency and accuracy with continuous improvement cycles, refining workflows based on feedback and performance metrics. Streamline your operations and unlock new levels of productivity with our innovative document processing solution.',
        image: "assets/Projects/PowerPlatform/IP.avif",
        technologies: ['Power Automate', 'AI Builder'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 10,
        title: 'Document Processing for Structured data',
        description: 'Our document processing solution leverages Microsoft Power Automate and Azure Document Intelligence, specifically Azure Form Recognizer, to automate the extraction of structured data from unstructured documents like contracts, resumes, and emails. By integrating these technologies seamlessly, we eliminate the need for manual data extraction, reducing errors and accelerating data processing tasks. With Azure Document Intelligence continuously trained on diverse sample documents, our solution ensures high accuracy and adaptability to various document formats, enhancing efficiency and scalability. Through iterative refinement and integration with Power Automate workflows, we deliver a robust solution that optimizes accuracy, minimizes manual effort, and accommodates the growing volume of unstructured documents with ease.',
        image: "assets/Projects/PowerPlatform/DP1.avif",
        technologies: ['Power Automate', 'AI Builder'],
        category: 'Power Platform',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 11,
        title: 'Document Processing for Unstructured data',
        description: 'Our solution addresses the challenges of manual invoice processing by leveraging Microsoft Power Automate and AI Builder to automate data extraction from invoices with both standardized and non-standardized templates. With custom workflows, we efficiently extract relevant information from invoices, whether they follow consistent layouts or vary in structure. By incorporating error handling mechanisms and validation checks, we ensure the accuracy and reliability of extracted data, minimizing errors and streamlining the entire process. Through continuous refinement and adaptation, our solution optimizes efficiency, scalability, and accuracy, offering a robust framework for invoice processing that significantly reduces manual effort and accelerates data extraction tasks.',
        image: 'assets/Projects/PowerPlatform/DP2.avif',
        technologies: ['Power Automate', 'Doc Intelligence', 'Form Recognizer'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 12,
        title: 'Image to Text Conversion',
        description: 'The Image-to-Text Conversion Workflow with Email Notification presents a robust solution to the challenges posed by manual text extraction from images. By harnessing the power of Power Automate, Microsoft Azure, and Azure Cognitive Services, this workflow streamlines the conversion process, benefiting organizations across various sectors. Tedious manual tasks are replaced with automated procedures, significantly reducing time and effort while minimizing errors. Integration with Azure Cognitive Services ensures accurate optical character recognition, while the incorporation of email notifications ensures timely communication and eliminates workflow bottlenecks. Ultimately, this solution enhances productivity, facilitates information accessibility, and fosters seamless collaboration within organizations, marking a significant advancement in document digitization and workflow efficiency.',
        image: "assets/Projects/PowerPlatform/ITC.png",
        technologies: ['D3.js', 'Python', 'Flask'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 13,
        title: 'Engineering Change Request',
        description: 'Our Engineering Change Request (ECR) solution integrates Power Apps, Power Automate, and SharePoint to streamline and modernize the ECR process. By replacing manual forms and disconnected systems with a centralized platform, we enhance efficiency, reduce errors, and improve collaboration among engineering, localization, vendor management, and quality teams. Automated workflows ensure timely routing of ECRs and trigger actions based on status changes, while real-time access to information increases transparency and visibility into ECR progress. This comprehensive solution addresses the inefficiencies, errors, and lack of transparency often associated with traditional ECR processes, empowering teams to drive impactful changes effectively.',
        image: 'assets/Projects/PowerPlatform/EC.avif',
        technologies: ['Power Apps', 'SharePoint', 'Power Automate'],
        category: 'Power Platform',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 14,
        title: 'Batch Data Processing in Azure',
        description: 'Our solution employs Azure Data Lake Storage (ADLS) and Azure Databricks to streamline batch data processing, addressing challenges of inefficiency, errors, and transparency. Leveraging Apache Spark, we automate data ingestion, transformation, and loading, enhancing efficiency and ensuring consistent data quality. Through Azure Data Factory, we orchestrate scheduled transfers to ADLS, while Databricks notebooks handle data transformation tasks such as cleaning, schema definition, and validation. Our approach incorporates dimension and fact tables for robust data modelling, utilizing Spark SQL for complex transformations and aggregations. The integration with Power BI enables interactive dashboards for insightful data visualization, empowering users with self-service BI capabilities. This comprehensive solution offers improved efficiency, reduced errors, enhanced transparency, and scalability, catering to evolving data needs with agility and reliability.',
        image: "assets/Projects/DE/BDP1.avif",
        technologies: ['Azure Event Hubs', 'Apache Spark', 'Power BI'],
        category: 'Data Engineering',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 15,
        title: 'Real-time Log Processing and Reporting in Azure',
        description: 'Introducing our cutting-edge solution: Real-time Log Processing and Reporting. Leveraging Azure Event Hubs for seamless ingestion of high-volume log files, Azure Stream Analytics for real-time data processing and insights extraction through T-SQL queries, and Power BI for dynamic visualization and sharing of live reports and dashboards, our solution empowers organizations to handle 10,000 files per second, enabling immediate action and informed decision-making. With our integrated approach, we ensure scalability, reliability, and actionable insights, transforming log data into valuable assets for real-time monitoring and analysis.',
        image: "assets/Projects/DE/RTLP.avif",
        technologies: ['Azure Event Hubs', 'Azure Stream Analytics', 'Power BI'],
        category: 'Data Engineering',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 16,
        title: 'Inventory Plugin Cloud Deployment',
        description: 'Utilizing Visual Studio Code (VSCode) for coding and editing and Python for backend development, the project aims to deploy the Inventory Co-Pilot Plugin to Microsoft Azures cloud infrastructure, ensuring seamless functionality and accessibility. This involves migrating the database to enable scalability, reliability, and efficient storage utilizing Azure services such as Blob Storage, Data Explorer, Repos, and Web App. Challenges include the need for scalable infrastructure, database performance optimization, limited plugin functionality, and collaboration inefficiencies. To address these, the project focuses on cloud deployment for scalability, leveraging Azure services for storage and analytics, implementing smooth migration processes, and enhancing collaboration using Azure Repos, thus streamlining development workflows and ensuring continuous operation of the plugin.',
        image: "assets/Projects/AI/IPC.avif",
        technologies: ['JS', 'Python', 'Flask','HTML', 'CSS', 'Gen AI', 'Service Now'],
        category: 'AI/Gen AI',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 17,
        title: 'Live Streaming Using Microsoft Fabric ',
        description: 'Our Microsoft Fabric-powered live streaming solution enables telecom companies to process high-velocity data from IoT devices, network logs, and financial transactions in real time. By leveraging Fabric\'s seamless integration with Azure services, we deliver instant analytics, anomaly detection, and predictive insights, helping telecom operators optimize network performance, reduce downtime, and enhance customer experiences.',
        image: 'assets/Projects/DE/LSU.avif',
        technologies: ['Azure Event Hubs', 'Microsoft Fabric', 'Power BI'],
        category: 'Data Engineering',
        featured: true,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 18,
        title: 'Batch Processing Using Microsoft Fabric',
        description: 'Our Microsoft Fabric-based batch processing solution empowers telecom companies to efficiently handle large-scale data workloads, including network performance metrics, customer billing records, and operational logs, through a fully integrated cloud analytics platform. By leveraging Fabrics seamless integration of Notebooks for Spark-based data processing, Data Factory for pipeline orchestration, Lakehouse for unified storage, and Power BI for advanced analytics, we enable telecom operators to transform raw data into actionable insights with unprecedented speed and reliability. This solution delivers cost-effective scalability, reducing processing times from hours to minutes while ensuring enterprise-grade security and compliance—allowing telecom providers to optimize network performance, enhance customer experiences, and drive data-informed decision-making across their organization. The platforms built-in AI capabilities further enhance operations by enabling predictive analytics for churn prevention, fraud detection, and infrastructure maintenance.',
        image: 'assets/Projects/DE/BDP2.avif',
        technologies: ['Notebooks', 'Microsoft Fabric', 'Power BI'],
        category: 'Data Engineering',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 19,
        title: 'Medical Hospital Management Solution',
        description: 'Medical Hospital Management Solution leverages a centralized database-driven system to streamline and digitize key operational workflows across patient care, staff administration, and asset management. Built with full CRUD (Create, Read, Update, Delete) capabilities, the solution enables efficient data entry and maintenance for patients, doctors, medical equipment (including types and models), suppliers, user profiles, and financial account details. By replacing traditional, disconnected, and often manual systems with a unified platform, this solution improves accuracy, enhances collaboration among departments, and supports real-time access to critical information. It empowers hospital staff to manage daily operations more effectively while ensuring data consistency, operational transparency, and scalability for future healthcare IT needs.',
        image: "assets/Projects/FullStack/MP.avif",
        technologies: ['Angular', '.Net', 'MySQL'],
        category: 'Full Stack',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 20,
        title: 'Counterfeit Application',
        description: 'The Counterfeit Application facilitates uploading and downloading of essential forms and documents via SharePoint, accessible by branches with role-based privileges. It supports Maker/Checker approval, email alerts, and report generation. Branches report counterfeit notes detected through various sources by entering details in the system and uploading required annexures (I, II, III, IV, VI, VIII, X). Upon submission, the system auto-triggers notifications to the FNVC team. FNVC verifies, updates NCRB, and generates police letters. Acknowledgements from police are uploaded for record. All physical notes are preserved by branches and submitted to RBI with proof. Monthly confirmation (including NIL cases) is mandatory.',
        image: "assets/Projects/FullStack/CFA.avif",
        technologies: ['Share Point Online', 'React JS', 'Share Point Framework'],
        category: 'Full Stack',
        featured: false,
        demoUrl: '#',
        githubUrl: '#'
      },
    ];
    return of(mockProjects);
  }

  private mockServices: Service[] = [
    {
      id: 1,
      title: 'AI/Gen AI & Analytics',
      icon: '🤖',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/AI.avif',
      bulletPoints: [
        {
          title: 'AZURE COGNITIVE SERVICES',
          description: 'A set of pre-trained Azure ML models that help with predictions, recommendations, and data analysis.'
        },
        {
          title: 'GENERATIVE AI',
          description: 'GenAI includes a range of AI technologies that can create new content, mimic human thought processes, and enhance human capabilities.'
        },
        {
          title: 'CUSTOM ML MODELS',
          description: 'Allows accurate predictions on custom datasets with greater control over fine-tuning and ML architecture.'
        },
        {
          title: 'MICROSOFT COPILOTS',
          description: 'Copilot significantly reduces the time needed to complete tasks across applications. Its AI-driven assistance streamlines routine processes, enabling employees to focus on strategic tasks.'
        },
        {
          title: 'POWER BI',
          description: 'Promotes an analytics-driven culture and encourages data literacy.'
        }
      ]
    },
    {
      id: 2,
      title: 'Microsoft Modern Work',
      
      icon: '💼',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/MMW.avif',
      bulletPoints: [
        {
          title: 'SHAREPOINT DEVELOPMENT',
          description: 'Digitalize your business processes through SharePoint applications , use data storage, ,build workflows '
        },
        {
          title: 'TENANT MIGRATIONS',
          description: 'Migrate enterprise O365 data payloads from one tenant to another tenant'
        },
        {
          title: 'M365 COMPONENT MIGRATIONS',
          description: 'Migrate enterprise M365 data payloads from one tenant to another tenant'
        },
        {
          title: 'M365 GOVERNANCE',
          description: 'Setup governance mechanism around M365 payloads to ensure no data leakage, and ensure security'
        },
        {
          title: 'POWER APPS',
          description: 'Build apps without coding for manual business processes. Build workflows using LCNC'
        }
      ]
    },
    {
      id: 3,
      title: 'LCNC - Power Platform/RPA',
      
      icon: '🔧',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/LCNC.avif',
      bulletPoints: [
        {
          title: 'POWER APPS/PAGES',
          description: 'Build apps without coding for manual business processes..'
        },
        {
          title: 'POWER AUTOMATE/ RPA',
          description: 'Automate routine mundane tasks using Power Automate Desktop.'
        },
        {
          title: 'POWER VIRTUAL AGENTS',
          description: 'Build conversational Bots using Low code No code (LCNC) platform.'
        },
        {
          title: 'AI BUILDER',
          description: 'Build and train AI models with pre-trained available models. With minimal training, can get accurate results from the data and documents.'
        },
        {
          title: 'POWER BI',
          description: 'Foster an analytics-driven culture and promote data literacy..'
        }
      ]
    },
    {
      id: 4,
      title: 'Azure Cloud and Data',
      
      icon: '☁️',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/ACD.avif',
      bulletPoints: [
        {
          title: 'Application Migration & Modernization',
          description: 'Migrate legacy on-prem applications or modernize  and migrate to Azure cloud infrastructure	'
        },
        {
          title: 'Data Engineering & Migration',
          description: 'Migrate data from on-prem DB to Cloud DB for availability to business applications, analysis and reporting.'
        },
        {
          title: 'Cloud Migrations',
          description: 'Migrate on-prem servers to Azure Cloud, set up cloud infrastructure, and security'
        },
        {
          title: 'Data Governance',
          description: 'Implement Data governance in cloud using native tools'
        }, 
      ]
    },
    {
      id: 5,
      title: 'Azure Infrastructure & Security',
      
      icon: '🔐',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/AIS.avif',
      bulletPoints: [
        {
          title: 'Infra as a Code (IaC)',
          description: 'Automate Azure infrastructure setup through IaC'
        },
        {
          title: 'CICD Pipelines',
          description: 'Establish Azure CI/CD pipelines automated deployments'
        },
        {
          title: 'Automation',
          description: 'Automate infrastructure and code deployments.'
        },
        
        {
          title: 'BATCH PROCESSING',
          description: 'Build Fabric data pipeline for near real time data and batch jobs.'
        },
        {
          title: 'STREAM ANALYTICS',
          description: 'Build Fabric data pipeline for real time data using streaming technology.'
        }
      ]
    },
    {
      id: 6,
      title: 'Digital & Modernization Apps',
      
      icon: '📱',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/DMA.avif',
      bulletPoints: [
        {
          title: 'AZURE COGNITIVE SERVICES',
          description: 'A set of pre-trained Azure ML models that help with predictions, recommendations, and data analysis.'
        },
        {
          title: 'GENERATIVE AI',
          description: 'GenAI includes a range of AI technologies that can create new content, mimic human thought processes, and enhance human capabilities.'
        },
        {
          title: 'CUSTOM ML MODELS',
          description: 'Allows accurate predictions on custom datasets with greater control over fine-tuning and ML architecture.'
        },
        {
          title: 'MICROSOFT COPILOTS',
          description: 'Copilot significantly reduces the time needed to complete tasks across applications. Its AI-driven assistance streamlines routine processes, enabling employees to focus on strategic tasks.'
        },
        {
          title: 'POWER BI',
          description: 'Promotes an analytics-driven culture and encourages data literacy.'
        }
      ]
    },
    {
      id: 7,
      title: 'Full Stack Development                    ',
      
      icon: '🌐',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/FSD.avif',
      bulletPoints: [
        {
          title: 'AZURE COGNITIVE SERVICES',
          description: 'A set of pre-trained Azure ML models that help with predictions, recommendations, and data analysis.'
        },
        {
          title: 'GENERATIVE AI',
          description: 'GenAI includes a range of AI technologies that can create new content, mimic human thought processes, and enhance human capabilities.'
        },
        {
          title: 'CUSTOM ML MODELS',
          description: 'Allows accurate predictions on custom datasets with greater control over fine-tuning and ML architecture.'
        },
        {
          title: 'MICROSOFT COPILOTS',
          description: 'Copilot significantly reduces the time needed to complete tasks across applications. Its AI-driven assistance streamlines routine processes, enabling employees to focus on strategic tasks.'
        },
        {
          title: 'POWER BI',
          description: 'Promotes an analytics-driven culture and encourages data literacy.'
        }
      ]
    },
    {
      id: 8,
      title: 'Staffing Services                                 ',
      
      icon: '👥',
      buttonText: 'Read More',
      backgroundImage: 'assets/Services/SS.avif',
      bulletPoints: [
        {
          title: 'AZURE COGNITIVE SERVICES',
          description: 'A set of pre-trained Azure ML models that help with predictions, recommendations, and data analysis.'
        },
        {
          title: 'GENERATIVE AI',
          description: 'GenAI includes a range of AI technologies that can create new content, mimic human thought processes, and enhance human capabilities.'
        },
        {
          title: 'CUSTOM ML MODELS',
          description: 'Allows accurate predictions on custom datasets with greater control over fine-tuning and ML architecture.'
        },
        {
          title: 'MICROSOFT COPILOTS',
          description: 'Copilot significantly reduces the time needed to complete tasks across applications. Its AI-driven assistance streamlines routine processes, enabling employees to focus on strategic tasks.'
        },
        {
          title: 'POWER BI',
          description: 'Promotes an analytics-driven culture and encourages data literacy.'
        }
      ]
    }
  ];

  getServices(): Observable<Service[]> {
    return of(this.mockServices);
  }
}