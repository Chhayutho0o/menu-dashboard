"use server";

import { revalidatePath } from "next/cache";
import { getCookies } from "./auth";
import { GET, POST, PUT, fetchJson } from "@/BaseApi/request";

export const fetchMerchants = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(GET(`admin/merchants`, params, token?.value?.token));

    return { status: "success", data, meta, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchMerchant = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(GET(`admin/merchants/${id}`, {}, token?.value?.token));

    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const createMerchant = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(POST(`admin/merchants`, params, token?.value?.token));
    revalidatePath("/merchants");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateMerchant = async (id: any, params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      PUT(`admin/merchants/${id}`, params, token?.value?.token)
    );
    revalidatePath("/merchants");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const linkingMerchants = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      GET(`admin/merchants/linkings`, {}, token?.value?.token)
    );
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
