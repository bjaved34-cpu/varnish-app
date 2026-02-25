"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { HostingList } from "@/components/dashboard/hosting/hosting-list";
import { HostingHeader } from "@/components/dashboard/hosting/hosting-header";
export default function Hosting() {
    return (
        <div className="flex flex-col h-full bg-white">
            <HostingHeader />

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
                        value="Expiring in 7d"
                        trend="7%"
                        icon={ShieldCheck}
                    />
                    <StatCard
                        title="Images"
                        value="18 Images Saved"
                        trend="7%"
                        icon={ImageIcon}
                    />
                </div>

                {/* Domain List Section */}
                <HostingList />

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
