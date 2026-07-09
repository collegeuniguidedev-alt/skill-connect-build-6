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

      <DeepInsights name={name} />
    </div>
  );
}

function DeepInsights({ name }: { name: string }) {
  const insights = getStudentInsights(name);
  const maxTrend = Math.max(...insights.weeklyTrend.map((w) => w.score));

  return (
    <div className="space-y-8 border-t border-border pt-8">
      <div className="flex items-center gap-2">
        <Zap className="size-5 text-sky-600" />
        <h2 className="text-xl font-semibold tracking-tight">Deeper insights</h2>
        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sky-800">AI generated</span>
      </div>

      {/* PPO readiness + velocity summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Award className="size-4" /> PPO readiness
          </div>
          <div className="mt-2 text-3xl font-semibold text-emerald-600">{insights.ppoReadiness}%</div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-emerald-500" style={{ width: `${insights.ppoReadiness}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Blended score across evaluations, mentor rating, and skill delta.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-4" /> Learning velocity
          </div>
          <div className="mt-2 text-3xl font-semibold">
            {insights.velocity.tasksPerWeek}
            <span className="ml-1 text-sm font-normal text-muted-foreground">tasks/wk</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Cohort avg {insights.velocity.cohortTasksPerWeek}/wk · +{insights.velocity.skillGrowthPerMonth} skill pts / month
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Activity className="size-4" /> Engagement
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <Metric label="Login streak" value={`${insights.engagement.loginStreak}d`} />
            <Metric label="Response" value={`${insights.engagement.avgResponseHrs}h`} />
            <Metric label="Submit rate" value={`${insights.engagement.submissionRate}%`} />
            <Metric label="Peer reviews" value={`${insights.engagement.peerReviews}`} />
          </div>
        </div>
      </div>

      {/* Skill breakdown + weekly trend */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Target className="size-4" /> Skill breakdown
          </div>
          <div className="mt-4 space-y-3">
            {insights.skills.map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-muted-foreground">
                    {s.score} <span className="text-emerald-600">+{s.delta}</span>
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-sky-500" style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-4" /> Weekly performance
          </div>
          <div className="mt-6 flex h-40 items-end gap-3">
            {insights.weeklyTrend.map((w) => (
              <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
                <div className="text-xs font-semibold">{w.score}</div>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-sky-500 to-sky-300"
                  style={{ height: `${(w.score / maxTrend) * 100}%` }}
                />
                <div className="text-xs text-muted-foreground">{w.week}</div>
                <div className="text-[10px] text-muted-foreground">{w.tasks} tasks</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort benchmark */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Users2 className="size-4" /> Cohort benchmark
        </div>
        <div className="mt-4 space-y-4">
          {insights.benchmark.map((b) => {
            const ahead = b.student >= b.cohort;
            return (
              <div key={b.metric}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{b.metric}</span>
                  <span className={ahead ? "text-emerald-600" : "text-amber-600"}>
                    {b.student} <span className="text-muted-foreground">· cohort {b.cohort}</span>
                  </span>
                </div>
                <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-sky-500" style={{ width: `${b.student}%` }} />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-foreground/70"
                    style={{ left: `${b.cohort}%` }}
                    title={`Cohort ${b.cohort}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths / Gaps / Recommendations */}
      <div className="grid gap-4 md:grid-cols-3">
        <InsightList
          title="Strengths"
          items={insights.strengths}
          icon={<Award className="size-4 text-emerald-600" />}
          tone="bg-emerald-50 border-emerald-200"
        />
        <InsightList
          title="Gaps to close"
          items={insights.gaps}
          icon={<AlertTriangle className="size-4 text-amber-600" />}
          tone="bg-amber-50 border-amber-200"
        />
        <InsightList
          title="AI recommendations"
          items={insights.recommendations}
          icon={<Lightbulb className="size-4 text-sky-600" />}
          tone="bg-sky-50 border-sky-200"
        />
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <CalendarCheck className="size-4" /> Milestones timeline
        </div>
        <ol className="mt-4 space-y-3">
          {insights.milestones.map((m, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`mt-1.5 size-2 shrink-0 rounded-full ${
                  m.type === "win"
                    ? "bg-emerald-500"
                    : m.type === "flag"
                    ? "bg-rose-500"
                    : "bg-sky-500"
                }`}
              />
              <div className="flex-1 text-sm">
                <div className="font-medium">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.date}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-secondary/60 px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function InsightList({
  title,
  items,
  icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <div className={`rounded-xl border p-4 ${tone}`}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground/40" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
