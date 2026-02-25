"use client";

import { ArrowLeft, Plus, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
interface headingName {
    name: string
}
export function AddDomain({ name }: headingName) {
    return (
        <header className="flex flex-col md:flex-row md:h-[102px] w-full items-start md:items-center justify-between px-6 md:px-8 py-6 gap-4">
            <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2332]">
                    {name}
                </h1>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <Button
                    className="flex h-9 md:h-10 items-center gap-2 rounded-lg bg-[#1a2332] px-3 md:px-4 text-xs md:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#243044] active:scale-[0.98]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>
            </div>
        </header>
    )
}
