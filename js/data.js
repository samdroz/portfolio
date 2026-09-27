// Centralized configuration and portfolio data for Sam Dharan Rozario R
// Easy to update without touching the main HTML structure.

const portfolioData = {
  personal: {
    name: "Sam Dharan Rozario R",
    shortName: "Sam",
    logoMark: "SDR",
    headline: "AI/ML Developer • CSE Student",
    subHeadline: "Specializing in Artificial Intelligence & Machine Learning",
    availability: "Available for internships & collaborations",
    bio: "Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, software development, and building practical technology.",
    aboutParagraphs: [
      "I am a Computer Science and Engineering student at St. Joseph's Institute of Technology, Chennai, specializing in Artificial Intelligence & Machine Learning (Class of 2029).",
      "My core focus is on building practical, real-world AI applications—from Computer Vision surveillance and real-time detection systems to Retrieval-Augmented Generation (RAG) pipelines and specialized conversational agents.",
      "I am actively expanding my work in open-source AI tooling, local LLM orchestration, and efficient computer vision pipelines with the goal of engineering software systems that solve tangible problems."
    ],
    social: {
      github: "https://github.com/samdroz",
      linkedin: "https://www.linkedin.com/in/samdroz/",
      email: "mailto:samdharanrozario@gmail.com",
      emailRaw: "samdharanrozario@gmail.com"
    },
    location: "Chennai / Madurai, Tamil Nadu, India",
    education: {
      degree: "B.E. Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
      institution: "St. Joseph's Institute of Technology, Chennai",
      timeline: "2025 – 2029 (Expected Graduation)",
      coursework: [
        "Data Structures & Algorithms",
        "Artificial Intelligence",
        "Machine Learning Fundamentals",
        "Object Oriented Programming",
        "Computer Vision & Deep Learning",
        "Database Management Systems"
      ]
    }
  },

  skills: {
    programming: [
      { name: "Python", icon: "code", desc: "Core language for AI/ML, automation, and backend APIs" },
      { name: "C", icon: "cpu", desc: "Foundational systems programming & data structures" },
      { name: "HTML", icon: "layout", desc: "Semantic markup and web accessibility" },
      { name: "CSS", icon: "palette", desc: "Responsive styling, glassmorphism & modern UI" }
    ],
    ai_ml: [
      { name: "Machine Learning", icon: "brain", desc: "Supervised/unsupervised algorithms & feature engineering" },
      { name: "Computer Vision", icon: "eye", desc: "Real-time detection, tracking & frame processing" },
      { name: "YOLO (v8)", icon: "scan", desc: "Real-time object detection & bounding box inference" },
      { name: "TensorFlow", icon: "network", desc: "Deep learning model training & inference" },
      { name: "OpenCV", icon: "camera", desc: "Image transformation, filtering & video streams" }
    ],
    llm_ai: [
      { name: "LangChain", icon: "link", desc: "Chains, agents, prompt templates & retrieval flows" },
      { name: "RAG Systems", icon: "database", desc: "Vector indexing, FAISS retrieval & grounding" },
      { name: "Hugging Face", icon: "sparkles", desc: "Transformers, open weights & tokenizers" },
      { name: "Local LLMs", icon: "server", desc: "On-device quantized inference via LM Studio & Ollama" },
      { name: "Prompt Engineering", icon: "code", desc: "Few-shot prompting, system steering & structured output" }
    ],
    development: [
      { name: "Flask", icon: "server", desc: "Microframework for lightweight AI microservices & APIs" },
      { name: "Streamlit", icon: "app-window", desc: "Rapid prototyping of interactive AI/CV dashboards" },
      { name: "REST APIs", icon: "globe", desc: "HTTP endpoints, JSON payloads & backend integrations" }
    ],
    tools: [
      { name: "Git", icon: "git-branch", desc: "Version control & collaborative branch workflows" },
      { name: "GitHub", icon: "github", desc: "Open-source repositories, PRs & GitHub Pages" },
      { name: "VS Code", icon: "terminal", desc: "Primary IDE, debugging & extension workflow" },
      { name: "LM Studio", icon: "box", desc: "Local LLM evaluation, testing & quantization" }
    ]
  },

  projects: [
    {
      id: "argus",
      title: "Project ARGUS",
      badge: "AI + Vision",
      category: "Computer Vision",
      categoryFilter: "cv",
      description: "Next-generation visual surveillance and real-time situational intelligence architecture. Engineered for high-throughput video stream analysis, custom neural object tracking, and autonomous anomaly identification.",
      technologies: ["Python", "Computer Vision", "YOLO", "OpenCV", "Deep Learning"],
      githubUrl: "https://github.com/samdroz",
      isLive: true,
      liveUrl: "https://github.com/samdroz",
      highlight: true,
      stats: { metric: "Low Latency", label: "Real-time Stream Inference" },
      icon: "shield"
    },
    {
      id: "rag-chatbot",
      title: "RAG Chatbot",
      badge: "Generative AI",
      category: "Chatbots",
      categoryFilter: "chatbots",
      description: "A Retrieval-Augmented Generation (RAG) assistant that indexes custom documents into vector databases and retrieves relevant chunks to produce factually grounded, context-aware LLM answers.",
      technologies: ["Python", "LangChain", "FAISS", "Hugging Face", "LLMs"],
      githubUrl: "https://github.com/samdroz/AI-PDF-RAG-Chatbot",
      liveUrl: "https://github.com/samdroz/AI-PDF-RAG-Chatbot",
      customButtonLabel: "View Project",
      isLive: true,
      comingSoon: false,
      highlight: false,
      stats: { metric: "FAISS + RAG", label: "Vector Search Pipeline" },
      icon: "database"
    },
    {
      id: "smart-traffic",
      title: "Smart Traffic Management System",
      badge: "AI + Vision",
      category: "Computer Vision",
      categoryFilter: "cv",
      description: "An AI-powered intelligent traffic monitoring framework utilizing computer vision to detect, classify, and count vehicles in real time, assisting with congestion analysis and adaptive traffic signaling.",
      technologies: ["Python", "YOLOv8", "OpenCV", "Streamlit"],
      githubUrl: "https://github.com/samdroz/smart-traffic-management-system",
      isLive: true,
      liveUrl: "https://github.com/samdroz/smart-traffic-management-system",
      highlight: false,
      stats: { metric: "YOLOv8", label: "Multi-Vehicle Tracking" },
      icon: "activity"
    },
    {
      id: "medi-assist",
      title: "Medi Assist Chatbot",
      badge: "Healthcare AI",
      category: "Chatbots",
      categoryFilter: "chatbots",
      description: "An AI-powered conversational medical assistant designed to provide healthcare guidance, symptom analysis, and interactive healthcare information through an intelligent conversational interface.",
      technologies: ["Python", "AI", "NLP", "Flask"],
      githubUrl: "https://github.com/samdroz/Medi_Assist_Chatbot",
      isLive: true,
      liveUrl: "https://github.com/samdroz/Medi_Assist_Chatbot",
      highlight: false,
      stats: { metric: "Flask Backend", label: "NLP Conversational Core" },
      icon: "heart-pulse"
    },
    {
      id: "face-detection",
      title: "Face Detection using OpenCV",
      badge: "Computer Vision",
      category: "Computer Vision",
      categoryFilter: "cv",
      description: "A real-time computer vision pipeline engineered for accurate face detection, spatial bounding box rendering, and webcam stream frame processing using optimized OpenCV classifiers.",
      technologies: ["Python", "OpenCV"],
      githubUrl: "https://github.com/samdroz/face-detection-opencv",
      isLive: true,
      liveUrl: "https://github.com/samdroz/face-detection-opencv",
      highlight: false,
      stats: { metric: "60+ FPS", label: "Real-time Detection" },
      icon: "camera"
    }
  ],

  experience: [
    {
      role: "AI/ML Intern",
      company: "Dot Com Infoway",
      location: "Madurai, Tamil Nadu",
      period: "June 2026",
      badge: "Industry Internship",
      description: "Engaged in hands-on software engineering and AI system development focused on practical enterprise solutions.",
      highlights: [
        "Architected and evaluated Python-based Retrieval-Augmented Generation (RAG) workflows for document-based question answering.",
        "Integrated large language model (LLM) interfaces with specialized context retrieval systems for accurate data queries.",
        "Developed and refined intelligent conversational chatbot modules with custom validation logic.",
        "Conducted end-to-end testing, hallucination mitigation, and performance benchmarking for AI components."
      ],
      technologies: ["Python", "RAG", "LLMs", "LangChain", "Flask", "AI Testing"]
    }
  ],

  certifications: [
    {
      title: "Python for Data Science",
      issuer: "NPTEL / IIT Madras",
      proctored: true,
      category: "Data Science"
    },
    {
      title: "Fundamentals of Data Analytics",
      issuer: "nasscom",
      proctored: true,
      category: "Data Analytics"
    },
    {
      title: "Getting Started with Generative AI",
      issuer: "IBM",
      proctored: false,
      category: "Generative AI"
    },
    {
      title: "Introduction to AI Concepts",
      issuer: "Microsoft Learn",
      proctored: false,
      category: "AI Fundamentals"
    },
    {
      title: "AWS Transform for Full-Stack Windows Modernization",
      issuer: "AWS Training & Certification",
      proctored: false,
      category: "Cloud Modernization"
    }
  ],

  workshops: [
    {
      title: "National Workshop on 5G Technologies",
      type: "Technical Workshop",
      focus: "5G Architecture, Next-Generation Wireless Systems & Network Infrastructure"
    },
    {
      title: "SkillRack Problem Solving & Programming",
      type: "Additional Learning",
      focus: "Continuous Algorithmic Problem Solving, Code Efficiency & Data Structures"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
