import { Button } from "@/components/ui/button";
import { Link } from "@/hooks/navigation";
import { Map } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function MapLink({ ...props }: any) {
  const t = useTranslations("");
  return (
    <Button variant={"outline"} asChild>
      <Link
        className="flex gap-2"
        prefetch={false}
        href={`https://www.google.com/maps?q=${props?.latitude},${props?.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("commons.to_map")}
        <Map className="size-5" />
      </Link>
    </Button>
  );
}
