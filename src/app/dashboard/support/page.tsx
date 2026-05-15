"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { SupportList } from "@/components/dashboard/support/support-list";
import { Header } from "@/components/dashboard/header";

const getSafeToken = () => {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("onboarding_jwt") ||
    localStorage.getItem("onboarding_jwt")
  );
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchTickets = async () => {
      const token = getSafeToken();
      if (!token) return;

      const res = await fetch(
        `${apiUrl}/ticket?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      setTickets(result?.data || []);
      setTotalPages(result?.meta?.lastPage || 1);
    };

    fetchTickets();
  }, [page]);

  // 🔥 dynamic stats
  const open = tickets.filter(t => t.status === "OPEN").length;
  const inProgress = tickets.filter(t => t.status === "IN_PROGRESS").length;
  const resolved = tickets.filter(t => t.status === "RESOLVED").length;

  return (
    <div className="flex flex-col h-full bg-white">
      <Header
        title="Support"
        description="Get Help from our support team or track your open requests."
        buttonLabel="New Ticket"
      />

      <div className="flex-1 p-8 pt-6 space-y-8">

        {/* ✅ REAL STATS */}
        <div className="flex flex-wrap gap-6">
          <StatCard
            title="Open"
            value={open.toString()}
            trend="0%"
            icon={FileText}
          />

          <StatCard
            title="In Progress"
            value={inProgress.toString()}
            trend="0%"
            icon={Clock}
          />

          <StatCard
            title="Resolved"
            value={resolved.toString()}
            trend="0%"
            icon={CheckCircle}
          />
        </div>

        {/* ✅ PASS REAL DATA */}
        <SupportList
          tickets={tickets}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}