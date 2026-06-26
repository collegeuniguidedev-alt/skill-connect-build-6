import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/student/learning")({
  head: () => ({ meta: [{ title: "My Learning · LaunchPad" }] }),
  component: Learning,
});

function Learning() {
  const { enrollments } = useAppState();
  const inProgress = enrollments.filter((e) => e.progress < 100);
  const earned = enrollments.filter((e) => e.progress >= 100);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Your journey</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">My Learning</h1>
        <p className="mt-2 text-muted-foreground">Track in-progress work and earned credentials.</p>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">In progress</h2>
        {inProgress.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Nothing in progress.
          </div>
        ) : (
          <div className="grid gap-3">
            {inProgress.map((e) => {
              const c = courses.find((x) => x.id === e.courseId);
              if (!c) return null;
              return (
                <Link
                  key={e.courseId}
                  to="/student/courses/$id"
                  params={{ id: c.id }}
                  className="block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md"
                >
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 capitalize">
                    {c.type}
                  </span>
                  <div className="mt-2 text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.company}</div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-emerald-500" style={{ width: `${e.progress}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{e.progress}% complete</div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Earned credentials</h2>
        {earned.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Complete a course to earn a credential.
          </div>
        ) : (
          <div className="grid gap-3">
            {earned.map((e) => {
              const c = courses.find((x) => x.id === e.courseId);
              if (!c) return null;
              return (
                <div
                  key={e.courseId}
                  className="rounded-xl border border-border bg-emerald-50/60 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      ✓ Credential
                    </span>
                    <span className="text-sm text-muted-foreground">Score {e.score ?? 100}</span>
                  </div>
                  <div className="mt-2 text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.company}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
