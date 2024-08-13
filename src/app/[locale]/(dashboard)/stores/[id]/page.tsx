import React from "react";
import { notFound } from "next/navigation";
import { fetchStore } from "@/actions/stores";
import StoreInfo from "@/components/stores/Info";

export default async function page({ params }: any) {
  const { data, status } = await fetchStore(params.id);
  if (status !== "success") {
    return notFound();
  }
  return <StoreInfo data={data} />;
}
