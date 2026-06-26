import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/college")({
  component: () => (
    <AppShell persona="college">
      <Outlet />
    </AppShell>
  ),
});
