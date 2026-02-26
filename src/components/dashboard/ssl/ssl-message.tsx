"use client"

import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export function SSLMessage() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-muted/50 border rounded-xl p-4">

            <div className="flex items-start gap-3">
                <div className="p-2 bg-background rounded-md border">
                    <Info className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                    <p className="font-medium">Certificate</p>
                    <p className="text-sm text-muted-foreground">
                        Certificate expiring within 7 days
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <Button variant="outline">Dismiss</Button>
                <Button>Renew all expiring SSLs</Button>
            </div>

        </div>
    )
}