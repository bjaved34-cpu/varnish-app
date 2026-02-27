"use client"

import { useState } from "react"
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

export function AddImagesForm() {
    const [quality, setQuality] = useState([0, 25])
    const [enableRule, setEnableRule] = useState(true)

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">
            <div className="space-y-6">

                {/* Domain */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <Label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Domain
                    </Label>

                    <div className="w-full md:max-w-xl">
                        <Select defaultValue="mynet.com">
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select domain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mynet.com">www.mynet.com</SelectItem>
                                <SelectItem value="example.com">example.com</SelectItem>
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
                        <Select>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="gif">GIF</SelectItem>
                                <SelectItem value="bmp">BMP</SelectItem>
                                <SelectItem value="tiff">TIFF</SelectItem>
                                <SelectItem value="all">All Formats</SelectItem>
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
                        <Select>
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
                            className="w-full"
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

                    <div className="w-full md:max-w-xl space-y-1">
                        <Select defaultValue="1920">
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select" />
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
                        <p className="text-sm text-gray-500">Optional</p>
                    </div>
                </div>

                {/* Enable Rule */}
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
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]">
                    Save Rule
                </Button>
            </div>
        </div>
    )
}
