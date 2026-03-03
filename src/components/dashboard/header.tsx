"use client";

import { Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
interface HeaderProps {
    title?: string;
    name?: string;
    description?: string;
    buttonLabel?: string;
    buttonIcon?: React.ReactNode;
    onButtonClick?: () => void;
}
export function Header({ title, name, description, buttonLabel, buttonIcon, onButtonClick }: HeaderProps) {
    const displayTitle = title || name || "";
    return (
        <header className="flex flex-col md:flex-row md:h-[102px] w-full items-start md:items-center justify-between px-6 md:px-8 py-6 gap-4 border-b border-gray-100/50">
            <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2332]">
                    {displayTitle}
                </h1>
                {description && (
                    <p className="text-xs md:text-sm font-medium text-[#8899aa]">
                        {description}
                    </p>
                )}
            </div>

            {(buttonLabel || buttonIcon) && (
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-[#1a2332] shadow-sm">
                        <RotateCw className="h-4 w-4 text-[#8899aa]" />
                        <span>12 Oct 2025 - 08 Nov 2025</span>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 md:h-10 px-3 md:px-4 rounded-lg bg-[#1a2332] text-white font-bold hover:bg-[#243044] border-none shadow-sm transition-all active:scale-[0.98]"
                    >
                        Download
                    </Button>
                </div>
            )}
        </header>
    );
}

export default Header;
