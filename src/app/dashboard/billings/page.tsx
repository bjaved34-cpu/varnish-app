"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/header";
import { BillingPlanCard } from "@/components/dashboard/billings/billing-plan-card";
import { InvoicesTable } from "@/components/dashboard/billings/invoices-table";
import { PaymentMethodCard } from "@/components/dashboard/billings/payment-method-card";
import { UsageSummaryChart } from "@/components/dashboard/billings/usage-summary-chart";
import { CostBreakdownChart } from "@/components/dashboard/billings/cost-breakdown-chart";
import { useRouter } from "next/navigation";

const getSafeToken = () => {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("onboarding_jwt") ||
    localStorage.getItem("onboarding_jwt")
  );
};

export default function BillingsPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);

useEffect(() => {
  const fetchSummary = async () => {
    const token = getSafeToken();
    if (!token) return;

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${apiUrl}/billing/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setSummary(data);
  };

  fetchSummary();
}, []);

  const [invoices, setInvoices] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInvoices = async () => {
      const token = getSafeToken();
      if (!token) return;

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const res = await fetch(
        `${apiUrl}/billing/invoices?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      console.log("BILLING DATA:", result);

      setInvoices(result?.data || []);
      setTotalPages(result?.meta?.lastPage || 1);
    };

    fetchInvoices();
  }, [page]);
console.log("hey there is invoice data " +invoices);
  return (
    <div className="flex flex-col min-h-full bg-white pb-8">
      <Header
        title="Billing"
        description="View Invoices, Manage subscriptions, and update payment methods"
        buttonLabel="Add Payment Method"
        onButtonClick={() =>
          router.push("/dashboard/billings/add-payment-method")
        }
      />

      <div className="flex-1 px-8 space-y-6 pt-4">
        <BillingPlanCard summary={summary} />

        {/* ✅ PASS REAL DATA */}
        <InvoicesTable
          data={invoices}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

        <PaymentMethodCard />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsageSummaryChart />
          <CostBreakdownChart />
        </div>
      </div>
    </div>
  );
}