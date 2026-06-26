import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/company")({
  component: () => (
    <AppShell persona="company">
      <Outlet />
    </AppShell>
  ),
});
