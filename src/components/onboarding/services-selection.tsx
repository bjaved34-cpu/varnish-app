"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/store/use-onboarding-store";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Service {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
}

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onToggle: () => void;
}

function ServiceCard({ service, isSelected, onToggle }: ServiceCardProps) {
    return (
        <Card
            onClick={onToggle}
            className={cn(
                "group relative flex h-[191px] w-[262px] cursor-pointer flex-col overflow-hidden border-none bg-[#182230] p-0 transition-all duration-200 ring-2 ring-inset ring-[#182230]",
                isSelected ? "ring-white" : "hover:ring-white/20"
            )}
        >
            <CardContent className="flex flex-1 flex-col p-5 pb-0">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            {service.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-400">
                            {service.subtitle}
                        </p>
                    </div>
                    <div
                        className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors duration-200",
                            isSelected
                                ? "bg-white border-white text-[#182230]"
                                : "border-gray-600 bg-transparent text-transparent"
                        )}
                    >
                        <Check className="h-3 w-3" strokeWidth={4} />
                    </div>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-gray-300 line-clamp-2">
                    {service.description}
                </p>
            </CardContent>

            <CardFooter className="mt-auto flex h-[49px] items-center justify-end border-t border-white/10 px-5 pb-[9px] pt-0">
                <div className="flex items-center gap-3 text-gray-200">
                    <span className="text-sm font-medium">{service.price}</span>
                    <ArrowRight className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    );
}

export function ServicesSelection() {
    const router = useRouter();
    const { selectedServices, toggleService, jwtToken } = useOnboardingStore();
    const [services, setServices] = React.useState<Service[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const fetchServices = async () => {
            if (!jwtToken) {
                setError("No authentication token found");
                setIsLoading(false);
                return;
            }

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/services`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }

                const data = await response.json();
                setServices(data.services || data); // Adjust based on your API response structure
            } catch (err) {
                console.error('Error fetching services:', err);
                setError(err instanceof Error ? err.message : 'Failed to load services');
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, [jwtToken]);

    const handleSubmitServices = async () => {
        if (!jwtToken || selectedServices.length === 0) return;
        setIsSubmitting(true);

        try {
            const storageToken = typeof window !== "undefined" ? (sessionStorage.getItem("onboarding_jwt") || localStorage.getItem("onboarding_jwt")) : null;
            const activeToken = jwtToken || storageToken;

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            const response = await fetch(`${apiUrl}/onboarding/services`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${activeToken}`,
                },
                body: JSON.stringify({
                    serviceIds: selectedServices,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.message || `Failed to save services (${response.status})`);
            }

            router.push("/onboarding/billing");
        } catch (err) {
            console.error("Services submit failed:", err);
            setError(err instanceof Error ? err.message : "Failed to save services");
        } finally {
            setIsSubmitting(false);
        }
    };



    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-[850px]"
            >
                <div className="mb-10 text-center">
                    <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
                        Services
                    </h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Loading services...</div>
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-[850px]"
            >
                <div className="mb-10 text-center">
                    <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
                        Services
                    </h1>
                </div>
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-[850px]"
        >
            <div className="mb-10 text-center">
                <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
                    Services
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedServices.includes(service.id)}
                        onToggle={() => toggleService(service.id)}
                    />
                ))}
            </div>

            <div className="mt-12 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/onboarding/domain")}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>
                <Button
                    onClick={handleSubmitServices}
                    disabled={selectedServices.length === 0 || isSubmitting}
                    className="h-11 rounded-lg bg-[#1a2332] px-10 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#243044] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Saving...
                        </span>
                    ) : (
                        "Next"
                    )}
                </Button>
            </div>
        </motion.div>
    );
}
