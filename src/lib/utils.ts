import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeEmptyValues = (object: { [key: string]: any }) => {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var value = object[key];
      if (value === null || value === undefined || value === "") {
        delete object[key];
        return object;
      }
    }
  }
};

export const currencyFormat = (number: number, currency: string = "USD") => {
  return number.toLocaleString("en-US", { style: "currency", currency });
};

export const percentFormat = (number: number) => {
  return number.toLocaleString("en-US", { style: "percent" });
};

export const truncateText = (text: string, length: number) => {
  if (text?.length <= length) return text;
  return text?.substring(0, length).concat("...");
};

export const checkPrivilege = (session: any, module: string) => {
  return session?.role?.privileges.some((item: any) => item.module === module);
};

export const formatDate = (
  dateType: "YYYY-MM-DD" | "YYYY-MM-DD HH:mm",
  date?: number
) => {
  return dayjs.unix(date ? date : Date.now()).format(dateType);
};

export const convertString = (input: string) => {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
