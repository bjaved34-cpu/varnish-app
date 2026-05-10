"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon, Plus } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { SSLList } from "@/components/dashboard/ssl/ssl-list";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getSafeToken = () => {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("onboarding_jwt") ||
    localStorage.getItem("onboarding_jwt")
  );
};

const getHostingData = async (page: number) => {
  const token = getSafeToken();
  if (!token) return null;

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(
      `${apiUrl}/services/hosting?page=${page}&limit=5`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch");

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Hosting() {
  const router = useRouter();

  const [sslData, setSslData] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [page, setPage] = useState(1);

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
      const result = await getHostingData(page);
      setSslData(result);
    };

    loadData();
  }, [isAuthorized, page]);

  return (
    <div className="flex flex-col h-full bg-white">
      <Header
        title="Hosting"
        description="Manage, connect and monitor all your hostings."
        buttonLabel="Hosting"
        buttonIcon={<Plus />}
      />

      <div className="flex-1 p-8 pt-6 space-y-8">
        {/* Stat Cards */}
        <div className="flex flex-wrap gap-6">
          <StatCard title="Hosting" value="2 Sites" trend="7%" icon={Server} />
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

        {/* TABLE */}
        <SSLList
          ssl={[...(sslData?.data || []).map((item: any) => ({
            id: item.id,
            domain: item.domain,
            plan: item.plan,
            status: item.status,
            cpu: item.meta?.cpu || "-",
            ram: item.meta?.ram || "-",
            disk: item.meta?.disk || "-",
            bandwidth: item.meta?.bandwidth || "-",
            uptime: "-",
            action: "Manage",
          }))]}
          page={page}
          setPage={setPage}
          totalPages={sslData?.meta?.lastPage || 1}
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