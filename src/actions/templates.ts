"use server";

import { revalidatePath } from "next/cache";
import { getCookies } from "./auth";
import { DELETE, GET, POST, PUT, fetchJson } from "@/BaseApi/request";

export const fetchTemplates = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(GET(`admin/templates`, params, token?.value?.token));

    return { status: "success", meta, data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchTemplate = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET(`admin/templates/${id}`, {}, token?.value?.token));
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const createTemplate = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(POST(`admin/templates`, params, token?.value?.token));
    revalidatePath("/templates");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateTemplate = async (id: any, params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      PUT(`admin/templates/${id}`, params, token?.value?.token)
    );
    revalidatePath("/templates");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteTemplate = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      DELETE(`admin/templates/${id}`, {}, token?.value?.token)
    );
    revalidatePath("/templates");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
