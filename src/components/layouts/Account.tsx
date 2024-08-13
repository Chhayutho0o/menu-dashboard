"use client";

import React, { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/actions/auth";
import AlertDialogWarning from "../commons/AlertDialogWarning";
import { Link, usePathname } from "@/hooks/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import UnitedState from "../flagIcon/UnitedState";
import Chinese from "../flagIcon/Chinese";
import Khmer from "../flagIcon/Khmer";
import { useRouter } from "@/hooks/useRouter";
import { Languages, LogOut, User2 } from "lucide-react";

export default function Account({ profile, align = "start" }: any) {
  const logoutRef = useRef<any>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations("");
  const router = useRouter();
  const onClickLogout = () => {
    logoutRef.current.open();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const middleInitial = profile.first_name[0] + profile.last_name[0];

  const localeOptions = [
    {
      value: "en",
      label: (
        <div className="flex gap-2">
          <UnitedState className="size-5 rounded-sm" />
          {t("options.lang.en")}
        </div>
      ),
    },
    {
      value: "cn",
      label: (
        <div className="flex gap-2">
          <Chinese className="size-5 rounded-sm" />
          {t("options.lang.cn")}
        </div>
      ),
    },
    {
      value: "km",
      label: (
        <div className="flex gap-2">
          <Khmer className="size-5 rounded-sm" />
          {t("options.lang.km")}
        </div>
      ),
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full size-8"
          >
            <Avatar className="rounded-none size-full">
              <AvatarImage
                src={
                  profile?.image ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${
                    profile.first_name + " " + profile.last_name
                  }`
                }
                alt="@shadcn"
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} side="bottom" className="w-40">
          <DropdownMenuLabel>{profile.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link prefetch={false} href={`/account`} className="flex gap-2">
              <User2 className="size-4" />
              {t("sidebar.account")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex gap-2">
              <Languages className="size-4" />
              <span>{t("config.others.language")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={locale}>
                  {localeOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.value} key={item.value}>
                      <Link
                        prefetch={false}
                        locale={item.value as any}
                        href={`${pathname}?${searchParams}`}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onClickLogout} className="flex gap-2">
            <LogOut className="size-4" />
            {t("auth.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogWarning
        ref={logoutRef}
        actionDelete={handleLogout}
        showDescription={false}
      />
    </>
  );
}
