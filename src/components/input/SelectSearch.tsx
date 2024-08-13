"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectValue } from "@/types";
import { escape } from "lodash";

function SingleSelect({
  options,
  value,
  placeholder = "Select option...",
  notFound = "No stores found.",
  onChangeValue,
  modal = false,
}: {
  options: selectValue[];
  value: string | number | undefined;
  placeholder?: string;
  notFound?: string;
  onChangeValue: (value: string) => void;
  modal?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between whitespace-normal w-full"
        >
          <div className="line-clamp-1 text-left">
            {value
              ? options.find(
                  (option: selectValue) =>
                    String(option.value) === String(value)
                )?.label
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{notFound}</CommandEmpty>
            <CommandGroup className="max-h-52 overflow-auto">
              {options.map((option: selectValue) => (
                <CommandItem
                  key={String(option.value)}
                  value={escape(option.label)}
                  onSelect={() => {
                    onChangeValue(
                      String(option.value) === value ? "" : String(option.value)
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === String(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SingleSelect;
