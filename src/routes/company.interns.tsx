import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Bot, Sparkles, Timer } from "lucide-react";
import { companyInternshipOps } from "@/lib/mock-data";

export const Route = createFileRoute("/company/interns")({
  head: () => ({
    meta: [
      { title: "Interns Ops · SkillTern" },
      { name: "description", content: "AI-monitored view of every active intern, alerts, and PPO recommendations." },
    ],
  }),
  component: InternsOps,
});

function Stat({ label, value, tone = "text-foreground", hint }: { label: string; value: string | number; tone?: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
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
  top: "Top performer",
  on_track: "On track",
  needs_intervention: "Needs intervention",
  inactive: "Inactive",
};

function InternsOps() {
  const c = companyInternshipOps;
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Internship operations</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Interns Ops</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Scale your internship programme without scaling supervision. SkillTern's AI monitors every intern
          and surfaces only what needs your attention.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Stat label="Active interns" value={c.active} />
        <Stat label="On track" value={c.onTrack} tone="text-emerald-600" />
        <Stat label="Need intervention" value={c.needIntervention} tone="text-amber-600" />
        <Stat label="Inactive" value={c.inactive} tone="text-rose-600" />
        <Stat label="PPO recommended" value={c.ppoRecommended} tone="text-foreground" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Bot className="size-5 text-muted-foreground" /> Weekly AI summary
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{c.weeklyAiSummary}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            <Timer className="size-3.5" /> ~{c.managerHoursSaved} manager hours saved this week
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="size-5 text-muted-foreground" /> Alerts
          </h2>
          <ul className="mt-3 space-y-3 text-sm">
            {c.alerts.map((a) => (
              <li key={a.id} className="flex gap-2">
                <span
                  className={`mt-1 inline-block size-2 shrink-0 rounded-full ${
                    a.severity === "high"
                      ? "bg-rose-500"
                      : a.severity === "med"
                        ? "bg-amber-500"
                        : "bg-sky-500"
                  }`}
                />
                <span className="text-muted-foreground">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Active interns</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Intern</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Tasks</th>
                <th className="px-4 py-3 text-left">Last active</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">AI note</th>
              </tr>
            </thead>
            <tbody>
              {c.interns.map((i) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.college}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{i.role}</td>
                  <td className="px-4 py-3">
                    <div>{i.tasksDone}/{i.tasksTotal}</div>
                    <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${(i.tasksDone / i.tasksTotal) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{i.lastActive}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${stateStyle[i.state]}`}>
                      {stateLabel[i.state]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div className="flex gap-1.5">
                      <Sparkles className="mt-0.5 size-3.5 shrink-0 text-sky-600" />
                      <span>{i.aiNote}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
