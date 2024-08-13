"use server";
import { cookies } from "next/headers";
import {
  DELETE,
  GET,
  POST,
  PUT,
  fetchJson,
  removeAuthToken,
  setAuthToken,
} from "@/BaseApi/request";
import { revalidatePath } from "next/cache";

export const login = async (params: any) => {
  try {
    const resp = await fetchJson(POST("admin/auth/login", params));
    const data = resp.data;
    setAuthToken(data.token);
    setCookies(data.token.token);
    return { status: "success", data, message: resp.data.message };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return {
      status,
      message: err?.message,
      errors: err.response?.data?.errors,
    };
  }
};

export const logout = async () => {
  try {
    const token = await getCookies();
    if (token?.value.token) {
      await fetchJson(DELETE("admin/auth/logout", {}, token.value.token));
    }
    removeCookies();
    removeAuthToken();
    return { status: "success" };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return {
      status,
      message: err?.message,
      errors: err.response?.data?.errors,
    };
  }
};
export const fetchProfile = async () => {
  try {
    const token = await getCookies();
    if (!token?.value.token) {
      return { status: "error", data: {} };
    }
    const { data } = await fetchJson(
      GET("admin/account", {}, token.value.token)
    );
    return { status: "success", data: data.data };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return {
      status,
      message: err?.message,
      errors: err.response?.data?.errors,
    };
  }
};

export const updateProfile = async (params: any) => {
  try {
    const token = await getCookies();
    if (!token?.value.token) {
      return { status: "error", data: {} };
    }
    const {
      data: { data, message },
    } = await fetchJson(PUT(`admin/account`, params, token.value.token));
    revalidatePath("/account");
    return { status: "success", data, message };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return {
      status,
      message: err?.message,
      errors: err.response?.data?.errors,
    };
  }
};

export const updatePassword = async (params: any) => {
  try {
    const token = await getCookies();
    if (!token?.value.token) {
      return { status: "error", data: {} };
    }
    const {
      data: { message },
    } = await fetchJson(
      PUT(`admin/auth/change_password`, params, token.value.token)
    );
    revalidatePath("/account");
    return { status: "success", message };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return {
      status,
      message: err?.response?.data?.message,
      errors: err.response?.data?.errors,
    };
  }
};

export async function setCookies(token: any) {
  const decodedJwt = JSON.parse(atob(token.split(".")[1]));
  const expires = decodedJwt.exp * 1000;
  cookies().set({
    name: process.env.COOKIE_NAME as string,
    value: token,
    path: "/",
    expires,
  });
}

export async function getCookies() {
  const cookiesList = {} as any;
  const cookiesName = {
    NEXT_LOCALE: "locale",
    [process.env.COOKIE_NAME as string]: "token",
  };

  (await cookies().getAll())
    .filter((item) => {
      return (
        ["NEXT_LOCALE", process.env.COOKIE_NAME as string].includes(
          item.name
        ) && item.value
      );
    })
    .map((item) => {
      cookiesList[cookiesName[item.name]] = item.value;
    });

  return {
    value: cookiesList,
  };
}

export async function removeCookies() {
  cookies().delete(process.env.COOKIE_NAME as string);
}
