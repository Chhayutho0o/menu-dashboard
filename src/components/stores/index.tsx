"use client";
import React, { useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { Merchant, Meta, Store } from "@/types";
import Filter from "@/components/filter";
import { useTranslations } from "next-intl";
import { checkPrivilege } from "@/lib/utils";
import { deleteStore } from "@/actions/stores";
import Pagination from "@/components/pagination";
import { Store as StoreIcon } from "lucide-react";
import RowAction from "@/components/commons/RowAction";
import useSession from "@/components/session/useSession";
import TitleHeader from "@/components/commons/TitleHeader";
import DataTable, { COLUMNS } from "@/components/dataTable";
import CreateButton from "@/components/commons/CreateButton";
import AlertDialogWarning from "@/components/commons/AlertDialogWarning";
import ExternalLink from "../commons/ExternalLink";

interface Props {
  searchParams?: any;
  data: Store[];
  meta: Meta;
  merchants: Merchant[];
}

export default function Stores({ searchParams, data, meta, merchants }: Props) {
  const t = useTranslations("");
  const warningRef = useRef<any>(null);
  const { session, isAdmin } = useSession();
  const havePrivilege = checkPrivilege(session, "store-update");
  const renderAction = (item: any) => {
    return (
      <RowAction
        item={item}
        viewLink={`/stores/${item.id}`}
        editLink={`/stores/${item.id}/edit`}
        deleteAction={onDelete}
        haveModifyAccess={havePrivilege}
      />
    );
  };

  const onDelete = async (item: any) => {
    warningRef.current?.open(item);
  };

  const handleDelete = async (id: string, callback?: () => void) => {
    const { status, message } = await deleteStore(id);
    if (status !== "success") {
      toast.error(message || "Something went wrong");
      return;
    }
    toast.success(message);
    if (callback) callback();
  };

  const renderMerchant = useCallback((item: Store) => {
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

  const renderOperationDays = useCallback((item: Store) => {
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
  }, []);

  const tableColumn: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
    },
    {
      label: t("store.name"),
      field: "name",
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
      label: t("commons.created_at"),
      field: "created_at",
      type: "datetime",
      className: "min-w-[200px]",
    },
    {
      label: t("commons.action"),
      field: "action",
      renderColumn: renderAction,
    },
  ];

  const currencyOptions = [
    { label: "KHR", value: "KHR" },
    { label: "USD", value: "USD" },
  ];
  const openStatusOptions = [
    { label: t("options.opening_status.close"), value: "close" },
    { label: t("options.opening_status.open"), value: "open" },
  ];

  const filterColumn = [
    {
      label: t("store.name"),
      field: "name",
      type: "text",
      name: "name",
      placeholder: t("filter.name"),
      value: searchParams?.name,
    },
    {
      label: t("store.currency"),
      field: "currency",
      type: "select",
      options: [{ value: " ", label: t("options.all") }, ...currencyOptions],
      name: "currency",
      placeholder: t("filter.currency"),
      value: searchParams?.currency,
    },
    {
      label: t("store.opening_status"),
      field: "opening_status",
      type: "select",
      options: [{ value: " ", label: t("options.all") }, ...openStatusOptions],
      name: "opening_status",
      placeholder: t("filter.status"),
      value: searchParams?.opening_status,
    },
  ];

  if (isAdmin) {
    tableColumn.splice(2, 0, {
      label: t("store.merchant"),
      renderColumn: renderMerchant,
      className: "min-w-[200px]",
    });
    filterColumn.splice(2, 0, {
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
    });
  }
  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("store.list")} Icon={StoreIcon} />
        <div className="flex gap-2 items-center">
          <CreateButton href={"/stores/create"} module="store-create" />
        </div>
      </div>
      {isAdmin && <Filter columns={filterColumn} meta={meta} />}
      <DataTable columns={tableColumn} data={data} meta={meta} />
      <div className="mt-4 mb-10">
        <Pagination
          searchParams={searchParams}
          perPage={meta?.perPage}
          totalCount={meta.total}
        />
      </div>
      <AlertDialogWarning ref={warningRef} actionDelete={handleDelete} />
    </div>
  );
}
