import { createFileRoute } from "@tanstack/react-router";
import { college } from "@/lib/mock-data";

export const Route = createFileRoute("/college/students")({
  head: () => ({ meta: [{ title: "Students · College" }] }),
  component: CollegeStudents,
});

function CollegeStudents() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Roster</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Students</h1>
        <p className="mt-2 text-muted-foreground">
          All learners from {college.name} on LaunchPad.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-border bg-secondary/40 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-4">Student</div>
          <div className="col-span-2">Year</div>
          <div className="col-span-4">Current activity</div>
          <div className="col-span-2 text-right">Progress</div>
        </div>
        {college.roster.map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center gap-4 border-t border-border px-4 py-3">
            <div className="col-span-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                {r.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.major}</div>
              </div>
            </div>
            <div className="col-span-2 text-sm text-muted-foreground">{r.year}</div>
            <div className="col-span-4 text-sm">{r.activity}</div>
            <div className="col-span-2 text-right">
              <div className="text-sm font-semibold">{r.progress}%</div>
              <div className="text-xs text-muted-foreground">{r.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
