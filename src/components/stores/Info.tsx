import React, { PropsWithChildren } from "react";
import { Store } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Map, StoreIcon } from "lucide-react";
import { Link } from "@/hooks/navigation";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ImageLoader from "@/components/commons/ImageLoader";
import TitleHeader from "@/components/commons/TitleHeader";
import DownloadQrButton from "./components/DownloadQrButton";
import DataTable, { COLUMNS } from "../dataTable";
import ExternalLink from "../commons/ExternalLink";
import MoreAction from "./components/MoreAction";
import MapLink from "./components/MapLink";

interface Props {
  data?: Store;
}

export default function StoreInfo({ data }: Props) {
  const t = useTranslations("");

  const tableColumn: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
      className: "w-[150px]",
    },
    {
      label: t("category.image"),
      field: "image",
      type: "image",
      className: "min-w-[100px]",
    },
    {
      label: t("category.name"),
      field: "name.en",
      renderColumn: (item: any) => item.name?.en,
      className: "min-w-[200px]",
    },
    {
      label: t("category.name_km"),
      field: "name.km",
      renderColumn: (item: any) => item.name?.km,
      className: "min-w-[200px]",
    },
    {
      label: t("category.name_cn"),
      field: "name.cn",
      renderColumn: (item: any) => item.name?.cn,
      className: "min-w-[200px]",
    },
    {
      label: t("commons.status"),
      field: "status",
      className: "capitalize min-w-[100px]",
    },
  ];

  return (
    <div className="mx-auto xl:w-full pb-10">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={data?.name} Icon={StoreIcon} />
        <div className="hidden gap-2 sm:flex">
          <Button variant={"link"} asChild>
            <Link prefetch={false} href={"/stores"}>
              {t("commons.back")}
            </Link>
          </Button>
          <MapLink latitude={data?.latitude} longitude={data?.longitude} />
          <DownloadQrButton item={data} />
        </div>
        <div className="sm:hidden flex items-center justify-center">
          <Button variant={"link"} asChild>
            <Link prefetch={false} href={"/stores"}>
              {t("commons.back")}
            </Link>
          </Button>
          <MoreAction data={data} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex md:flex-row flex-col gap-5">
          <Card className="md:w-4/6 w-full p-4 flex lg:flex-row flex-col ">
            <div className="flex sm:flex-row flex-col justify-between gap-5 flex-1">
              <div className="w-full">
                <LabelValue title={t("store.name")} value={data?.name} />
                <LabelValue
                  title={t("store.currency")}
                  value={data?.currency}
                />
                <LabelValue title={t("store.merchant")}>
                  <ExternalLink
                    title={data?.merchant?.username}
                    href={`/merchants/${data?.merchant?.id}`}
                  />
                </LabelValue>
                <LabelValue
                  className="capitalize"
                  title={t("store.opening_status")}
                  value={data?.opening_status}
                />

                <LabelValue
                  className="capitalize"
                  title={t("store.is_holiday_break")}
                  value={data?.is_holiday_break.toString()}
                />
                <LabelValue
                  title={t("store.operation_hours")}
                  value={
                    data?.operation_hours.start_hour +
                    " | " +
                    data?.operation_hours.end_hour
                  }
                />
                <LabelValue title={t("store.operation_days")}>
                  <div className="flex flex-nowrap gap-2">
                    {data?.operation_days?.length === 7 ? (
                      <span>{t("store.open_every_day")}</span>
                    ) : (
                      <span className="capitalize">
                        {data?.operation_days[0]} -
                        {data?.operation_days[data.operation_days.length - 1]}
                      </span>
                    )}
                  </div>
                </LabelValue>
                <LabelValue title={t("store.address")} value={data?.address} />
                <LabelValue
                  title={t("commons.created_at")}
                  value={formatDate("YYYY-MM-DD HH:mm", data?.created_at)}
                />
              </div>
            </div>
            <div className="lg:w-56 w-full justify-end">
              <ImageLoader
                className="rounded-lg object-contain"
                src={data?.image}
                width={300}
                height={300}
              />
            </div>
          </Card>
          <Card className="md:w-2/6 w-full">
            <CardContent className="mt-4 space-y-2">
              <div className="flex flex-col gap-2 items-baseline justify-center">
                <Label>{t("store.socials")}</Label>
                <div className="col-span-4 flex flex-col gap-2">
                  {data?.socials?.length
                    ? data?.socials?.map((item, index) => (
                        <Card key={index} className="w-full ml-2">
                          <div className="flex flex-col p-1 text-sm">
                            <span>{item?.name}</span>
                            <span>{item?.url}</span>
                          </div>
                        </Card>
                      ))
                    : "N/A"}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-baseline justify-center">
                <Label>{t("store.contacts")}</Label>
                <div className="col-span-4 flex flex-col gap-2">
                  {data?.contacts?.length
                    ? data?.contacts?.map((item, index) => (
                        <Card key={index} className="w-full ml-2">
                          <div className="flex flex-col p-1 text-sm">
                            <span>{item?.name}</span>
                            <span>{item?.phone_number}</span>
                          </div>
                        </Card>
                      ))
                    : "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="w-full p-4">
            <TitleHeader
              className="text-base"
              title={`${t("sidebar.categories")} ( ${
                data?.categories?.length
              } )`}
            />
            <DataTable data={data?.categories} columns={tableColumn} />
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
        "grid grid-cols-[30%_1fr] gap-4 justify-between items-baseline w-full p-2"
      }
    >
      <Label className={cn("text-gray-700")}>{title}</Label>
      <Label className={cn(className, "w-full")}>
        {children ? children : value || "N/A"}
      </Label>
    </div>
  );
};
