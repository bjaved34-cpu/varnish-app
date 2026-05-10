"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon, Plus } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { ImagesTable } from "@/components/dashboard/images/imagesTable";

const getSafeToken = () => {
    if (typeof window === "undefined") return null;
    return (
        sessionStorage.getItem("onboarding_jwt") ||
        localStorage.getItem("onboarding_jwt")
    );
};

export default function ImagesPage() {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const token = getSafeToken();
            if (!token) return;

            try {
                const apiUrl =
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
                const res = await fetch(
                    `${apiUrl}/images/rules?page=${page}&limit=5`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                const result = await res.json();

                console.log("IMAGES DATA:", result);

                setData(result?.data || []);
                setTotalPages(result?.meta?.lastPage || 1);

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [page]);

    return (
        <div className="flex flex-col h-full bg-white">
            <Header
                title="Image Optimization"
                description="Monitor compression savings and configure rules for image optimization through Varnish"
                buttonLabel="Add Rule"
                buttonIcon={<Plus />}
            />

            <div className="flex-1 p-8 pt-6 space-y-8">

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                    <StatCard
                        title="Total images optimized"
                        value="14.2k"
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
                        value="24%"
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

                {/* ✅ CORRECT TABLE */}
                <ImagesTable
                    title="List of Image Rules"
                    searchPlaceholder="Search rules"
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    domainsData={(data || []).map((item: any) => ({
                        id: item.id,

                        // ✅ USE DIRECT VALUES (NOT NESTED)
                        domain: item.domain || "-",
                        format: item.format || "-",
                        quality: item.quality || "-",
                        resize: item.resize || "Disabled",

                        lastRun: item.lastRun || "-",
                        savings: item.savings || "-",

                        status: item.status || "Pending",

                        action: "Manage",
                    }))}
                />

                {/* Charts */}
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