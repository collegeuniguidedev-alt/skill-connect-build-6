import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users, GraduationCap, Award } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { company, courses, opportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/company/")({
  head: () => ({ meta: [{ title: "Company · LaunchPad" }] }),
  component: CompanyOverview,
});

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-4xl font-semibold text-sky-700">{value}</div>
    </div>
  );
}

function CompanyOverview() {
  const { enrollments, applications } = useAppState();
  const companyPrograms = courses.filter((c) => c.company === company.name);
  const companyOps = opportunities.filter((o) => o.company === company.name);
  const programIds = new Set(companyPrograms.map((c) => c.id));
  const enrolls = enrollments.filter((e) => programIds.has(e.courseId));
  const completed = enrolls.filter((e) => e.progress >= 100).length;
  const completionRate = enrolls.length ? Math.round((completed / enrolls.length) * 100) : 0;
  const opIds = new Set(companyOps.map((o) => o.id));
  const apps = applications.filter((a) => opIds.has(a.opportunityId)).length;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Company</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{company.name}</h1>
          <p className="mt-2 text-muted-foreground">{company.description}</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-accent">
            <Plus className="size-4" /> New course
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">
            <Plus className="size-4" /> New opportunity
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Programs" value={companyPrograms.length} />
        <Stat label="Enrollments" value={enrolls.length} />
        <Stat label="Completion rate" value={`${completionRate}%`} />
        <Stat label="Applications" value={apps} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your programs</h2>
            <Link to="/company/courses" className="text-sm text-muted-foreground hover:text-foreground">
              Manage →
            </Link>
          </div>
          <div className="grid gap-3">
            {companyPrograms.map((c) => {
              const enrolled = enrolls.filter((e) => e.courseId === c.id).length;
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {c.type} · {enrolled} enrolled
                    </div>
                  </div>
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                    {c.level}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Open opportunities</h2>
            <Link to="/company/opportunities" className="text-sm text-muted-foreground hover:text-foreground">
              Manage →
            </Link>
          </div>
          <div className="grid gap-3">
            {companyOps.map((op) => (
              <div
                key={op.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div>
                  <div className="font-medium">{op.title}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {op.type} · {op.location}
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  active
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
