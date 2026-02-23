"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { DomainList } from "@/components/dashboard/domain-list";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { AddDomain } from "@/components/dashboard/add-domain";
import { AddDomainForm } from "@/components/dashboard/add-domain-form";

export default function AddDomainPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain />
            <AddDomainForm />
        </div>
    );
}
