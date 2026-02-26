"use client";

import { AddDomain } from "@/components/dashboard/add-domain";
import { AddHostingForm } from "@/components/dashboard/hosting/add-hosting-form";
import { AddSSLForm } from "@/components/dashboard/ssl/add-ssl-form";

export default function AddHostingPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Add SSL Certificate" />
            <AddSSLForm />
        </div>
    );
}
