import React from "react";
import { Category } from "@/types";
import { useTranslations } from "next-intl";
import LabelRow from "@/components/commons/LabelRow";
import ImageLoader from "@/components/commons/ImageLoader";

interface Props {
  data: Category | null;
}

export default function CategoryInfo({ data }: Props) {
  const t = useTranslations("");
  return (
    <div className="flex flex-col">
      <LabelRow title={t("category.name")} value={data?.name.en} />
      <LabelRow title={t("category.name_km")} value={data?.name.km} />
      <LabelRow title={t("category.name_cn")} value={data?.name.cn} />
      <LabelRow
        className="capitalize"
        title={t("commons.status")}
        value={data?.status}
      />
      <LabelRow title={t("category.image")}>
        <ImageLoader
          src={data?.image}
          alt={data?.name.en}
          width={200}
          height={200}
        />
      </LabelRow>
    </div>
  );
}
