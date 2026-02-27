"use client";
import { AddDomain } from "@/components/dashboard/add-domain";
import { AddDomainForm } from "@/components/dashboard/add-domain-form";

export default function AddDomainPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Add Domain" />
            <AddDomainForm />
        </div>
    );
}
