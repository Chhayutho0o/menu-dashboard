"use client";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/hooks/navigation";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import _ from "lodash";
import menuConfigs, {
  SideMenuConfigPageType,
  SideMenuType,
} from "@/components/layouts/sideMenuConfig";
import { useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Account from "./Account";

type Props = {
  account: any;
};

const Sidebar = ({ account }: Props) => {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const activePage = useMemo(() => {
    const paths = pathname.split("/");
    return paths[paths.length - 1];
  }, [pathname]);

  const renderSideMenu = useCallback(
    (config: SideMenuType) => {
      if (!config) {
        return <></>;
      }
      return (config.pages || []).map(
        (page: SideMenuConfigPageType, index: number) => {
          const filtered = ["edit", "create", "new"];
          const href =
            config.prefix && page.path !== ""
              ? `${config.prefix}/${page.path}`
              : config.prefix
              ? config.prefix
              : page.href || page.path;
          const group = segments
            .filter((item) => !filtered.includes(item))
            .filter((item) => !Number(item));
          const currentGroupPath = `/${group.join("/")}`;
          const isActive = pathname === href || currentGroupPath === href;
          return (
            <SidebarMenu
              key={`${index}-${page.path}`}
              label={t(page.label)}
              href={href}
              active={isActive}
              icon={page.iconComponent}
            />
          );
        }
      );
    },
    [activePage, segments, account]
  );
  const renderMenu = useMemo(() => {
    const privileges = account?.role?.privileges;
    const groupPrivileges = _.groupBy(privileges, "group");
    const key = Object.keys(groupPrivileges).map((key) => key.toLowerCase());
    key.push("dashboard", "setting", "account");
    const menuConfigRoles = Object.keys(menuConfigs).map((key) => {
      const menu = menuConfigs[key as any];
      return menu.page.role;
    });
    const exisitingMenu = menuConfigRoles.filter((item) => {
      return key.some((k: any) => k === item);
    });

    const filteredPages = _.cloneDeep(menuConfigs);

    const pickByRole = _.pickBy(filteredPages, (value) => {
      if (exisitingMenu.some((item) => item === value.page.role)) {
        value.pages =
          value.pages?.filter((item) => key.includes(item.role)) || [];
        return true;
      }
      return false;
    });

    const sortedConfigs = _.sortBy(pickByRole, "order");

    return Object.keys(sortedConfigs).map((key: string, index: number) => {
      const menu = sortedConfigs[key as any];
      const { page } = menu;
      if (menu.pages && menu.pages.length) {
        return (
          <div key={index}>
            <div className="bg-custom-gray-20 py-2 px-3 font-bold text-lg">
              {t(page.label)}
            </div>
            <ul className="bg-custom-gray-10 ml-2">{renderSideMenu(menu)}</ul>
          </div>
        );
      }

      return;
    });
  }, [activePage, segments]);

  return (
    <div className="whitespace-nowrap bg-muted p-2 space-y-1 h-full border-r">
      <div className="flex justify-between items-center px-3 py-1">
        <div className="items-center">
          <Link prefetch={false} href={"/"}>
            <h1 className="font-extrabold text-center text-xl text-primary">
              BOX-IN
            </h1>
          </Link>
        </div>
        <Account profile={account} />
      </div>
      <Separator />
      {renderMenu}
    </div>
  );
};

export default Sidebar;

type SidebarMenuProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
};

const SidebarMenu = ({ label, href, active, icon }: SidebarMenuProps) => {
  const Icon = icon as any;
  return (
    <li className={cn("border-l-2", active && "border-black")}>
      <Link
        href={href}
        prefetch={false}
        className={cn(
          "py-2 px-3 flex items-center group text-primary",
          active && "border-black"
        )}
      >
        <div className="size-6 mr-2">
          <Icon
            className={cn(
              "size-6 stroke-1 group-hover:stroke-2",
              active && "stroke-2"
            )}
          />
        </div>
        <span
          className={cn(
            "break-all line-clamp-1 group-hover:font-bold",
            active && "font-bold"
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};
