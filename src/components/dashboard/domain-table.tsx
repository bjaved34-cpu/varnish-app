"use client"

import * as React from "react"
import {
    ChevronsUpDown,
    Search,
    ArrowLeft,
    ArrowRight,
    Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils"

const domainData = [
    {
        id: 1,
        domain: "example.com",
        cpu: "2v cores",
        ram: "4 GB",
        disk: "80 GB",
        bandwidth: "120 GB",
        uptime: "99.9%",
        plan: "Basic",
        status: "Approved",
        action: "Manage",
    },
    {
        id: 2,
        domain: "my shop.net",
        cpu: "4v cores",
        ram: "8 GB",
        disk: "160 GB",
        bandwidth: "-",
        uptime: "-",
        plan: "Pro",
        status: "Approved",
        action: "Manage",
    },
    {
        id: 3,
        domain: "cdn-site.io",
        cpu: "8v cores",
        ram: "16 GB",
        disk: "320 GB",
        bandwidth: "1.2 TB",
        uptime: "99.7%",
        plan: "Enterprise",
        status: "Approved",
        action: "Manage",
    },
    {
        id: 4,
        domain: "cdn-site.io",
        cpu: "8v cores",
        ram: "16 GB",
        disk: "320 GB",
        bandwidth: "1.2 TB",
        uptime: "99.7%",
        plan: "Enterprise",
        status: "Pending",
        action: "Activate",
    },
    {
        id: 5,
        domain: "cdn-site.io",
        cpu: "8v cores",
        ram: "16 GB",
        disk: "320 GB",
        bandwidth: "1.2 TB",
        uptime: "99.7%",
        plan: "Enterprise",
        status: "Expired",
        action: "Renew",
    },
]

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
    Approved: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", dot: "bg-[#22C55E]" },
    Pending: { bg: "bg-[#FFFBEB]", text: "text-[#92400E]", dot: "bg-[#F59E0B]" },
    Expired: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", dot: "bg-[#22C55E]" },
}

interface DomainTableProps {
    title: string
    searchPlaceholder?: string
}

export function DomainTable({ title, searchPlaceholder = "Search Domains" }: DomainTableProps) {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedRows, setSelectedRows] = React.useState<number[]>([])
    const [currentPage, setCurrentPage] = React.useState(1)

    const filteredData = domainData.filter(
        (item) =>
            item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.plan.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleAll = () => {
        if (
            selectedRows.length === filteredData.length &&
            filteredData.length > 0
        ) {
            setSelectedRows([])
        } else {
            setSelectedRows(filteredData.map((d) => d.id))
        }
    }

    const toggleRow = (id: number) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        )
    }

    const isAllSelected =
        filteredData.length > 0 &&
        selectedRows.length === filteredData.length

    const totalPages = 10

    return (
        <div className="w-full bg-[#F6F6F6] rounded-xl p-4 border border-[#E8E8E8] flex flex-col">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-sm font-semibold text-[#1a2332]">
                    {title}
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 pl-3 pr-10 text-xs bg-white border-[#E8E8E8] rounded-lg"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#8899aa]" />
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 text-xs bg-white border-[#E8E8E8]"
                    >
                        Filters
                    </Button>

                    <Button
                        size="sm"
                        className="h-9 px-4 text-xs bg-[#1a2332] hover:bg-[#243044]"
                    >
                        Manage
                    </Button>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-x-auto bg-white rounded-lg border border-[#E8E8E8]">

                <div className="min-w-[1000px]">
                    <Table>
                        <TableHeader className="bg-[#fcfcfc]">
                            <TableRow className="border-[#E8E8E8]">
                                <TableHead className="w-[40px] text-center">
                                    <button
                                        onClick={toggleAll}
                                        className={cn(
                                            "w-4 h-4 rounded border flex items-center justify-center mx-auto transition-colors",
                                            isAllSelected
                                                ? "bg-[#1a2332] border-[#1a2332]"
                                                : "border-[#D8D8D8] bg-white"
                                        )}
                                    >
                                        {isAllSelected && (
                                            <Check className="h-3 w-3 text-white" />
                                        )}
                                    </button>
                                </TableHead>

                                {[
                                    "Domain",
                                    "CPU",
                                    "Ram",
                                    "Disk",
                                    "Bandwidth",
                                    "Uptime",
                                    "Plan",
                                    "Status",
                                    "Actions",
                                ].map((header) => (
                                    <TableHead
                                        key={header}
                                        className="text-[#8899aa] font-medium text-xs"
                                    >
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            {header}
                                            {header !== "Actions" && (
                                                <ChevronsUpDown className="h-3 w-3" />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredData.map((item) => {
                                const isSelected = selectedRows.includes(item.id)
                                const style = statusStyles[item.status] || statusStyles["Approved"]

                                return (
                                    <TableRow
                                        key={item.id}
                                        className={cn(
                                            "border-[#E8E8E8] hover:bg-gray-50/50 h-[64px]",
                                            isSelected && "bg-gray-50/80"
                                        )}
                                    >
                                        <TableCell className="text-center">
                                            <button
                                                onClick={() => toggleRow(item.id)}
                                                className={cn(
                                                    "w-4 h-4 rounded border flex items-center justify-center mx-auto transition-colors",
                                                    isSelected
                                                        ? "bg-[#1a2332] border-[#1a2332]"
                                                        : "border-[#D8D8D8] bg-white"
                                                )}
                                            >
                                                {isSelected && (
                                                    <Check className="h-3 w-3 text-white" />
                                                )}
                                            </button>
                                        </TableCell>

                                        <TableCell className="text-xs font-medium text-[#1a2332]">
                                            {item.domain}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold">
                                            {item.cpu}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold">
                                            {item.ram}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold">
                                            {item.disk}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold">
                                            {item.bandwidth}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold">
                                            {item.uptime}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold">
                                            {item.plan}
                                        </TableCell>

                                        <TableCell>
                                            <div className={cn(
                                                "flex items-center gap-1.5 px-2 py-1 rounded-md border w-fit",
                                                style.bg, style.text,
                                                item.status === "Approved" && "border-[#DCFCE7]",
                                                item.status === "Pending" && "border-[#FDE68A]",
                                                item.status === "Expired" && "border-[#DCFCE7]",
                                            )}>
                                                <div className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
                                                <span className="text-[10px] font-semibold">
                                                    {item.status}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 px-3 text-[10px] font-semibold border-[#E8E8E8]"
                                            >
                                                {item.action}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                            {filteredData.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="h-[300px] text-center text-xs text-[#8899aa]"
                                    >
                                        No domains found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-[#E8E8E8] bg-white">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs border-[#E8E8E8]"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "h-8 w-8 text-xs font-semibold",
                                    currentPage === page
                                        ? "bg-[#1a2332] text-white"
                                        : "border-[#E8E8E8]"
                                )}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <span className="text-xs text-[#8899aa] px-1">...</span>

                        {[8, 9, 10].map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "h-8 w-8 text-xs font-semibold",
                                    currentPage === page
                                        ? "bg-[#1a2332] text-white"
                                        : "border-[#E8E8E8]"
                                )}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs border-[#E8E8E8]"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
