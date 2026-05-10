"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const getSafeToken = () => {
    if (typeof window === "undefined")
        return null;

    return (
        sessionStorage.getItem(
            "onboarding_jwt"
        ) ||
        localStorage.getItem(
            "onboarding_jwt"
        )
    );
};
export function PasswordTab() {
    const [form, setForm] =
        useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            twoFactorEnabled: true,
        });
    const handleSavePassword =
        async () => {
            try {
                const token =
                    getSafeToken();

                const apiUrl =
                    process.env
                        .NEXT_PUBLIC_API_URL ||
                    "http://localhost:3000";

                const res =
                    await fetch(
                        `${apiUrl}/setting/password`,
                        {
                            method:
                                "PATCH",

                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    form
                                ),
                        }
                    );

                const data =
                    await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message ||
                        "Update failed"
                    );
                }

                toast.success(
                    "Password updated successfully"
                );

                setForm({
                    currentPassword:
                        "",
                    newPassword:
                        "",
                    confirmPassword:
                        "",
                    twoFactorEnabled:
                        form.twoFactorEnabled,
                });
            } catch (error: any) {
                toast.error(
                    error.message ||
                    "Failed to update password"
                );
            }
        };
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
                        <Input type="password" value={form.currentPassword} className="h-11 shadow-sm border-slate-200" onChange={(e) => setForm({ ...form, currentPassword: e.target.value, })} />
                    </div>
                </div>

                {/* New Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">New Password</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="password" value={
                            form.newPassword
                        } className="h-11 shadow-sm border-slate-200" onChange={(e) =>
                            setForm({
                                ...form,
                                newPassword:
                                    e.target
                                        .value,
                            })
                        } />
                    </div>
                </div>

                {/* Confirm New Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Confirm New Password</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input type="password" value={
                            form.confirmPassword
                        } className="h-11 shadow-sm border-slate-200" onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword:
                                    e.target
                                        .value,
                            })
                        } />
                    </div>
                </div>

                {/* 2FA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Enable 2-factor authentication</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Switch id="2fa" defaultChecked checked={
                            form.twoFactorEnabled
                        }
                            onCheckedChange={(
                                value
                            ) =>
                                setForm({
                                    ...form,
                                    twoFactorEnabled:
                                        value,
                                })
                            } />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" className="h-10 px-6 font-medium text-slate-700 border-slate-200 hover:bg-slate-50">
                        Cancel
                    </Button>
                    <Button className="h-10 px-6 font-medium bg-[#101828] text-white hover:bg-[#101828]/90" onClick={
                        handleSavePassword
                    }>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
