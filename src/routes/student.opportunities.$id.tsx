import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";
import { courses, opportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/student/opportunities/$id")({
  head: () => ({ meta: [{ title: "Opportunity · LaunchPad" }] }),
  component: OpportunityDetail,
  notFoundComponent: () => (
    <div className="text-center text-muted-foreground">Opportunity not found.</div>
  ),
  loader: ({ params }) => {
    const op = opportunities.find((o) => o.id === params.id);
    if (!op) throw notFound();
    return { op };
  },
});

function OpportunityDetail() {
  const { op } = Route.useLoaderData();
  const { enrollments, applications, apply } = useAppState();
  const completedIds = new Set(
    enrollments.filter((e) => e.progress >= 100).map((e) => e.courseId),
  );
  const qualified = op.requiredCourses.every((c) => completedIds.has(c));
  const applied = applications.some((a) => a.opportunityId === op.id);

  return (
    <div className="space-y-6">
      <Link to="/student/opportunities" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to opportunities
      </Link>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs capitalize">
            {op.type}
          </span>
          {qualified ? (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
              Qualified
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              Complete required courses to qualify
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{op.title}</h1>
        <div className="mt-1 text-muted-foreground">
          {op.company} · {op.location}
        </div>
        <p className="mt-4 text-sm leading-6 text-foreground/90">{op.description}</p>

        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Required programs
        </h2>
        <ul className="mt-2 space-y-2">
          {op.requiredCourses.map((cid) => {
            const c = courses.find((x) => x.id === cid);
            const done = completedIds.has(cid);
            if (!c) return null;
            return (
              <li
                key={cid}
                className="flex items-center justify-between rounded-md border border-border bg-background p-3 text-sm"
              >
                <span>{c.title}</span>
                <span
                  className={
                    done ? "text-emerald-700" : "text-muted-foreground"
                  }
                >
                  {done ? "✓ Completed" : "Not completed"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <button
            disabled={!qualified || applied}
            onClick={() => apply(op.id)}
            className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {applied ? "Application submitted" : qualified ? "Apply now" : "Not qualified"}
          </button>
        </div>
      </div>
    </div>
  );
}
