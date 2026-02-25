"use client";

import Image from "next/image";
import { SidebarItem } from "./sidebar-item";
import { VarnishLogo } from "@/components/onboarding/logo";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        title: "Dashboard",
        icon: "/DashboardIcon.svg",
        hasDropdown: true,
    },
    {
        title: "Domains",
        icon: "/domainIcon.svg",
        hasDropdown: true,
        subItems: ["List of Domains", "Add New Domain"],
    },
    {
        title: "Hosting",
        icon: "/hostingIcon.svg",
        hasDropdown: true,
        subItems: ["List of Hosting", "Add New Hosting"],
    },
    {
        title: "SSL",
        icon: "/sslIcon.svg",
        hasDropdown: true,
    },
    {
        title: "Images",
        icon: "/imagesIson.svg",
        hasDropdown: true,
    },
    {
        title: "Billings",
        icon: "/billingIcon.svg",
        hasDropdown: false,
    },
];

const bottomMenuItems = [
    {
        title: "Support",
        icon: "/supportIcon.svg",
        hasDropdown: false,
    },
    {
        title: "Settings",
        icon: "/settingsIcon.svg",
        hasDropdown: false,
    },
];

export function Sidebar({ className }: { className?: string }) {
    return (
        <aside className={cn("hidden w-64 flex-shrink-0 flex-col md:flex bg-[#0C1E35] h-screen overflow-hidden", className)}>
            <div className="flex-shrink-0">
                <VarnishLogo />
            </div>
            <div className="px-6 pt-2 flex-1 flex flex-col min-h-0 overflow-x-hidden">
                <div className="text-[10px] font-medium text-[#ACAEAF] uppercase tracking-wider mb-6 ml-1 flex-shrink-0">
                    Menu
                </div>
                {/* Scrollable Main Navigation */}
                <nav className="space-y-1 flex-1 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.title}
                            {...item}
                            defaultOpen={item.title === "Domains"}
                        />
                    ))}
                </nav>

                {/* Sticky Bottom Menu Items */}
                <nav className="mt-auto space-y-1 py-6 border-t border-[#1e2d40]/50 flex-shrink-0">
                    {bottomMenuItems.map((item) => (
                        <SidebarItem key={item.title} {...item} />
                    ))}
                </nav>
            </div>
        </aside>
    );
}
