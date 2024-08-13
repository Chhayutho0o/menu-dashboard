"use server";

import { revalidatePath } from "next/cache";
import { getCookies } from "./auth";
import { DELETE, GET, POST, PUT, fetchJson } from "@/BaseApi/request";

export const fetchCategories = async (params?: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message, meta },
    } = await fetchJson(GET(`admin/categories`, params, token?.value?.token));

    return { status: "success", data, meta, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchCategory = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: {
        data: { data },
        message,
      },
    } = await fetchJson(GET(`admin/categories/${id}`, {}, token?.value?.token));

    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const createCategory = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(POST(`admin/categories`, params, token?.value?.token));
    revalidatePath("/categories");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateCategory = async (id: any, params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      PUT(`admin/categories/${id}`, params, token?.value?.token)
    );
    revalidatePath("/categories");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      DELETE(`admin/categories/${id}`, {}, token?.value?.token)
    );
    revalidatePath("/categories");
    return { status: "success", data, message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const sortCategory = async (ids?: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, message },
    } = await fetchJson(
      PUT(`admin/categories/sort`, { category_ids: ids }, token?.value?.token)
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
