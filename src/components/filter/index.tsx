"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "../input/DatePicker";
import { motion } from "framer-motion";
import { ChevronDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "../input/DatePickerWithRange";
import { useRouter } from "@/hooks/useRouter";
import { usePathname, Link } from "@/hooks/navigation";
import SingleSelect from "../input/SelectSearch";

type COLUMNS = {
  field: string | string[];
  label?: string;
  type?: string;
  format?: string;
  name?: string | string[];
  placeholder?: string | string[];
  options?: any[];
  value?: any | string[];
  renderLabel?: () => React.ReactNode;
  renderColumn?: (item: any) => React.ReactNode;
  className?: string;
};
type Props = {
  columns: COLUMNS[];
  className?: string;
  itemClassName?: string;
  meta: any;
};

const Filter = ({ columns, meta }: Props) => {
  const t = useTranslations();
  const [values, setValues] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const data = {} as any;
    columns.forEach((column: any) => {
      if (column.name) {
        if (Array.isArray(column.name)) {
          column.name.forEach((name: any, index: any) => {
            data[name] = column.value?.[index] || "";
          });
        } else {
          const notEmpty = !!column.value;
          data[column.name] = notEmpty
            ? column.value
            : column.type !== "text"
            ? " "
            : "";
        }
      }
    });
    setValues(data);
  }, [columns]);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };
  const handlePushRoute = () => {
    const flatValues: { [key: string]: string } = {};
    for (const key in values) {
      if (values[key] instanceof Object) {
        for (const subKey in values[key]) {
          flatValues[`${key}[${subKey}]`] = values[key][subKey].trim();
        }
      } else {
        flatValues[key] = values[key].trim();
      }
    }
    const url = new URLSearchParams(flatValues);
    router.push(`${pathname}?${url.toString()}`, { scroll: false });
  };

  const onSelectChange = (name: any, value: any) => {
    value = value ? value : " ";
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const onDateChange = (date: any, name: any, format: any) => {
    const dateValue = dayjs(date).format(format);
    setValues((prev: any) => ({ ...prev, [name]: dateValue }));
  };

  const renderInput = (column: any, index: any) => {
    if (column.type === "date") {
      return (
        <div key={index}>
          <DatePicker
            {...column}
            name={column.name[0]}
            value={values[column.name[0]]}
            onChange={onDateChange}
            placeholder={column.placeholder[0]}
            field={column.field[0]}
            showTime={false}
          />
        </div>
      );
    }

    if (column.type === "date_range") {
      return (
        <div key={index}>
          <Label>{column.label}</Label>
          <DatePickerWithRange
            {...column}
            value={{
              start_date: values["start_date"],
              end_date: values["end_date"],
            }}
            onChange={onDateChange}
            className="w-60"
          />
        </div>
      );
    }

    if (column.type === "select") {
      return (
        <div key={index} className="sm:w-60 w-full">
          <Label>{column.label}</Label>
          <Select
            value={values[column.name]}
            onValueChange={(values: any) => onSelectChange(column.name, values)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={values[column.name] || column.placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              {column.options.map((item: any) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (column.type === "select_search") {
      return (
        <div key={index} className="sm:w-60 w-full">
          <Label>{column.label}</Label>
          <SingleSelect
            options={column.options}
            value={values[column.name]}
            placeholder={t("placeholder.select")}
            onChangeValue={(values: any) => onSelectChange(column.name, values)}
          />
        </div>
      );
    }

    return (
      <div key={index} className="sm:w-60 w-full">
        <Label>{column.label}</Label>
        <Input
          key={index}
          {...column}
          onChange={onInputChange}
          value={values[column.name]}
        />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-end gap-3">
        <span className="text-sm text-neutral-400">
          {t("commons.items", { value: meta?.total || 0 })}
        </span>
        <Button
          onClick={toggle}
          variant={isOpen ? "outline" : "default"}
          className={cn("flex items-center justify-center gap-2 w-[100px]")}
        >
          {t("filter.filter")}
          <ChevronDownCircle
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden bg-secondary mt-2 rounded-t-md"
      >
        <div className="flex flex-col p-4">
          <div className="flex flex-wrap sm:gap-4 gap-2 ">
            {columns.map(renderInput)}
          </div>
          <div className="flex justify-end gap-4 col-span-2 mt-4">
            <Button variant={"outline"} asChild>
              <Link prefetch={false} href={pathname}>
                {t("filter.clear")}
              </Link>
            </Button>
            <Button className="search-button" onClick={handlePushRoute}>
              {t("filter.search")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Filter;
