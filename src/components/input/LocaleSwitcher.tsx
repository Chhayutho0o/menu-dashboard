"use router";

import React from "react";
import UnitedState from "../flagIcon/UnitedState";
import Chinese from "../flagIcon/Chinese";
import Khmer from "../flagIcon/Khmer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/hooks/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations("");
  const localeOptions = [
    {
      value: "en",
      label: (
        <div className="flex gap-2 items-center justify-center">
          <UnitedState className="size-5 rounded-sm" />
          {t("options.lang.en")}
        </div>
      ),
    },
    {
      value: "cn",
      label: (
        <div className="flex gap-2 items-center justify-center">
          <Chinese className="size-5 rounded-sm" />
          {t("options.lang.cn")}
        </div>
      ),
    },
    {
      value: "km",
      label: (
        <div className="flex gap-2 items-center justify-center">
          <Khmer className="size-5 rounded-sm" />
          {t("options.lang.km")}
        </div>
      ),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="rounded cursor-pointer stroke-[0.75] place-items-center transition-colors duration-100"
        >
          {locale === "en" && <UnitedState className="size-5 rounded-sm" />}
          {locale === "km" && <Khmer className="size-5 rounded-sm" />}
          {locale === "cn" && <Chinese className="size-5 rounded-sm" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="bottom">
        {localeOptions.map((option) => (
          <DropdownMenuItem
            asChild
            key={option.value}
            className={cn(option.value === locale && "bg-neutral-500/30")}
          >
            <Link
              prefetch={false}
              locale={option.value as any}
              href={`${pathname}?${searchParams}`}
            >
              {option.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
