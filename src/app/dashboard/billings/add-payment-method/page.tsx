"use client";

import { AddPaymentMethodForm } from "@/components/dashboard/billings/add-payment-method-form";
import { AddDomain } from "@/components/dashboard/add-domain";

export default function AddPaymentMethodPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Add Payment Method" />
            <AddPaymentMethodForm />
        </div>
    );
}
