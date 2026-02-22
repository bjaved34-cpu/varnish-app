"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useOnboardingStore } from "@/store/use-onboarding-store";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const accountDetails = useOnboardingStore((state) => state.accountDetails);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Redirection logic: if user is not on the first step and email is missing (store reset)
        const isStartPage = pathname === "/onboarding/account-details";

        if (!isStartPage && !accountDetails.email) {
            router.replace("/onboarding/account-details");
        } else {
            setIsChecking(false);
        }
    }, [accountDetails.email, pathname, router]);

    if (isChecking && pathname !== "/onboarding/account-details") {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
