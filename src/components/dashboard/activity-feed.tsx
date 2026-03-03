"use client";

import * as React from "react";
import { Info, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActivityItem {
    id: number;
    title: string;
    description: string;
    timestamp: string;
}

const activityData: ActivityItem[] = [
    {
        id: 1,
        title: "Domain example.com added",
        description: "",
        timestamp: "2h ago",
    },
    {
        id: 2,
        title: "SSL renewed for mysite.net",
        description: "",
        timestamp: "1d ago",
    },
    {
        id: 3,
        title: "Payment received - 49$",
        description: "",
        timestamp: "3d ago",
    },
    {
        id: 4,
        title: "Payment received - 49$",
        description: "",
        timestamp: "3d ago",
    },
    {
        id: 5,
        title: "Payment received - 49$",
        description: "",
        timestamp: "3d ago",
    },
];

export function ActivityFeed() {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
        <div className="w-full bg-[#F6F6F6] rounded-xl border border-[#E8E8E8] overflow-hidden flex flex-col shadow-sm">
            <div className="px-5 py-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#1a2332]">Activity Feed</h2>
                <Button variant="outline" size="sm" className="h-8 px-3 text-[10px] font-bold bg-[#1a2332] text-white hover:bg-[#243044] border-none rounded-md">
                    View All
                </Button>
            </div>

            <div className="px-4 pb-4 space-y-3">
                {activityData.map((item) => (
                    <div key={item.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-start gap-4 relative group hover:border-[#D8D8D8] transition-colors shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0 border border-[#E8E8E8]">
                            <Info className="h-5 w-5 text-[#8899aa]" />
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <h3 className="text-sm font-semibold text-[#1a2332] truncate">{item.title}</h3>
                            <p className="text-xs font-medium text-[#8899aa] mt-0.5">{item.timestamp}</p>
                            <div className="flex items-center gap-4 mt-3">
                                <button className="text-[11px] font-bold text-[#8899aa] hover:text-[#1a2332]">Dismiss</button>
                                <button className="text-[11px] font-bold text-[#1a2332] hover:underline underline-offset-4">View</button>
                            </div>
                        </div>
                        <button className="absolute top-4 right-4 text-[#8899aa] hover:text-[#1a2332] opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Sub-pagination inside Activity Feed as seen in screenshot */}
            <div className="px-4 py-4 flex items-center justify-between border-t border-[#E8E8E8] bg-[#fcfcfc]">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 text-xs font-semibold border-[#E8E8E8] rounded-lg text-[#1a2332] hover:bg-gray-50 bg-white shadow-sm"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>

                <div className="flex items-center gap-1">
                    {[1, 2, 3].map((page) => (
                        <Button
                            key={page}
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-9 w-9 text-xs font-medium transition-colors",
                                currentPage === page
                                    ? "text-[#1a2332] bg-gray-100/50 font-bold"
                                    : "text-[#8899aa] hover:text-[#1a2332] hover:bg-transparent"
                            )}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}
                    <span className="text-xs text-[#8899aa] px-2 font-medium">...</span>
                    {[8, 9, 10].map((page) => (
                        <Button
                            key={page}
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 text-xs font-medium text-[#8899aa] hover:text-[#1a2332] hover:bg-transparent"
                        >
                            {page}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 text-xs font-semibold border-[#E8E8E8] rounded-lg text-[#1a2332] hover:bg-gray-50 bg-white shadow-sm"
                >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
