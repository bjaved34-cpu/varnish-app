"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { SupportList } from "@/components/dashboard/support/support-list";
import { Header } from "@/components/dashboard/header";

export default function SupportPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <Header
                title="Support"
                description="Get Help from our support team or track your open requests."
                buttonLabel="New Ticket"
            />

            <div className="flex-1 p-8 pt-6 space-y-8">

                {/* Stat Cards Container */}
                <div className="flex flex-wrap gap-6">
                    <StatCard
                        title="Open"
                        value="14.2k"
                        trend="7%"
                        icon={FileText}
                    />
                    <StatCard
                        title="In Progress"
                        value="3.6 GB"
                        trend="7%"
                        icon={Clock}
                    />
                    <StatCard
                        title="Resolved"
                        value="24 %"
                        trend="7%"
                        icon={CheckCircle}
                    />
                </div>

                {/* Support List Section */}
                <SupportList />

            </div>
        </div>
    );
}
