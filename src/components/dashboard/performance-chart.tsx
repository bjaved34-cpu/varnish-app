"use client";

import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const data7D = [
    { name: "Mon", value: 62 }, { name: "Mon", value: 68 }, { name: "Mon", value: 65 }, { name: "Mon", value: 67 },
    { name: "Tue", value: 62 }, { name: "Tue", value: 65 }, { name: "Tue", value: 63 }, { name: "Tue", value: 58 },
    { name: "Wed", value: 54 }, { name: "Wed", value: 58 }, { name: "Wed", value: 52 }, { name: "Wed", value: 48 },
    { name: "Thu", value: 52 }, { name: "Thu", value: 55 }, { name: "Thu", value: 50 }, { name: "Thu", value: 48 },
    { name: "Fri", value: 52 }, { name: "Fri", value: 54 }, { name: "Fri", value: 52 }, { name: "Fri", value: 50 },
    { name: "Sat", value: 52 }, { name: "Sat", value: 50 }, { name: "Sat", value: 48 }, { name: "Sat", value: 45 },
    { name: "Sun", value: 48 }, { name: "Sun", value: 45 }, { name: "Sun", value: 42 }, { name: "Sun", value: 38 },
];

const data1H = Array.from({ length: 12 }, (_, i) => ({
    name: `${i * 5}m`,
    value: 50 + Math.random() * 20
}));

const data1D = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}:00`,
    value: 40 + Math.random() * 30
}));

const data1M = Array.from({ length: 30 }, (_, i) => ({
    name: `D${i + 1}`,
    value: 30 + Math.random() * 40
}));

export function PerformanceChart() {
    const [period, setPeriod] = React.useState<"1H" | "1D" | "7D" | "1M">("7D");

    const currentData = React.useMemo(() => {
        switch (period) {
            case "1H": return data1H;
            case "1D": return data1D;
            case "7D": return data7D;
            case "1M": return data1M;
            default: return data7D;
        }
    }, [period]);

    return (
        <div className="w-full bg-[#F6F6F6] rounded-[10px] p-[10px] border border-[#D8D8D8] flex">
            <div className="w-full h-full flex flex-col">
                <div className="flex items-center justify-between px-2 mb-4 flex-shrink-0">
                    <h2 className="text-[15px] font-semibold text-[#8899aa]">Performance</h2>
                    <div className="flex items-center bg-[#E8E8E8] p-[3px] rounded-lg">
                        {["1H", "1D", "7D", "1M"].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p as any)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                                    period === p ? "bg-white text-[#1a2332] shadow-sm" : "text-[#8899aa]"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-[#E8E8E8] p-6 flex-1 min-h-[400px]">
                    <div className="h-[340px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={currentData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#E8E8E8" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8899aa", fontSize: 13 }}
                                    dy={15}
                                    interval={period === "7D" ? 3 : period === "1M" ? 4 : 2}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8899aa", fontSize: 13 }}
                                    domain={[0, 90]}
                                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563EB"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    dot={false}
                                    activeDot={{ r: 4, strokeWidth: 0, fill: "#2563EB" }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
