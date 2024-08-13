"use server";
import { getCookies } from "./auth";
import { revalidatePath } from "next/cache";
import { GET, POST, PUT, DELETE, fetchJson } from "@/BaseApi/request";

export const getAllRoles = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET("admin/roles/all-roles", {}, token?.value?.token));
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
      data: [],
    };
  }
};

export const getRoles = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { data, meta },
    } = await fetchJson(GET("admin/roles", params, token?.value?.token));
    return { status: "success", data, meta };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const getRole = async (id: string | number) => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET(`admin/roles/${id}`, {}, token?.value?.token));
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const getPrivileges = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET("admin/roles/privileges", {}, token?.value?.token));
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const createRoles = async (params: any) => {
  try {
    const token = await getCookies();
    const {
      data: { message },
    } = await fetchJson(POST("admin/roles", params, token?.value?.token));
    revalidatePath("/roles");
    return { status: "success", message };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const updateRole = async (id: string | number, params: any) => {
  try {
    const token = await getCookies();
    const res = await fetchJson(
      PUT(`admin/roles/${id}`, params, token?.value?.token)
    );
    revalidatePath("/roles");
    return {
      status: "success",
      message: res?.data?.message,
    };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};

export const deleteRole = async (id: string | number) => {
  try {
    const token = await getCookies();
    const res = await fetchJson(
      DELETE(`admin/roles/${id}`, {}, token?.value?.token)
    );
    revalidatePath("/roles");
    return {
      status: "success",
      message: res?.data?.message,
    };
  } catch (error: any) {
    return {
      status: "error",
      error: error?.response?.data?.errors,
      message: error?.response?.data?.message,
    };
  }
};
