import React from "react";
import { Menu } from "@/types";
import { useTranslations } from "next-intl";
import LabelRow from "@/components/commons/LabelRow";
import ImageLoader from "@/components/commons/ImageLoader";
import { formatDate } from "@/lib/utils";
import { Label } from "../ui/label";
import ExternalLink from "../commons/ExternalLink";

interface Props {
  data: Menu | null;
}

export default function MenuInfo({ data }: Props) {
  const t = useTranslations("");
  return (
    <div className="flex flex-col">
      <LabelRow title={t("menu.name")} value={data?.name?.en} />
      <LabelRow title={t("menu.name_km")} value={data?.name?.km} />
      <LabelRow title={t("menu.name_cn")} value={data?.name?.cn} />
      <LabelRow title={t("menu.price")} value={data?.price} />
      <LabelRow title={t("menu.merchant")}>
        <ExternalLink
          title={data?.merchant?.username}
          href={`/merchants/${data?.merchant?.id}`}
        />
      </LabelRow>
      <LabelRow
        className="capitalize"
        title={t("commons.status")}
        value={data?.status}
      />

      <LabelRow
        title={t("template.category") + ` (${data?.categories?.length || 0})`}
      >
        <div className="grid gap-3">
          {data?.categories &&
            data.categories.map((item) => (
              <div key={item.id} className="grid grid-cols-3">
                <Label>{item.name?.en}</Label>
                <Label>{item.name?.km}</Label>
                <Label>{item.name?.cn}</Label>
              </div>
            ))}
        </div>
      </LabelRow>
      <LabelRow title={t("menu.description")} value={data?.description} />
      <LabelRow
        title={t("commons.created_at")}
        value={formatDate("YYYY-MM-DD HH:mm", data?.created_at)}
      />
      <LabelRow title={t("menu.image")}>
        <ImageLoader
          src={data?.images[0]?.image}
          alt={data?.name?.en || "Menu image"}
          width={200}
          height={200}
        />
      </LabelRow>
    </div>
  );
}
