import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, CheckCircle2, Circle, Clock, Sparkles, Trophy } from "lucide-react";
import { studentInternship } from "@/lib/mock-data";

export const Route = createFileRoute("/student/internship")({
  head: () => ({
    meta: [
      { title: "My Internship · SkillTern" },
      { name: "description", content: "Daily tasks, AI mentor, weekly evaluations, and PPO readiness." },
    ],
  }),
  component: InternshipPage,
});

function Stat({ label, value, tone = "text-foreground" }: { label: string; value: string | number; tone?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function InternshipPage() {
  const s = studentInternship;
  const [msg, setMsg] = useState("");
  const [thread, setThread] = useState(s.mentorThread);

  const send = () => {
    if (!msg.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setThread((t) => [
      ...t,
      { id: `u${Date.now()}`, from: "you", text: msg, time },
      {
        id: `ai${Date.now()}`,
        from: "ai",
        text: "Got it. I'll draft an approach and drop notes in your workspace shortly.",
        time,
      },
    ]);
    setMsg("");
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Internship · {s.weekOf}
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{s.role}</h1>
        <p className="mt-2 text-muted-foreground">
          {s.company} · Mentor {s.mentor}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="PPO readiness" value={`${s.ppoReadiness}%`} tone="text-emerald-600" />
        <Stat label="Streak" value={`${s.streakDays} days`} />
        <Stat label="Tasks this week" value={`${s.tasksThisWeek.completed}/${s.tasksThisWeek.total}`} />
        <Stat label="Last evaluation" value={s.evaluations[0].score} tone="text-foreground" />
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Clock className="size-5 text-muted-foreground" /> Today & upcoming tasks
            </h2>
            <div className="space-y-3">
              {s.tasks.map((t) => {
                const Icon =
                  t.status === "reviewed" ? CheckCircle2 : t.status === "submitted" ? CheckCircle2 : Circle;
                const iconClass =
                  t.status === "reviewed"
                    ? "text-emerald-600"
                    : t.status === "submitted"
                      ? "text-sky-600"
                      : "text-muted-foreground";
                return (
                  <div
                    key={t.id}
                    className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <Icon className={`mt-0.5 size-5 ${iconClass}`} />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium">{t.title}</div>
                        <span className="text-xs text-muted-foreground">{t.due}</span>
                      </div>
                      <div className="mt-1 text-xs capitalize text-muted-foreground">
                        {t.status.replace("_", " ")}
                      </div>
                      {t.aiFeedback && (
                        <div className="mt-2 flex gap-2 rounded-md bg-sky-50 px-3 py-2 text-xs text-sky-900">
                          <Sparkles className="size-3.5 shrink-0" />
                          <span>
                            <span className="font-semibold">AI review:</span> {t.aiFeedback}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Trophy className="size-5 text-muted-foreground" /> Weekly evaluations
            </h2>
            <div className="space-y-3">
              {s.evaluations.map((e) => (
                <div key={e.week} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold">
                      Week {e.week} <span className="text-muted-foreground font-normal">· {e.range}</span>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      Score {e.score}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="text-xs">
                      <div className="font-medium text-emerald-700">Strengths</div>
                      <ul className="mt-1 list-disc pl-4 text-muted-foreground">
                        {e.strengths.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-amber-700">To improve</div>
                      <ul className="mt-1 list-disc pl-4 text-muted-foreground">
                        {e.improvements.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Bot className="size-5 text-muted-foreground" /> AI Mentor
          </h2>
          <div className="mb-3 rounded-md bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
            Available 24×7. Ask about tasks, briefs, code, or blockers.
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {thread.map((m) => (
              <div
                key={m.id}
                className={`rounded-lg px-3 py-2 text-sm ${
                  m.from === "ai"
                    ? "bg-sky-50 text-sky-900"
                    : "ml-6 bg-foreground text-background"
                }`}
              >
                <div>{m.text}</div>
                <div className={`mt-1 text-[10px] ${m.from === "ai" ? "text-sky-700" : "text-background/70"}`}>
                  {m.time}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your AI mentor…"
              className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={send}
              className="inline-flex h-9 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Send
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
