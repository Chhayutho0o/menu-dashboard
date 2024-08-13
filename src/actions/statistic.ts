import { GET, fetchJson } from "@/BaseApi/request";
import { getCookies } from "./auth";

export const getOverviewStat = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET("admin/statistics", {}, token?.value?.token));
    return { status: "success", data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
      data: [],
    };
  }
};

export const getMerchantsStat = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(
      GET("admin/statistics/merchants", {}, token?.value?.token)
    );
    return { status: "success", merchantStat: data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
      data: [],
    };
  }
};

export const getStoreStat = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(
      GET("admin/statistics/stores", {}, token?.value?.token)
    );
    return { status: "success", storeStat: data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
      data: [],
    };
  }
};
export const getMenuStat = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET("admin/statistics/menus", {}, token?.value?.token));
    return { status: "success", menuStat: data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
      data: [],
    };
  }
};
export const getPurchaseStat = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(
      GET("admin/statistics/purchases", {}, token?.value?.token)
    );
    return { status: "success", purchaseStat: data };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message,
      data: [],
    };
  }
};
