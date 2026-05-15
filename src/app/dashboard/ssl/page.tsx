"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Server, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { SSLMessage } from "@/components/dashboard/ssl/ssl-message";
import { AddDomain } from "@/components/dashboard/add-domain";
import { DomainTable } from "@/components/dashboard/domain-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getSafeToken = () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("onboarding_jwt") || localStorage.getItem("onboarding_jwt");
}
const getSslData = async (page: number) => {
    const token = getSafeToken();
    if (!token) return null;
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
           const response = await fetch(
  `${apiUrl}/domain/domains?page=${page}&limit=5`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch SSL data");
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}


export default function Ssl() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [data, setSslData] = useState<any>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getSafeToken();
        if (!token) {
            setIsAuthorized(false);
            setIsLoading(false);
            router.replace("/login");
            return;
        }
        setIsAuthorized(true);
    }, []);

    useEffect(() => {
        if (!isAuthorized) return;
        const loadSslData = async () => {
            const result = await getSslData(page);
            setSslData(result);
            setIsLoading(false);
        };
        loadSslData();
    }, [isAuthorized]);

    console.log("SSL Data:", data);

    if (isLoading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="SSL Certificates" />

            <div className="flex-1 p-8 pt-6 space-y-8">

                {/* SSL Message */}
                <SSLMessage />
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
                    <StatCard
                        title="Images"
                        value="18 Images Saved"
                        trend="7%"
                        icon={ImageIcon}
                    />
                </div>

                <DomainTable
                    title="List of Domains"
                    searchPlaceholder="Search Domains"

                    domainsData={(data?.data || []).map((d: any) => ({
                        id: d.id,
                        domain: d.domain, // ✅ FIXED
                        cpu: d.cpu || "-",
                        ram: d.ram || "-",
                        disk: d.disk || "-",
                        bandwidth: d.bandwidth || "-",
                        uptime: d.uptime || "-",
                        plan: d.plan || "-",
                        status: d.status || "PENDING",
                        action: "Manage",
                    }))}

                    // ✅ REQUIRED PROPS (THIS IS WHAT YOU MISSED)
                    page={page}
                    setPage={setPage}
                    totalPages={data?.meta?.lastPage || 1}
                />
            </div>
        </div>
    );
}
