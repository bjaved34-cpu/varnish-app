"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const getsafeToken = () => {
    if (typeof window === "undefined") return null; 
    return sessionStorage.getItem("onboarding_jwt") || localStorage.getItem("onboarding_jwt");
}

export function AddDomainForm() {
    const [domain, setDomain] = useState("");
    const [useVarnish, setUseVarnish] = useState(false);
    const [enableSSL, setEnableSSL] = useState(false);
    // 1. ADD LOADING STATE TO PREVENT DOUBLE CLICKS
    const [isLoading, setIsLoading] = useState(false);

    const handleAddDomain = async () => {
        // Prevent multiple simultaneous requests
        if (isLoading || !domain) return;
        
        setIsLoading(true);
        const token = getsafeToken();
     
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            const response = await fetch(`${apiUrl}/domain`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ domainName: domain, sslEnabled: enableSSL })
            });
            console.log("FINAL API URL:", apiUrl);
            // 2. SAFE JSON PARSING
            const responseText = await response.text();
            const result = responseText ? JSON.parse(responseText) : {};

            if (!response.ok) {
                // If it fails because it was "already added" by the first click, 
                // we might want to just proceed to redirect anyway.
                if (result.message?.includes("already exist")) {
                    window.location.href = "/dashboard/domains";
                    return;
                }
                throw new Error(result.message || "Failed to add domain");
            }
            
            // Success
            setDomain("");
            window.location.href = "/dashboard/domains";
        } catch (error: any) {
            console.error("Error adding domain:", error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                <label className="md:w-32 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                    Domain
                </label>
                <Input
                    placeholder="www.mynet.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full md:max-w-xl h-11"
                    disabled={isLoading}
                />
            </div>

            <div className="my-6 md:my-8 border-t border-gray-200" />

            <div className="space-y-4 md:ml-44 md:max-w-xl">
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:bg-gray-50 transition">
                    <input
                        type="checkbox"
                        checked={useVarnish}
                        onChange={() => setUseVarnish(!useVarnish)}
                        className="h-4 w-4"
                        disabled={isLoading}
                    />
                    <span className="text-sm text-gray-700">Use Varnish edge caching</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:bg-gray-50 transition">
                    <input
                        type="checkbox"
                        checked={enableSSL}
                        onChange={() => setEnableSSL(!enableSSL)}
                        className="h-4 w-4"
                        disabled={isLoading}
                    />
                    <span className="text-sm text-gray-700">Enable SSL automatically</span>
                </label>
            </div>

            <div className="my-6 md:my-8 border-t border-gray-200" />

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6" disabled={isLoading}>
                    Cancel
                </Button>

                <Button 
                    className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]" 
                    onClick={handleAddDomain}
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add Domain"}
                </Button>
            </div>
        </div>
    );
}
