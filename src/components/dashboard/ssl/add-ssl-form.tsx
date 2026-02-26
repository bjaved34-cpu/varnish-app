"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft } from "lucide-react"

export function AddSSLForm() {
    const [domain, setDomain] = useState("www.mynet.com")
    const [type, setType] = useState("CRT")
    const [key, setKey] = useState("")
    const [caBundle, setCaBundle] = useState("")
    const [autoRenew, setAutoRenew] = useState(false)

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">

            <div className="space-y-6">

                {/* Domain */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Domain
                    </label>

                    <div className="relative w-full md:max-w-xl">
                        <select
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                        >
                            <option value="www.mynet.com">www.mynet.com</option>
                            <option value="example.com">example.com</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <ChevronLeft className="h-4 w-4 -rotate-90" />
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Options
                    </label>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Auto SSL</span>
                        </div>

                        <p className="text-xs text-gray-500">
                            Upload custom certificate below
                        </p>
                    </div>
                </div>

                {/* Upload Domain Section */}
                <div className="space-y-6 pb-6 border-b">
                    <div className="text-sm font-medium text-gray-700">
                        Upload Domain
                    </div>

                    {/* CRT */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                        <label className="md:w-40 text-sm text-gray-700 mb-2 md:mb-0">
                            CRT
                        </label>

                        <Input
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Enter CRT"
                            className="md:max-w-xl h-11"
                        />
                    </div>

                    {/* KEY */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                        <label className="md:w-40 text-sm text-gray-700 mb-2 md:mb-0">
                            KEY
                        </label>

                        <Input
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Enter key"
                            className="md:max-w-xl h-11"
                        />
                    </div>

                    {/* CA Bundle */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-12">
                        <label className="md:w-40 text-sm text-gray-700 mb-2 md:mb-0">
                            CA Bundle
                        </label>

                        <Input
                            value={caBundle}
                            onChange={(e) => setCaBundle(e.target.value)}
                            placeholder="Enter CA bundle"
                            className="md:max-w-xl h-11"
                        />
                    </div>
                </div>

                {/* Enable Auto Renew */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Enable Auto Renew
                    </label>

                    <Switch
                        checked={autoRenew}
                        onCheckedChange={setAutoRenew}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]">
                    Save
                </Button>
            </div>
        </div>
    )
}