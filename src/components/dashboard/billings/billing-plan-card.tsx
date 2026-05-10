"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";


export function BillingPlanCard({ summary }: any) {
  if (!summary) return null;

  return (
    <div className="p-6 border rounded-lg">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {summary.lastPlan || "No Plan"}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Last payment method: {summary.lastPayment || "N/A"}
          </p>

          <p className="mt-2">
            Renewal:{" "}
            {summary.renewalDate
              ? new Date(summary.renewalDate).toDateString()
              : "N/A"}
          </p>

          <p>Total Spent: ${summary.totalSpent}</p>
        </div>

        <div className="text-3xl font-bold">
          ${summary.totalSpent}
        </div>
      </div>
    </div>
  );
}