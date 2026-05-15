"use client";

import Header from "@/components/dashboard/header";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ActivityItem {
    id: string;
    userId: string;
    entityId: string | null;
    type: 'SERVICE' | 'BILLING' | 'DOMAIN'; // Based on the visible types in your console
    message: string;
    createdAt: string; // ISO Date string
    endDate?: string | null;
}

// Interface for the pagination object
interface Pagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

// Main Interface for the full API response
interface DashboardStatsResponse {
    id: string;
    userId: string;
    activeDomains: number;
    hostingCount: number;
    mailingCount: number;
    sslCount: number;
    activity: ActivityItem[];
    pagination: Pagination;
}

const getSafeToken = () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("onboarding_jwt") || localStorage.getItem("onboarding_jwt");
};

const fetchDashboardStats = async () => {
    const token = getSafeToken();
    if (!token) return null;
    // Implementation for fetching dashboard stats
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const response = await fetch(`${apiUrl}/dashboard/stats?page=1&limit=5`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch");
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
};


export default function DashboardPage() {
    const router = useRouter();
    const [data, setData] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
     useEffect(() => {
        
    const token = getSafeToken();

    if (!token) {
        router.replace("/login");
        return;
    }

    setIsAuthorized(true);
}, [router]);

    useEffect(() => {
        if (!isAuthorized) return;
        const loadData = async () => {
            const result = await fetchDashboardStats();
            setData(result);
            setLoading(false);
        };

        loadData();
    }, [isAuthorized]);
    if (!isAuthorized || loading) {
        return null;
    }
    console.log("Dashboard Data:", data);
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
                        value={data?.activeDomains.toString() || "0"}
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
                    <SummaryCard
        title="domain"
        value={data?.activeDomains.toString() || "0"}
        type="DOMAIN"
        createdAt={new Date().toISOString()}
        endDate={new Date().toISOString()}
    />

    <SummaryCard
        title="Hosting"
        value={data?.hostingCount.toString() || "0"}
        type="SERVICE"
        createdAt={new Date().toISOString()}
        endDate={new Date().toISOString()}
    />

    <SummaryCard
        title="Varnish"
        value="92% hit"
        type="SERVICE"
        createdAt={new Date().toISOString()}
        endDate={new Date().toISOString()}
    />

    <SummaryCard
        title="SSL"
        value="expiring soon"
        type="SERVICE"
        createdAt={new Date().toISOString()}
        endDate={new Date().toISOString()}
    />

    <SummaryCard
        title="Images"
        value="18% saved"
        type="SERVICE"
        createdAt={new Date().toISOString()}
        endDate={new Date().toISOString()}
    />
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

                <div className="pb-8" >
                    <div className="w-full bg-[#F6F6F6] rounded-xl border border-[#E8E8E8] overflow-hidden flex flex-col shadow-sm">
                        <div className="px-5 py-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-[#1a2332]">Activity Feed</h2>
                            <Button variant="outline" size="sm" className="h-8 px-3 text-[10px] font-bold bg-[#1a2332] text-white hover:bg-[#243044] border-none rounded-md">
                                View All
                            </Button>
                        </div>
                        {data?.activity.map((item) => (

                            <ActivityFeed key={item.id} userId={item.userId} entityId={item.entityId} type={item.type} message={item.message} createdAt={item.createdAt} />

                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
