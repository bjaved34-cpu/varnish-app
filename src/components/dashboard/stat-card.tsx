"use client";

import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    icon: LucideIcon;
    className?: string;
}

export function StatCard({ title, value, trend, icon: Icon, className }: StatCardProps) {
    return (
        <div
            className={cn(
                "h-[112px] w-full md:w-[320px] bg-[#F6F6F6] border border-[#D8D8D8] rounded-[10px] p-[10px] flex flex-col gap-1.5",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-1">
                <Icon className="h-4 w-4 text-[#8899aa]" />
                <span className="text-sm font-medium text-[#8899aa]">{title}</span>
            </div>

            {/* Main Stat Panel */}
            <div className="flex-1 bg-white rounded-[7px] border border-[#E8E8E8] flex items-center px-4 justify-between shadow-sm">
                <div className="flex items-baseline gap-2">
                    <span className="text-[26px] font-bold text-[#1a2332] tracking-tight">
                        {value}
                    </span>
                    <div className="flex items-center text-[#2EB086] text-xs font-semibold gap-0.5">
                        <TrendingUp className="h-3 w-3" />
                        <span>{trend}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
