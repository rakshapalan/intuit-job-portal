import image from "../assets/user.jpeg";
export const CREATE_JOB =
  "https://my.api.mockaroo.com/createJob.json?key=cda21e80&__method=POST";

export const GET_FREELANCE_JOB_DETAILS =
  "https://my.api.mockaroo.com//getFreelanceJobs.json?key=cda21e80";
// "https://my.api.mockaroo.com/getFreelanceJobs.json?key=30c75e00";

export const GET_ALL_JOBS =
  "https://my.api.mockaroo.com/getAllJob.json?key=cda21e80&ffset=100&limit=20";

export const GET_EMPLOYER_JOB_DETAILS =
  "https://my.api.mockaroo.com/getEmployerJobs.json?key=cda21e80";
// "https://my.api.mockaroo.com/getEmployerJobs.json?key=30c75e00";

export const APPLY_TO_JOB =
  // "https://my.api.mockaroo.com/applyToJob.json?key=cda21e80&__method=POST";
  "https://my.api.mockaroo.com/applyToJob.json?key=30c75e00&__method=POST";

export const CREATE_USER =
  "https://my.api.mockaroo.com/createUser.json?key=cda21e80&__method=POST";
export const GITHUB_PATH = "https://api.github.com/users";

export const EmployeeTxt = {
  mainTxt: "Search jobs",
  subTxt:
    "Want to level up your career? View the best jobs and apply to top companies in one click, only on Intuit! 🚀",
};

export const EmployerTxt = {
  mainTxt: "Find Your Next Star Employee",
  subTxt:
    "Looking for top talent to join your team? Intuit connects you with skilled professionals who are ready to make an impact 🚀",
};

export const skillOptions = [
  "JavaScript",
  "Python",
  "Angular",
  "React",
  "Node.js",
  "SQL",
  "Ruby",
  "SPA",
  "CSS",
  "HTML",
];

export const ROLES = {
  EMPLOYER: "employer",
  EMPLOYEE: "user",
};

// Mock users with roles
export const users = [
  { username: "employer1", password: "employer123", role: ROLES.EMPLOYER },
  {
    username: "raksharajeev",
    password: "employee123",
    role: ROLES.EMPLOYEE,
    profile: false,
  },
  {
    username: "rakshapalan",
    password: "employee123",
    role: ROLES.EMPLOYEE,
    profile: true,
  },
];

export const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    contactNumber: "123-456-7890",
    appliedDate: "2023-11-07",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contactNumber: "987-654-3210",
    appliedDate: "2023-11-06",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    contactNumber: "555-123-4567",
    appliedDate: "2023-11-05",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    contactNumber: "123-456-7890",
    appliedDate: "2023-11-07",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contactNumber: "987-654-3210",
    appliedDate: "2023-11-06",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    contactNumber: "555-123-4567",
    appliedDate: "2023-11-05",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    contactNumber: "123-456-7890",
    appliedDate: "2023-11-07",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contactNumber: "987-654-3210",
    appliedDate: "2023-11-06",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    contactNumber: "555-123-4567",
    appliedDate: "2023-11-05",
  },
];

export const MAX_FILE_SIZE = 16 * 1024; // 16KB

export const skillList = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "CSS", label: "CSS" },
  { value: "HTML", label: "HTML" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby", label: "Ruby" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Angular", label: "Angular" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Django", label: "Django" },
  { value: "Flask", label: "Flask" },
  { value: "Spring Boot", label: "Spring Boot" },
  { value: "SQL", label: "SQL" },
  { value: "NoSQL", label: "NoSQL" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "MySQL", label: "MySQL" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Docker", label: "Docker" },
  { value: "AWS", label: "AWS" },
  { value: "Azure", label: "Azure" },
  { value: "Google Cloud", label: "Google Cloud" },
  { value: "TensorFlow", label: "TensorFlow" },
  { value: "PyTorch", label: "PyTorch" },
  { value: "OpenCV", label: "OpenCV" },
  { value: "Selenium", label: "Selenium" },
  { value: "Jenkins", label: "Jenkins" },
  { value: "CI/CD", label: "CI/CD" },
  { value: "Git", label: "Git" },
  { value: "GitHub", label: "GitHub" },
  { value: "REST API", label: "REST API" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "MATLAB", label: "MATLAB" },
  { value: "Simulink", label: "Simulink" },
  { value: "AutoCAD", label: "AutoCAD" },
  { value: "SolidWorks", label: "SolidWorks" },
  { value: "CATIA", label: "CATIA" },
  { value: "ANSYS", label: "ANSYS" },
  { value: "STAAD Pro", label: "STAAD Pro" },
  { value: "ETABS", label: "ETABS" },
  { value: "Primavera", label: "Primavera" },
  { value: "Tableau", label: "Tableau" },
  { value: "Power BI", label: "Power BI" },
];

export const user = {
  name: "Raksha R",
  profilePicture: image, // URL for profile picture, empty if not available
  phone: "9901953218",
  email: "rakshapallan@gmail.com",
  jobTitle: "Software Engineer",
  companyName: "Flipkart",
  noticePeriod: "2 Month",
  salary: "0/year",
  location: "Bangalore",
  resumeHeadline:
    "Experienced Software Engineer with expertise in React and Node.js.",
  projects: [
    {
      title: "E-commerce Platform",
      company: "Flipkart",
      description:
        "Developed a scalable e-commerce platform using React and Javacript.",
    },
    {
      title: "Inventory Management System",
      company: "Piktorlabs",
      description:
        "Designed and implemented a system to manage warehouse inventory.",
    },
  ],
  skills: ["React", "JavaScript", "HTML", "CSS"],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Tech University",
      year: 2018,
    },
    {
      degree: "High School Diploma",
      institution: "Tech High School",
      year: 2014,
    },
  ],

  dateOfBirth: "May 8, 1995",
  address: "kadubeesnahalli, Bellandur, Bangalore",
  accomplishments: [
    "Implemented a high-performance e-commerce platform.",
    "Increased website speed by 30%.",
    "Awarded 'Employee of the Year' in 2020.",
  ],
};

export const headerHeight = 60;

export const header = ["Activity", "Services", "Companies"];
