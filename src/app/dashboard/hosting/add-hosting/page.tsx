"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { DomainList } from "@/components/dashboard/domain-list";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CacheSplit } from "@/components/dashboard/cache-split";
import { Server, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { AddDomain } from "@/components/dashboard/add-domain";
import { AddHostingForm } from "@/components/dashboard/hosting/add-hosting-form";
import { HostingHeader } from "@/components/dashboard/hosting/hosting-header";

export default function AddHostingPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Add Hosting" />
            <AddHostingForm />
        </div>
    );
}
