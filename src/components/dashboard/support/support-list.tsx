"use client";

import * as React from "react";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SupportList({
  tickets,
  page,
  totalPages,
  setPage,
}: any) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filtered = tickets.filter((t: any) =>
    t.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F6F6F6] rounded-xl p-4 border">

      {/* TOP */}
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold">List of Tickets</h2>

        <div className="relative w-64">
          <Input
            placeholder="Search Ticket"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 text-xs"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Ticket</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t: any) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">#{t.id.slice(0, 6)}</td>
                <td className="p-3">{t.subject}</td>
                <td className="p-3">{t.priority}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 rounded">
                    {t.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(t.createdAt).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No tickets found
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        <span className="text-sm">
          Page {page} / {totalPages}
        </span>

        <Button
          onClick={() => setPage((p: number) => p + 1)}
          disabled={page === totalPages}
        >
          Next <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}