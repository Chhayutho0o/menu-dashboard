import { fetchCategories } from "@/actions/categories";
import MenuForm from "@/components/menu/Form";
import { redirect } from "@/hooks/navigation";
import React from "react";

export default async function page() {
  const { data, status } = await fetchCategories();
  if (status !== "success") return redirect("/");
  return <MenuForm categories={data} />;
}
