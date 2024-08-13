import React, { PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { Link } from "@/hooks/navigation";

interface Props extends PropsWithChildren {
  title: string | undefined;
  selected: any;
  setSelected: any;
  href?: string;
}

export default function InfoSheet({
  children,
  title,
  selected,
  setSelected,
  href,
}: Props) {
  return (
    <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
      <SheetContent
        side="right"
        onOpenAutoFocus={(e: any) => e.preventDefault()}
        className="overflow-y-scroll"
      >
        <SheetHeader className="mb-7">
          {title ? (
            <SheetTitle className="text-2xl flex gap-2">
              {href ? (
                <Link
                  prefetch={false}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title || "N/A"}
                </Link>
              ) : (
                title
              )}
            </SheetTitle>
          ) : (
            <Skeleton className="w-40 p-4" />
          )}
        </SheetHeader>
        <div>{children}</div>
      </SheetContent>
    </Sheet>
  );
}
