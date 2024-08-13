"use client"

import React, { useEffect } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { enUS, ja } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLocale } from "next-intl"
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";

const DatePicker = ({ onChange, ...props }: any) => {
  const t = useLocale()
  const [selected, setSelected] = React.useState<Date>(props?.field?.value);
  const [timeValue, setTimeValue] = React.useState<string>('00:00');

  const value = props.value || props.field.value
  const placeholder = props.placeholder || props.field.placeholder
  const name = props.name || props.field.name

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      setSelected(new Date())
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));

    if (hours || minutes) {
      const newSelectedDate = new Date(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate(),
        hours,
        minutes
      );
      setSelected(newSelectedDate);
      setTimeValue(time);
    }
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);
  };


  const footer = props.showTime && (
    <Input
      type="time"
      value={timeValue}
      onChange={handleTimeChange}
    />
  )

  useEffect(() => {
    onChange(selected, name, props?.format)
  }, [selected, timeValue])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal h-10 border border-gray-400 hover:border-black text-black rounded-md outline-none focus:border-black py-[7.2px] duration-100 placeholder:text-gray-400",
            !value && "text-muted-foreground",
            props.className
          )}
        >
          {value ? dayjs(value).format(props.format || "YYYY/MM/DD") : <span>{placeholder || "Pick a date"}</span>}
          <CalendarIcon className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDaySelect}
          locale={t === "en" ? enUS : ja}
          initialFocus
          formatters={props.format || "YYYY/MM/DD"}
          className="border border-black rounded-md"
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
