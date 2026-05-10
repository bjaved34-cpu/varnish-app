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

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  Approved: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", dot: "bg-[#22C55E]" },
  Pending: { bg: "bg-[#FFFBEB]", text: "text-[#92400E]", dot: "bg-[#F59E0B]" },
  Expired: { bg: "bg-[#F0FDF4]", text: "text-[#166534]", dot: "bg-[#22C55E]" },
}

interface DomainItem {
  id: string
  domain: string
  cpu: string
  ram: string
  disk: string
  bandwidth: string
  uptime: string
  plan: string
  status: string
  action: string
}

interface DomainTableProps {
  title: string
  domainsData?: DomainItem[]
  searchPlaceholder?: string

  // ✅ FROM PARENT
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function DomainTable({
  title,
  domainsData = [],
  searchPlaceholder = "Search Domains",
  page,
  totalPages,
  setPage,
}: DomainTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  // 🔍 FILTER
  const filteredData = domainsData.filter(
    (item) =>
      item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plan.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ✅ SELECT ALL
  const toggleAll = () => {
    if (selectedRows.length === filteredData.length && filteredData.length > 0) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((d) => d.id))
    }
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const isAllSelected =
    filteredData.length > 0 &&
    selectedRows.length === filteredData.length

  // ✅ SMART PAGINATION LOGIC
  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page <= 3) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    if (page >= totalPages - 2) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages]
  }

  return (
    <div className="w-full bg-[#F6F6F6] rounded-xl p-4 border border-[#E8E8E8] flex flex-col">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-sm font-semibold text-[#1a2332]">{title}</h2>

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

          <Button variant="outline" size="sm" className="h-9 px-4 text-xs bg-white border-[#E8E8E8]">
            Filters
          </Button>

          <Button size="sm" className="h-9 px-4 text-xs bg-[#1a2332] hover:bg-[#243044]">
            Manage
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto bg-white rounded-lg border border-[#E8E8E8]">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="bg-[#fcfcfc]">
              <TableRow>
                <TableHead className="text-center">
                  <button onClick={toggleAll}>
                    {isAllSelected && <Check className="h-3 w-3" />}
                  </button>
                </TableHead>

                {["Domain","CPU","Ram","Disk","Bandwidth","Uptime","Plan","Status","Actions"].map((h)=>(
                  <TableHead key={h}>
                    <div className="flex items-center gap-1">
                      {h}
                      {h !== "Actions" && <ChevronsUpDown className="h-3 w-3" />}
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
                  <TableRow key={item.id}>
                    <TableCell>
                      <button onClick={()=>toggleRow(item.id)}>
                        {isSelected && <Check className="h-3 w-3" />}
                      </button>
                    </TableCell>

                    <TableCell>{item.domain}</TableCell>
                    <TableCell>{item.cpu}</TableCell>
                    <TableCell>{item.ram}</TableCell>
                    <TableCell>{item.disk}</TableCell>
                    <TableCell>{item.bandwidth}</TableCell>
                    <TableCell>{item.uptime}</TableCell>
                    <TableCell>{item.plan}</TableCell>

                    <TableCell>
                      <div className={cn("px-2 py-1 rounded", style.bg, style.text)}>
                        {item.status}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Button size="sm">{item.action}</Button>
                    </TableCell>
                  </TableRow>
                )
              })}

              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10 text-sm text-gray-400">
                    No domains found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ PAGINATION */}
        <div className="px-4 py-4 flex justify-between items-center border-t">
          <Button
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-2 items-center">
            {getPages().map((p, i) =>
              p === "..." ? (
                <span key={i} className="px-2 text-xs text-gray-400">...</span>
              ) : (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => setPage(p as number)}
                  className={page === p ? "bg-[#1a2332] text-white" : ""}
                >
                  {p}
                </Button>
              )
            )}
          </div>

          <Button
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}