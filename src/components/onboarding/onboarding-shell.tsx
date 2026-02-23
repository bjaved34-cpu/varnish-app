"use client";

import { VarnishLogo } from "./logo";
import { Stepper, type Step } from "./stepper";

export const ONBOARDING_STEPS: Step[] = [
  { id: 1, title: "Account Details", description: "Enter account information" },
  { id: 2, title: "Domain", description: "Enter your domain" },
  { id: 3, title: "Services", description: "Select Your Services" },
  { id: 4, title: "Billing", description: "Add payment details" },
];

interface OnboardingShellProps {
  children: React.ReactNode;
  currentStep: number;
}

export function OnboardingShell({ children, currentStep }: OnboardingShellProps) {
  return (
    <div className="flex min-h-screen bg-[#0C1E35]">
      {/* Sidebar */}
      <aside
        className="hidden w-64 flex-shrink-0 flex-col md:flex bg-[#0C1E35]"
        aria-label="Onboarding navigation"
      >
        <VarnishLogo />
        <div className="mt-2 flex-1">
          <Stepper steps={ONBOARDING_STEPS} currentStep={currentStep} />
        </div>
      </aside>

      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-[#0b1120] px-4 md:hidden">
        <VarnishLogo />
        <div className="flex items-center gap-1.5" aria-label="Step progress">
          {ONBOARDING_STEPS.map((step) => (
            <div
              key={step.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${step.id < currentStep
                ? "w-6 bg-white"
                : step.id === currentStep
                  ? "w-6 bg-white"
                  : "w-4 bg-[#1e2d40]"
                }`}
              aria-label={`Step ${step.id}: ${step.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main content area (The "White Part") */}
      <main className="relative flex-1 bg-white md:rounded-[12px] md:my-3 md:mr-3 flex flex-col items-center overflow-hidden">
        {/* Background Lines - Top Center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[768px] h-[495px] pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage: 'url("/BackgroundLines.svg")',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          }}
        />

        {/* Form Content - Centered with 104px top margin relative to the white panel */}
        <div className="relative z-10 w-full flex justify-center px-4 pt-[104px] pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
