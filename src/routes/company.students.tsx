import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/mock-data";

export const Route = createFileRoute("/company/students")({
  head: () => ({ meta: [{ title: "Students · Company" }] }),
  component: CompanyStudents,
});

function CompanyStudents() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Talent pool</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Students</h1>
        <p className="mt-2 text-muted-foreground">
          Learners engaging with {company.name} programs.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {company.students.map((s, i) => (
          <div
            key={s.id}
            className={`flex items-center justify-between p-4 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                {s.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.program}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">{s.status}</div>
              {s.score !== undefined && (
                <div className="text-xs text-muted-foreground">Score {s.score}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
