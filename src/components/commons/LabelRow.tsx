import React, { PropsWithChildren } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  title: string;
  value?: string | number;
  border?: boolean;
  className?: string;
  valueClassName?: string;
}

export default function LabelRow({
  title,
  value,
  children,
  border = true,
  className,
  valueClassName,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-row gap-4 w-full p-4",
        border && "border",
        className
      )}
    >
      <Label className="w-3/12 border-r-2 text-gray-700">{title}</Label>
      <Label className={cn("w-9/12", valueClassName)}>
        {children ? children : value || "N/A"}
      </Label>
    </div>
  );
}
