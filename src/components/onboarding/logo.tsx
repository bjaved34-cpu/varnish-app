import { ArrowUpRight } from "lucide-react";

export function VarnishLogo() {
  return (
    <div className="flex items-center gap-3 px-6 py-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e2d40] text-white shadow-sm flex-shrink-0">
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-white tracking-wide">
          Varnish
        </span>
        <span className="text-[11px] text-[#8899aa] tracking-wider uppercase font-medium">
          Enterprise
        </span>
      </div>
    </div>
  );
}
