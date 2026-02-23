"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

    const toggleDropdown = () => {
        if (hasDropdown) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={toggleDropdown}
                className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium transition-all group rounded-lg",
                    "hover:bg-[#1e2d40] text-[#ACAEAF] hover:text-white"
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
                    <div className="absolute left-0 top-0 bottom-4 w-[1px] bg-white opacity-20" />

                    <div className="space-y-2">
                        {subItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSubIndex(index)}
                                className={cn(
                                    "flex items-center transition-all rounded-[7px] text-left",
                                    "text-xs font-medium",
                                    index === 0
                                        ? "bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] h-[28px] w-[152px] justify-start px-[10px]"
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
