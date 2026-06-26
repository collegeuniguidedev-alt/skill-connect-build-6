import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { college } from "@/lib/mock-data";

export const Route = createFileRoute("/college")({
  head: () => ({ meta: [{ title: "College · LaunchPad" }] }),
  component: CollegePage,
});

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-4xl font-semibold text-orange-600">{value}</div>
    </div>
  );
}

function CollegePage() {
  return (
    <AppShell persona="college" showSubNav={false}>
      <div className="space-y-10">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">College</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{college.name}</h1>
          <p className="mt-2 text-muted-foreground">{college.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Enrolled students" value={3} />
          <Stat label="Course enrollments" value={5} />
          <Stat label="Completion rate" value="60%" />
          <Stat label="Job applications" value={1} />
        </div>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Recent student activity</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {college.roster.map((r, i) => (
              <div
                key={r.name}
                className={`flex items-center justify-between p-4 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.major}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{r.activity}</div>
                  <div className="text-xs text-muted-foreground">{r.status}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
