import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Briefcase, ChevronRight } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { courses, opportunities, student } from "@/lib/mock-data";

export const Route = createFileRoute("/student/")({
  head: () => ({
    meta: [
      { title: "Student dashboard · LaunchPad" },
      { name: "description", content: "Track learning progress and matched opportunities." },
    ],
  }),
  component: StudentHome,
});

function Stat({ label, value, tone }: { label: string; value: number | string; tone: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 text-4xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  to,
}: {
  icon: typeof BookOpen;
  title: string;
  to: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Icon className="size-5 text-muted-foreground" />
        {title}
      </h2>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        See all <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}

function StudentHome() {
  const { enrollments, applications } = useAppState();
  const inProgress = enrollments.filter((e) => e.progress > 0 && e.progress < 100);
  const completed = enrollments.filter((e) => e.progress >= 100);

  const completedIds = new Set(completed.map((e) => e.courseId));
  const matched = opportunities.filter((o) =>
    o.requiredCourses.every((c) => completedIds.has(c)),
  );

  const current = inProgress[0]
    ? courses.find((c) => c.id === inProgress[0].courseId)
    : undefined;
  const currentProgress = inProgress[0]?.progress ?? 0;

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Student dashboard
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Welcome back, {student.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 text-muted-foreground">
          {student.major} · {student.year} · {student.skills.join(", ")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="In progress" value={inProgress.length} tone="text-foreground" />
        <Stat label="Completed" value={completed.length} tone="text-emerald-600" />
        <Stat label="Matched opportunities" value={matched.length} tone="text-foreground" />
      </div>

      <section>
        <SectionHeader icon={BookOpen} title="Continue learning" to="/student/learning" />
        {current ? (
          <Link
            to="/student/courses/$id"
            params={{ id: current.id }}
            className="block rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                {current.type === "simulation" ? "Simulation" : "Course"}
              </span>
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs">
                {current.level}
              </span>
            </div>
            <div className="mt-3 text-lg font-semibold">{current.title}</div>
            <div className="text-sm text-muted-foreground">{current.company}</div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{currentProgress}% complete</div>
          </Link>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Nothing in progress.{" "}
            <Link to="/student/discover" className="font-medium text-foreground underline">
              Discover a program
            </Link>
            .
          </div>
        )}
      </section>

      <section>
        <SectionHeader icon={Briefcase} title="Matched for you" to="/student/opportunities" />
        {matched.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Complete courses to unlock matched opportunities.
          </div>
        ) : (
          <div className="grid gap-3">
            {matched.slice(0, 3).map((op) => {
              const applied = applications.some((a) => a.opportunityId === op.id);
              return (
                <Link
                  key={op.id}
                  to="/student/opportunities/$id"
                  params={{ id: op.id }}
                  className="block rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                          Qualified · 100
                        </span>
                      </div>
                      <div className="mt-3 text-lg font-semibold">{op.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {op.company} · {op.location}
                      </div>
                      <div className="mt-2 text-sm text-emerald-700">
                        Completed all {op.requiredCourses.length} required course(s)
                      </div>
                    </div>
                    <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs">
                      {applied ? "applied" : op.type}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
