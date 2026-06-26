import { createFileRoute } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";
import { company, courses, opportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/company/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Company" }] }),
  component: CompanyAnalytics,
});

function CompanyAnalytics() {
  const { enrollments, applications } = useAppState();
  const programs = courses.filter((c) => c.company === company.name);
  const programIds = new Set(programs.map((c) => c.id));
  const enrolls = enrollments.filter((e) => programIds.has(e.courseId));
  const opIds = new Set(opportunities.filter((o) => o.company === company.name).map((o) => o.id));
  const apps = applications.filter((a) => opIds.has(a.opportunityId));
  const avgProgress = enrolls.length
    ? Math.round(enrolls.reduce((s, e) => s + e.progress, 0) / enrolls.length)
    : 0;

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Insights</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          How learners and applicants are engaging with your programs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Avg progress</div>
          <div className="mt-2 text-4xl font-semibold text-sky-700">{avgProgress}%</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total enrollments</div>
          <div className="mt-2 text-4xl font-semibold text-sky-700">{enrolls.length}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Applications</div>
          <div className="mt-2 text-4xl font-semibold text-sky-700">{apps.length}</div>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Program performance</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {programs.map((c, i) => {
            const list = enrolls.filter((e) => e.courseId === c.id);
            const progress = list.length
              ? Math.round(list.reduce((s, e) => s + e.progress, 0) / list.length)
              : 0;
            return (
              <div
                key={c.id}
                className={`p-4 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {list.length} enrolled · {progress}% avg
                  </div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-sky-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
