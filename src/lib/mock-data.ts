export type Course = {
  id: string;
  title: string;
  type: "course" | "simulation";
  level: "Beginner" | "Intermediate" | "Advanced";
  company: string;
  description: string;
  skills: string[];
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "job" | "internship";
  requiredCourses: string[];
  description: string;
};

export type Enrollment = {
  courseId: string;
  progress: number; // 0-100
  score?: number;
};

export type Application = {
  id: string;
  opportunityId: string;
  status: "submitted" | "in_review" | "interview" | "offer" | "rejected";
  appliedAt: string;
};

export type Student = {
  id: string;
  name: string;
  avatar: string;
  major: string;
  year: string;
  skills: string[];
};

export const courses: Course[] = [
  {
    id: "c_dash_sim",
    title: "Dashboard Design Simulation",
    type: "simulation",
    level: "Intermediate",
    company: "Acme Analytics",
    description:
      "Step into the shoes of a data analyst. Design a working KPI dashboard from a real product brief.",
    skills: ["Data Viz", "Figma", "SQL"],
  },
  {
    id: "c_sql_basics",
    title: "SQL for Analysts",
    type: "course",
    level: "Beginner",
    company: "Acme Analytics",
    description: "Learn the SQL fundamentals analysts use every day: SELECT, JOIN, GROUP BY, CTEs.",
    skills: ["SQL"],
  },
  {
    id: "c_pd_sprint",
    title: "Product Design Sprint Simulation",
    type: "simulation",
    level: "Intermediate",
    company: "Northwind Studio",
    description: "Run a 5-day design sprint against a real client prompt.",
    skills: ["UX", "Figma", "Research"],
  },
  {
    id: "c_robotics",
    title: "Intro to Robotics",
    type: "course",
    level: "Beginner",
    company: "Forge Robotics",
    description: "Mechatronics fundamentals: sensors, actuators, and control loops.",
    skills: ["Python", "ROS"],
  },
  {
    id: "c_ml_intro",
    title: "Applied Machine Learning",
    type: "course",
    level: "Advanced",
    company: "Helix AI",
    description: "Train, evaluate, and ship supervised models with scikit-learn and PyTorch.",
    skills: ["Python", "ML"],
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "op_acme_job",
    title: "Analytics Engineer",
    company: "Acme Analytics",
    location: "Remote",
    type: "job",
    requiredCourses: ["c_sql_basics"],
    description:
      "Build the data models and dashboards our product team relies on. You'll own pipelines end-to-end.",
  },
  {
    id: "op_acme_intern",
    title: "Data Analyst Intern",
    company: "Acme Analytics",
    location: "Remote",
    type: "internship",
    requiredCourses: ["c_sql_basics", "c_dash_sim"],
    description: "Summer internship working with our analytics team on real product questions.",
  },
  {
    id: "op_nw_intern",
    title: "Product Design Intern",
    company: "Northwind Studio",
    location: "New York, NY",
    type: "internship",
    requiredCourses: ["c_pd_sprint"],
    description: "Join a small studio designing consumer products for early-stage startups.",
  },
  {
    id: "op_helix_job",
    title: "ML Engineer, New Grad",
    company: "Helix AI",
    location: "San Francisco, CA",
    type: "job",
    requiredCourses: ["c_ml_intro"],
    description: "Ship ML systems from prototype to production alongside founding engineers.",
  },
];

export const student: Student = {
  id: "s_maya",
  name: "Maya Patel",
  avatar: "MP",
  major: "Computer Science",
  year: "Junior",
  skills: ["Python", "SQL", "Data Viz"],
};

export const initialEnrollments: Enrollment[] = [
  { courseId: "c_dash_sim", progress: 60 },
  { courseId: "c_sql_basics", progress: 100, score: 86 },
];

export const initialApplications: Application[] = [];

export const college = {
  name: "Riverside University",
  description: "A public research university.",
  roster: [
    { name: "Maya Patel", major: "Computer Science", activity: "Dashboard Design Simulation", status: "in_progress · 60%" },
    { name: "Leo Garcia", major: "Design", activity: "Product Design Sprint Simulation", status: "completed · 100%" },
    { name: "Aria Chen", major: "Mechanical Engineering", activity: "Intro to Robotics", status: "in_progress · 35%" },
  ],
};

export const company = {
  name: "Acme Analytics",
  description: "We help teams make better decisions with data.",
};
