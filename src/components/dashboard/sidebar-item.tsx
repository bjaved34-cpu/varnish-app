"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface SidebarItemProps {
    title: string;
    icon: string;
    hasDropdown?: boolean;
    subItems?: string[];
    isActive?: boolean;
    defaultOpen?: boolean;
}


export function SidebarItem({
    title,
    icon,
    hasDropdown,
    subItems,
    isActive: propIsActive,
    defaultOpen = false,
}: SidebarItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const toggleDropdown = () => {
        if (hasDropdown) {
            setIsOpen(!isOpen);
        } else if (title === "Billings") {
            router.push("/dashboard/billings");
        } else if (title === "Settings") {
            router.push("/dashboard/settings");
        } else if (title === "Support") {
            // We have a dropdown for support now, but this is handled by subItems
        }
    };


    return (
        <div className="w-full">
            <button
                onClick={toggleDropdown}
                className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all group rounded-lg",
                    (!hasDropdown && ((pathname.startsWith("/dashboard/billings") && title === "Billings") || (pathname.startsWith("/dashboard/settings") && title === "Settings")))
                        ? "bg-[#1e2d40] text-white"
                        : "hover:bg-[#1e2d40] text-[#ACAEAF] hover:text-white"
                )}
            >
                <div className="flex items-center flex-1">
                    <Image
                        src={icon}
                        alt={title}
                        width={20}
                        height={20}
                        className="mr-3 opacity-70 group-hover:opacity-100"
                    />
                    <span className="text-base">{title}</span>
                </div>
                {hasDropdown && (
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 ml-auto transition-transform duration-200 opacity-50 group-hover:opacity-100",
                            isOpen && "rotate-180"
                        )}
                    />
                )}
            </button>

            {hasDropdown && isOpen && subItems && (
                <div className="relative mt-1 ml-6 pl-4 py-1">
                    {/* Vertical connecting line */}
                    <div className="absolute left-0 top-0 bottom-4 w-[1px] bg-white" />

                    <div className="space-y-2">
                        {subItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveSubIndex(index);

                                    if (item === "Add New Domain") {
                                        router.push("/dashboard/add-domain");
                                    } else if (item === "Add New Hosting") {
                                        router.push("/dashboard/hosting/add-hosting");
                                    } else if (item === "List of Hosting") {
                                        router.push("/dashboard/hosting");
                                    } else if (item === "List of SSL") {
                                        router.push("/dashboard/ssl");
                                    } else if (item === "Add New SSL") {
                                        router.push("/dashboard/ssl/add-new-ssl");
                                    }
                                    else if (item === "Add New Images") {
                                        router.push("/dashboard/images/add-images");
                                    }
                                    else if (item === "List of Images") {
                                        router.push("/dashboard/images");
                                    } else if (item === "List of Support") {
                                        router.push("/dashboard/support");
                                    } else if (item === "Add New Ticket") {
                                        router.push("/dashboard/support/add-new-ticket");
                                    } else {
                                        router.push("/dashboard");
                                    }
                                }}
                                className={cn(
                                    "flex items-center transition-all rounded-[7px] text-left text-xs font-medium",
                                    (
                                        (item === "Add New Domain" && pathname === "/dashboard/add-domain") ||
                                        (item === "List of Domains" && pathname === "/dashboard") ||
                                        (item === "List of Hosting" && pathname === "/dashboard/hosting") ||
                                        (item === "Add New Hosting" && pathname === "/dashboard/hosting/add-hosting") ||
                                        (item === "List of SSL" && pathname === "/dashboard/ssl") ||
                                        (item === "Add New SSL" && pathname === "/dashboard/ssl/add-new-ssl") ||
                                        (item === "Add New Images" && pathname === "/dashboard/images/add-images") ||
                                        (item === "List of Images" && pathname === "/dashboard/images") ||
                                        (item === "List of Support" && pathname === "/dashboard/support") ||
                                        (item === "Add New Ticket" && pathname === "/dashboard/support/add-new-ticket")
                                    )
                                        ? "bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] h-[28px] w-[152px] justify-start px-[16px]"
                                        : "text-[#ACAEAF] hover:text-white hover:bg-[#1e2d40] py-2 w-full px-4"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
