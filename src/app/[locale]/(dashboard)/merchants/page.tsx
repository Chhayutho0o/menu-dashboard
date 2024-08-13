import React from "react";
import { redirect } from "@/hooks/navigation";
import Merchants from "@/components/merchants";
import { fetchMerchants } from "@/actions/merchants";

export default async function page({ searchParams }: any) {
  const { data, meta, status } = await fetchMerchants(searchParams);
  if (status !== "success") return redirect("/");
  return <Merchants data={data} meta={meta} searchParams={searchParams} />;
}
