import React from "react";
import { redirect } from "@/hooks/navigation";
import RoleForm from "@/components/roles/Form";
import { getPrivileges } from "@/actions/roles";

export default async function page() {
  const { data, status } = await getPrivileges();
  if (status !== "success") return redirect("/");
  return <RoleForm privileges={data} />;
}
