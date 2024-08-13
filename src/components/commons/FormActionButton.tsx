import React from "react";
import { Button } from "../ui/button";
import { Link } from "@/hooks/navigation";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

interface Props {
  href: string;
  isLoading: boolean;
  dirty?: boolean;
}

export default function FormActionButton({ href, isLoading, dirty }: Props) {
  const t = useTranslations("commons");
  return (
    <div className="flex justify-end my-2 gap-3">
      <Button type="button" variant={"secondary"} disabled={isLoading}>
        <Link prefetch={false} href={href}>
          {t("cancel")}
        </Link>
      </Button>
      <Button
        disabled={!dirty || isLoading}
        isLoading={isLoading}
        type="submit"
      >
        {isLoading && <Loader2 className="mr-2 animate-spin size-5" />}
        {t("save")}
      </Button>
    </div>
  );
}
