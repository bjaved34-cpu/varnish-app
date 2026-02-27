"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Upload, FileImage } from "lucide-react"

export function AddTicketForm() {
    const [subject, setSubject] = useState("www.mynet.com")
    const [category, setCategory] = useState("General")
    const [priority, setPriority] = useState("Normal")
    const [description, setDescription] = useState("")
    const [attachedFile, setAttachedFile] = useState<File | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) setAttachedFile(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setAttachedFile(file)
    }

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">

            <div className="space-y-6">

                {/* Subject */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Subject
                    </label>

                    <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter subject"
                        className="md:max-w-xl h-11"
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Category
                    </label>

                    <div className="relative w-full md:max-w-xl">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                        >
                            <option value="General">General</option>
                            <option value="Technical">Technical</option>
                            <option value="Billing">Billing</option>
                            <option value="Account">Account</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <ChevronLeft className="h-4 w-4 -rotate-90" />
                        </div>
                    </div>
                </div>

                {/* Priority */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
                        Priority
                    </label>

                    <div className="relative w-full md:max-w-xl">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.08)]"
                        >
                            <option value="Low">Low</option>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <ChevronLeft className="h-4 w-4 -rotate-90" />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-12 pb-6 border-b">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0 md:pt-2">
                        Description
                    </label>

                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add Description here"
                        className="md:max-w-xl min-h-[120px] resize-none"
                    />
                </div>

                {/* Attachments */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-12 pb-6">
                    <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0 md:pt-2">
                        Attachements
                    </label>

                    <div className="w-full md:max-w-xl">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${isDragOver
                                    ? "border-[#1a2332] bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <Upload className="h-8 w-8 text-gray-400" />
                            <div className="text-center">
                                <span className="text-sm font-semibold text-gray-700">Click to upload</span>
                                <span className="text-sm text-gray-500"> or drag and drop</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>

                            {attachedFile && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 bg-gray-50 rounded-md px-3 py-2">
                                    <FileImage className="h-4 w-4" />
                                    <span>{attachedFile.name}</span>
                                </div>
                            )}

                            {/* Decorative file icon in bottom-right corner */}
                            <div className="absolute bottom-3 right-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-md border border-gray-100">
                                    <span className="text-[8px] font-bold text-gray-400 uppercase">JPG</span>
                                </div>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/svg+xml,image/png,image/jpeg,image/gif"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="w-full sm:w-auto px-6">
                    Cancel
                </Button>

                <Button className="w-full sm:w-auto px-6 bg-[#0C1E35] hover:bg-[#0a1729]">
                    Submit Ticket
                </Button>
            </div>
        </div>
    )
}
