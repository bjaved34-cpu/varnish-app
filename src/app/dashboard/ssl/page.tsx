"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon, Plus } from "lucide-react";
import { HostingList } from "@/components/dashboard/hosting/hosting-list";
import { Header } from "@/components/dashboard/header";
import { SSLMessage } from "@/components/dashboard/ssl/ssl-message";
export default function Ssl() {
    return (
        <div className="flex flex-col h-full bg-white">
            <Header title="SSL" description="Manage, renew or install SSL Certificates for your domain services" buttonLabel="SSL" buttonIcon={<Plus />} />

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

                {/* Domain List Section */}
                <HostingList />

            </div>
        </div>
    );
}
