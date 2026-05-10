"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

const getSafeToken = () => {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("onboarding_jwt") ||
    localStorage.getItem("onboarding_jwt")
  );
};

const getDomains = async () => {
  const token = getSafeToken();
  if (!token) return { data: [] };

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/domain/domains?page=1&limit=50`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch domains");

    return await response.json();
  } catch (error) {
    console.error("Error fetching domains:", error);
    return { data: [] };
  }
};

const getAllServices = async () => {
  const token = getSafeToken();
  if (!token) return [];

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/services`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch services");

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export function AddHostingForm() {
  const router = useRouter();

  const [domain, setDomain] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [disk, setDisk] = useState("");
  const [bandwidth, setBandwidth] = useState("");
  const [plan, setPlan] = useState("");

  const [domains, setDomains] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ✅ AUTH CHECK
  useEffect(() => {
    const token = getSafeToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  // ✅ LOAD DATA
  useEffect(() => {
    if (!isAuthorized) return;

    const loadData = async () => {
      const domainRes = await getDomains();
      const serviceRes = await getAllServices();

      // ✅ FIX: extract .data
      setDomains(domainRes?.data || []);
      setServices(serviceRes || []);
    };

    loadData();
  }, [isAuthorized]);

  // ✅ SUBMIT
  const handleSubmit = async () => {
    const token = getSafeToken();
    if (!token) return;

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const response = await fetch(`${apiUrl}/services/hosting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          domain,
          plan,
          meta: {
            cpu,
            ram,
            disk,
            bandwidth,
            monitoring: true,
            autoScaling: false,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to create hosting");

      alert("Hosting added successfully 🚀");
      router.push("/dashboard/hosting");
    } catch (error) {
      console.error(error);
      alert("Error adding hosting");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">
      <div className="space-y-6">
        {/* PLAN */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
          <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
            Plan
          </label>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="h-11 w-full md:max-w-xl border rounded-lg px-3"
          >
            <option value="">Select Plan</option>

            {services
              .filter((s: any) => s.type === "HOSTING")
              .map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>

        {/* FIELDS */}
        {[
          {
            label: "Domain",
            value: domain,
            set: setDomain,
            options: Array.isArray(domains)
              ? domains.map((d: any) => d.domain) // ✅ FIXED
              : [],
          },
          {
            label: "CPU",
            value: cpu,
            set: setCpu,
            options: ["2V Cores", "4V Cores"],
          },
          {
            label: "RAM",
            value: ram,
            set: setRam,
            options: ["4GB", "8GB"],
          },
          {
            label: "DISK",
            value: disk,
            set: setDisk,
            options: ["80GB", "120GB"],
          },
          {
            label: "Bandwidth",
            value: bandwidth,
            set: setBandwidth,
            options: ["120GB", "150GB"],
          },
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
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900"
              >
                <option value="">Select {field.label}</option>

                {field.options.map((opt: any) => (
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

      {/* SWITCHES */}
      <div className="my-6 md:my-8 border-t border-gray-200" />

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 py-4 max-w-md">
          <span className="text-sm font-medium text-gray-700">
            Enable Monitoring & Uptime
          </span>
          <Switch />
        </div>

        <div className="flex items-center justify-between px-4 py-4 max-w-md">
          <span className="text-sm font-medium text-gray-700">
            Enable auto resource scaling
          </span>
          <Switch />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="my-6 md:my-8 border-t border-gray-200" />

      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
        <Button variant="outline" className="w-full sm:w-auto px-6">
          Cancel
        </Button>

        <Button
          className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]"
          onClick={handleSubmit}
        >
          Add Hosting
        </Button>
      </div>
    </div>
  );
}