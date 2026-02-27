"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export function AddPaymentMethodForm() {
    const [name, setName] = useState("Nick Jonas")
    const [cardNumber, setCardNumber] = useState("1234 1234 1234 1234")
    const [expiry, setExpiry] = useState("06 / 2026")
    const [cvc, setCvc] = useState("***")
    const [saveAsDefault, setSaveAsDefault] = useState(true)

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">

            <div className="space-y-6">

                {/* Card Details Section */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-12 pb-6 border-b">
                    <div className="md:w-40 md:pt-2">
                        <h3 className="text-sm font-semibold text-gray-700">Card Details</h3>
                    </div>

                    <div className="flex-1 space-y-4 md:max-w-xl">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Name on card
                                </label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter name"
                                    className="h-11"
                                />
                            </div>
                            <div className="w-1/3 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Expiry
                                </label>
                                <Input
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    placeholder="MM / YYYY"
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Card number
                                </label>
                                <Input
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    placeholder="1234 1234 1234 1234"
                                    className="h-11"
                                />
                            </div>
                            <div className="w-1/3 space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    CVC
                                </label>
                                <Input
                                    type="password"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    placeholder="***"
                                    className="h-11"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save as default */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-semibold text-gray-700 mb-2 md:mb-0">
                        Save as default
                    </label>

                    <Switch
                        checked={saveAsDefault}
                        onCheckedChange={setSaveAsDefault}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]">
                    Save card
                </Button>
            </div>
        </div>
    )
}
