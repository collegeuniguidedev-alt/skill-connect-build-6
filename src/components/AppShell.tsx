import { Link, Outlet } from "@tanstack/react-router";
import { Building2, ChevronDown, GraduationCap, User } from "lucide-react";
import type { ReactNode } from "react";
import { college, company, student } from "@/lib/mock-data";

type Persona = "student" | "company" | "college";

function PersonaSwitch({ active }: { active: Persona }) {
  const items: { id: Persona; label: string; icon: typeof User; to: string }[] = [
    { id: "student", label: "Student", icon: User, to: "/student" },
    { id: "company", label: "Company", icon: Building2, to: "/company" },
    { id: "college", label: "College", icon: GraduationCap, to: "/college" },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = it.id === active;
        return (
          <Link
            key={it.id}
            to={it.to}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-4" />
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}

function PersonaBadge({ persona }: { persona: Persona }) {
  if (persona === "student") {
    return (
      <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
        <div className="flex size-7 items-center justify-center rounded-full bg-rose-200 text-xs font-semibold text-rose-900">
          {student.avatar}
        </div>
        <span className="text-sm font-medium">{student.name}</span>
      </div>
    );
  }
  if (persona === "company") {
    return (
      <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
        <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-xs font-semibold text-background">
          <Building2 className="size-4" />
        </div>
        <span className="text-sm font-medium">{company.name}</span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
      <span className="text-sm font-medium">{college.name}</span>
      <ChevronDown className="size-4 text-muted-foreground" />
    </div>
  );
}

function Header({ persona }: { persona: Persona }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background font-semibold">
            S
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">SkillTern</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Internship Ops
            </div>
          </div>
        </Link>
        <PersonaSwitch active={persona} />
        <PersonaBadge persona={persona} />
      </div>
    </header>
  );
}

function SubNav({ items }: { items: { label: string; to: string; exact?: boolean }[] }) {
  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl gap-2 px-6">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            activeOptions={{ exact: it.exact }}
            className="rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-6">
      <div className="mx-auto max-w-6xl px-6 text-xs text-muted-foreground">
        SkillTern — AI-powered Internship Operations & Monitoring Platform for companies, colleges, and students.
      </div>
    </footer>
  );
}

const navByPersona: Record<Persona, { label: string; to: string; exact?: boolean }[]> = {
  student: [
    { label: "Home", to: "/student", exact: true },
    { label: "My Internship", to: "/student/internship" },
    { label: "Discover", to: "/student/discover" },
    { label: "My Learning", to: "/student/learning" },
    { label: "Opportunities", to: "/student/opportunities" },
    { label: "Applications", to: "/student/applications" },
  ],
  company: [
    { label: "Overview", to: "/company", exact: true },
    { label: "Interns Ops", to: "/company/interns" },
    { label: "Courses & Sims", to: "/company/courses" },
    { label: "Opportunities", to: "/company/opportunities" },
    { label: "Students", to: "/company/students" },
    { label: "Analytics", to: "/company/analytics" },
  ],
  college: [
    { label: "Overview", to: "/college", exact: true },
    { label: "Internship Monitor", to: "/college/internships" },
    { label: "Students", to: "/college/students" },
    { label: "Companies", to: "/college/companies" },
    { label: "Analytics", to: "/college/analytics" },
  ],
};

export function AppShell({
  persona,
  children,
  showSubNav = true,
}: {
  persona: Persona;
  children?: ReactNode;
  showSubNav?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[oklch(0.985_0.003_85)] text-foreground">
      <Header persona={persona} />
      {showSubNav ? <SubNav items={navByPersona[persona]} /> : null}
      <main className="mx-auto max-w-6xl px-6 py-10">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
