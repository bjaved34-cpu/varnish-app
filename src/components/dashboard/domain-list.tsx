"use client";

import * as React from "react";
import {
    ChevronDown,
    ChevronsUpDown,
    MoreHorizontal,
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const domains = [
    { id: 1, name: "Name", cdn: "218k", bandwidth: "12 GB", cache: "94%", expiry: "23/09/25", ssl: "Valid", status: "Approved" },
    { id: 2, name: "Name", cdn: "218k", bandwidth: "12 GB", cache: "94%", expiry: "23/09/25", ssl: "Valid", status: "Approved" },
    { id: 3, name: "Name", cdn: "218k", bandwidth: "12 GB", cache: "94%", expiry: "23/09/25", ssl: "Valid", status: "Approved" },
    { id: 4, name: "Name", cdn: "218k", bandwidth: "12 GB", cache: "94%", expiry: "23/09/25", ssl: "Valid", status: "Approved" },
    { id: 5, name: "Name", cdn: "218k", bandwidth: "12 GB", cache: "94%", expiry: "23/09/25", ssl: "Valid", status: "Approved" },
    { id: 6, name: "Name", cdn: "218k", bandwidth: "12 GB", cache: "94%", expiry: "23/09/25", ssl: "Valid", status: "Approved" },
];

export function DomainList() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedDomains, setSelectedDomains] = React.useState<number[]>([]);

    const filteredDomains = domains.filter(domain =>
        domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        domain.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleAll = () => {
        if (selectedDomains.length === filteredDomains.length && filteredDomains.length > 0) {
            setSelectedDomains([]);
        } else {
            setSelectedDomains(filteredDomains.map(d => d.id));
        }
    };

    const toggleRow = (id: number) => {
        setSelectedDomains(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const isAllSelected = filteredDomains.length > 0 && selectedDomains.length === filteredDomains.length;

    return (
        <div className="w-full bg-[#F6F6F6] rounded-[10px] p-[10px] md:h-auto flex flex-col border border-[#D8D8D8]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-2 px-2">
                <h2 className="text-[15px] font-semibold text-[#8899aa]">List of Domains</h2>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Input
                            placeholder="Search Domains"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 pl-3 pr-10 text-xs bg-white border-[#E8E8E8] rounded-lg w-full"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#8899aa] opacity-50" />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="h-9 flex-1 md:flex-none px-4 text-xs font-medium bg-white border-[#E8E8E8] text-[#1a2332] rounded-lg">
                            Filters
                        </Button>
                        <Button size="sm" className="h-9 flex-1 md:flex-none px-4 text-xs font-medium bg-[#1a2332] text-white rounded-lg hover:bg-[#243044]">
                            Manage
                        </Button>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-x-auto bg-white rounded-lg border border-[#E8E8E8] min-h-[420px]">
                <div className="min-w-[800px]">
                    <Table>
                        <TableHeader className="bg-[#fcfcfc]">
                            <TableRow className="hover:bg-transparent border-[#E8E8E8]">
                                <TableHead className="w-[40px] text-center">
                                    <button
                                        onClick={toggleAll}
                                        className={cn(
                                            "w-4 h-4 rounded border flex items-center justify-center mx-auto transition-colors",
                                            isAllSelected ? "bg-[#1a2332] border-[#1a2332]" : "border-[#D8D8D8] bg-white"
                                        )}
                                    >
                                        {isAllSelected && <Check className="h-3 w-3 text-white" />}
                                    </button>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">Name</TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        CDN Req <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        Bandwidth <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        Cache <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        Expiry <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        SSL <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        Status <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-[#8899aa] font-medium text-xs text-right pr-6">
                                    <div className="flex items-center justify-end gap-1 cursor-pointer">
                                        Actions <ChevronsUpDown className="h-3 w-3" />
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDomains.map((domain) => {
                                const isSelected = selectedDomains.includes(domain.id);
                                return (
                                    <TableRow key={domain.id} className={cn("border-[#E8E8E8] hover:bg-gray-50/50 h-[64px]", isSelected && "bg-gray-50/80")}>
                                        <TableCell className="text-center">
                                            <button
                                                onClick={() => toggleRow(domain.id)}
                                                className={cn(
                                                    "w-4 h-4 rounded border flex items-center justify-center mx-auto transition-colors",
                                                    isSelected ? "bg-[#1a2332] border-[#1a2332]" : "border-[#D8D8D8] bg-white"
                                                )}
                                            >
                                                {isSelected && <Check className="h-3 w-3 text-white" />}
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-[#1a2332] text-xs font-medium">{domain.name}</TableCell>
                                        <TableCell className="text-[#1a2332] text-xs font-bold">{domain.cdn}</TableCell>
                                        <TableCell className="text-[#1a2332] text-xs font-bold">{domain.bandwidth}</TableCell>
                                        <TableCell className="text-[#1a2332] text-xs font-bold">{domain.cache}</TableCell>
                                        <TableCell className="text-[#1a2332] text-xs font-bold">{domain.expiry}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-[#F1F5F9] text-[#475569] font-semibold text-[10px] px-2 h-5 rounded-md border-none">
                                                {domain.ssl}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F0FDF4] text-[#166534] rounded-md border border-[#DCFCE7] w-fit">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                                                <span className="text-[10px] font-semibold">{domain.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-4">
                                            <Button variant="outline" size="sm" className="h-7 px-3 text-[10px] font-bold border-[#E8E8E8] text-[#1a2332] hover:bg-gray-50 rounded-md">
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {filteredDomains.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-[384px] text-center text-[#8899aa] text-xs">
                                        No domains found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-auto px-4 py-4 flex items-center justify-between border-t border-[#E8E8E8] bg-[#fcfcfc]">
                    <div className="text-xs text-[#8899aa] font-medium">
                        Showing 1 to {filteredDomains.length} of {filteredDomains.length} entries
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-[#E8E8E8] text-[#8899aa]">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button className="h-8 w-8 rounded-lg bg-[#1a2332] text-white text-xs font-bold">
                            1
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-[#E8E8E8] text-[#8899aa]">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
