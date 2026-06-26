import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";
import { opportunities } from "@/lib/mock-data";

export const Route = createFileRoute("/student/applications")({
  head: () => ({ meta: [{ title: "Applications · LaunchPad" }] }),
  component: Applications,
});

function Applications() {
  const { applications } = useAppState();

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Pipeline</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Applications</h1>
        <p className="mt-2 text-muted-foreground">Track every opportunity you've applied to.</p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          You haven't applied to anything yet.{" "}
          <Link to="/student/opportunities" className="font-medium text-foreground underline">
            Browse opportunities
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-3">
          {applications.map((a) => {
            const op = opportunities.find((o) => o.id === a.opportunityId);
            if (!op) return null;
            return (
              <Link
                key={a.id}
                to="/student/opportunities/$id"
                params={{ id: op.id }}
                className="block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold">{op.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {op.company} · {op.location}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Applied {new Date(a.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 capitalize">
                    {a.status.replace("_", " ")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
