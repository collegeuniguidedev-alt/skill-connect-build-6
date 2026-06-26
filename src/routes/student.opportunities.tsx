import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState } from "@/lib/app-state";
import { opportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/student/opportunities")({
  head: () => ({ meta: [{ title: "Opportunities · LaunchPad" }] }),
  component: Opportunities,
});

function Opportunities() {
  const { enrollments, applications } = useAppState();
  const completedIds = new Set(
    enrollments.filter((e) => e.progress >= 100).map((e) => e.courseId),
  );
  const [tab, setTab] = useState<"matched" | "all">("matched");

  const list = opportunities.filter((o) =>
    tab === "matched" ? o.requiredCourses.every((c) => completedIds.has(c)) : true,
  );
  const matchedCount = opportunities.filter((o) =>
    o.requiredCourses.every((c) => completedIds.has(c)),
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Career</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Opportunities</h1>
        <p className="mt-2 text-muted-foreground">
          Internships and jobs from companies whose programs you've completed.
        </p>
      </div>

      <div className="inline-flex rounded-md border border-border bg-card p-1">
        <button
          onClick={() => setTab("matched")}
          className={`rounded px-3 py-1.5 text-sm ${
            tab === "matched" ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          Matched ({matchedCount})
        </button>
        <button
          onClick={() => setTab("all")}
          className={`rounded px-3 py-1.5 text-sm ${
            tab === "all" ? "bg-foreground text-background" : "text-muted-foreground"
          }`}
        >
          All ({opportunities.length})
        </button>
      </div>

      <div className="grid gap-3">
        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            No matched opportunities yet. Complete required courses to qualify.
          </div>
        ) : (
          list.map((op) => {
            const qualified = op.requiredCourses.every((c) => completedIds.has(c));
            const applied = applications.some((a) => a.opportunityId === op.id);
            return (
              <Link
                key={op.id}
                to="/student/opportunities/$id"
                params={{ id: op.id }}
                className="block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {qualified ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                        Qualified · 100
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        Not yet qualified
                      </span>
                    )}
                    <div className="mt-3 text-lg font-semibold">{op.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {op.company} · {op.location}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {qualified
                        ? `Completed all ${op.requiredCourses.length} required course(s)`
                        : `${op.requiredCourses.filter((c) => completedIds.has(c)).length} of ${op.requiredCourses.length} required course(s) completed`}
                    </div>
                  </div>
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs">
                    {applied ? "applied" : op.type}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
