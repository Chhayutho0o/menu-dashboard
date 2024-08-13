"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

type Option = Record<"value" | "label" | "id" | "name", string> | any;

interface MultiSelectProps {
  options: Option[];
  value: Option[];
  onValueChange: (value: Option[]) => void;
  valueKey?: string;
  labelKey?: string;
  placeholder?: string;
  className?: string;
}

const MultiSelect = ({
  options,
  value,
  onValueChange,
  valueKey = "value",
  labelKey = "label",
  placeholder = "Select options...",
  className = "",
}: MultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (option: Option) => {
      const newValue = value.filter(
        (s: Option) => s[valueKey] !== option[valueKey]
      );
      onValueChange(newValue);
    },
    [value]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...value];
            newSelected.pop();
            onValueChange(newSelected);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [value]
  );

  const selectables = options.filter(
    (option: Option) =>
      !value.find((v) => JSON.stringify(v) === JSON.stringify(option))
  );
  const handleAddNewOption = React.useCallback(() => {
    if (inputValue.trim() !== "") {
      const newOption = { [valueKey]: inputValue, [labelKey]: inputValue };
      onValueChange([...value, newOption]);
      setInputValue("");
    }
  }, [inputValue, value]);
  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div
        className={cn(
          "border-input ring-offset-background focus-within:border-black group rounded-md border border-gray-400 hover:border-black duration-200 px-3 py-2 text-sm",
          className
        )}
      >
        <div className="flex flex-wrap gap-1">
          {value.map((option: Option) => {
            return (
              <Badge key={option[valueKey]} variant="outline">
                {option[labelKey]}
                <button
                  className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="placeholder:text-muted-foreground ml-1 flex-1 bg-transparent outline-none "
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="bg-popover text-popover-foreground absolute top-0 z-10 w-full rounded-md border shadow-md outline-none animate-in">
            <CommandList>
              <CommandGroup className="max-h-52 overflow-auto">
                {selectables.length > 0 &&
                  selectables.map((option: Option) => {
                    return (
                      <CommandItem
                        key={String(option[valueKey])}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue("");
                          onValueChange([...value, option]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {option[labelKey]}
                      </CommandItem>
                    );
                  })}
                {inputValue.trim() !== "" && (
                  <CommandItem
                    key={inputValue}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={handleAddNewOption}
                    className={"cursor-pointer"}
                  >
                    {`Add '${inputValue}'`}
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
