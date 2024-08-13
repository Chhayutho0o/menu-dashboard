import React, { PropsWithChildren } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Building } from "lucide-react";
import { Link } from "@/hooks/navigation";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TitleHeader from "@/components/commons/TitleHeader";
import { Merchant, Store } from "@/types";
import DataTable from "../dataTable";
import ExternalLink from "../commons/ExternalLink";

interface Props {
  data: Merchant | null;
}

export default function MerchantInfo({ data }: Props) {
  const t = useTranslations("");

  const renderOperationDays = (item: Store) => {
    return (
      <div>
        {item?.operation_days?.length === 7 ? (
          <span>{t("store.open_every_day")}</span>
        ) : (
          <span className="capitalize">
            {`${item.operation_days[0]} - ${
              item.operation_days[item.operation_days.length - 1]
            } `}
          </span>
        )}
      </div>
    );
  };

  const tableColumn = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
    },
    {
      label: t("store.name"),
      renderColumn: (item: Store) => (
        <div>
          <ExternalLink href={`/stores/${item.id}`} title={item.name} />
        </div>
      ),
      className: "min-w-[200px]",
    },
    {
      label: t("store.operation_days"),
      className: "min-w-[200px]",
      renderColumn: renderOperationDays,
    },
    {
      label: t("store.operation_hours"),
      className: "min-w-[150px]",
      renderColumn: (item: Store) => (
        <div>
          {item?.operation_hours.start_hour +
            " | " +
            item?.operation_hours.end_hour}
        </div>
      ),
    },
    {
      label: t("store.opening_status"),
      field: "opening_status",
      className: "min-w-[170px] capitalize",
    },
    {
      label: t("store.currency"),
      field: "currency",
      className: "min-w-[100px]",
    },
    {
      label: t("store.is_holiday_break"),
      renderColumn: (item: any) => item.is_holiday_break.toString(),
      className: "min-w-[100px] capitalize",
    },
    {
      label: t("commons.created_at"),
      field: "created_at",
      type: "datetime",
      className: "min-w-[200px]",
    },
  ];
  return (
    <div className="mx-auto xl:w-full pb-10">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={data?.username} Icon={Building} />
        <div className="flex gap-2">
          <Button variant={"link"} asChild>
            <Link prefetch={false} href={"/stores"}>
              {t("commons.back")}
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-5">
        <Card className="w-full p-4 h-full">
          <div className="grid sm:grid-cols-2 grid-cols-1 justify-between">
            <div className="w-full sm:border-r-2">
              <LabelValue
                title={t("merchant.fullname")}
                value={`${data?.first_name} ${data?.last_name}`}
              />
              <LabelValue
                title={t("merchant.username")}
                value={data?.username}
              />
              <LabelValue title={t("merchant.email")} value={data?.email} />
              <LabelValue
                className="capitalize"
                title={t("merchant.role")}
                value={data?.role?.name}
              />
            </div>
            <div className="w-full">
              <LabelValue
                title={t("merchant.phone_number")}
                value={data?.phone_number}
              />
              <LabelValue
                className="capitalize"
                title={t("commons.status")}
                value={data?.status}
              />
              <LabelValue title={t("merchant.level")} value={data?.level} />
              <LabelValue
                title={t("commons.created_at")}
                value={formatDate("YYYY-MM-DD HH:mm", data?.created_at)}
              />
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="w-full p-4">
            <TitleHeader
              className="text-base"
              title={`${t("sidebar.stores")} ( ${data?.stores?.length} )`}
            />
            <DataTable data={data?.stores} columns={tableColumn} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface LabelProps extends PropsWithChildren {
  title: string;
  value?: string;
  className?: string;
}
const LabelValue = ({ title, value, children, className }: LabelProps) => {
  return (
    <div
      className={
        "grid grid-cols-[25%_1fr] gap-4 justify-between items-baseline w-full p-2"
      }
    >
      <Label className={cn("text-gray-700")}>{title}</Label>
      <Label className={className}>
        {children ? children : value || "N/A"}
      </Label>
    </div>
  );
};
