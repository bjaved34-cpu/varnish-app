"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
    { name: "Jan", total: 400 },
    { name: "Feb", total: 600 },
    { name: "Mar", total: 450 },
    { name: "Apr", total: 100 },
    { name: "May", total: 350 },
    { name: "Jun", total: 400 },
];

export function UsageSummaryChart() {
    return (
        <div className="w-full bg-white rounded-xl border border-[#E8E8E8] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-[#8899aa]">Usage Summary</h2>
                <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
                    {["1H", "1D", "7D", "1M"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${tab === "7D"
                                    ? "bg-white text-[#1a2332] shadow-sm"
                                    : "text-[#8899aa] hover:text-[#1a2332]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-[#1a2332]">Bar Chart</h3>
                <p className="text-sm text-[#8899aa]">January - June 2024</p>
            </div>

            <div className="h-[200px] w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                            hide
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#2EB086"
                            radius={[4, 4, 4, 4]}
                            barSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E8E8E8]">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1a2332] mb-1">
                    Trending up by 5.2% this month
                    <div className="flex items-center justify-center bg-black text-white w-4 h-4 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                    </div>
                </div>
                <p className="text-sm text-[#8899aa]">
                    Showing Performance for the last 7 days
                </p>
            </div>
        </div>
    );
}
