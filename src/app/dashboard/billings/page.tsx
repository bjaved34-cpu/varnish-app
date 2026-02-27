"use client";

import { Header } from "@/components/dashboard/header";
import { BillingPlanCard } from "@/components/dashboard/billings/billing-plan-card";
import { InvoicesTable } from "@/components/dashboard/billings/invoices-table";
import { PaymentMethodCard } from "@/components/dashboard/billings/payment-method-card";
import { UsageSummaryChart } from "@/components/dashboard/billings/usage-summary-chart";
import { CostBreakdownChart } from "@/components/dashboard/billings/cost-breakdown-chart";
import { useRouter } from "next/navigation";

export default function BillingsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-full bg-white pb-8">
            <Header
                title="Billing"
                description="View Invoices, Manage subscriptions, and update payment methods"
                buttonLabel="Add Payment Method"
                onButtonClick={() => router.push("/dashboard/billings/add-payment-method")}
            />

            {/* We override the header button's default action in the layout or we can just make our own header if needed. The provided Header component doesn't take an onClick for the button, so we might need to modify Header or use a custom one. Wait, let's use a custom header area or add onClick to Header. */}

            <div className="flex-1 px-8 space-y-6 pt-4">
                <BillingPlanCard />
                <InvoicesTable />
                <PaymentMethodCard />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <UsageSummaryChart />
                    <CostBreakdownChart />
                </div>
            </div>
        </div>
    );
}
