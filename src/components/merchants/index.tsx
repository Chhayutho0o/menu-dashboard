"use client";
import React from "react";
import { Building } from "lucide-react";
import Filter from "@/components/filter";
import { Merchant, Meta } from "@/types";
import { useTranslations } from "next-intl";
import { checkPrivilege } from "@/lib/utils";
import Pagination from "@/components/pagination";
import RowAction from "@/components/commons/RowAction";
import useSession from "@/components/session/useSession";
import TitleHeader from "@/components/commons/TitleHeader";
import DataTable, { COLUMNS } from "@/components/dataTable";
import CreateButton from "@/components/commons/CreateButton";

interface Props {
  searchParams?: any;
  data: Merchant[];
  meta: Meta;
}

export default function Merchants({ searchParams, data, meta }: Props) {
  const t = useTranslations("");
  const { session } = useSession();
  const havePrivilege = checkPrivilege(session, "merchant-create");
  const renderAction = (item: any) => {
    const link = `/merchants/${item.id}`;
    return (
      <RowAction
        item={item}
        viewLink={link}
        editLink={link + "/edit"}
        haveModifyAccess={havePrivilege}
      />
    );
  };

  const tableColumn: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
    },
    {
      label: t("merchant.username"),
      field: "username",
      className: "min-w-[100px]",
    },
    {
      label: t("merchant.email"),
      field: "email",
      className: "min-w-[100px]",
    },
    {
      label: t("commons.status"),
      field: "status",
      className: "min-w-[100px] capitalize",
    },
    {
      label: t("merchant.level"),
      field: "level",
      className: "min-w-[100px] capitalize",
    },
    {
      label: t("commons.created_at"),
      field: "created_at",
      className: "min-w-[200px]",
      type: "datetime",
    },
    {
      label: t("commons.action"),
      renderColumn: renderAction,
    },
  ];

  const statusOptions = [
    { label: t("options.all"), value: " " },
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.disable"), value: "disable" },
  ];

  const filterColumn = [
    {
      label: t("merchant.username"),
      field: "username",
      type: "text",
      name: "username",
      placeholder: t("filter.username"),
      value: searchParams?.username,
    },
    {
      label: t("merchant.email"),
      field: "email",
      type: "text",
      name: "email",
      placeholder: t("filter.email"),
      value: searchParams?.email,
    },
    {
      label: t("merchant.phone_number"),
      field: "phone_number",
      type: "text",
      name: "phone_number",
      placeholder: t("filter.phone_number"),
      value: searchParams?.phone_number,
    },
    {
      label: t("commons.status"),
      field: "status",
      type: "select",
      options: statusOptions,
      name: "status",
      placeholder: t("filter.status"),
      value: searchParams?.status,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("merchant.list")} Icon={Building} />
        <div className="flex gap-2 items-center">
          <CreateButton href={"/merchants/create"} />
        </div>
      </div>
      <Filter columns={filterColumn} meta={meta} />
      <DataTable columns={tableColumn} data={data} meta={meta} />
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
