import { fetchCategories } from "@/actions/categories";
import { fetchMenu } from "@/actions/menus";
import MenuForm from "@/components/menu/Form";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: any) {
  const { data, status } = await fetchMenu(params.id);
  if (status !== "success") return notFound();
  const { data: categories } = await fetchCategories();
  return <MenuForm data={data} categories={categories} />;
}
