import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/dashboard/settings/profile-tab";
import { PasswordTab } from "@/components/dashboard/settings/password-tab";
import { ApiTab } from "@/components/dashboard/settings/api-tab";
import { NotificationsTab } from "@/components/dashboard/settings/notifications-tab";

export default function SettingsPage() {
    return (
        <div className="flex-1 w-full bg-slate-50 min-h-full p-4 md:p-8 rounded-tl-2xl">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 bg-white p-4 md:p-8 rounded-xl border border-slate-100 shadow-sm min-h-[80vh]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    <Button variant="default" className="bg-[#101828] text-white hover:bg-[#101828]/90">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <div className="w-full overflow-x-auto pb-4 -mb-4 custom-scrollbar">
                        <TabsList className="h-10 items-center justify-start rounded-md bg-slate-100 p-1 text-slate-500 w-auto inline-flex min-w-max">
                            <TabsTrigger value="profile" className="rounded-sm px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Profile</TabsTrigger>
                            <TabsTrigger value="password" className="rounded-sm px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Password & Security</TabsTrigger>
                            <TabsTrigger value="notifications" className="rounded-sm px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Notifications</TabsTrigger>
                            <TabsTrigger value="api" className="rounded-sm px-4 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">API</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="mt-8">
                        <TabsContent value="profile" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <ProfileTab />
                        </TabsContent>
                        <TabsContent value="password" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <PasswordTab />
                        </TabsContent>
                        <TabsContent value="notifications" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <NotificationsTab />
                        </TabsContent>
                        <TabsContent value="api" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                            <ApiTab />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
