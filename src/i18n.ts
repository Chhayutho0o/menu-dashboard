import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }: any) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
  timeZone: "Asia/Phnom_Penh",
}));
