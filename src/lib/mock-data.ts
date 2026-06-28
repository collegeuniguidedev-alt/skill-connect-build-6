export type Course = {
  id: string;
  title: string;
  type: "course" | "simulation";
  level: "Beginner" | "Intermediate" | "Advanced";
  company: string;
  description: string;
  skills: string[];
  cover: string;
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
  progress: number;
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
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "c_sql_basics",
    title: "SQL for Analysts",
    type: "course",
    level: "Beginner",
    company: "Acme Analytics",
    description: "Learn the SQL fundamentals analysts use every day: SELECT, JOIN, GROUP BY, CTEs.",
    skills: ["SQL"],
    cover: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "c_pd_sprint",
    title: "Product Design Sprint Simulation",
    type: "simulation",
    level: "Intermediate",
    company: "Northwind Studio",
    description: "Run a 5-day design sprint against a real client prompt.",
    skills: ["UX", "Figma", "Research"],
    cover: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "c_robotics",
    title: "Intro to Robotics",
    type: "course",
    level: "Beginner",
    company: "Forge Robotics",
    description: "Mechatronics fundamentals: sensors, actuators, and control loops.",
    skills: ["Python", "ROS"],
    cover: "https://images.unsplash.com/photo-1581090700227-1e8e0d3a0a3f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "c_ml_intro",
    title: "Applied Machine Learning",
    type: "course",
    level: "Advanced",
    company: "Helix AI",
    description: "Train, evaluate, and ship supervised models with scikit-learn and PyTorch.",
    skills: ["Python", "ML"],
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=70",
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

export type RosterEntry = {
  id: string;
  name: string;
  major: string;
  year: string;
  activity: string;
  status: string;
  progress: number;
};

export const college = {
  name: "Riverside University",
  description: "A public research university.",
  roster: [
    { id: "r_maya", name: "Maya Patel", major: "Computer Science", year: "Junior", activity: "Dashboard Design Simulation", status: "in_progress", progress: 60 },
    { id: "r_leo", name: "Leo Garcia", major: "Design", year: "Senior", activity: "Product Design Sprint Simulation", status: "completed", progress: 100 },
    { id: "r_aria", name: "Aria Chen", major: "Mechanical Engineering", year: "Sophomore", activity: "Intro to Robotics", status: "in_progress", progress: 35 },
  ] as RosterEntry[],
};

export type AssessmentDimension = {
  key: string;
  label: string;
  score: number; // 0-100, average across qualified pool
  description: string;
};

export const company = {
  name: "Acme Analytics",
  description: "We help teams make better decisions with data.",
  students: [
    { id: "cs_maya", name: "Maya Patel", program: "SQL for Analysts", status: "completed · 100%", score: 86 },
    { id: "cs_jon", name: "Jon Park", program: "Dashboard Design Simulation", status: "in_progress · 40%" },
  ],
  // Talent pool snapshot used on the company dashboard.
  qualifiedPool: {
    total: 142,
    qualified: 38,
    criteria: "Completed SQL for Analysts + Dashboard Design Simulation with score ≥ 75",
  },
  assessments: [
    { key: "academics", label: "Academics", score: 82, description: "GPA, coursework rigor, transcripts" },
    { key: "jobReadiness", label: "Job readiness", score: 71, description: "Simulation performance on real work briefs" },
    { key: "technical", label: "Technical skills", score: 78, description: "SQL, data modeling, dashboarding tasks" },
    { key: "communication", label: "Communication", score: 74, description: "Written submissions and stakeholder updates" },
    { key: "collaboration", label: "Collaboration", score: 80, description: "Peer reviews on group sprints" },
  ] as AssessmentDimension[],
};

export type DepartmentOutcome = {
  department: string;
  students: number;
  placementReady: number; // %
  internshipPlaced: number; // %
  attendance: number; // %
  assignmentsCompleted: number; // %
};

export const collegeOutcomes = {
  placementReadiness: 64, // % of seniors meeting placement criteria
  internshipPlacement: 48, // % with confirmed internship
  attendance: 91, // overall attendance %
  assignmentCompletion: 87, // overall %
  departments: [
    { department: "Computer Science", students: 84, placementReady: 72, internshipPlaced: 58, attendance: 93, assignmentsCompleted: 90 },
    { department: "Design", students: 41, placementReady: 65, internshipPlaced: 51, attendance: 89, assignmentsCompleted: 88 },
    { department: "Mechanical Engineering", students: 67, placementReady: 54, internshipPlaced: 38, attendance: 90, assignmentsCompleted: 82 },
    { department: "Business", students: 95, placementReady: 61, internshipPlaced: 44, attendance: 92, assignmentsCompleted: 86 },
  ] as DepartmentOutcome[],
};
