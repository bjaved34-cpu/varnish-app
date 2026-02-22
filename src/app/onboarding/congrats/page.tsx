import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { CongratsMessage } from "@/components/onboarding/congrats-message";

export default function CongratsPage() {
    return (
        <OnboardingShell currentStep={4}>
            <CongratsMessage />
        </OnboardingShell>
    );
}
