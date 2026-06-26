import { createFileRoute } from "@tanstack/react-router";
import { college } from "@/lib/mock-data";

export const Route = createFileRoute("/college/analytics")({
  head: () => ({ meta: [{ title: "Analytics · College" }] }),
  component: CollegeAnalytics,
});

function CollegeAnalytics() {
  const total = college.roster.length;
  const avg = Math.round(college.roster.reduce((s, r) => s + r.progress, 0) / total);
  const completed = college.roster.filter((r) => r.progress >= 100).length;

  const majors = Array.from(new Set(college.roster.map((r) => r.major)));

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Insights</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          How {college.name} students are progressing on LaunchPad.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Avg progress</div>
          <div className="mt-2 text-4xl font-semibold text-orange-600">{avg}%</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Completions</div>
          <div className="mt-2 text-4xl font-semibold text-orange-600">{completed}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Majors represented</div>
          <div className="mt-2 text-4xl font-semibold text-orange-600">{majors.length}</div>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">By major</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {majors.map((m, i) => {
            const list = college.roster.filter((r) => r.major === m);
            const a = Math.round(list.reduce((s, r) => s + r.progress, 0) / list.length);
            return (
              <div key={m} className={`p-4 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{m}</div>
                  <div className="text-sm text-muted-foreground">{list.length} student(s) · {a}% avg</div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-orange-500" style={{ width: `${a}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
