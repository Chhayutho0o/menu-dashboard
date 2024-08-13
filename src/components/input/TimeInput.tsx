import React from "react";
import { Field } from "formik";
import { cn } from "@/lib/utils";
import { Timer } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/input/CustomInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TimeInput({ values }: any) {
  const t = useTranslations("");
  const start_hour = values.operation_hours?.start_hour;
  const end_hour = values.operation_hours?.end_hour;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !start_hour || (!end_hour && "text-muted-foreground")
          )}
        >
          <Timer className="mr-2 h-4 w-4" />
          {start_hour || end_hour ? (
            `${start_hour || "0:00"} - ${end_hour || "0:00"}`
          ) : (
            <span>{t("placeholder.select_time")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3 items-center">
          <Label>{t("store.start_hour")}</Label>
          <Field
            name="operation_hours.start_hour"
            type="time"
            component={CustomInput}
          />
          <Label>{t("store.end_hour")}</Label>
          <Field
            name="operation_hours.end_hour"
            type="time"
            component={CustomInput}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
