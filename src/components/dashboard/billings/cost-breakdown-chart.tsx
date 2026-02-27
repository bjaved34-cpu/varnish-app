"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
    { name: "Domain", value: 30, color: "#2EB086" },
    { name: "Hosting", value: 70, color: "#F5A666" },
];

export function CostBreakdownChart() {
    return (
        <div className="w-full bg-[#fcfcfc] rounded-xl border border-[#E8E8E8] p-6 flex flex-col items-center">

            <div className="flex items-center justify-between w-full mb-8">
                <h2 className="text-sm font-semibold text-[#8899aa]">Cost Breakdown</h2>
                <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
                    {["30 Day", "7 Day"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${tab === "30 Day"
                                    ? "bg-white text-[#1a2332] shadow-sm"
                                    : "text-[#8899aa] hover:text-[#1a2332]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={100}
                            stroke="none"
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-bold text-[#1a2332]">90</span>
                    <span className="text-xs font-semibold text-[#8899aa] mt-1">TB Data Saved</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full mt-6 pl-8">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                        <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium text-[#1a2332]">{item.name}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}
