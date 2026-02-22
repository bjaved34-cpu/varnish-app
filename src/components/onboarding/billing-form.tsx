"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/store/use-onboarding-store";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FormState {
    paymentMethod: string;
    cardHolderName: string;
    cardNumber: string;
    cvc: string;
    expiryDate: string;
}

interface FormErrors {
    paymentMethod?: string;
    cardHolderName?: string;
    cardNumber?: string;
    cvc?: string;
    expiryDate?: string;
}

export function BillingForm() {
    const router = useRouter();
    const { reset } = useOnboardingStore();
    const [form, setForm] = useState<FormState>({
        paymentMethod: "",
        cardHolderName: "",
        cardNumber: "",
        cvc: "",
        expiryDate: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    function validate(): boolean {
        const next: FormErrors = {};
        if (!form.paymentMethod) next.paymentMethod = "Payment method is required";
        if (!form.cardHolderName.trim()) next.cardHolderName = "Card holder name is required";
        if (!form.cardNumber.trim()) next.cardNumber = "Card number is required";
        if (!form.cvc.trim()) next.cvc = "CVC is required";
        if (!form.expiryDate) next.expiryDate = "Expiry date is required";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);

        // Simulate async transition
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);

        router.push("/onboarding/congrats");
    }

    function handleChange(field: keyof FormState) {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    Billing
                </h1>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Payment Method */}
                    <div className="space-y-1.5">
                        <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">
                            Payment Method<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
                        </Label>
                        <div className="relative">
                            <select
                                id="paymentMethod"
                                value={form.paymentMethod}
                                onChange={handleChange("paymentMethod")}
                                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                                required
                            >
                                <option value="" disabled>Select Method</option>
                                <option value="credit-card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank-transfer">Bank Transfer</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                <ChevronLeft className="h-4 w-4 -rotate-90" />
                            </div>
                        </div>
                        {errors.paymentMethod && (
                            <p className="text-xs text-red-500 mt-1" role="alert">{errors.paymentMethod}</p>
                        )}
                    </div>

                    {/* Card Holder Name */}
                    <div className="space-y-1.5">
                        <Label htmlFor="cardHolderName" className="text-sm font-medium text-gray-700">
                            Card Holder Name<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
                        </Label>
                        <Input
                            id="cardHolderName"
                            type="text"
                            placeholder="Enter your name"
                            value={form.cardHolderName}
                            onChange={handleChange("cardHolderName")}
                            className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                            required
                        />
                        {errors.cardHolderName && (
                            <p className="text-xs text-red-500 mt-1" role="alert">{errors.cardHolderName}</p>
                        )}
                    </div>

                    {/* Card Number */}
                    <div className="space-y-1.5">
                        <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                            Card Number<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
                        </Label>
                        <Input
                            id="cardNumber"
                            type="text"
                            placeholder="Enter your card number"
                            value={form.cardNumber}
                            onChange={handleChange("cardNumber")}
                            className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                            required
                        />
                        {errors.cardNumber && (
                            <p className="text-xs text-red-500 mt-1" role="alert">{errors.cardNumber}</p>
                        )}
                    </div>

                    {/* CVC */}
                    <div className="space-y-1.5">
                        <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">
                            CVC<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
                        </Label>
                        <Input
                            id="cvc"
                            type="text"
                            placeholder="Enter the CVC"
                            value={form.cvc}
                            onChange={handleChange("cvc")}
                            className="h-11 rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                            required
                        />
                        {errors.cvc && (
                            <p className="text-xs text-red-500 mt-1" role="alert">{errors.cvc}</p>
                        )}
                    </div>

                    {/* Expiry Date */}
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
                            Expiry Date<span className="text-gray-900 ml-0.5" aria-hidden="true">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="expiryDate"
                                type="date"
                                placeholder="DD MM YYYY"
                                value={form.expiryDate}
                                onChange={handleChange("expiryDate")}
                                className="h-11 w-full rounded-lg border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                                required
                            />
                        </div>
                        {errors.expiryDate && (
                            <p className="text-xs text-red-500 mt-1" role="alert">{errors.expiryDate}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-12 w-full rounded-lg bg-[#1a2332] text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#243044] hover:shadow-md active:scale-[0.99] disabled:opacity-60"
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
                    <div className="text-center pt-2">
                        <Link
                            href="/onboarding/services"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back to services
                        </Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
