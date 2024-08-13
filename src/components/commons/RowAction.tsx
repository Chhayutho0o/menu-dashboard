"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/hooks/navigation";
import {
  EllipsisVertical,
  ReceiptText,
  FilePenLine,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  item: any;
  editLink?: string;
  viewLink?: string;
  editAction?: (_: any) => void;
  viewAction?: (_: any) => void;
  deleteAction?: (_: any) => void;
  haveModifyAccess?: boolean;
}

export default function RowAction({
  item,
  editLink,
  viewLink,
  editAction,
  viewAction,
  deleteAction,
  haveModifyAccess,
}: Props) {
  const t = useTranslations("commons");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {viewLink && (
          <DropdownMenuItem asChild>
            <Link prefetch={false} href={viewLink} className="flex gap-2">
              <ReceiptText className="size-4" />
              {t("view")}
            </Link>
          </DropdownMenuItem>
        )}
        {viewAction && (
          <DropdownMenuItem
            onClick={() => viewAction(item)}
            className="flex gap-2"
          >
            <ReceiptText className="size-4" />
            {t("view")}
          </DropdownMenuItem>
        )}
        {haveModifyAccess && (
          <>
            {editLink && (
              <DropdownMenuItem asChild>
                <Link prefetch={false} href={editLink} className="flex gap-2">
                  <FilePenLine className="size-4" />
                  {t("edit")}
                </Link>
              </DropdownMenuItem>
            )}
            {editAction && (
              <DropdownMenuItem
                onClick={() => editAction(item)}
                className="flex gap-2"
              >
                <FilePenLine className="size-4" />
                {t("edit")}
              </DropdownMenuItem>
            )}
            {deleteAction && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteAction(item)}
                  className="text-red-500 flex gap-2"
                >
                  <Trash2 className="size-4" />
                  {t("delete")}
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
