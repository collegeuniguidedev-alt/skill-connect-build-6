import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { company, courses } from "@/lib/mock-data";

export const Route = createFileRoute("/company/courses")({
  head: () => ({ meta: [{ title: "Courses & Sims · Company" }] }),
  component: CompanyCourses,
});

function CompanyCourses() {
  const { enrollments } = useAppState();
  const list = courses.filter((c) => c.company === company.name);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Catalog</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Courses & Simulations</h1>
          <p className="mt-2 text-muted-foreground">Programs you publish on LaunchPad.</p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">
          <Plus className="size-4" /> New course
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((c) => {
          const enrolled = enrollments.filter((e) => e.courseId === c.id).length;
          const completed = enrollments.filter((e) => e.courseId === c.id && e.progress >= 100).length;
          return (
            <div key={c.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div
                className="h-32 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${c.cover})` }}
              />
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 capitalize">
                    {c.type}
                  </span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs">
                    {c.level}
                  </span>
                </div>
                <div className="mt-3 text-lg font-semibold">{c.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-secondary px-3 py-2">
                    <div className="text-xs text-muted-foreground">Enrolled</div>
                    <div className="font-semibold">{enrolled}</div>
                  </div>
                  <div className="rounded-md bg-secondary px-3 py-2">
                    <div className="text-xs text-muted-foreground">Completed</div>
                    <div className="font-semibold">{completed}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
