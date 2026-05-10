import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Interfaces ---
export interface DomainServiceItem {
  id: string;
  domainId: string;
  serviceId: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
}

export interface DomainData {
  createdAt: string;
  id: string;
  name: string;
  sslEnabled: boolean;
  updatedAt: string;
  userId: string;
  verificationStatus: string;
  DomainService: DomainServiceItem[];
}

interface DashboardStatCardProps {
    title: string;
    value: string;
    trend: string;
    trendType: "up" | "down";
    className?: string;
}

// --- Logic Helpers ---

// 1. Fixed: Helper to get token safely without crashing SSR


export function DashboardStatCard({ title, value, trend, trendType, className }: DashboardStatCardProps) {

    const isUp = trendType === "up";

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
