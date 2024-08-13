import React from "react";
import { notFound } from "next/navigation";
import { fetchProfile } from "@/actions/auth";
import AccountForm from "@/components/account";

export default async function page() {
  const { data, status } = await fetchProfile();
  if (status !== "success") return notFound();
  return <AccountForm data={data} />;
}
