"use client";

import React, { useMemo, useRef, useState } from "react";
import { Tags } from "lucide-react";
import Filter from "@/components/filter";
import { Category, Meta, Store } from "@/types";
import { useTranslations } from "next-intl";
import { checkPrivilege } from "@/lib/utils";
import { COLUMNS } from "@/components/dataTable";
import Pagination from "@/components/pagination";
import InfoSheet from "@/components/commons/InfoSheet";
import RowAction from "@/components/commons/RowAction";
import CategoryInfo from "@/components/categories/Info";
import useSession from "@/components/session/useSession";
import TitleHeader from "@/components/commons/TitleHeader";
import CreateButton from "@/components/commons/CreateButton";
import SortableTable from "@/components/dataTable/SortableTable";
import { deleteCategory, sortCategory } from "@/actions/categories";
import AlertDialogWarning from "@/components/commons/AlertDialogWarning";
import { toast } from "sonner";
import CategoryForm from "./FormSheet";

interface Props {
  searchParams?: any;
  data: Category[];
  meta: Meta;
  stores: Store[];
}

export default function Categories({
  searchParams,
  data,
  meta,
  stores,
}: Props) {
  const t = useTranslations("");
  const warningRef = useRef<any>(null);
  const formRef = useRef<any>(null);
  const { session } = useSession();
  const havePrivilege = checkPrivilege(session, "category-create");
  const [selected, setSelected] = useState<Category | null>(null);
  const renderAction = (item: any) => {
    return (
      <RowAction
        item={item}
        viewAction={onView}
        editAction={onEdit}
        deleteAction={onDelete}
        haveModifyAccess={havePrivilege}
      />
    );
  };

  const onCreate = () => {
    formRef.current.open();
  };

  const onEdit = (item: any) => {
    formRef.current.open(item);
  };

  const onView = (item: any) => {
    setSelected(item);
  };
  const onDelete = async (item: any) => {
    warningRef.current?.open(item);
  };

  const handleDelete = async (id: string, callback?: () => void) => {
    const { status, message } = await deleteCategory(id);
    if (status !== "success") {
      toast.error(message || "Something went wrong");
      return;
    }
    toast.success(message);
    if (callback) callback();
  };

  const handleSort = async (item: any[]) => {
    const { status, message } = await sortCategory(item);
    if (status !== "success") {
      toast.error(message || "Something went wrong");
      return;
    }
    toast.success(message);
  };

  const tableColumn: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
      className: "w-[100px]",
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
      className: "min-w-[100px] capitalize",
    },
    {
      label: t("commons.action"),
      field: "action",
      renderColumn: renderAction,
    },
  ];

  const statusOptions = [
    { label: t("options.all"), value: " " },
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.inactive"), value: "inactive" },
  ];

  const storeOptions = useMemo(() => {
    return stores?.map((item) => ({ label: item.name, value: item.id })) || [];
  }, [stores]);

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
      label: t("category.store"),
      field: "store_id",
      type: "select_search",
      name: "store_id",
      options: [{ label: t("options.all"), value: " " }, ...storeOptions],
      placeholder: t("filter.store"),
      value: searchParams?.store_id,
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

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("category.list")} Icon={Tags} />
        <div className="flex gap-2 items-center">
          <CreateButton actions={onCreate} />
        </div>
      </div>
      <Filter columns={filterColumn} meta={meta} />
      <SortableTable
        columns={tableColumn}
        data={data}
        actionSort={handleSort}
        meta={meta}
        className="max-h-[100px]"
      />
      <div className="mt-4 mb-10">
        <Pagination
          searchParams={searchParams}
          perPage={meta?.perPage}
          totalCount={meta.total}
        />
      </div>
      <AlertDialogWarning ref={warningRef} actionDelete={handleDelete} />
      <InfoSheet
        title={selected?.name.en}
        selected={selected}
        setSelected={setSelected}
      >
        <CategoryInfo data={selected} />
      </InfoSheet>
      <CategoryForm ref={formRef} />
    </div>
  );
}
