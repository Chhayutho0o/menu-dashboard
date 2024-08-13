import React from "react";
import Templates from "@/components/templates";
import { fetchTemplates } from "@/actions/templates";
import { fetchCategories } from "@/actions/categories";

export default async function page({ searchParams }: any) {
  const { data, meta } = await fetchTemplates(searchParams);
  const { data: categories } = await fetchCategories({ perPage: 10000 });
  return (
    <Templates
      data={data}
      meta={meta}
      searchParams={searchParams}
      categories={categories}
    />
  );
}
