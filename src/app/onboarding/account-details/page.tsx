import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { AccountDetailsForm } from "@/components/onboarding/account-details-form";

export default function AccountDetailsPage() {
  return (
    <OnboardingShell currentStep={1}>
      <AccountDetailsForm />
    </OnboardingShell>
  );
}
