import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/student/courses/$id")({
  head: () => ({ meta: [{ title: "Course · LaunchPad" }] }),
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="text-center text-muted-foreground">Course not found.</div>
  ),
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.id);
    if (!course) throw notFound();
    return { course };
  },
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const { enrollments, enroll, advance } = useAppState();
  const enrollment = enrollments.find((e) => e.courseId === course.id);
  const progress = enrollment?.progress ?? 0;

  return (
    <div className="space-y-6">
      <Link
        to="/student/discover"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to discover
      </Link>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 capitalize">
            {course.type}
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs">
            {course.level}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{course.title}</h1>
        <div className="mt-1 text-muted-foreground">{course.company}</div>
        <p className="mt-4 text-sm leading-6 text-foreground/90">{course.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {course.skills.map((s: string) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6">
          {enrollment ? (
            <>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{progress}% complete</span>
                {progress < 100 ? (
                  <button
                    onClick={() => advance(course.id, 20)}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    Mark next module complete
                  </button>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                    ✓ Credential earned (score {enrollment.score ?? 100})
                  </span>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => enroll(course.id)}
              className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
