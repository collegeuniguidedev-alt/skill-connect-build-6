import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Building2, GraduationCap, User } from "lucide-react";
import type { ReactNode } from "react";
import { student } from "@/lib/mock-data";

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

function Header({ persona }: { persona: Persona }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background font-semibold">
            L
          </div>
          <span className="font-semibold tracking-tight">LaunchPad</span>
        </Link>
        <PersonaSwitch active={persona} />
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
          <div className="flex size-7 items-center justify-center rounded-full bg-rose-200 text-xs font-semibold text-rose-900">
            {student.avatar}
          </div>
          <span className="text-sm font-medium">{student.name}</span>
        </div>
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
        LaunchPad — connecting students, colleges, and companies through courses, simulations, and
        real opportunities.
      </div>
    </footer>
  );
}

export function AppShell({
  persona,
  children,
  showSubNav = true,
}: {
  persona: Persona;
  children?: ReactNode;
  showSubNav?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const studentNav = [
    { label: "Home", to: "/student", exact: true },
    { label: "Discover", to: "/student/discover" },
    { label: "My Learning", to: "/student/learning" },
    { label: "Opportunities", to: "/student/opportunities" },
    { label: "Applications", to: "/student/applications" },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.003_85)] text-foreground">
      <Header persona={persona} />
      {showSubNav && persona === "student" && pathname.startsWith("/student") ? (
        <SubNav items={studentNav} />
      ) : null}
      <main className="mx-auto max-w-6xl px-6 py-10">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
