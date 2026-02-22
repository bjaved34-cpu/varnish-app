"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

type StepState = "active" | "completed" | "upcoming";

function getStepState(stepId: number, currentStep: number): StepState {
  if (stepId < currentStep) return "completed";
  if (stepId === currentStep) return "active";
  return "upcoming";
}

interface StepIndicatorProps {
  state: StepState;
  stepNumber: number;
}

function StepIndicator({ state, stepNumber }: StepIndicatorProps) {
  if (state === "completed") {
    return (
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#64748b] flex-shrink-0"
        aria-label={`Step ${stepNumber} completed`}
      >
        <Check className="h-4 w-4 text-[#0C1E35]" strokeWidth={3.5} />
      </motion.div>
    );
  }

  if (state === "active") {
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white flex-shrink-0"
        aria-label={`Step ${stepNumber} active`}
        aria-current="step"
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </motion.div>
    );
  }

  return (
    <div
      className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#2d3d52] flex-shrink-0"
      aria-label={`Step ${stepNumber} upcoming`}
    >
      <div className="h-2.5 w-2.5 rounded-full bg-[#2d3d52]" />
    </div>
  );
}

interface StepItemProps {
  step: Step;
  state: StepState;
  isLast: boolean;
}

function StepItem({ step, state, isLast }: StepItemProps) {
  return (
    <div className="relative flex gap-3.5">
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-3.5 top-7 w-px bg-[#1e2d40]"
          style={{ height: "calc(100% + 4px)" }}
          aria-hidden="true"
        />
      )}

      <StepIndicator state={state} stepNumber={step.id} />

      <motion.div
        className="pb-8 min-w-0"
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: step.id * 0.05 }}
      >
        <p
          className={cn(
            "text-sm font-semibold leading-tight",
            state === "active" && "text-white",
            state === "completed" && "text-[#94a3b8]",
            state === "upcoming" && "text-[#4a5a6e]"
          )}
        >
          {step.title}
        </p>
        <p
          className={cn(
            "mt-0.5 text-xs leading-relaxed",
            state === "active" && "text-[#94a3b8]",
            state === "completed" && "text-[#3d4f62]",
            state === "upcoming" && "text-[#2d3d52]"
          )}
        >
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Onboarding steps" className="px-6 pt-4">
      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.id}>
            <StepItem
              step={step}
              state={getStepState(step.id, currentStep)}
              isLast={index === steps.length - 1}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
