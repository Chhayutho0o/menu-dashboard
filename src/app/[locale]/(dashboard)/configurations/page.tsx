import React from "react";
import { redirect } from "@/hooks/navigation";
import { fetchConfig } from "@/actions/configuations";
import Configuration from "@/components/configuration";

export default async function page() {
  const { data, status } = await fetchConfig();
  if (status !== "success") return redirect("/");
  return <Configuration data={data} />;
}
