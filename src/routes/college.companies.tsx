import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { collegeInternshipMonitor } from "@/lib/mock-data";

export const Route = createFileRoute("/college/companies")({
  head: () => ({ meta: [{ title: "Companies · College" }] }),
  component: CollegeCompanies,
});

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getCompanySummaries() {
  const map = new Map<
    string,
    { name: string; interns: number; onTrack: number; needsHelp: number; roles: Set<string> }
  >();
  for (const s of collegeInternshipMonitor.students) {
    const entry =
      map.get(s.company) ??
      { name: s.company, interns: 0, onTrack: 0, needsHelp: 0, roles: new Set<string>() };
    entry.interns += 1;
    if (s.state === "on_track" || s.state === "top") entry.onTrack += 1;
    if (s.state === "needs_intervention" || s.state === "inactive") entry.needsHelp += 1;
    entry.roles.add(s.role);
    map.set(s.company, entry);
  }
  return Array.from(map.values()).sort((a, b) => b.interns - a.interns);
}

function CollegeCompanies() {
  const companies = getCompanySummaries();
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Partner network</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Companies onboarded</h1>
        <p className="mt-2 text-muted-foreground">
          {companies.length} companies currently hosting interns from your college.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {companies.map((c) => (
          <Link
            key={c.name}
            to="/college/companies/$id"
            params={{ id: slugify(c.name) }}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-foreground/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-md bg-secondary">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {Array.from(c.roles).slice(0, 2).join(" · ")}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-sky-700">{c.interns}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">interns</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800">
                {c.onTrack} on track
              </span>
              {c.needsHelp > 0 && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">
                  {c.needsHelp} need attention
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
