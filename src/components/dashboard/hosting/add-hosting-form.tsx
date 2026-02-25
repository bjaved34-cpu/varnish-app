"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function AddHostingForm() {
    const [hosting, setHosting] = useState("");
    const [cpu, setCpu] = useState("");
    const [ram, setRam] = useState("");
    const [disk, setDisk] = useState("");
    const [bandwidth, setBandwidth] = useState("");

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">

            {/* Form Fields */}
            <div className="space-y-6">

                {/* Plan */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Plan
                    </label>

                    <Input
                        placeholder="Plan name e.g basic"
                        value={hosting}
                        onChange={(e) => setHosting(e.target.value)}
                        className="w-full md:max-w-xl h-11"
                    />
                </div>

                {/* Select Fields */}
                {[
                    { label: "Domain", value: hosting, set: setHosting, options: ["mynet.com"] },
                    { label: "CPU", value: cpu, set: setCpu, options: ["2V Cores", "4V Cores", "6V Cores", "8V Cores"] },
                    { label: "RAM", value: ram, set: setRam, options: ["4GB", "6GB", "8GB", "12GB"] },
                    { label: "DISK", value: disk, set: setDisk, options: ["80GB", "100GB", "120GB", "150GB"] },
                    { label: "Bandwidth", value: bandwidth, set: setBandwidth, options: ["120GB", "150GB", "180GB", "200GB"] },
                ].map((field) => (
                    <div
                        key={field.label}
                        className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b last:border-none"
                    >
                        <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                            {field.label}
                        </label>

                        <div className="relative w-full md:max-w-xl">
                            <select
                                value={field.value}
                                onChange={(e) => field.set(e.target.value)}
                                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                            >
                                <option value="">Select {field.label}</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                <ChevronLeft className="h-4 w-4 -rotate-90" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="my-6 md:my-8 border-t border-gray-200" />

            {/* Switch Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between  px-4 py-4 max-w-md">
                    <span className="text-sm font-medium text-gray-700">
                        Enable Monitoring & Uptime
                    </span>
                    <Switch />
                </div>

                <div className="flex items-center justify-between  px-4 py-4 max-w-md">
                    <span className="text-sm font-medium text-gray-700">
                        Enable auto resource scaling
                    </span>
                    <Switch />
                </div>
            </div>

            {/* Bottom Divider */}
            <div className="my-6 md:my-8 border-t border-gray-200" />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]">
                    Add Hosting
                </Button>
            </div>
        </div>
    );
}