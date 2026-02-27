"use client";

import { AddTicketForm } from "@/components/dashboard/support/add-ticket-form";
import { AddDomain } from "@/components/dashboard/add-domain";

export default function AddNewTicketPage() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Create New Ticket" />
            <AddTicketForm />
        </div>
    );
}
