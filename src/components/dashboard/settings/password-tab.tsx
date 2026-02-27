import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function PasswordTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Password</h2>
                <p className="text-sm text-slate-500 mt-1">Please enter your current password to change your password.</p>
            </div>

            <div className="space-y-6 max-w-4xl">
                {/* Current Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Current Password</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="password" defaultValue="........" className="h-11 shadow-sm border-slate-200" />
                    </div>
                </div>

                {/* New Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">New Password</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="password" defaultValue="........" className="h-11 shadow-sm border-slate-200" />
                    </div>
                </div>

                {/* Confirm New Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Confirm New Password</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="password" defaultValue="........" className="h-11 shadow-sm border-slate-200" />
                    </div>
                </div>

                {/* 2FA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Enable 2-factor authentication</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Switch id="2fa" defaultChecked />
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
