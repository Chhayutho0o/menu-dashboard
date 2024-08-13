"use server";

import { DELETE, GET, POST, PUT, fetchJson } from "@/BaseApi/request";
import { getCookies } from "./auth";
import { revalidatePath } from "next/cache";

export const fetchMenus = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(GET(`admin/menus`, params, token?.value?.token));

    return { status: "success", data, meta, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchMenu = async (id: string) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(GET(`admin/menus/${id}`, {}, token?.value?.token));

    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const createMenu = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(POST(`admin/menus`, params, token?.value?.token));
    revalidatePath("/menus");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateMenu = async (id: string | number, params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(PUT(`admin/menus/${id}`, params, token?.value?.token));
    revalidatePath("/menus");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteMenu = async (id: string) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(DELETE(`admin/menus/${id}`, {}, token?.value?.token));
    revalidatePath("/menus");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
