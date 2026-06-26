import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { company, opportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/company/opportunities")({
  head: () => ({ meta: [{ title: "Opportunities · Company" }] }),
  component: CompanyOpportunities,
});

function CompanyOpportunities() {
  const { applications } = useAppState();
  const list = opportunities.filter((o) => o.company === company.name);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Hiring</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Opportunities</h1>
          <p className="mt-2 text-muted-foreground">Jobs and internships open to qualified candidates.</p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">
          <Plus className="size-4" /> New opportunity
        </button>
      </div>

      <div className="grid gap-4">
        {list.map((op) => {
          const count = applications.filter((a) => a.opportunityId === op.id).length;
          return (
            <div key={op.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs capitalize">
                      {op.type}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      active
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-semibold">{op.title}</div>
                  <div className="text-sm text-muted-foreground">{op.location}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{op.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-sky-700">{count}</div>
                  <div className="text-xs text-muted-foreground">applications</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
