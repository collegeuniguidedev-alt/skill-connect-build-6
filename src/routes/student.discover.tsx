import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState } from "@/lib/app-state";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/student/discover")({
  head: () => ({ meta: [{ title: "Discover · LaunchPad" }] }),
  component: Discover,
});

function Discover() {
  const { enrollments, enroll } = useAppState();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "course" | "simulation">("all");

  const filtered = courses.filter((c) => {
    if (filter !== "all" && c.type !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Catalog</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Discover</h1>
        <p className="mt-2 text-muted-foreground">
          Courses and simulations published by companies on LaunchPad.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, company, or skill"
          className="h-10 w-full max-w-md rounded-md border border-border bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <div className="inline-flex rounded-md border border-border bg-card p-1">
          {(["all", "course", "simulation"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-3 py-1.5 text-sm capitalize ${
                filter === f
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => {
          const enrolled = enrollments.some((e) => e.courseId === c.id);
          return (
            <div
              key={c.id}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <Link
                to="/student/courses/$id"
                params={{ id: c.id }}
                className="block aspect-[16/9] w-full overflow-hidden bg-secondary"
              >
                <img
                  src={c.cover}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 capitalize">
                    {c.type}
                  </span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs">
                    {c.level}
                  </span>
                </div>
                <Link
                  to="/student/courses/$id"
                  params={{ id: c.id }}
                  className="mt-3 block text-lg font-semibold hover:underline"
                >
                  {c.title}
                </Link>
                <div className="text-sm text-muted-foreground">{c.company}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  {enrolled ? (
                    <Link
                      to="/student/courses/$id"
                      params={{ id: c.id }}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-accent"
                    >
                      Continue
                    </Link>
                  ) : (
                    <button
                      onClick={() => enroll(c.id)}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
