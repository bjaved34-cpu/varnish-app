"use client";

import { AddDomain } from "@/components/dashboard/add-domain";
import { AddHostingForm } from "@/components/dashboard/hosting/add-hosting-form";


export default function AddHostingPage() {
   
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Add Hosting" />
            <AddHostingForm />
        </div>
    );
}
