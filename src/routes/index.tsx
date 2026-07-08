import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  Briefcase,
  Building2,
  ChevronDown,
  GraduationCap,
  LineChart,
  LogIn,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillTern — Turn internships into a measurable, monitored programme" },
      {
        name: "description",
        content:
          "SkillTern is the AI-powered internship operations and monitoring platform. Companies scale internships without losing supervision, colleges see real placement outcomes, students get daily tasks and an AI mentor.",
      },
      { property: "og:title", content: "SkillTern — AI Internship Operations Platform" },
      {
        property: "og:description",
        content:
          "Register your college, hire your next intern, or explore as a guest. Operations, monitoring and outcomes — in one platform.",
      },
    ],
  }),
  component: Landing,
});

function TopBar() {
  const [openCurators, setOpenCurators] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground font-semibold text-background">
            S
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">SkillTern</div>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
              Internship Ops
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          <a href="#jobs" className="rounded px-3 py-1.5 text-muted-foreground hover:text-foreground">
            Internships
          </a>
          <a href="#companies" className="rounded px-3 py-1.5 text-muted-foreground hover:text-foreground">
            Companies
          </a>
          <a href="#services" className="rounded px-3 py-1.5 text-muted-foreground hover:text-foreground">
            Services
          </a>
          <div
            className="relative"
            onMouseEnter={() => setOpenCurators(true)}
            onMouseLeave={() => setOpenCurators(false)}
          >
            <button className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-muted-foreground hover:text-foreground">
              For Curators <ChevronDown className="size-3.5" />
            </button>
            {openCurators && (
              <div className="absolute left-0 top-full w-64 rounded-lg border border-border bg-card p-2 text-sm shadow-lg">
                <Link to="/company" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-secondary">
                  <Briefcase className="mt-0.5 size-4 text-sky-600" />
                  <div>
                    <div className="font-medium">Internship Ops</div>
                    <div className="text-xs text-muted-foreground">Monitor and manage interns with AI</div>
                  </div>
                </Link>
                <Link to="/company/students" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-secondary">
                  <Users className="mt-0.5 size-4 text-sky-600" />
                  <div>
                    <div className="font-medium">Talent pool</div>
                    <div className="text-xs text-muted-foreground">Qualified students across colleges</div>
                  </div>
                </Link>
                <Link to="/company/analytics" className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-secondary">
                  <LineChart className="mt-0.5 size-4 text-sky-600" />
                  <div>
                    <div className="font-medium">Curator analytics</div>
                    <div className="text-xs text-muted-foreground">Programme ROI and PPO conversion</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/student"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary md:inline-flex"
          >
            <UserRound className="size-3.5" /> Guest Login
          </Link>
          <Link
            to="/college"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary md:inline-flex"
          >
            <GraduationCap className="size-3.5" /> College Login
          </Link>
          <Link
            to="/company"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-foreground/90"
          >
            <Building2 className="size-3.5" /> Company Login
          </Link>
        </div>
      </div>
    </header>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-[oklch(0.985_0.003_85)] text-foreground">
      <TopBar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-amber-500" /> AI-monitored internships, end to end
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Internships that actually deliver outcomes.
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Companies scale programmes without adding supervisors. Colleges see who is placed,
              who is at risk, and what companies really think. Students get daily tasks, an AI
              mentor, and a shot at a pre-placement offer.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/student"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90"
              >
                <LogIn className="size-4" /> Explore as guest
              </Link>
              <Link
                to="/company"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                <Building2 className="size-4" /> Company demo
              </Link>
              <Link
                to="/college"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                <GraduationCap className="size-4" /> College demo
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground">
              <div><span className="text-lg font-semibold text-foreground">140+</span> partner colleges</div>
              <div><span className="text-lg font-semibold text-foreground">2,300+</span> active interns</div>
              <div><span className="text-lg font-semibold text-foreground">92%</span> avg. programme health</div>
            </div>
          </div>

          {/* Register card — Naukri-style */}
          <div id="register" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Register</div>
            <h2 className="text-2xl font-semibold tracking-tight">Get started in 2 minutes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Free to sign up. Choose the persona that fits you.
            </p>
            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Full name</span>
                <input
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
                  placeholder="Your full name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Work / college email</span>
                <input
                  type="email"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
                  placeholder="you@example.com"
                />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { to: "/student", label: "Student", icon: UserRound },
                  { to: "/company", label: "Company", icon: Building2 },
                  { to: "/college", label: "College", icon: GraduationCap },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <Link
                      key={r.to}
                      to={r.to}
                      className="flex flex-col items-center gap-1 rounded-md border border-border bg-background py-3 text-xs font-medium hover:border-foreground"
                    >
                      <Icon className="size-4" />
                      {r.label}
                    </Link>
                  );
                })}
              </div>
              <button className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-foreground text-sm font-medium text-background hover:bg-foreground/90">
                Create free account
              </button>
              <div className="text-center text-xs text-muted-foreground">
                Already registered?{" "}
                <Link to="/company" className="font-medium text-foreground hover:underline">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">One platform, three views</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The same internship, seen the right way for each stakeholder.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: "Companies",
              body: "Scale internship intake without scaling supervisors. AI monitors every intern and flags only what needs you.",
              to: "/company",
              cta: "See company demo",
            },
            {
              icon: GraduationCap,
              title: "Colleges",
              body: "Know exactly who is placed, who is at risk, and what companies say — in real time, not at the end of term.",
              to: "/college",
              cta: "See college demo",
            },
            {
              icon: UserRound,
              title: "Students",
              body: "Daily tasks, weekly evaluations and an AI mentor available 24×7. Everything you do counts toward a PPO.",
              to: "/student",
              cta: "Try student view",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Icon className="size-6 text-sky-600" />
                <div className="mt-3 text-lg font-semibold">{c.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                <Link to={c.to} className="mt-4 inline-flex text-sm font-medium text-sky-700 hover:underline">
                  {c.cta} →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI strip */}
      <section id="companies" className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-800">
                <Bot className="size-3.5" /> AI that earns its keep
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Not another dashboard. Actual insights.
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>“18 students have not submitted work this week.”</li>
                <li>“Company XYZ has not reviewed interns for 8 days.”</li>
                <li>“45 students are excelling in AI-related projects.”</li>
                <li>“Mechanical students are receiving higher mentor ratings than previous cohorts.”</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                College Internship Health
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <div className="text-6xl font-semibold text-emerald-600">92%</div>
                <div className="text-sm text-muted-foreground">this week</div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {[
                  ["Student engagement", 94],
                  ["Company satisfaction", 90],
                  ["Task completion", 89],
                  ["Attendance", 93],
                ].map(([label, v]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs">
                      <span>{label}</span>
                      <span className="font-medium">{v}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-emerald-500" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-xs text-muted-foreground">
          © SkillTern — AI-powered Internship Operations & Monitoring Platform.
        </div>
      </footer>
    </div>
  );
}
