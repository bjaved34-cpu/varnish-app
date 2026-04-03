"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/use-onboarding-store";
import { useRouter} from "next/navigation";

interface DashboardStatCardProps {
    title: string;
    value: string;
    trend: string;
    trendType: "up" | "down";
    className?: string;
}

const storageToken = (sessionStorage.getItem("onboarding_jwt") || localStorage.getItem("onboarding_jwt"));
console.log("DashboardStatCard token:", storageToken);

async function fetchDashboardStats() {
    const router = useRouter();
    const token = storageToken;
    if (!token) {
        console.warn("No auth token found for fetching dashboard stats");
        router.push("/onboarding/services");
    }
    try{
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const responseDomain = await fetch(`${apiUrl}/domain/domains`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        
        if (!responseDomain.ok) {
            throw new Error("Failed to fetch dashboard stats");
        }
        console.log(responseDomain.json())
    }catch(error){ 
        console.error("Failed to fetch dashboard stats:", error);
    }
}

export function DashboardStatCard({ title, value, trend, trendType, className }: DashboardStatCardProps) {
    const isUp = trendType === "up";
    const data = fetchDashboardStats();
    return (
        <div className={cn(
            "flex-1 min-w-[200px] bg-white border border-[#E8E8E8] rounded-xl p-5 flex flex-col gap-3 shadow-sm",
            className
        )}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#8899aa]">{title}</span>
                <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                    isUp ? "bg-[#F0FDF4] text-[#22C55E]" : "bg-[#FEF2F2] text-[#EF4444]"
                )}>
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{trend}</span>
                </div>
            </div>
            <span className="text-3xl font-bold text-[#1a2332] tracking-tight">
                {value}
            </span>
        </div>
    );
}
