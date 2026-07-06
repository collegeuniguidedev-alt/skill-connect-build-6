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

// ============================================================
// Internship Operations & Monitoring (SkillTern)
// ============================================================

export type DailyTask = {
  id: string;
  title: string;
  due: string; // "Today · 6:00 PM"
  status: "pending" | "submitted" | "reviewed";
  aiFeedback?: string;
};

export type MentorMessage = {
  id: string;
  from: "ai" | "you";
  text: string;
  time: string;
};

export type WeeklyEvaluation = {
  week: number;
  range: string;
  score: number; // 0-100
  summary: string;
  strengths: string[];
  improvements: string[];
};

export const studentInternship = {
  role: "Data Analyst Intern",
  company: "Acme Analytics",
  mentor: "Priya Rao",
  weekOf: "Week 4 of 12",
  ppoReadiness: 72, // %
  streakDays: 11,
  tasksThisWeek: { completed: 4, total: 6 },
  tasks: [
    {
      id: "t1",
      title: "Clean weekly signup funnel dataset and post summary",
      due: "Today · 6:00 PM",
      status: "pending",
    },
    {
      id: "t2",
      title: "Draft KPI definitions for retention dashboard",
      due: "Today · 9:00 PM",
      status: "pending",
    },
    {
      id: "t3",
      title: "Submit SQL query for weekly active users",
      due: "Yesterday",
      status: "submitted",
      aiFeedback: "Query returns correct results. Consider adding an index hint for the users table.",
    },
    {
      id: "t4",
      title: "Read stakeholder brief and post 3 clarifying questions",
      due: "Mon",
      status: "reviewed",
      aiFeedback: "Great questions. Mentor marked as excellent.",
    },
  ] as DailyTask[],
  mentorThread: [
    { id: "m1", from: "ai", text: "Morning! You have 2 tasks due today. Want me to break down the retention KPI task?", time: "8:02 AM" },
    { id: "m2", from: "you", text: "Yes, and how do I handle nulls in the signup funnel?", time: "8:04 AM" },
    { id: "m3", from: "ai", text: "For signup funnel nulls: treat missing referral_source as 'direct'. I've dropped a snippet in your workspace.", time: "8:04 AM" },
  ] as MentorMessage[],
  evaluations: [
    { week: 3, range: "Jun 24 – Jun 30", score: 82, summary: "Strong task completion and clear written updates. Slight lag on peer reviews.", strengths: ["Task quality", "Communication"], improvements: ["Peer review speed"] },
    { week: 2, range: "Jun 17 – Jun 23", score: 76, summary: "Solid start on SQL work. Missed one stakeholder update.", strengths: ["Technical fundamentals"], improvements: ["Stakeholder cadence"] },
  ] as WeeklyEvaluation[],
};

export type ActiveIntern = {
  id: string;
  name: string;
  role: string;
  college: string;
  tasksDone: number;
  tasksTotal: number;
  lastActive: string;
  state: "on_track" | "needs_intervention" | "inactive" | "top";
  aiNote: string;
};

export const companyInternshipOps = {
  active: 42,
  onTrack: 31,
  needIntervention: 6,
  inactive: 5,
  ppoRecommended: 8,
  managerHoursSaved: 27, // this week
  weeklyAiSummary:
    "42 active interns this week. 31 are on track. 6 need mentor intervention (blocked on data access or unclear briefs). 5 have been inactive for 3+ days — nudged automatically. Top 8 interns are ready for PPO interviews based on task quality and evaluation scores.",
  alerts: [
    { id: "a1", severity: "high", text: "Rohan Mehta — no submission in 4 days. Auto-nudge sent, mentor notified." },
    { id: "a2", severity: "med", text: "3 interns blocked on staging DB access. Ops ticket opened." },
    { id: "a3", severity: "low", text: "Weekly evaluation drafts ready for 12 interns — awaiting manager approval." },
  ],
  interns: [
    { id: "i1", name: "Maya Patel", role: "Data Analyst Intern", college: "Riverside University", tasksDone: 18, tasksTotal: 20, lastActive: "10 min ago", state: "top", aiNote: "Consistently high quality. Recommended for PPO interview." },
    { id: "i2", name: "Leo Garcia", role: "Product Design Intern", college: "Riverside University", tasksDone: 15, tasksTotal: 18, lastActive: "1 hr ago", state: "on_track", aiNote: "Steady progress. Strong stakeholder communication." },
    { id: "i3", name: "Rohan Mehta", role: "Analytics Engineer Intern", college: "Metro Tech Institute", tasksDone: 4, tasksTotal: 14, lastActive: "4 days ago", state: "inactive", aiNote: "Inactive for 4 days. Auto-nudged. Mentor notified." },
    { id: "i4", name: "Aria Chen", role: "Robotics Intern", college: "Riverside University", tasksDone: 9, tasksTotal: 16, lastActive: "6 hr ago", state: "needs_intervention", aiNote: "Blocked on hardware access. Ops ticket opened." },
    { id: "i5", name: "Jon Park", role: "Data Analyst Intern", college: "Metro Tech Institute", tasksDone: 12, tasksTotal: 16, lastActive: "30 min ago", state: "on_track", aiNote: "Improving week-over-week." },
    { id: "i6", name: "Sana Iyer", role: "ML Engineer Intern", college: "Riverside University", tasksDone: 17, tasksTotal: 18, lastActive: "5 min ago", state: "top", aiNote: "Top submission quality. PPO candidate." },
  ] as ActiveIntern[],
};

export type CollegeInternshipRow = {
  id: string;
  name: string;
  department: string;
  company: string;
  role: string;
  progress: number; // %
  state: "on_track" | "needs_intervention" | "inactive" | "top";
  lastUpdate: string;
};

export const collegeInternshipMonitor = {
  activeInternships: 58,
  companies: 14,
  onTrack: 41,
  needIntervention: 9,
  inactive: 8,
  completionReady: 22,
  weeklyAiDigest:
    "58 students are on active internships across 14 companies. 41 on track, 9 need faculty check-in, 8 flagged inactive. 22 seniors are on track for completion this month. Computer Science leads with 93% task submission rate.",
  byDepartment: [
    { department: "Computer Science", active: 22, onTrack: 18, submission: 93 },
    { department: "Design", active: 11, onTrack: 8, submission: 87 },
    { department: "Mechanical Engineering", active: 12, onTrack: 7, submission: 78 },
    { department: "Business", active: 13, onTrack: 8, submission: 82 },
  ],
  students: [
    { id: "s1", name: "Maya Patel", department: "Computer Science", company: "Acme Analytics", role: "Data Analyst Intern", progress: 90, state: "top", lastUpdate: "Today" },
    { id: "s2", name: "Leo Garcia", department: "Design", company: "Northwind Studio", role: "Product Design Intern", progress: 78, state: "on_track", lastUpdate: "Today" },
    { id: "s3", name: "Aria Chen", department: "Mechanical Engineering", company: "Forge Robotics", role: "Robotics Intern", progress: 55, state: "needs_intervention", lastUpdate: "Yesterday" },
    { id: "s4", name: "Rohan Mehta", department: "Computer Science", company: "Helix AI", role: "Analytics Engineer Intern", progress: 28, state: "inactive", lastUpdate: "4 days ago" },
    { id: "s5", name: "Sana Iyer", department: "Computer Science", company: "Helix AI", role: "ML Engineer Intern", progress: 94, state: "top", lastUpdate: "Today" },
  ] as CollegeInternshipRow[],
};

