"use client";

import React, { useCallback, useMemo, useState } from "react";
import Filter from "@/components/filter";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { currencyFormat } from "@/lib/utils";
import { Merchant, Meta, Subscription } from "@/types";
import Pagination from "@/components/pagination";
import TitleHeader from "@/components/commons/TitleHeader";
import DataTable, { COLUMNS } from "@/components/dataTable";
import dayjs from "dayjs";
import ExternalLink from "../commons/ExternalLink";
import useSession from "../session/useSession";

interface Props {
  searchParams: any;
  data: Subscription[];
  meta: Meta;
  merchants: Merchant[];
}

export default function Subscriptions({
  searchParams,
  data,
  meta,
  merchants,
  ...props
}: Props) {
  const t = useTranslations("");
  const calculateExpiredAt = (item: Subscription) => {
    const createdDate = dayjs.unix(item.created_at);
    const expiryDate = createdDate.add(item.subscription.duration, "day");
    return expiryDate.format("YYYY/MM/DD hh:mm");
  };

  const renderMerchant = useCallback((item: Subscription) => {
    return (
      <ExternalLink
        title={item.merchant.username}
        href={`/merchants/${item.merchant.id}`}
      />
    );
  }, []);
  const columns: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
    },
    {
      label: t("subscription.merchant"),
      renderColumn: renderMerchant,
      className: "min-w-[200px]",
    },
    {
      label: t("subscription.name"),
      renderColumn: (item: Subscription) => item.subscription.name,
      className: "min-w-[150px]",
    },
    {
      label: t("subscription.price"),
      renderColumn: (item) => currencyFormat(item.subscription.price),
      className: "min-w-[150px]",
    },
    {
      label: t("subscription.expired_at"),
      renderColumn: (item) => calculateExpiredAt(item),
      className: "min-w-[150px]",
    },
    {
      label: t("commons.status"),
      field: "status",
      className: "min-w-[150px] capitalize",
    },
    {
      label: t("commons.created_at"),
      field: "created_at",
      type: "datetime",
      className: "min-w-[200px]",
    },
  ];
  const statusOptions = [
    { label: t("options.all"), value: " " },
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.inactive"), value: "inactive" },
  ];

  const merchantOptions = useMemo(() => {
    return (
      merchants?.map((item) => ({ label: item.username, value: item.id })) || []
    );
  }, [merchants]);

  const filterColumn = [
    {
      label: t("store.merchant"),
      field: "merchant_id",
      type: "select_search",
      name: "merchant_id",
      options: [
        { value: " ", label: t("options.all") },
        ...(merchantOptions as any),
      ],
      placeholder: t("filter.name"),
      value: searchParams?.merchant_id,
    },
    {
      label: t("commons.status"),
      field: "status",
      type: "select",
      name: "status",
      options: statusOptions,
      placeholder: t("filter.status"),
      value: searchParams?.status,
    },
    {
      label: t("commons.date_range"),
      type: "date_range",
      field: ["start_date", "end_date"],
      name: ["start_date", "end_date"],
      placeholder: t("filter.date_range"),
      value: [searchParams?.start_date, searchParams?.end_date],
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("subscription.list")} Icon={BookOpen} />
      </div>
      <Filter columns={filterColumn} meta={meta} />
      <DataTable columns={columns} data={data} meta={meta} />
      <div className="mt-4 mb-10">
        <Pagination
          searchParams={searchParams}
          perPage={meta?.perPage}
          totalCount={meta.total}
        />
      </div>
    </div>
  );
}
