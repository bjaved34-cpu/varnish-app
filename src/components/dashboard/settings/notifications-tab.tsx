import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function NotificationsTab() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-semibold text-slate-900">Email notifications</h2>
                <p className="text-sm text-slate-500 mt-1">Get emails to find out what&apos;s going on when you&apos;re not online. You can turn them off anytime.</p>
            </div>

            <div className="space-y-8 max-w-4xl">
                {/* Notifications from us */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-medium text-slate-900">Notifications from us</h3>
                        <p className="text-sm text-slate-500 mt-1">Receive the latest updates .</p>
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex items-start space-x-3">
                            <Checkbox id="product-updates" defaultChecked className="mt-1" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="product-updates"
                                    className="text-sm font-medium text-slate-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Product Updates
                                </label>
                                <p className="text-sm text-slate-500">Emails about new features</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reminders & Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-slate-100 pb-8">
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-medium text-slate-900">Reminders & Alerts</h3>
                        <p className="text-sm text-slate-500 mt-1">These are notifications to remind you of updates you might have missed.</p>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-start space-x-3">
                            {/* Stylized as a circle to match the design's radio-like multi-select, assuming they are actually checkbox groups */}
                            <Checkbox id="billing-reminders" className="mt-1 rounded-full data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="billing-reminders"
                                    className="text-sm font-medium text-slate-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Billing Reminders
                                </label>
                                <p className="text-sm text-slate-500">invoices, failed paymenys</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Checkbox id="service-alerts" defaultChecked className="mt-1 rounded-full data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="service-alerts"
                                    className="text-sm font-medium text-slate-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Service Alerts
                                </label>
                                <p className="text-sm text-slate-500">uptime, SSL expiry etc</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Checkbox id="security-alerts" defaultChecked className="mt-1 rounded-full data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="security-alerts"
                                    className="text-sm font-medium text-slate-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Security Alerts
                                </label>
                                <p className="text-sm text-slate-500">unusual login attempts</p>
                            </div>
                        </div>
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
