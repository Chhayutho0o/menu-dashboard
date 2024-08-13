import React from "react";
import { redirect } from "@/hooks/navigation";
import Categories from "@/components/categories";
import { fetchCategories } from "@/actions/categories";
import { linkingStore } from "@/actions/stores";

export default async function page({ searchParams }: any) {
  const { data, meta, status } = await fetchCategories(searchParams);
  if (status !== "success") return redirect("/");
  const { data: stores } = await linkingStore();
  return (
    <Categories
      searchParams={searchParams}
      data={data}
      meta={meta}
      stores={stores}
    />
  );
}
