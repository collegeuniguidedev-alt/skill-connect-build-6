import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { collegeInternshipMonitor } from "@/lib/mock-data";

export const Route = createFileRoute("/college/internships")({
  head: () => ({
    meta: [
      { title: "Internship Monitor · SkillTern" },
      { name: "description", content: "Real-time visibility into every student's internship progress." },
    ],
  }),
  component: InternshipMonitor,
});

function Stat({ label, value, tone = "text-foreground" }: { label: string; value: string | number; tone?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

const stateStyle: Record<string, string> = {
  top: "bg-emerald-100 text-emerald-800",
  on_track: "bg-sky-100 text-sky-800",
  needs_intervention: "bg-amber-100 text-amber-800",
  inactive: "bg-rose-100 text-rose-800",
};
const stateLabel: Record<string, string> = {
  top: "Top",
  on_track: "On track",
  needs_intervention: "Needs check-in",
  inactive: "Inactive",
};

function InternshipMonitor() {
  const c = collegeInternshipMonitor;
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Internship monitor</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Live internship progress</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Real-time visibility into every student's internship — powered by SkillTern's AI monitoring layer.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Active internships" value={c.activeInternships} />
        <Stat label="On track" value={c.onTrack} tone="text-emerald-600" />
        <Stat label="Need check-in" value={c.needIntervention} tone="text-amber-600" />
        <Stat label="Completion ready" value={c.completionReady} tone="text-foreground" />
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Bot className="size-5 text-muted-foreground" /> This week's AI digest
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">{c.weeklyAiDigest}</p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">By department</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Active</th>
                <th className="px-4 py-3 text-left">On track</th>
                <th className="px-4 py-3 text-left">Submission rate</th>
              </tr>
            </thead>
            <tbody>
              {c.byDepartment.map((d) => (
                <tr key={d.department} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{d.department}</td>
                  <td className="px-4 py-3">{d.active}</td>
                  <td className="px-4 py-3 text-emerald-700">{d.onTrack}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-emerald-500" style={{ width: `${d.submission}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{d.submission}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Students on internship</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Placement</th>
                <th className="px-4 py-3 text-left">Progress</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last update</th>
              </tr>
            </thead>
            <tbody>
              {c.students.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.department}</td>
                  <td className="px-4 py-3">
                    <div>{s.role}</div>
                    <div className="text-xs text-muted-foreground">{s.company}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-foreground" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${stateStyle[s.state]}`}>
                      {stateLabel[s.state]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
