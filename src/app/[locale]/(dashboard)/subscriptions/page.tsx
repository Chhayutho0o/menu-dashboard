import React from "react";
import { redirect } from "@/hooks/navigation";
import { fetchSubscriptions } from "@/actions/subscriptions";
import Subscriptions from "@/components/subscriptions";
import { linkingMerchants } from "@/actions/merchants";

export default async function page({ searchParams }: any) {
  const { data, status, meta } = await fetchSubscriptions(searchParams);
  if (status !== "success") return redirect("/");
  const { data: merchants } = await linkingMerchants();
  return (
    <Subscriptions
      data={data}
      meta={meta}
      searchParams={searchParams}
      merchants={merchants}
    />
  );
}
