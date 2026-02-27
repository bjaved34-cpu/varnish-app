"use client";

import { AddDomain } from "@/components/dashboard/add-domain";
import { AddHostingForm } from "@/components/dashboard/hosting/add-hosting-form";
import { AddSSLForm } from "@/components/dashboard/ssl/add-ssl-form";
import Header from "@/components/dashboard/header";
import { Plus } from "lucide-react";

export default function AddHostingPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <Header name="Add SSL Certificate" buttonLabel="Back" buttonIcon={<Plus />} />
            <AddSSLForm />
        </div>
    );
}
