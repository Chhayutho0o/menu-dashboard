"use client";

import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import Filter from "@/components/filter";
import { Category, Meta, Template } from "@/types";
import { useTranslations } from "next-intl";
import { checkPrivilege } from "@/lib/utils";
import { LayoutTemplate } from "lucide-react";
import Pagination from "@/components/pagination";
import { deleteTemplate } from "@/actions/templates";
import InfoSheet from "@/components/commons/InfoSheet";
import TemplateInfo from "@/components/templates/Info";
import RowAction from "@/components/commons/RowAction";
import useSession from "@/components/session/useSession";
import TitleHeader from "@/components/commons/TitleHeader";
import DataTable, { COLUMNS } from "@/components/dataTable";
import CreateButton from "@/components/commons/CreateButton";
import AlertDialogWarning from "@/components/commons/AlertDialogWarning";
import TemplateForm from "./FormSheet";

interface Props {
  searchParams?: any;
  data: Template[];
  meta: Meta;
  categories: Category[];
}

export default function Templates({
  searchParams,
  data,
  meta,
  categories,
}: Props) {
  const t = useTranslations("");
  const [selected, setSelected] = useState<Template | null>(null);
  const warningRef = useRef<any>(null);
  const formRef = useRef<any>(null);
  const { session } = useSession();
  const havePrivilege = checkPrivilege(session, "template-create");
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

  const onView = (item: any) => {
    setSelected(item);
  };

  const onCreate = () => {
    formRef.current.open();
  };

  const onEdit = (item: any) => {
    formRef.current.open(item);
  };

  const onDelete = async (item: any) => {
    warningRef.current?.open(item);
  };

  const handleDelete = async (id: string, callback?: () => void) => {
    const { status, message } = await deleteTemplate(id);
    if (status !== "success") {
      toast.error(message || "Something went wrong");
      return;
    }
    toast.success(message);
    if (callback) callback();
  };

  const tableColumn: COLUMNS[] = [
    {
      label: t("commons.id"),
      field: "id",
      type: "index",
    },
    {
      label: t("template.name"),
      field: "name",
      className: "w-[250px]",
    },
    {
      label: t("commons.action"),
      field: "action",
      renderColumn: renderAction,
    },
  ];

  const filterColumn = [
    {
      label: t("template.name"),
      field: "name",
      type: "text",
      name: "name",
      placeholder: t("filter.name"),
      value: searchParams?.name,
    },
  ];

  const categoryOptions = useMemo(() => {
    return categories?.map((item) => {
      return {
        value: String(item.id),
        label: item.name?.en || item.name?.km,
      };
    });
  }, [categories]);
  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("template.list")} Icon={LayoutTemplate} />
        <div className="flex gap-2 items-center">
          <CreateButton actions={onCreate} />
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
      <AlertDialogWarning ref={warningRef} actionDelete={handleDelete} />
      <InfoSheet
        title={selected?.name}
        selected={selected}
        setSelected={setSelected}
      >
        <TemplateInfo data={selected} />
      </InfoSheet>
      <TemplateForm categories={categoryOptions} ref={formRef} />
    </div>
  );
}
