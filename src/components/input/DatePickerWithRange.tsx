"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import { cn as style } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale } from "next-intl";
import { km, zhCN as cn, enUS as us, Locale } from "date-fns/locale";

export function DatePickerWithRange({ className, onChange, ...props }: any) {
  const value = props.value || props.field.value;
  const locale = useLocale();
  const placeholder = props.placeholder || props.field.placeholder;

  const localeMap: Record<string, Locale> = {
    km,
    cn,
    us,
  };

  const handleChange = (value: any) => {
    onChange(value?.from, "start_date", props?.format);
    onChange(value?.to, "end_date", props?.format);
  };

  return (
    <div className={style("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={style(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
              props.className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.start_date ? (
              value.end_date ? (
                <>
                  {dayjs(value.start_date).format("DD/MM/YYYY")} -{" "}
                  {dayjs(value.end_date).format("DD/MM/YYYY")}
                </>
              ) : (
                dayjs(value.start_date).format("DD/MM/YYYY")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.start_date}
            selected={{
              from: value?.start_date || undefined,
              to: value?.end_date || undefined,
            }}
            onSelect={handleChange}
            locale={localeMap[locale] || localeMap.us}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
