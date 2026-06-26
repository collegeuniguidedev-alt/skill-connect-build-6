import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  initialApplications,
  initialEnrollments,
  type Application,
  type Enrollment,
} from "./mock-data";

type AppState = {
  enrollments: Enrollment[];
  applications: Application[];
  enroll: (courseId: string) => void;
  advance: (courseId: string, delta: number) => void;
  apply: (opportunityId: string) => void;
};

const Ctx = createContext<AppState | null>(null);

const STORAGE_KEY = "launchpad-state-v1";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.enrollments) setEnrollments(parsed.enrollments);
        if (parsed.applications) setApplications(parsed.applications);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ enrollments, applications }));
  }, [enrollments, applications, ready]);

  const enroll = (courseId: string) => {
    setEnrollments((prev) =>
      prev.some((e) => e.courseId === courseId)
        ? prev
        : [...prev, { courseId, progress: 0 }],
    );
  };

  const advance = (courseId: string, delta: number) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.courseId === courseId
          ? {
              ...e,
              progress: Math.min(100, Math.max(0, e.progress + delta)),
              score:
                Math.min(100, e.progress + delta) >= 100 && e.score === undefined
                  ? 80 + Math.floor(Math.random() * 16)
                  : e.score,
            }
          : e,
      ),
    );
  };

  const apply = (opportunityId: string) => {
    setApplications((prev) =>
      prev.some((a) => a.opportunityId === opportunityId)
        ? prev
        : [
            ...prev,
            {
              id: `app_${Date.now()}`,
              opportunityId,
              status: "submitted",
              appliedAt: new Date().toISOString(),
            },
          ],
    );
  };

  return (
    <Ctx.Provider value={{ enrollments, applications, enroll, advance, apply }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
