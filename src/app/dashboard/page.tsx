"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { DomainList } from "@/components/dashboard/domain-list";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <DashboardHeader />

            <div className="flex-1 p-8 pt-6 space-y-8">
                {/* Stat Cards Container */}
                <div className="flex flex-wrap gap-6">
                    <StatCard
                        title="Hosting"
                        value="2 Sites"
                        trend="7%"
                        icon={Server}
                    />
                    <StatCard
                        title="SSL"
                        value="2 Sites"
                        trend="7%"
                        icon={ShieldCheck}
                    />
                    <StatCard
                        title="Images"
                        value="2 Sites"
                        trend="7%"
                        icon={ImageIcon}
                    />
                </div>

                {/* Domain List Section */}
                <DomainList />

                {/* Performance Charts Section */}
                <div className="flex flex-col lg:flex-row gap-6 pb-8 items-stretch">
                    <div className="w-full lg:w-[56%] flex">
                        <PerformanceChart />
                    </div>
                    <div className="w-full lg:flex-1 flex">
                        <CacheSplit />
                    </div>
                </div>
            </div>
        </div>
    );
}
