"use server";

import { revalidatePath } from "next/cache";
import { getCookies } from "./auth";
import { GET, PUT, fetchJson } from "@/BaseApi/request";

export const fetchConfig = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET(`admin/configurations`, {}, token?.value?.token));
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateConfig = async (id: any, params: any) => {
  try {
    const token = await getCookies();
    const { data } = await fetchJson(
      PUT(`admin/configurations/${id}`, params, token?.value?.token)
    );
    revalidatePath("/configurations");
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
