"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useOnboardingStore } from "@/store/use-onboarding-store";

interface FormState {
    domain: string;
}

interface FormErrors {
    domain?: string;
}

export function DomainForm() {
    const router = useRouter();
    const { domain, setDomain } = useOnboardingStore();
    const [form, setForm] = useState<FormState>({ domain });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    function validate(): boolean {
        const next: FormErrors = {};
        if (!form.domain.trim()) {
            next.domain = "Domain is required";
        } else if (!form.domain.includes(".")) {
            next.domain = "Enter a valid domain (e.g., example.com)";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);

        // Save to store
        setDomain(form.domain);

        // Simulate async transition
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsLoading(false);
        // Navigate to next step (Services)
        router.push("/onboarding/services");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ domain: e.target.value });
        if (errors.domain) {
            setErrors({});
        }
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
                    Domain
                </h1>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Domain */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="domain"
                            className="text-sm font-medium text-gray-700"
                        >
                            Your Domain<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
                        </Label>
                        <Input
                            id="domain"
                            type="text"
                            placeholder="Enter your Domain"
                            value={form.domain}
                            onChange={handleChange}
                            aria-required="true"
                            aria-invalid={!!errors.domain}
                            aria-describedby={errors.domain ? "domain-error" : undefined}
                            className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                            autoFocus
                        />
                        {errors.domain && (
                            <p id="domain-error" className="text-xs text-red-500 mt-1" role="alert">
                                {errors.domain}
                            </p>
                        )}
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

                    {/* Back Link */}
                    <div className="text-center">
                        <Link
                            href="/onboarding/account-details"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back to account details
                        </Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
