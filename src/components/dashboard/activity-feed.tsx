import * as React from "react";
import { Info, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  userId: string;       // Add this line
  entityId: string | null;
  type: "SERVICE" | "BILLING" | "DOMAIN";
  message: string;
  createdAt: string;
}


export function ActivityFeed({userId, entityId, type, message, createdAt} : ActivityFeedProps ) {

    return (
       
       

            <div className="px-4 pb-4 space-y-3">
                
                    <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-start gap-4 relative group hover:border-[#D8D8D8] transition-colors shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0 border border-[#E8E8E8]">
                            <Info className="h-5 w-5 text-[#8899aa]" />
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                            <h3 className="text-sm font-semibold text-[#1a2332] truncate">{type}</h3>
                            <p className="text-xs font-medium text-[#8899aa] mt-0.5">{message}</p>
                            <div className="flex items-center gap-4 mt-3">
                                <button className="text-[11px] font-bold text-[#8899aa] hover:text-[#1a2332]">Dismiss</button>
                                <button className="text-[11px] font-bold text-[#1a2332] hover:underline underline-offset-4">View</button>
                            </div>
                        </div>
                        <button className="absolute top-4 right-4 text-[#8899aa] hover:text-[#1a2332] opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
           
            </div>
        
    );
}
