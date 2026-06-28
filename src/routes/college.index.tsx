import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Briefcase, CalendarCheck, ClipboardCheck } from "lucide-react";
import { college, collegeOutcomes } from "@/lib/mock-data";

export const Route = createFileRoute("/college/")({
  head: () => ({ meta: [{ title: "College · LaunchPad" }] }),
  component: CollegeOverview,
});

function OutcomeStat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4" /> {label}
      </div>
      <div className="mt-2 text-4xl font-semibold text-orange-600">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

function Bar({ value, color = "bg-orange-500" }: { value: number; color?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-secondary">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function CollegeOverview() {
  const { departments } = collegeOutcomes;

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">College</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{college.name}</h1>
        <p className="mt-2 text-muted-foreground">
          Outcome dashboard — placement readiness, internships, attendance and coursework across departments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <OutcomeStat
          icon={Target}
          label="Placement readiness"
          value={`${collegeOutcomes.placementReadiness}%`}
          hint="Seniors meeting employer criteria"
        />
        <OutcomeStat
          icon={Briefcase}
          label="Internship placed"
          value={`${collegeOutcomes.internshipPlacement}%`}
          hint="Students with confirmed offers"
        />
        <OutcomeStat
          icon={CalendarCheck}
          label="Attendance"
          value={`${collegeOutcomes.attendance}%`}
          hint="Term to date"
        />
        <OutcomeStat
          icon={ClipboardCheck}
          label="Assignments completed"
          value={`${collegeOutcomes.assignmentCompletion}%`}
          hint="On-time submission rate"
        />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Department-wise progress</h2>
          <Link to="/college/analytics" className="text-sm text-muted-foreground hover:text-foreground">
            Full analytics →
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-border bg-secondary/40 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
            <div className="col-span-3">Department</div>
            <div className="col-span-1 text-right">Students</div>
            <div className="col-span-2">Placement ready</div>
            <div className="col-span-2">Internship placed</div>
            <div className="col-span-2">Attendance</div>
            <div className="col-span-2">Assignments</div>
          </div>
          {departments.map((d, i) => (
            <div
              key={d.department}
              className={`grid grid-cols-2 gap-4 px-4 py-4 text-sm md:grid-cols-12 md:items-center ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="col-span-2 md:col-span-3">
                <div className="font-medium">{d.department}</div>
                <div className="text-xs text-muted-foreground md:hidden">{d.students} students</div>
              </div>
              <div className="hidden text-right text-muted-foreground md:col-span-1 md:block">{d.students}</div>
              <div className="md:col-span-2">
                <div className="mb-1 flex justify-between text-xs"><span className="md:hidden">Placement ready</span><span>{d.placementReady}%</span></div>
                <Bar value={d.placementReady} />
              </div>
              <div className="md:col-span-2">
                <div className="mb-1 flex justify-between text-xs"><span className="md:hidden">Internship placed</span><span>{d.internshipPlaced}%</span></div>
                <Bar value={d.internshipPlaced} color="bg-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <div className="mb-1 flex justify-between text-xs"><span className="md:hidden">Attendance</span><span>{d.attendance}%</span></div>
                <Bar value={d.attendance} color="bg-sky-500" />
              </div>
              <div className="md:col-span-2">
                <div className="mb-1 flex justify-between text-xs"><span className="md:hidden">Assignments</span><span>{d.assignmentsCompleted}%</span></div>
                <Bar value={d.assignmentsCompleted} color="bg-violet-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent student activity</h2>
          <Link to="/college/students" className="text-sm text-muted-foreground hover:text-foreground">
            View roster →
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {college.roster.map((r, i) => (
            <div
              key={r.id}
              className={`flex items-center justify-between p-4 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.major}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">{r.activity}</div>
                <div className="text-xs text-muted-foreground">{r.status} · {r.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
