import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Briefcase, CalendarCheck, ClipboardCheck, Activity, AlertCircle, Building2, HeartPulse, Sparkles, Users } from "lucide-react";
import {
  college,
  collegeAiInsights,
  collegeCompanyFeedback,
  collegeHealthScore,
  collegeInternshipMonitor,
  collegeOutcomes,
  collegeRiskBoard,
} from "@/lib/mock-data";

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

      {/* 1. Are my students actually interning? */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Activity className="size-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Are my students actually interning?</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { label: "Students placed", value: 208, tone: "text-emerald-600", to: "/college/students" as const },
            { label: "Companies onboarded", value: collegeInternshipMonitor.companies, tone: "text-sky-700", to: "/college/companies" as const },
            { label: "Active internships", value: collegeInternshipMonitor.activeInternships, tone: "text-foreground", to: "/college/internships" as const },
            { label: "Awaiting allocation", value: 34, tone: "text-amber-600" },
            { label: "Completion", value: `${Math.round((collegeInternshipMonitor.completionReady / collegeInternshipMonitor.activeInternships) * 100)}%`, tone: "text-violet-600" },
          ].map((s) => {
            const inner = (
              <>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className={`mt-2 text-3xl font-semibold ${s.tone}`}>{s.value}</div>
                {s.to && <div className="mt-2 text-[11px] text-muted-foreground">View details →</div>}
              </>
            );
            return s.to ? (
              <Link key={s.label} to={s.to} className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-foreground/30">
                {inner}
              </Link>
            ) : (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. AI Risk panel */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-rose-600" />
            <h2 className="text-lg font-semibold">Which students need attention?</h2>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sky-800">
              AI-powered
            </span>
          </div>
          <Link to="/college/students" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-rose-800">🔴 At Risk</div>
              <div className="text-2xl font-semibold text-rose-700">{collegeRiskBoard.atRisk.length}</div>
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {collegeRiskBoard.atRisk.map((s) => (
                <li key={s.id} className="rounded-md bg-background p-2">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-muted-foreground">{s.company} · {s.department}</div>
                  <div className="mt-1 text-rose-700">{s.reason}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-amber-800">🟡 Falling Behind</div>
              <div className="text-2xl font-semibold text-amber-700">{collegeRiskBoard.fallingBehind.length}</div>
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {collegeRiskBoard.fallingBehind.map((s) => (
                <li key={s.id} className="rounded-md bg-background p-2">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-muted-foreground">{s.company} · {s.department}</div>
                  <div className="mt-1 text-amber-700">{s.reason}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-emerald-800">🟢 On Track</div>
              <div className="text-2xl font-semibold text-emerald-700">{collegeRiskBoard.onTrack}</div>
            </div>
            <p className="mt-3 text-xs text-emerald-800">
              Meeting weekly deliverables, positive mentor feedback, and healthy attendance.
              Keep monitoring for early dips.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="size-3.5" /> Detailed roster in Internship Monitor
            </div>
          </div>
        </div>
      </section>

      {/* 3. What are companies saying? */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-sky-700" />
            <h2 className="text-lg font-semibold">What are companies saying?</h2>
          </div>
          <span className="text-xs text-muted-foreground">Live · updated weekly</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {collegeCompanyFeedback.map((f) => (
            <div key={f.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{f.student}</div>
                  <div className="text-xs text-muted-foreground">
                    {f.company} · Mentor {f.mentor} · {f.week}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-amber-600">★ {f.rating}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">rating</div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">“{f.comment}”</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md bg-secondary/60 px-2 py-1.5">
                  <span className="text-muted-foreground">Attendance</span>{" "}
                  <span className="font-medium">{f.attendance}%</span>
                </div>
                <div className="rounded-md bg-secondary/60 px-2 py-1.5">
                  <span className="text-muted-foreground">Skill Δ</span>{" "}
                  <span className="font-medium text-emerald-700">+{f.skillDelta} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Internship Health Score */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <HeartPulse className="size-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Internship Health Score</h2>
        </div>
        <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-xl bg-emerald-50 p-6 text-center md:col-span-1">
            <div className="text-xs uppercase tracking-widest text-emerald-800">Overall</div>
            <div className="mt-1 text-6xl font-semibold text-emerald-600">{collegeHealthScore.overall}%</div>
            <div className="mt-2 text-xs text-emerald-800">Healthy — no urgent intervention needed</div>
          </div>
          <div className="space-y-3 md:col-span-2">
            {collegeHealthScore.breakdown.map((b) => (
              <div key={b.key}>
                <div className="flex items-center justify-between text-sm">
                  <span>{b.label}</span>
                  <span className="font-semibold">{b.value}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full ${b.value >= 90 ? "bg-emerald-500" : b.value >= 75 ? "bg-sky-500" : "bg-amber-500"}`}
                    style={{ width: `${b.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI Insights */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="size-5 text-sky-600" />
          <h2 className="text-lg font-semibold">AI Insights</h2>
          <span className="text-xs text-muted-foreground">— what to know in 10 seconds</span>
        </div>
        <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-5">
          <ul className="space-y-2 text-sm">
            {collegeAiInsights.map((i, idx) => (
              <li key={idx} className="flex gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-sky-600" />
                <span className="text-sky-950">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>



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
