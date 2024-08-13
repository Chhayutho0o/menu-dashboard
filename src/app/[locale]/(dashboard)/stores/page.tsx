import React from "react";
import { SearchParams } from "@/types";
import Stores from "@/components/stores";
import { redirect } from "@/hooks/navigation";
import { fetchStores } from "@/actions/stores";
import { linkingMerchants } from "@/actions/merchants";

interface Props {
  searchParams: SearchParams;
}

export default async function page({ searchParams }: Props) {
  const { data, meta, status } = await fetchStores(searchParams);
  if (status !== "success") return redirect("/");
  const { data: merchants } = await linkingMerchants();
  return (
    <Stores
      data={data}
      meta={meta}
      searchParams={searchParams}
      merchants={merchants}
    />
  );
}
