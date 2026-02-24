"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddDomainForm() {
    const [domain, setDomain] = useState("");
    const [useVarnish, setUseVarnish] = useState(false);
    const [enableSSL, setEnableSSL] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full">

            {/* Domain Row */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">

                {/* Label */}
                <label className="md:w-32 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                    Domain
                </label>

                {/* Input */}
                <Input
                    placeholder="www.mynet.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full md:max-w-xl h-11"
                />
            </div>

            {/* Divider */}
            <div className="my-6 md:my-8 border-t border-gray-200" />

            {/* Options */}
            <div className="space-y-4 md:ml-44 md:max-w-xl">

                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:bg-gray-50 transition">
                    <input
                        type="checkbox"
                        checked={useVarnish}
                        onChange={() => setUseVarnish(!useVarnish)}
                        className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                        Use Varnish edge caching
                    </span>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:bg-gray-50 transition">
                    <input
                        type="checkbox"
                        checked={enableSSL}
                        onChange={() => setEnableSSL(!enableSSL)}
                        className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                        Enable SSL automatically
                    </span>
                </label>
            </div>

            {/* Bottom Divider */}
            <div className="my-6 md:my-8 border-t border-gray-200" />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]">
                    Add Domain
                </Button>
            </div>
        </div>
    );
}