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

const invoiceData = [
    {
        id: 1,
        invoice: "Invoice #007",
        date: "Dec 1, 2025",
        amount: "USD $99.00",
        plan: "Basic Plan",
        status: "Approved",
    },
    {
        id: 2,
        invoice: "Invoice #007",
        date: "Dec 1, 2025",
        amount: "USD $99.00",
        plan: "Basic Plan",
        status: "Approved",
    },
    {
        id: 3,
        invoice: "Invoice #007",
        date: "Dec 1, 2025",
        amount: "USD $99.00",
        plan: "Basic Plan",
        status: "Approved",
    },
    {
        id: 4,
        invoice: "Invoice #007",
        date: "Dec 1, 2025",
        amount: "USD $99.00",
        plan: "Basic Plan",
        status: "Approved",
    },
    {
        id: 5,
        invoice: "Invoice #007",
        date: "Dec 1, 2025",
        amount: "USD $99.00",
        plan: "Basic Plan",
        status: "Approved",
    },
]

export function InvoicesTable() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedRows, setSelectedRows] = React.useState<number[]>([])

    // Filter
    const filteredData = invoiceData.filter(
        (item) =>
            item.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.plan.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Select All
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

    // Single Row Toggle
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

    return (
        <div className="w-full bg-[#F6F6F6] rounded-xl p-4 border border-[#E8E8E8] flex flex-col">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-sm font-semibold text-[#1a2332]">
                    Invoices
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Input
                            placeholder="Search Ticket"
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
                        Mange
                    </Button>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-x-auto bg-white rounded-lg border border-[#E8E8E8]">

                <div className="min-w-[800px]">
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
                                    "Invoice",
                                    "Billing Date",
                                    "Amount",
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
                                            {header !== "Actions" && header !== "Invoice" && (
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

                                        <TableCell className="text-xs font-medium text-[#8899aa]">
                                            {item.invoice}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold text-[#1a2332]">
                                            {item.date}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold text-[#1a2332]">
                                            {item.amount}
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold text-[#1a2332]">
                                            {item.plan}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F0FDF4] text-[#166534] rounded-md border border-[#DCFCE7] w-fit">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
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
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                            {filteredData.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-[300px] text-center text-xs text-[#8899aa]"
                                    >
                                        No invoices found.
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
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        <Button className="h-8 w-8 text-xs font-semibold bg-[#1a2332] text-white">
                            1
                        </Button>
                        {[2, 3].map((page) => (
                            <Button
                                key={page}
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 text-xs border-[#E8E8E8]"
                            >
                                {page}
                            </Button>
                        ))}
                        <span className="text-xs text-[#8899aa] px-1">...</span>
                        {[8, 9, 10].map((page) => (
                            <Button
                                key={page}
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 text-xs border-[#E8E8E8]"
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs border-[#E8E8E8]"
                    >
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
