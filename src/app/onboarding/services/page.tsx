import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { ServicesSelection } from "@/components/onboarding/services-selection";

export default function ServicesPage() {
    return (
        <OnboardingShell currentStep={3}>
            <ServicesSelection />
        </OnboardingShell>
    );
}
