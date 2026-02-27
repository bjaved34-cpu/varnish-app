"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function BillingPlanCard() {
    return (
        <div className="w-full bg-white rounded-xl border border-[#E8E8E8] p-6">
            <div className="flex flex-col md:flex-row justify-between mb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[20px] font-bold text-[#1a2332]">Pro Plan</h2>
                        <span className="px-2 py-1 text-xs font-semibold text-[#1a2332] bg-gray-100 rounded-md border border-gray-200">
                            Monthly
                        </span>
                    </div>
                    <p className="text-sm text-[#8899aa]">
                        Our most popular plan for small teams.
                    </p>

                    <div className="pt-2 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1a2332]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a2332]" />
                            Renewal: 12 Nov 2025
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1a2332]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a2332]" />
                            Total Due: $146
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1a2332]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a2332]" />
                            Payment method: VISA ending in 1234
                        </div>
                    </div>
                </div>

                <div className="mt-6 md:mt-0 flex flex-col md:items-end">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[40px] font-bold text-[#1a2332] tracking-tighter">$99</span>
                        <span className="text-sm font-medium text-[#8899aa]">/month + usage</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#E8E8E8]">
                <button className="text-sm font-semibold text-[#8899aa] hover:text-[#1a2332] transition-colors">
                    View Subscription Details
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#1a2332] hover:text-black transition-colors group">
                    Upgrade plan
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
            </div>
        </div>
    );
}
