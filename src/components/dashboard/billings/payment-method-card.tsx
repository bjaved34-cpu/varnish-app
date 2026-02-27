"use client";

import { CreditCard } from "lucide-react";

export function PaymentMethodCard() {
    return (
        <div className="w-full bg-white rounded-xl border border-[#E8E8E8] p-6">
            <div className="mb-6">
                <h2 className="text-sm font-semibold text-[#1a2332]">Payment Method</h2>
                <p className="text-sm text-[#8899aa]">Choose what you want to be notified about.</p>
            </div>

            <div className="space-y-3">
                {/* Visa */}
                <div className="flex items-start gap-4 p-4 rounded-lg border border-[#E8E8E8] hover:bg-gray-50/50 transition-colors cursor-pointer bg-white">
                    <div className="mt-0.5">
                        <CreditCard className="h-5 w-5 text-[#8899aa]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#1a2332]">Visa</h3>
                        <p className="text-sm text-[#8899aa]">Expiry 02/2026</p>
                    </div>
                </div>

                {/* Mastercard */}
                <div className="flex items-start gap-4 p-4 rounded-lg border border-[#E8E8E8] bg-gray-50/80 cursor-pointer">
                    <div className="mt-0.5">
                        <CreditCard className="h-5 w-5 text-[#8899aa]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#1a2332]">Mastercard</h3>
                        <p className="text-sm text-[#8899aa]">Expiry 02/2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
