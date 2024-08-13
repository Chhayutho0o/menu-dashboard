"use client";

import React, { useRef } from "react";
import { toast } from "sonner";
import { Meta, Role } from "@/types";
import Filter from "@/components/filter";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { checkPrivilege } from "@/lib/utils";
import { deleteRole } from "@/actions/roles";
import RowAction from "@/components/commons/RowAction";
import useSession from "@/components/session/useSession";
import TitleHeader from "@/components/commons/TitleHeader";
import DataTable, { COLUMNS } from "@/components/dataTable";
import CreateButton from "@/components/commons/CreateButton";
import AlertDialogWarning from "@/components/commons/AlertDialogWarning";

interface Props {
  searchParams: any;
  data: Role[];
  meta: Meta;
}

export default function Roles({ searchParams, data, meta }: Props) {
  const t = useTranslations("");
  const warningRef = useRef<any>(null);
  const { session } = useSession();
  const havePrivilege = checkPrivilege(session, "role-create");
  const renderAction = (item: any) => {
    return (
      <RowAction
        editLink={`/roles/${item.id}/edit`}
        deleteAction={onDelete}
        item={item}
        haveModifyAccess={havePrivilege}
      />
    );
  };
  const onDelete = async (data: any) => {
    warningRef.current?.open(data);
  };

  const handleDelete = async (id: string, callback?: () => void) => {
    const { status, message } = await deleteRole(id);
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
      className: "w-[150px]",
    },
    {
      label: t("role.name"),
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
      label: t("role.name"),
      field: "name",
      type: "text",
      name: "name",
      placeholder: t("filter.name"),
      value: searchParams?.name,
    },
  ];
  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("role.list")} Icon={ShieldCheck} />
        <div className="flex gap-2 items-center">
          <CreateButton href={"/roles/create"} />
        </div>
      </div>
      <Filter columns={filterColumn} meta={meta} />
      <DataTable columns={tableColumn} data={data} meta={meta} />
      <AlertDialogWarning ref={warningRef} actionDelete={handleDelete} />
    </div>
  );
}
