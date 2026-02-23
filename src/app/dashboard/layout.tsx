"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { VarnishLogo } from "@/components/onboarding/logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#0C1E35]">
            <Sidebar className="hidden md:flex sticky top-0" />

            {/* Mobile Top Nav */}
            <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-[#0b1120] px-4 md:hidden">
                <VarnishLogo />
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#0C1E35] md:hidden pt-14">
                    <Sidebar className="w-full" />
                </div>
            )}

            {/* Main content area (The "White Part") */}
            <main className="relative flex-1 bg-white md:rounded-[12px] md:my-3 md:mr-3 mt-14 md:mt-3 flex flex-col items-center overflow-x-auto overflow-y-hidden min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-24px)]">
                {/* Background Lines - Top Center */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[768px] h-[495px] pointer-events-none z-0"
                    aria-hidden="true"
                    style={{
                        backgroundImage: 'url("/BackgroundLines.svg")',
                        backgroundPosition: 'top center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}
                />

                {/* Dashboard Content */}
                <div className="relative z-10 w-full flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
