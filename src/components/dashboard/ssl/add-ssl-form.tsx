"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation";

const getSafeToken = () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("onboarding_jwt") || localStorage.getItem("onboarding_jwt");
}

export function AddSSLForm() {
    const router = useRouter();

    // ✅ FIXED STATES
    const [domain, setDomain] = useState("");
    const [plan, setPlan] = useState(""); // SSL serviceId
    const [crt, setCrt] = useState("");
    const [key, setKey] = useState("");
    const [caBundle, setCaBundle] = useState("");
    const [autoRenew, setAutoRenew] = useState(false);
    const [autoSSL, setAutoSSL] = useState(false);

    // ✅ DYNAMIC DATA
    const [domains, setDomains] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);

    // ✅ FETCH DOMAINS + SSL SERVICES
    useEffect(() => {
        const fetchData = async () => {
            const token = getSafeToken();
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

            try {
                const [domainRes, serviceRes] = await Promise.all([
                    fetch(`${apiUrl}/domain/domains?page=1&limit=100`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${apiUrl}/services`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                
                if (!domainRes.ok) throw new Error("Failed to fetch domains");
                if (!serviceRes.ok) throw new Error("Failed to fetch services");

                const domainData = await domainRes.json();
                const serviceData = await serviceRes.json();
                console.log("DOMAIN API RESPONSE:", domainData);

                // ✅ FIX HERE
                setDomains(domainData?.data || []);
                setServices(serviceData || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    // ✅ SUBMIT
    const handleSubmit = async () => {
        const token = getSafeToken();

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

            const res = await fetch(`${apiUrl}/services/ssl`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    domain, // ✅ must be domainId
                    plan,   // ✅ must be serviceId
                    meta: {
                        crt,
                        key,
                        caBundle,
                        autoRenew,
                        autoSSL
                    },
                }),
            });

            if (!res.ok) throw new Error("Failed to add SSL");

            router.push("/dashboard/ssl");

        } catch (error) {
            console.error(error);
            alert("Error adding SSL");
        }
    };

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">

            <div className="space-y-6">

                {/* Domain */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Domain
                    </label>

                    <div className="relative w-full md:max-w-xl">
                        <select
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm"
                        >
                            <option value="">Select Domain</option>

                            {Array.isArray(domains) &&
                                domains.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.domain}
                                    </option>
                                ))}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <ChevronLeft className="h-4 w-4 -rotate-90" />
                        </div>
                    </div>
                </div>

                {/* SSL PLAN (ADDED — UI SAME STYLE) */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        SSL Plan
                    </label>

                    <div className="relative w-full md:max-w-xl">
                        <select
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900"
                        >
                            <option value="">Select SSL Plan</option>

                            {services
                                .filter((s) => s.type === "SSL")
                                .map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                {/* Options */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Options
                    </label>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={autoSSL}
                                onChange={(e) => setAutoSSL(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Auto SSL</span>
                        </div>

                        <p className="text-xs text-gray-500">
                            Upload custom certificate below
                        </p>
                    </div>
                </div>

                {/* Upload Domain Section */}
                <div className="space-y-6 pb-6 border-b">
                    <div className="text-sm font-medium text-gray-700">
                        Upload Domain
                    </div>

                    {/* CRT */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                        <label className="md:w-40 text-sm text-gray-700 mb-2 md:mb-0">
                            CRT
                        </label>

                        <Input
                            value={crt}
                            onChange={(e) => setCrt(e.target.value)}
                            placeholder="Enter CRT"
                            disabled={autoSSL}
                            className="md:max-w-xl h-11"
                        />
                    </div>

                    {/* KEY */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                        <label className="md:w-40 text-sm text-gray-700 mb-2 md:mb-0">
                            KEY
                        </label>

                        <Input
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Enter key"
                            disabled={autoSSL}
                            className="md:max-w-xl h-11"
                        />
                    </div>

                    {/* CA Bundle */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                        <label className="md:w-40 text-sm text-gray-700 mb-2 md:mb-0">
                            CA Bundle
                        </label>

                        <Input
                            value={caBundle}
                            onChange={(e) => setCaBundle(e.target.value)}
                            placeholder="Enter CA bundle"
                            disabled={autoSSL}
                            className="md:max-w-xl h-11"
                        />
                    </div>
                </div>

                {/* Enable Auto Renew */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Enable Auto Renew
                    </label>

                    <Switch
                        checked={autoRenew}
                        onCheckedChange={setAutoRenew}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button
                    className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}