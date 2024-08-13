"use server";

import { GET, fetchJson } from "@/BaseApi/request";
import { getCookies } from "./auth";

export const fetchSubscriptions = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(
      GET(`admin/merchant-subscriptions`, params, token?.value?.token)
    );

    return { status: "success", data, meta, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
