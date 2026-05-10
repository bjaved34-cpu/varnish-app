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

export interface SSLItem {
  id: string | number;
  domain: string;
  cpu: string;
  ram: string;
  disk: string;
  bandwidth: string;
  uptime: string;
  plan: string;
  status: string;
  action: string;
}

interface SSLListProps {
  ssl: SSLItem[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function SSLList({
  ssl,
  page,
  setPage,
  totalPages,
}: SSLListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<
    (string | number)[]
  >([]);

  const filteredData = ssl.filter(
    (item) =>
      item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAll = () => {
    if (
      selectedRows.length === filteredData.length &&
      filteredData.length > 0
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((d) => d.id));
    }
  };

  const toggleRow = (id: any) => {
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

      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold">List of Hosting</h2>

        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>CPU</TableHead>
              <TableHead>RAM</TableHead>
              <TableHead>Disk</TableHead>
              <TableHead>Bandwidth</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                  />
                </TableCell>
                <TableCell>{item.domain}</TableCell>
                <TableCell>{item.cpu}</TableCell>
                <TableCell>{item.ram}</TableCell>
                <TableCell>{item.disk}</TableCell>
                <TableCell>{item.bandwidth}</TableCell>
                <TableCell>{item.plan}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button size="sm">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 🔥 REAL PAGINATION */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (p) => (
              <Button
                key={p}
                variant={page === p ? "default" : "outline"}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            )
          )}
        </div>

        <Button
          onClick={() =>
            setPage(Math.min(totalPages, page + 1))
          }
          disabled={page === totalPages}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}