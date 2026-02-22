import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding — Varnish Enterprise",
};

import { OnboardingGuard } from "@/components/onboarding/onboarding-guard";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnboardingGuard>{children}</OnboardingGuard>;
}
