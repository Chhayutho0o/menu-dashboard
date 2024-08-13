import React from "react";
import { notFound } from "next/navigation";
import { fetchStore } from "@/actions/stores";
import StoreForm from "@/components/stores/Form";
import { fetchMerchants } from "@/actions/merchants";
import { fetchTemplates } from "@/actions/templates";
import { fetchCategories } from "@/actions/categories";

export default async function page({ params }: any) {
  const { data, status } = await fetchStore(params.id);
  if (status !== "success") return notFound();
  const { data: merchants } = await fetchMerchants({ perPage: 10000 });
  const { data: templates } = await fetchTemplates({ perPage: 10000 });
  const { data: categories } = await fetchCategories({ perPage: 10000 });
  return (
    <StoreForm
      data={data}
      merchants={merchants}
      templates={templates}
      categories={categories}
    />
  );
}
