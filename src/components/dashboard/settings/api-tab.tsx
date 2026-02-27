import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight, ChevronsUpDown } from "lucide-react";

export function ApiTab() {
    const keys = Array(5).fill({
        name: "Key - 01",
        date: "Dec 1, 2025"
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Email notifications</h2>
                <p className="text-sm text-slate-500 mt-1">Get emails to find out what&apos;s going on when you&apos;re not online. You can turn them off anytime.</p>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white max-w-5xl">
                <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b gap-3 sm:gap-0 border-slate-200 bg-slate-50/50 rounded-t-xl">
                    <h3 className="text-sm font-medium text-slate-700">Keys</h3>
                    <div className="w-full sm:w-64">
                        <Input placeholder="Search key" className="h-9 shadow-sm bg-white" />
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <Table className="min-w-[600px]">
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-200">
                                <TableHead className="w-12 pl-4">
                                    <Checkbox className="border-slate-300" />
                                </TableHead>
                                <TableHead className="text-slate-500 font-medium">Key</TableHead>
                                <TableHead className="text-slate-500 font-medium w-48">
                                    <div className="flex items-center gap-1">
                                        Created Date
                                        <ChevronsUpDown className="w-3 h-3" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-right text-slate-500 font-medium w-48 pr-4">
                                    <div className="flex items-center justify-end gap-1">
                                        Actions
                                        <ChevronsUpDown className="w-3 h-3" />
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {keys.map((key, i) => (
                                <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="w-12 pl-4">
                                        <Checkbox className="border-slate-300" />
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900 py-4">{key.name}</TableCell>
                                    <TableCell className="text-slate-600">{key.date}</TableCell>
                                    <TableCell className="text-right pr-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="outline" size="sm" className="h-8 text-slate-600 font-medium border-slate-200 hover:bg-slate-100">
                                                Revoke
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-8 text-slate-600 font-medium border-slate-200 hover:bg-slate-100">
                                                Copy
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 bg-white text-sm text-slate-600 rounded-b-xl">
                    <Button variant="outline" size="sm" className="h-8 gap-1 font-medium border-slate-200">
                        <ArrowLeft className="w-4 h-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-1 font-medium pb-px overflow-x-auto custom-scrollbar max-w-[200px] sm:max-w-none">
                        <button className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center bg-slate-100 text-slate-900">1</button>
                        <button className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center hover:bg-slate-50">2</button>
                        <button className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center hover:bg-slate-50">3</button>
                        <span className="w-8 h-8 shrink-0 flex items-center justify-center">...</span>
                        <button className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center hover:bg-slate-50">8</button>
                        <button className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center hover:bg-slate-50">9</button>
                        <button className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center hover:bg-slate-50">10</button>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1 font-medium border-slate-200">
                        Next <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 max-w-5xl">
                <Button variant="outline" className="h-10 px-6 font-medium text-slate-700 border-slate-200 hover:bg-slate-50">
                    Cancel
                </Button>
                <Button className="h-10 px-6 font-medium bg-[#101828] text-white hover:bg-[#101828]/90">
                    Save
                </Button>
            </div>
        </div>
    );
}
