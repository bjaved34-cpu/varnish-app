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

const data1H = [
    { name: "0m", value: 58 }, { name: "5m", value: 62 }, { name: "10m", value: 64 },
    { name: "15m", value: 61 }, { name: "20m", value: 66 }, { name: "25m", value: 63 },
    { name: "30m", value: 67 }, { name: "35m", value: 65 }, { name: "40m", value: 68 },
    { name: "45m", value: 64 }, { name: "50m", value: 66 }, { name: "55m", value: 63 },
];

const data1D = [
    { name: "0:00", value: 45 }, { name: "1:00", value: 48 }, { name: "2:00", value: 52 },
    { name: "3:00", value: 54 }, { name: "4:00", value: 50 }, { name: "5:00", value: 53 },
    { name: "6:00", value: 57 }, { name: "7:00", value: 60 }, { name: "8:00", value: 62 },
    { name: "9:00", value: 59 }, { name: "10:00", value: 61 }, { name: "11:00", value: 63 },
    { name: "12:00", value: 60 }, { name: "13:00", value: 58 }, { name: "14:00", value: 56 },
    { name: "15:00", value: 55 }, { name: "16:00", value: 57 }, { name: "17:00", value: 59 },
    { name: "18:00", value: 61 }, { name: "19:00", value: 60 }, { name: "20:00", value: 58 },
    { name: "21:00", value: 56 }, { name: "22:00", value: 54 }, { name: "23:00", value: 52 },
];

const data1M = [
    { name: "D1", value: 45 }, { name: "D2", value: 48 }, { name: "D3", value: 52 },
    { name: "D4", value: 55 }, { name: "D5", value: 53 }, { name: "D6", value: 56 },
    { name: "D7", value: 58 }, { name: "D8", value: 60 }, { name: "D9", value: 62 },
    { name: "D10", value: 61 }, { name: "D11", value: 59 }, { name: "D12", value: 58 },
    { name: "D13", value: 57 }, { name: "D14", value: 56 }, { name: "D15", value: 57 },
    { name: "D16", value: 59 }, { name: "D17", value: 60 }, { name: "D18", value: 62 },
    { name: "D19", value: 63 }, { name: "D20", value: 61 }, { name: "D21", value: 60 },
    { name: "D22", value: 58 }, { name: "D23", value: 57 }, { name: "D24", value: 56 },
    { name: "D25", value: 55 }, { name: "D26", value: 56 }, { name: "D27", value: 57 },
    { name: "D28", value: 58 }, { name: "D29", value: 60 }, { name: "D30", value: 61 },
];

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
