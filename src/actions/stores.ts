"use server";

import { revalidatePath } from "next/cache";
import { getCookies } from "./auth";
import { DELETE, GET, POST, PUT, fetchJson } from "@/BaseApi/request";

export const fetchStores = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(GET(`admin/stores`, params, token?.value?.token));

    return { status: "success", data, meta, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchStore = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(GET(`admin/stores/${id}`, {}, token?.value?.token));
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const createStore = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(POST(`admin/stores`, params, token?.value?.token));
    revalidatePath("/stores");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateStore = async (id: any, params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(PUT(`admin/stores/${id}`, params, token?.value?.token));
    revalidatePath("/stores");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteStore = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(DELETE(`admin/stores/${id}`, {}, token?.value?.token));
    revalidatePath("/stores");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const downloadQR = async (id: any) => {
  try {
    const token = await getCookies();
    const data = (await fetchJson(
      GET(`admin/stores/${id}/download-qr-code`, {}, token?.value?.token)
    )) as any;
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
    };
  }
};

export const linkingStore = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(GET(`admin/stores/linkings`, {}, token?.value?.token));

    return { status: "success", data, meta, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
