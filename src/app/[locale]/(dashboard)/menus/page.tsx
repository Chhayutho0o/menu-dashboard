import React from "react";
import Menus from "@/components/menu";
import { SearchParams } from "@/types";
import { fetchMenus } from "@/actions/menus";
import { redirect } from "@/hooks/navigation";
import { linkingMerchants } from "@/actions/merchants";

interface Props {
  searchParams: SearchParams;
}

export default async function page({ searchParams }: Props) {
  const { data, meta, status } = await fetchMenus(searchParams);
  if (status !== "success") return redirect("/");
  const { data: merchants } = await linkingMerchants();
  return (
    <Menus
      data={data}
      meta={meta}
      searchParams={searchParams}
      merchants={merchants}
    />
  );
}
