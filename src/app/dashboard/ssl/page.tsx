"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Server, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { SSLMessage } from "@/components/dashboard/ssl/ssl-message";
import { AddDomain } from "@/components/dashboard/add-domain";
import { DomainTable } from "@/components/dashboard/domain-table";

export default function Ssl() {
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

                {/* Domain List Section */}
                <DomainTable title="List of Domains" searchPlaceholder="Search Domains" />

            </div>
        </div>
    );
}
