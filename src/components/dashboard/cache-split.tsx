"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const data30D = [
    { name: "Hit", value: 25, color: "#2A9D8F" },
    { name: "Miss", value: 75, color: "#F4A261" },
];

const data7D = [
    { name: "Hit", value: 42, color: "#2A9D8F" },
    { name: "Miss", value: 58, color: "#F4A261" },
];

export function CacheSplit() {
    const [period, setPeriod] = React.useState<"30" | "7">("30");

    const data = period === "30" ? data30D : data7D;
    const hitPercentage = data.find(d => d.name === "Hit")?.value || 0;

    return (
        <div className="w-full bg-[#F6F6F6] rounded-[10px] p-[10px] border border-[#D8D8D8] flex flex-col h-full">
            <div className="flex items-center justify-between px-2 mb-4 flex-shrink-0">
                <h2 className="text-[15px] font-semibold text-[#8899aa]">Cache Split</h2>
                <div className="flex items-center bg-[#E8E8E8] p-[3px] rounded-lg">
                    <button
                        onClick={() => setPeriod("30")}
                        className={cn(
                            "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                            period === "30" ? "bg-white text-[#1a2332] shadow-sm" : "text-[#8899aa]"
                        )}
                    >
                        30 Day
                    </button>
                    <button
                        onClick={() => setPeriod("7")}
                        className={cn(
                            "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                            period === "7" ? "bg-white text-[#1a2332] shadow-sm" : "text-[#8899aa]"
                        )}
                    >
                        7 Day
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E8E8E8] p-8 flex flex-col md:flex-row items-center justify-center gap-12 flex-1">
                <div className="relative w-full max-w-[240px] aspect-square">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Inner content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[42px] font-bold text-[#1a2332] leading-none">{hitPercentage}%</span>
                        <span className="text-sm font-medium text-[#8899aa]">Hit</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-6 min-w-[140px]">
                    <div className="space-y-4">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                                <div className="w-full">
                                    <span className="text-sm font-medium text-[#8899aa]">{entry.name} {entry.value}%</span>
                                    <div className="h-[1px] bg-[#E8E8E8] mt-2 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
