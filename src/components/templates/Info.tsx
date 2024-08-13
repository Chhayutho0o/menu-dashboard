import React from "react";
import { Template } from "@/types";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import LabelRow from "@/components/commons/LabelRow";

interface Props {
  data: Template | null;
}

export default function TemplateInfo({ data }: Props) {
  const t = useTranslations("");
  return (
    <div className="flex flex-col">
      <LabelRow title={t("template.name")} value={data?.name} />
      <LabelRow
        title={t("template.category") + ` (${data?.categories.length})`}
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
    </div>
  );
}
