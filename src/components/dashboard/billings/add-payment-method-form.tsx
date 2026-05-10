"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

export function AddPaymentMethodForm() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvc, setCvc] = useState("")
    const [saveAsDefault, setSaveAsDefault] = useState(true)

    const [loading, setLoading] = useState(false)

    const getToken = () => {
        return (
            sessionStorage.getItem("onboarding_jwt") ||
            localStorage.getItem("onboarding_jwt")
        )
    }

    const handleSave = async () => {
        if (!cardNumber || !expiry || !name) {
            alert("Please fill all fields")
            return
        }

        setLoading(true)

        try {
            const token = getToken()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/billing/payment-method`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        cardNumber,
                        expiry,
                        cvc,
                        saveAsDefault,
                    }),
                }
            )

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            // ✅ redirect back to billing page
            router.push("/dashboard/billings")

        } catch (err: any) {
            console.error(err)
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">

            <div className="space-y-6">

                {/* Card Details */}
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
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Default toggle */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-semibold text-gray-700">
                        Save as default
                    </label>

                    <Switch
                        checked={saveAsDefault}
                        onCheckedChange={setSaveAsDefault}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>

                <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save card"}
                </Button>
            </div>
        </div>
    )
}