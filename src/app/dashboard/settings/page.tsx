import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/dashboard/settings/profile-tab";
import { PasswordTab } from "@/components/dashboard/settings/password-tab";
import { ApiTab } from "@/components/dashboard/settings/api-tab";
import { NotificationsTab } from "@/components/dashboard/settings/notifications-tab";

export default function SettingsPage() {
    return (
        <div className="flex flex-col h-full bg-white w-full">
            <header className="flex flex-col md:flex-row md:h-[102px] w-full items-start md:items-center justify-between px-6 md:px-8 py-6 gap-4">
                <div className="flex flex-col">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#1a2332]">
                        Settings
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <Button
                        className="flex h-9 md:h-10 items-center gap-2 rounded-lg bg-[#1a2332] px-3 md:px-4 text-xs md:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#243044] active:scale-[0.98]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                </div>
            </header>

            <div className="bg-white p-6 sm:p-8 w-full">
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
