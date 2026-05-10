"use client"

import * as React from "react"
import { Search, ArrowLeft, ArrowRight } from "lucide-react"
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

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
}

interface ImageRule {
  id: string
  domain: string
  format: string
  quality: string
  resize: string
  lastRun: string
  savings: string
  status: string
}

interface Props {
  title: string
  domainsData: ImageRule[]
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function ImagesTable({
  title,
  domainsData = [],
  page,
  totalPages,
  setPage,
}: Props) {
  const [search, setSearch] = React.useState("")

  const filtered = domainsData.filter((d) =>
    d.domain.toLowerCase().includes(search.toLowerCase())
  )

  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (page <= 3) return [1, 2, 3, "...", totalPages]

    if (page >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages]

    return [1, "...", page, "...", totalPages]
  }

  return (
    <div className="bg-[#F6F6F6] rounded-xl p-4 border">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold">{title}</h2>

        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 text-xs"
          />
          <Button size="sm">Filters</Button>
          <Button size="sm">Manage</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Domain",
                "Format",
                "Quality",
                "Resize",
                "Last Run",
                "Savings",
                "Status",
                "Actions",
              ].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.domain}</TableCell>
                <TableCell>{item.format}</TableCell>
                <TableCell>{item.quality}</TableCell>
                <TableCell>{item.resize}</TableCell>
                <TableCell>{item.lastRun}</TableCell>
                <TableCell>{item.savings}</TableCell>

                <TableCell>
                  <span className={cn("px-2 py-1 rounded text-xs", statusStyles[item.status])}>
                    {item.status}
                  </span>
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline">Delete</Button>
                  <Button size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between p-4 border-t">
          <Button
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-2">
            {getPages().map((p, i) =>
              p === "..." ? (
                <span key={i}>...</span>
              ) : (
                <Button
                  key={i}
                  size="sm"
                  onClick={() => setPage(p as number)}
                  className={page === p ? "bg-black text-white" : ""}
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