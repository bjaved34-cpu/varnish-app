"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon, Plus } from "lucide-react";
import Header from "@/components/dashboard/header";
import { DomainList } from "@/components/dashboard/domain-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getSafeToken = () => {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("onboarding_jwt") ||
    localStorage.getItem("onboarding_jwt")
  );
};

const fetchDashboardDomainStats = async (page: number) => {
  const token = getSafeToken();
  if (!token) return null;

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(
  `${apiUrl}/domain/domains?page=${page}&limit=5`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch");

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export default function DomainsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ AUTH CHECK
  useEffect(() => {
    const token = getSafeToken();
    console.log("Token:", token);

    if (!token) {
      console.log("No token → redirecting");
      router.replace("/login");
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  // ✅ FETCH ONLY AFTER AUTH
  useEffect(() => {
  if (!isAuthorized) return;

  const loadData = async () => {
    setLoading(true);
    const result = await fetchDashboardDomainStats(page); // ✅ pass page
    setData(result);
    setLoading(false);
  };

  loadData();
}, [isAuthorized, page]); // ✅ VERY IMPORTANT
  
  // ✅ UI STATES
  if (!isAuthorized) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading domains...</p>
      </div>
    );
  }
console.log("Rendering Domains Page" , data);
  return (
    <div className="flex flex-col h-full bg-white">
      <Header
        title="Domains"
        description="Manage, connect and monitor all your domains."
        buttonLabel="Domain"
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

        {/* Domain List */}
        <DomainList
          domainsData={(data?.data || []).map((item: any) => ({
            id: item.id ?? item._id ?? `${Math.random()}`,
            name: item.domain || item.name || "Name",
            cdn: item.cdnReq || item.cdn || item.cdn_req || "218k",
            bandwidth: item.bandwidth || "12 GB",
            cache: item.cache || item.cacheRate || "94%",
            expiry: item.expiry || item.expiryDate || item.expiresAt || "23/09/25",
            ssl: item.ssl || item.sslStatus || item.ssl_status || "Valid",
            status: item.status || "Approved",
            action: "Manage",
          }))}
          page={page}
          totalPages={data?.meta?.lastPage || 1}
          setPage={setPage}
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