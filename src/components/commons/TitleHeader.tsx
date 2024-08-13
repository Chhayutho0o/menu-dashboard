import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  title?: string;
  Icon?: LucideIcon;
  className?: string;
}

export default function TitleHeader({ Icon, title, className }: Props) {
  return (
    <div className="flex gap-3 items-center">
      {Icon && (
        <div className="bg-slate-200 rounded-full p-2">
          <Icon className=" md:size-7 size-5 stroke-[1.5px]" />
        </div>
      )}
      <span className={cn(className, "md:text-2xl text-lg font-semibold")}>
        {title || "N/A"}
      </span>
    </div>
  );
}
