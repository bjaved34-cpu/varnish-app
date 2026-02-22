import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { DomainForm } from "@/components/onboarding/domain-form";

export default function DomainPage() {
    return (
        <OnboardingShell currentStep={2}>
            <DomainForm />
        </OnboardingShell>
    );
}
