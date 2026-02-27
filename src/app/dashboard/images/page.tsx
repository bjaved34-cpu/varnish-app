"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon, Plus } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { DomainTable } from "@/components/dashboard/domain-table";

export default function Hosting() {
    return (
        <div className="flex flex-col h-full bg-white">
            <Header title="Image Optimization" description="Monitor compression savings and configure rules for image optimization through Varnish " buttonLabel="Images" buttonIcon={<Plus />} />

            <div className="flex-1 p-8 pt-6 space-y-8">
                {/* Stat Cards Container */}
                <div className="flex flex-wrap gap-6">
                    <StatCard
                        title="Total images optimized"
                        value="14.2 k"
                        trend="7%"
                        icon={Server}
                    />
                    <StatCard
                        title="Data Saved"
                        value="3.6 GB"
                        trend="7%"
                        icon={ShieldCheck}
                    />
                    <StatCard
                        title="Average Compression"
                        value="24 %"
                        trend="7%"
                        icon={ImageIcon}
                    />
                    <StatCard
                        title="Conversion"
                        value="WebP enabled"
                        trend="7%"
                        icon={ImageIcon}
                    />
                </div>

                {/* Domain List Section */}
                <DomainTable title="List of Domains" searchPlaceholder="Search Domains" />

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
