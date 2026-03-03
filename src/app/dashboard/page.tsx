"use client";

import Header from "@/components/dashboard/header";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Plus } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <Header
                title="Dashboard"
                description="Manage, connect and monitor all your domains."
                buttonLabel="Download"
                buttonIcon={<Plus />}
            />

            <div className="flex-1 p-6 space-y-6">
                {/* Top Row Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardStatCard
                        title="CDN Reqs"
                        value="1.2 M"
                        trend="+12.1%"
                        trendType="up"
                    />
                    <DashboardStatCard
                        title="Active Domains"
                        value="3"
                        trend="+12.1%"
                        trendType="up"
                    />
                    <DashboardStatCard
                        title="Bandwidth"
                        value="48 GB"
                        trend="+12.1%"
                        trendType="up"
                    />
                    <DashboardStatCard
                        title="Cache Hit"
                        value="92 %"
                        trend="-9.8%"
                        trendType="down"
                    />
                </div>

                {/* Middle Row Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <SummaryCard title="Hosting" value="2 sites" />
                    <SummaryCard title="Domains" value="3 Domains" />
                    <SummaryCard title="Varnish" value="92% hit" />
                    <SummaryCard title="SSL" value="expiring soon" />
                    <SummaryCard title="Images" value="18% saved" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <PerformanceChart />
                    </div>
                    <div className="lg:col-span-1">
                        <CacheSplit />
                    </div>
                </div>

                {/* Activity Feed Section */}
                <div className="pb-8">
                    <ActivityFeed />
                </div>
            </div>
        </div>
    );
}
