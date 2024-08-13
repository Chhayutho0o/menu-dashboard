"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Menu, Merchant, Meta } from "@/types";
import { BookOpen } from "lucide-react";
import Filter from "@/components/filter";
import { useTranslations } from "next-intl";
import { checkPrivilege } from "@/lib/utils";
import { deleteMenu } from "@/actions/menus";
import MenuInfo from "@/components/menu/Info";
import Pagination from "@/components/pagination";
import InfoSheet from "@/components/commons/InfoSheet";
import RowAction from "@/components/commons/RowAction";
import useSession from "@/components/session/useSession";
import TitleHeader from "@/components/commons/TitleHeader";
import DataTable, { COLUMNS } from "@/components/dataTable";
import CreateButton from "@/components/commons/CreateButton";
import AlertDialogWarning from "@/components/commons/AlertDialogWarning";
import ExternalLink from "../commons/ExternalLink";

interface Props {
  searchParams: any;
  data: Menu[];
  meta: Meta;
  merchants: Merchant[];
}

export default function Menus({ searchParams, data, meta, merchants }: Props) {
  const t = useTranslations("");
  const { session, isAdmin } = useSession();
  const warningRef = useRef<any>(null);
  const havePrivilege = checkPrivilege(session, "menu-create");
  const [selected, setSelected] = useState<Menu | null>(null);
  const renderAction = (item: any) => {
    return (
      <RowAction
        item={item}
        viewAction={onView}
        editLink={`/menus/${item.id}/edit`}
        deleteAction={onDelete}
        haveModifyAccess={havePrivilege}
      />
    );
  };

  const onView = async (item: any) => {
    setSelected(item);
  };

  const onDelete = async (item: any) => {
    warningRef.current?.open(item);
  };

  const handleDelete = async (id: string, callback?: () => void) => {
    const { status, message } = await deleteMenu(id);
    if (status !== "success") {
      toast.error(message || "Something went wrong");
      return;
    }
    toast.success(message);
    if (callback) callback();
  };

  const renderMerchant = useCallback((item: Menu) => {
    return (
      <ExternalLink
        title={item.merchant?.username}
        href={`/merchants/${item?.merchant?.id}`}
      />
    );
  }, []);

  const merchantOptions = useMemo(() => {
    return (
      merchants?.map((item) => ({ label: item.username, value: item.id })) || []
    );
  }, [merchants]);
  const columns: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
    },
    {
      label: t("menu.name"),
      renderColumn: (item: Menu) => item.name?.en,
      className: "min-w-[250px]",
    },
    {
      label: t("menu.price"),
      field: "price",
      type: "currency",
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
    {
      label: t("commons.action"),
      renderColumn: renderAction,
      field: "action",
    },
  ];

  const statusOptions = [
    { label: t("options.all"), value: " " },
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.inactive"), value: "inactive" },
  ];

  const filterColumn = [
    {
      label: t("menu.name"),
      field: "name",
      type: "text",
      name: "name",
      placeholder: t("filter.name"),
      value: searchParams?.name,
    },
    {
      label: t("menu.price"),
      field: "price",
      type: "text",
      name: "price",
      placeholder: t("filter.price"),
      value: searchParams?.price,
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
  ];

  if (isAdmin) {
    columns.splice(5, 0, {
      label: t("menu.merchant"),
      renderColumn: renderMerchant,
      className: "min-w-[200px]",
    });
    filterColumn.splice(2, 0, {
      label: t("menu.merchant"),
      field: "merchant_id",
      type: "select_search",
      name: "merchant_id",
      options: [
        { value: " ", label: t("options.all") },
        ...(merchantOptions as any),
      ],
      placeholder: t("filter.name"),
      value: searchParams?.merchant_id,
    });
  }

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("menu.list")} Icon={BookOpen} />
        <CreateButton href="/menus/create" module="menu-create" />
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
      <AlertDialogWarning ref={warningRef} actionDelete={handleDelete} />
      <InfoSheet
        title={selected?.name?.en || selected?.name?.km}
        selected={selected}
        setSelected={setSelected}
      >
        <MenuInfo data={selected} />
      </InfoSheet>
    </div>
  );
}
