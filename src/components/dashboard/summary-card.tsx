"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
    title: string;
    value: string;
    onManage?: () => void;
    className?: string;
}

export function SummaryCard({ title, value, onManage, className }: SummaryCardProps) {
    return (
        <div className={cn(
            "flex-1 min-w-[180px] bg-white border border-[#E8E8E8] rounded-xl p-4 flex flex-col gap-2 shadow-sm",
            className
        )}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#8899aa]">{title}</span>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-[10px] font-bold border-[#E8E8E8] rounded-md text-[#1a2332]"
                    onClick={onManage}
                >
                    Manage
                </Button>
            </div>
            <span className="text-xl font-bold text-[#1a2332]">
                {value}
            </span>
        </div>
    );
}
