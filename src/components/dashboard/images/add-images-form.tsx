"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const getSafeToken = () => {
    if (typeof window === "undefined") return null
    return (
        sessionStorage.getItem("onboarding_jwt") ||
        localStorage.getItem("onboarding_jwt")
    )
}

export function AddImagesForm() {
    const [domains, setDomains] = useState<any[]>([])
    const [domainId, setDomainId] = useState("")

    const [sourceFormat, setSourceFormat] = useState("")
    const [targetFormat, setTargetFormat] = useState("")
    const [quality, setQuality] = useState([0, 25])
    const [maxWidth, setMaxWidth] = useState("1920")
    const [enableRule, setEnableRule] = useState(true)

    const [loading, setLoading] = useState(false)

    // ✅ FETCH DOMAINS
    useEffect(() => {
        const fetchDomains = async () => {
            const token = getSafeToken()
            if (!token) return

            try {
                const apiUrl =
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

                const res = await fetch(
                    `${apiUrl}/domain/domains?page=1&limit=100`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await res.json()
                console.log("DOMAINS:", data)

                setDomains(data?.data || [])
            } catch (err) {
                console.error("Domain fetch error:", err)
            }
        }

        fetchDomains()
    }, [])

    // ✅ SUBMIT
    const handleSubmit = async () => {
        if (!domainId) {
            alert("Please select a domain")
            return
        }

        setLoading(true)

        try {
            const token = getSafeToken()
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

            const res = await fetch(`${apiUrl}/images/rules`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    domainId,
                    sourceFormat,
                    targetFormat,
                    quality: quality[1], // 👈 using max value
                    maxWidth: Number(maxWidth),
                    enabled: enableRule,
                }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            alert("Rule created successfully")

        } catch (err: any) {
            console.error(err)
            alert(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">
            <div className="space-y-6">

                {/* Domain */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Domain
                    </Label>

                    <div className="w-full md:max-w-xl">
                        <Select onValueChange={setDomainId}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select domain" />
                            </SelectTrigger>

                            <SelectContent>
                                {domains.length > 0 ? (
                                    domains.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>
                                            {d.domain}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="none" disabled>
                                        No domains found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Source Format */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Source Format
                    </Label>

                    <div className="w-full md:max-w-xl">
                        <Select onValueChange={setSourceFormat}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="gif">GIF</SelectItem>
                                <SelectItem value="bmp">BMP</SelectItem>
                                <SelectItem value="tiff">TIFF</SelectItem>
                                <SelectItem value="all">All</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Target Format */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Target Format
                    </Label>

                    <div className="w-full md:max-w-xl">
                        <Select onValueChange={setTargetFormat}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="webp">WebP</SelectItem>
                                <SelectItem value="avif">AVIF</SelectItem>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="png">PNG</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Quality */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0 mt-2">
                        Quality
                    </Label>

                    <div className="w-full md:max-w-xl space-y-2">
                        <Slider
                            value={quality}
                            onValueChange={setQuality}
                            min={0}
                            max={100}
                            step={1}
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{quality[0]}%</span>
                            <span>{quality[1]}%</span>
                        </div>
                    </div>
                </div>

                {/* Max Width */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0 mt-2">
                        Max Width
                    </Label>

                    <div className="w-full md:max-w-xl">
                        <Select value={maxWidth} onValueChange={setMaxWidth}>
                            <SelectTrigger className="h-11">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="640">640 px</SelectItem>
                                <SelectItem value="1024">1024 px</SelectItem>
                                <SelectItem value="1280">1280 px</SelectItem>
                                <SelectItem value="1920">1920 px</SelectItem>
                                <SelectItem value="2560">2560 px</SelectItem>
                                <SelectItem value="3840">3840 px</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Enable */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Enable Rule
                    </Label>

                    <Switch
                        checked={enableRule}
                        onCheckedChange={setEnableRule}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" disabled={loading}>
                    Cancel
                </Button>

                <Button
                    className="bg-[#0C1E35] hover:bg-[#0a1729]"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Rule"}
                </Button>
            </div>
        </div>
    )
}