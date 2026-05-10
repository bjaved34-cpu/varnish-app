"use client";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const getSafeToken = () => {
    if (typeof window === "undefined") return null;

    return (
        sessionStorage.getItem("onboarding_jwt") ||
        localStorage.getItem("onboarding_jwt")
    );
};
export function ProfileTab() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        country: "",
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    const handleSaveProfile = async () => {
        try {
            const token = getSafeToken();

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:3000";

            const res = await fetch(
                `${apiUrl}/setting/profile`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        companyName: profile.companyName,
                        country: profile.country,
                    }),
                }
            );

            const data = await res.json();

            console.log("PROFILE UPDATED:", data);
            toast.success(
                "Profile updated successfully"
            );
        } catch (error) {
            console.error(
                "Profile update failed:",
                error
            );
            toast.error(
                "Failed to update profile"
            );
        }
    };
    const handleAvatarUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = e.target.files?.[0];

            if (!file) return;

            setAvatarPreview(
                URL.createObjectURL(file)
            );

            const token = getSafeToken();

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:3000";

            const formData = new FormData();

            formData.append("file", file);

            const res = await fetch(
                `${apiUrl}/setting/profile/avatar`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();

            console.log("AVATAR:", data);
        } catch (error) {
            console.error(
                "Avatar upload failed:",
                error
            );
        }
    };
    useEffect(() => {
        const fetchProfile = async () => {
            const token = getSafeToken();

            if (!token) {
                window.location.href = "/login";
                return;
            }

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:3000";

            const res = await fetch(
                `${apiUrl}/setting/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            setProfile({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                companyName:
                    data.companyName || "",
                country: data.country || "",
            });

            if (data.avatar) {
                setAvatarPreview(
                    `${apiUrl}${data.avatar}`
                );
            }
        };

        fetchProfile();
    }, []);
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Personal info</h2>
                <p className="text-sm text-slate-500 mt-1">Update your photo and personal details here.</p>
            </div>

            <div className="space-y-6 max-w-4xl">
                {/* Photo Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-8">

                    <div>
                        <Label>
                            Your photo
                        </Label>

                        <p className="text-sm text-slate-500 mt-1">
                            This will be displayed on your profile.
                        </p>
                    </div>

                    <div className="md:col-span-2">

                        <input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                        />

                        <label
                            htmlFor="avatar-upload"
                            className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer"
                        >

                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    alt="Avatar"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <UploadCloud className="w-6 h-6" />
                            )}

                            <p className="mt-3 text-sm font-medium">
                                Click to upload
                            </p>

                        </label>

                    </div>
                </div>

                {/* Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Name</Label>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <Input className="h-11 shadow-sm border-slate-200" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                        <Input className="h-11 shadow-sm border-slate-200" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    </div>
                </div>

                {/* Email Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Email address</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input value={profile.email} type="email" className="h-11 shadow-sm border-slate-200" onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                </div>

                {/* Company Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Company Name</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Input value={profile.companyName} className="h-11 shadow-sm border-slate-200" onChange={(e) => setProfile({ ...profile, companyName: e.target.value })} />
                    </div>
                </div>

                {/* Country Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <Label className="text-sm font-medium text-slate-700">Country</Label>
                    </div>
                    <div className="md:col-span-2">
                        <Select value={profile.country} onValueChange={(value) => setProfile({ ...profile, country: value })} >
                            <SelectTrigger className="h-11 w-full shadow-sm border-slate-200 text-slate-700">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg leading-none">🇺🇸</span> United States
                                    </div>
                                </SelectItem>
                                <SelectItem value="Pakistan">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg leading-none">🇵🇰</span> Pakistan
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
                    <Button className="h-10 px-6 font-medium bg-[#101828] text-white hover:bg-[#101828]/90" onClick={handleSaveProfile}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
