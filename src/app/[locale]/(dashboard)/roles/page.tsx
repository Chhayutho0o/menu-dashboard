import React from "react";
import Roles from "@/components/roles";
import { SearchParams } from "@/types";
import { getRoles } from "@/actions/roles";
import { redirect } from "@/hooks/navigation";

interface Props {
  searchParams: SearchParams;
}

export default async function page({ searchParams }: Props) {
  const { data, meta, status } = await getRoles(searchParams);
  if (status !== "success") return redirect("/");
  return <Roles data={data} meta={meta} searchParams={searchParams} />;
}
