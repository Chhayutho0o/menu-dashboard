import React from "react";
import { redirect } from "@/hooks/navigation";
import StoreForm from "@/components/stores/Form";
import { fetchMerchants } from "@/actions/merchants";
import { fetchTemplates } from "@/actions/templates";
import { fetchCategories } from "@/actions/categories";

export default async function page() {
  const { data: merchants, status } = await fetchMerchants({ perPage: 10000 });
  if (status !== "success") return redirect("/stores");
  const { data: templates } = await fetchTemplates({ perPage: 10000 });
  const { data: categories } = await fetchCategories({ perPage: 10000 });
  return (
    <StoreForm
      merchants={merchants}
      templates={templates}
      categories={categories}
    />
  );
}
