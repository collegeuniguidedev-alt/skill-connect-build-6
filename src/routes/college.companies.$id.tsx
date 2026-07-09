import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, Users, Star } from "lucide-react";
import { collegeCompanyFeedback, collegeInternshipMonitor } from "@/lib/mock-data";
import { getCompanySummaries, slugify } from "./college.companies";

export const Route = createFileRoute("/college/companies/$id")({
  head: () => ({ meta: [{ title: "Company detail · College" }] }),
  component: CompanyDetail,
  notFoundComponent: () => (
    <div className="rounded-xl border border-border bg-card p-6 text-sm">
      Company not found.{" "}
      <Link to="/college/companies" className="text-sky-700 hover:underline">
        Back to companies →
      </Link>
    </div>
  ),
});

function CompanyDetail() {
  const { id } = Route.useParams();
  const summary = getCompanySummaries().find((c) => slugify(c.name) === id);
  if (!summary) throw notFound();

  const interns = collegeInternshipMonitor.students.filter((s) => s.company === summary.name);
  const feedback = collegeCompanyFeedback.filter((f) => f.company === summary.name);
  const avgRating = feedback.length
    ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
    : "—";

  const stateStyle: Record<string, string> = {
    top: "bg-emerald-100 text-emerald-800",
    on_track: "bg-sky-100 text-sky-800",
    needs_intervention: "bg-amber-100 text-amber-800",
    inactive: "bg-rose-100 text-rose-800",
  };

  return (
    <div className="space-y-8">
      <Link to="/college/companies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to companies
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-md bg-secondary">
          <Building2 className="size-6" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Partner company</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{summary.name}</h1>
          <div className="mt-1 text-sm text-muted-foreground">
            Roles: {Array.from(summary.roles).join(" · ")}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Interns hosted" value={summary.interns.toString()} tone="text-sky-700" />
        <Stat label="On track" value={summary.onTrack.toString()} tone="text-emerald-600" />
        <Stat label="Need attention" value={summary.needsHelp.toString()} tone="text-amber-600" />
        <Stat label="Avg mentor rating" value={`★ ${avgRating}`} tone="text-amber-600" />
      </div>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Users className="size-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Interns from your college</h2>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-right">Progress</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Last update</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <Link to="/college/students/$id" params={{ id: s.id }} className="font-medium hover:underline">
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.department}</td>
                  <td className="px-4 py-3 text-right font-medium">{s.progress}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${stateStyle[s.state]}`}>
                      {s.state.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{s.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {feedback.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Star className="size-5 text-amber-600" />
            <h2 className="text-lg font-semibold">Recent mentor feedback</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {feedback.map((f) => (
              <div key={f.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{f.student}</div>
                    <div className="text-xs text-muted-foreground">Mentor {f.mentor} · {f.week}</div>
                  </div>
                  <div className="text-amber-600">★ {f.rating}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">"{f.comment}"</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}
