"use client";

import { Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
interface HeaderProps {
    title: string;
    description: string;
    buttonLabel: string;
    buttonIcon: React.ReactNode;
}
export function Header({ title, description, buttonLabel, buttonIcon }: HeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:h-[102px] w-full items-start md:items-center justify-between px-6 md:px-8 py-6 gap-4 border-b border-gray-100/50">
            <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2332]">
                    {title}
                </h1>
                <p className="text-xs md:text-sm font-medium text-[#8899aa]">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 md:h-10 md:w-10 rounded-lg border-gray-200 text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
                >
                    <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                    className="flex h-9 md:h-10 items-center gap-2 rounded-lg bg-[#1a2332] px-3 md:px-4 text-xs md:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#243044] active:scale-[0.98]"
                >
                    <Plus className="h-4 w-4" />
                    <span>{buttonLabel}</span>
                </Button>
            </div>
        </header>
    );
}
