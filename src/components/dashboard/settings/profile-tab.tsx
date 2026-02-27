import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProfileTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Personal info</h2>
                <p className="text-sm text-slate-500 mt-1">Update your photo and personal details here.</p>
            </div>

            <div className="space-y-6 max-w-4xl">
                {/* Photo Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            Your photo
                            <span className="text-slate-400 w-4 h-4 rounded-full border border-slate-300 inline-flex items-center justify-center text-[10px]">?</span>
                        </Label>
                        <p className="text-sm text-slate-500 mt-1">This will be displayed on your profile.</p>
                    </div>
                    <div className="md:col-span-2">
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-200 transition-colors">
                                <UploadCloud className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold text-slate-900">Click to upload</span>{" "}
                                <span className="text-slate-500">or drag and drop</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                    </div>
                </div>

                {/* Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Name</Label>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <Input defaultValue="Nick" className="h-11 shadow-sm border-slate-200" />
                        <Input defaultValue="Jonas" className="h-11 shadow-sm border-slate-200" />
                    </div>
                </div>

                {/* Email Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Email address</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input defaultValue="Nickj@gmail.com" type="email" className="h-11 shadow-sm border-slate-200" />
                    </div>
                </div>

                {/* Company Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Company Name</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input defaultValue="NickJonasLLC" className="h-11 shadow-sm border-slate-200" />
                    </div>
                </div>

                {/* Country Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Country</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Select defaultValue="us">
                            <SelectTrigger className="h-11 w-full shadow-sm border-slate-200 text-slate-700">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg leading-none">🇺🇸</span> United States
                                    </div>
                                </SelectItem>
                                <SelectItem value="uk">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg leading-none">🇬🇧</span> United Kingdom
                                    </div>
                                </SelectItem>
                                <SelectItem value="ca">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg leading-none">🇨🇦</span> Canada
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" className="h-10 px-6 font-medium text-slate-700 border-slate-200 hover:bg-slate-50">
                        Cancel
                    </Button>
                    <Button className="h-10 px-6 font-medium bg-[#101828] text-white hover:bg-[#101828]/90">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
