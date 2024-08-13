import React from "react";
import {
  Breadcrumb as BC,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/hooks/navigation";
import { useTranslations } from "next-intl";
import configs from "../layouts/sideMenuConfig";
import { HomeIcon } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  const pathnames = pathname.split("/").filter((x) => isNaN(Number(x)));

  const getIconComponent = (path: any) => {
    for (const key in configs) {
      const config = configs[key];
      for (const page of [config.page, ...(config.pages || [])]) {
        if (page.path === path) {
          return page.iconComponent;
        }
      }
    }
    return null;
  };

  return (
    <BC className="py-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex gap-2 items-center justify-center"
          >
            <HomeIcon className="size-4" /> {t("home")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.length > 1 && <BreadcrumbSeparator />}
        {pathnames.map((name, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const IconComponent = getIconComponent(
            pathnames.slice(0, index + 1).join("/")
          );

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {index < pathnames.length - 1 ? (
                  <BreadcrumbLink
                    href={href}
                    className="flex items-center justify-center gap-2"
                  >
                    {IconComponent && (
                      <IconComponent className="inline-block size-4" />
                    )}
                    {t(name)}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="flex items-center justify-center gap-2">
                    {IconComponent && (
                      <IconComponent className="inline-block size-4" />
                    )}
                    {t(name)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < pathnames.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BC>
  );
}
