export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  subRole: string;
  college: string;
  location: string;
  bio: string;
  resumeUrl: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  field: string;
  location: string;
  isCurrent?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  roleType: string;
  description?: string;
}

export interface Certification {
  title: string;
  issuer?: string;
}

export interface Achievement {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

export interface SocialLinks {
  github: string;
  githubUsername: string;
  linkedin: string;
  linkedinUsername: string;
  email: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  education: Education[];
  skills: SkillCategory[];
  experience: Internship[];
  certifications: Certification[];
  achievements: Achievement[];
  projects: Project[];
  socialLinks: SocialLinks;
  spokenLanguages: string[];
  coreCompetencies: string[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Om Murugan M",
    shortName: "OM MURUGAN",
    role: "3rd Year B.Tech Undergraduate",
    subRole: "Artificial Intelligence & Machine Learning",
    college: "St. Joseph's College of Engineering, Chennai",
    location: "Chennai, India",
    bio: "Detail-focused and hardworking undergraduate developer concentrating in Artificial Intelligence and Machine Learning. Passionate about building intelligent algorithms, computer vision applications, and full-stack software solutions.",
    resumeUrl: "#about" // Section anchor or downloadable asset
  },
  education: [
    {
      institution: "ST. JOSEPH'S COLLEGE OF ENGINEERING",
      degree: "B.Tech",
      period: "2024 - 2028",
      field: "Artificial Intelligence & Machine Learning",
      location: "Chennai",
      isCurrent: true
    },
    {
      institution: "MAHARISHI VIDYA MANDIR",
      degree: "Higher Secondary Education",
      period: "Prior - 2024",
      field: "General Science & Mathematics",
      location: "Polachery"
    }
  ],
  skills: [
    {
      title: "PROGRAMMING LANGUAGES",
      skills: ["Java", "Python", "C", "JavaScript"]
    },
    {
      title: "DATABASES",
      skills: ["MySQL", "PostgreSQL"]
    },
    {
      title: "TOOLS & PLATFORMS",
      skills: ["Git", "VS Code", "Antigravity"]
    },
    {
      title: "OPERATING SYSTEMS",
      skills: ["Windows", "Linux"]
    },
    {
      title: "CORE SPECIALIZATIONS",
      skills: [
        "Machine Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Data Analysis",
        "Problem Solving"
      ]
    }
  ],
  experience: [
    {
      id: "exp-1",
      title: "Enhancing Cyber Security By Using AI",
      company: "Xenopent",
      roleType: "Internship / Training"
    },
    {
      id: "exp-2",
      title: "Cloud Computing",
      company: "BIGSIBUCKS Innovation Private Limited",
      roleType: "Internship / Training"
    },
    {
      id: "exp-3",
      title: "Full Stack Development",
      company: "Prodigy InfoTech",
      roleType: "Internship / Training"
    }
  ],
  certifications: [
    {
      title: "Python in Data Science"
    },
    {
      title: "Demystifying Networking"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      number: "01",
      title: "STATE LEVEL HACKATHON WINNER",
      subtitle: "SRM's HackcelR8 2025",
      category: "Hackathons"
    },
    {
      id: "ach-2",
      number: "90+",
      title: "CODECHEF PROBLEMS",
      subtitle: "Competitive Programming & Problem Solving",
      category: "Coding"
    },
    {
      id: "ach-3",
      number: "470+",
      title: "SKILLRACK PROBLEMS",
      subtitle: "Algorithmic Challenges & Logic Building",
      category: "Coding"
    },
    {
      id: "ach-4",
      number: "IEI",
      title: "MEMBER OF IEI",
      subtitle: "Institution of Engineers (India)",
      category: "Professional"
    }
  ],
  projects: [
    {
      id: "proj-1",
      number: "01",
      title: "Smart Community Health Monitoring System",
      tagline: "Early Warning System for Water-Borne Diseases in Rural Northeast India",
      description: "An AI-powered environmental health monitoring framework designed to predict and provide early warnings for water-borne disease outbreaks across rural regions in Northeast India.",
      techStack: ["Python", "Machine Learning", "Data Analysis", "Predictive Analytics"],
      featured: true,
      category: "AI & Healthcare"
    },
    {
      id: "proj-2",
      number: "02",
      title: "PathLens",
      tagline: "A Smart Cane for Visually Impaired People",
      description: "An assistive technology solution combining embedded sensors and computer vision models to provide real-time spatial guidance and obstacle detection for visually impaired individuals.",
      techStack: ["Computer Vision", "Python", "Embedded Systems", "Sensors"],
      featured: true,
      category: "Computer Vision & IoT"
    },
    {
      id: "proj-3",
      number: "03",
      title: "Community Hub",
      tagline: "A Full-Stack Prototype Messenger Inspired by Discord",
      description: "A feature-rich real-time communication platform featuring multi-channel chat lounges, glassmorphic UI, audio/member controls, and interactive user management.",
      techStack: ["HTML5", "CSS3", "JavaScript", "ES6 Modules"],
      githubUrl: "https://github.com/Om-Murugan-o7/Community-Hub",
      liveUrl: "https://comhub.ommurugan.engineer/",
      featured: true,
      category: "Full Stack Development"
    },
    {
      id: "proj-4",
      number: "04",
      title: "SecureAuth",
      tagline: "Full-Stack Authentication System with JWT",
      description: "A production-grade authentication system featuring secure user registration, bcrypt password hashing, JWT session management, protected routes, and an Express/SQLite backend.",
      techStack: ["React", "Express.js", "SQLite", "JWT", "Tailwind CSS"],
      githubUrl: "https://github.com/Om-Murugan-o7/SecureAuth",
      liveUrl: "https://secrueauth.ommurugan.engineer/",
      featured: true,
      category: "Web Security & Full Stack"
    }
  ],
  socialLinks: {
    github: "https://github.com/Om-Murugan-o7",
    githubUsername: "Om-Murugan-o7",
    linkedin: "https://www.linkedin.com/in/om-murugan-manraj",
    linkedinUsername: "om-murugan-manraj",
    email: "ommuruganmanraj@gmail.com"
  },
  spokenLanguages: ["Tamil", "English"],
  coreCompetencies: ["Strategic Planning", "Communication", "Data Analysis", "Digital Marketing"]
};
