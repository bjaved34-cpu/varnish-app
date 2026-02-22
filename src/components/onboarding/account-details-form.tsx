"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordChecklist } from "./password-checklist";
import { useOnboardingStore } from "@/store/use-onboarding-store";

interface FormState {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function AccountDetailsForm() {
  const router = useRouter();
  const { accountDetails, setAccountDetails } = useOnboardingStore();
  const [form, setForm] = useState<FormState>(accountDetails);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const hasMinLength = form.password.length >= 8;
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(form.password);

  const passwordChecklist = [
    { id: "min-length", label: "Must be at least 8 characters", met: hasMinLength },
    { id: "special-char", label: "Must contain one special character", met: hasSpecialChar },
  ];

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.password) {
      next.password = "Password is required";
    } else if (!hasMinLength || !hasSpecialChar) {
      next.password = "Password does not meet requirements";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    // Save to store
    setAccountDetails(form);

    // Simulate async transition
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    router.push("/onboarding/domain");
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-[360px]"
    >
      <div className="w-full">
        <h1 className="mb-8 text-center text-[28px] font-bold tracking-tight text-gray-900">
          Account Details
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-gray-700"
            >
              Name<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange("name")}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
              autoComplete="name"
              autoFocus
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-500 mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange("email")}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
              autoComplete="email"
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange("password")}
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby="password-requirements"
              className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* Password checklist */}
          <div id="password-requirements" className="pt-1">
            <PasswordChecklist items={passwordChecklist} />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="h-12 w-full rounded-lg bg-[#1a2332] text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#243044] hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
