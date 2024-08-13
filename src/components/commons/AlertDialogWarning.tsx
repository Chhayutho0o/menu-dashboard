"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useTransition,
} from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export interface AlertRef {
  open: (data: any) => void;
  close: () => void;
}

interface ComponentProps {
  actionDelete: (data: any, callback?: () => void) => void;
  showDescription?: boolean;
}

const AlertDialogWarning = forwardRef(
  (
    { actionDelete, showDescription = true }: ComponentProps,
    ref: ForwardedRef<AlertRef>
  ) => {
    const t = useTranslations("commons");
    const [isLoading, startTransition] = useTransition();
    const [dialog, setDialog] = useState<any>({ isOpen: false, data: null });

    const open = (data: any) => {
      setDialog({ data, isOpen: true });
    };

    const close = () => {
      setDialog({ data: null, isOpen: false });
    };

    const onCheckContinue = () => {
      startTransition(async () => {
        await actionDelete(dialog?.data?.id, close);
      });
    };

    useImperativeHandle(ref, () => ({ open, close }), []);

    return (
      <AlertDialog open={dialog.isOpen}>
        <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("are_you_sure")}</AlertDialogTitle>
            {showDescription && (
              <AlertDialogDescription>
                {t("wont_revert_back")}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading} onClick={close}>
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-black"
              disabled={isLoading}
              onClick={() => onCheckContinue()}
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {t("continue")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

AlertDialogWarning.displayName = "AlertDialogWarning";

export default AlertDialogWarning;
