"use client"

import { AddDomain } from "@/components/dashboard/add-domain"
import { AddImagesForm } from "@/components/dashboard/images/add-images-form"

export default function AddImages() {
    return (
        <div className="flex flex-col h-full bg-white">
            <AddDomain name="Add Optimization Rule" />
            <AddImagesForm />
        </div>
    )
}