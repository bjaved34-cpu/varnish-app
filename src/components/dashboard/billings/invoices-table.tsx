"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  Search,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  invoice: string;
  date: string;
  amount: string;
  plan: string;
  status: string;
}

interface Props {
  data: Invoice[];
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

export function InvoicesTable({
  data = [],
  page,
  totalPages,
  setPage,
}: Props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const filteredData = data.filter(
    (item) =>
      item.invoice?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((d) => d.id));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const isAllSelected =
    filteredData.length > 0 &&
    selectedRows.length === filteredData.length;

  return (
    <div className="w-full bg-[#F6F6F6] rounded-xl p-4 border border-[#E8E8E8] flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold">Invoices</h2>

        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 text-xs"
          />
          <Button size="sm">Filters</Button>
          <Button size="sm">Manage</Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button onClick={toggleAll}>
                  {isAllSelected ? "✓" : ""}
                </button>
              </TableHead>

              {["Invoice", "Billing Date", "Amount", "Plan", "Status", "Actions"].map(
                (h) => (
                  <TableHead key={h}>{h}</TableHead>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <button onClick={() => toggleRow(item.id)}>
                    {selectedRows.includes(item.id) ? "✓" : ""}
                  </button>
                </TableCell>

                <TableCell>{item.invoice}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.plan}</TableCell>

                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    {item.status}
                  </span>
                </TableCell>

                <TableCell>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <div className="flex justify-between p-4 border-t">
          <Button
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                size="sm"
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "bg-black text-white" : ""}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}