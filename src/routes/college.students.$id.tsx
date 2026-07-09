import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, GraduationCap, Activity, ClipboardCheck, Star, CalendarCheck, TrendingUp, Zap, Target, Award, AlertTriangle, Lightbulb, Users2 } from "lucide-react";
import {
  college,
  collegeCompanyFeedback,
  collegeInternshipMonitor,
  collegeRiskBoard,
  companyInternshipOps,
  getStudentInsights,
} from "@/lib/mock-data";


export const Route = createFileRoute("/college/students/$id")({
  head: () => ({ meta: [{ title: "Student detail · College" }] }),
  component: StudentDetail,
  notFoundComponent: () => (
    <div className="rounded-xl border border-border bg-card p-6 text-sm">
      Student not found.{" "}
      <Link to="/college/students" className="text-sky-700 hover:underline">
        Back to roster →
      </Link>
    </div>
  ),
});

function StudentDetail() {
  const { id } = Route.useParams();

  // Try monitor row first (richer), then roster
  const monitor = collegeInternshipMonitor.students.find((s) => s.id === id);
  const roster = college.roster.find((r) => r.id === id);
  const anyRecord = monitor || roster;
  if (!anyRecord) throw notFound();

  const name = monitor?.name ?? roster!.name;
  const feedback = collegeCompanyFeedback.filter((f) => f.student === name);
  const risk =
    collegeRiskBoard.atRisk.find((s) => s.name === name) ??
    collegeRiskBoard.fallingBehind.find((s) => s.name === name);
  const opsIntern = companyInternshipOps.interns.find((i) => i.name === name);

  const stateStyle: Record<string, string> = {
    top: "bg-emerald-100 text-emerald-800",
    on_track: "bg-sky-100 text-sky-800",
    needs_intervention: "bg-amber-100 text-amber-800",
    inactive: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="space-y-8">
      <Link to="/college/students" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to students
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-lg font-semibold">
            {name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Student</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{name}</h1>
            <div className="mt-1 text-sm text-muted-foreground">
              {(monitor?.department ?? roster?.major)} · {roster?.year ?? "—"}
            </div>
          </div>
        </div>
        {monitor && (
          <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${stateStyle[monitor.state]}`}>
            {monitor.state.replace("_", " ")}
          </span>
        )}
      </div>

      {monitor && (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Building2 className="size-4" /> Company
            </div>
            <div className="mt-2 text-lg font-semibold">
              <Link to="/college/companies/$id" params={{ id: slugify(monitor.company) }} className="hover:underline">
                {monitor.company}
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">{monitor.role}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Activity className="size-4" /> Progress
            </div>
            <div className="mt-2 text-3xl font-semibold text-sky-700">{monitor.progress}%</div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-sky-500" style={{ width: `${monitor.progress}%` }} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <ClipboardCheck className="size-4" /> Last update
            </div>
            <div className="mt-2 text-lg font-semibold">{monitor.lastUpdate}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="size-4" /> Department
            </div>
            <div className="mt-2 text-lg font-semibold">{monitor.department}</div>
          </div>
        </div>
      )}

      {opsIntern && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Task activity</h2>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Tasks completed</div>
                <div className="mt-1 text-2xl font-semibold">
                  {opsIntern.tasksDone} / {opsIntern.tasksTotal}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Last active</div>
                <div className="mt-1 text-2xl font-semibold">{opsIntern.lastActive}</div>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-sky-50 p-3 text-sm text-sky-900">
              <span className="font-medium">AI note:</span> {opsIntern.aiNote}
            </p>
          </div>
        </section>
      )}

      {feedback.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Company feedback</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {feedback.map((f) => (
              <div key={f.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{f.company}</div>
                    <div className="text-xs text-muted-foreground">Mentor {f.mentor} · {f.week}</div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="size-4 fill-amber-500" /> {f.rating}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">"{f.comment}"</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md bg-secondary/60 px-2 py-1.5">
                    <CalendarCheck className="mr-1 inline size-3" /> Attendance {f.attendance}%
                  </div>
                  <div className="rounded-md bg-secondary/60 px-2 py-1.5 text-emerald-700">
                    Skill Δ +{f.skillDelta} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {risk && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Risk flag</h2>
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-sm text-rose-900">
            {risk.reason}
          </div>
        </section>
      )}

      {roster && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Coursework activity</h2>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm text-sm">
            <div className="font-medium">{roster.activity}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {roster.status} · {roster.progress}%
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
