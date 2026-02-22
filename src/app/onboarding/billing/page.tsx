import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { BillingForm } from "@/components/onboarding/billing-form";

export default function BillingPage() {
    return (
        <OnboardingShell currentStep={4}>
            <BillingForm />
        </OnboardingShell>
    );
}
