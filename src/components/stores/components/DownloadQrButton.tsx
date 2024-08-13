"use client";

import { Store } from "@/types";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSignature } from "@/lib/generateSignature";
import CryptoJS from "crypto-js/rc4";
import { getCookies } from "@/actions/auth";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function DownloadQrButton({ item }: { item?: Store }) {
  const t = useTranslations("");
  const onClick = async () => {
    try {
      const { deadline, authorizeKey } = generateSignature(CryptoJS.encrypt);
      const cookie = await getCookies();
      const url = `${process.env.BASE_URL}admin/stores/${item?.id}/download-qr-code`;

      const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "accept-language": cookie.value.locale || "en",
      } as any;
      header["api-key-authorizer-deadline"] = deadline;
      header["api-key-authorizer"] = authorizeKey.toString();
      header["Authorization"] = `Bearer ${cookie?.value.token}`;
      await fetch(url, {
        method: "GET",
        headers: header,
      })
        .then(async (res) => {
          if (!res) {
            throw new Error("error");
          }
          const data = await res.blob();
          const url = window.URL.createObjectURL(data);
          const link = document.createElement("a");
          link.href = url;
          const filename = `store-qr-code-${dayjs().format(
            "DD-MM-YYYY_HH-mm-ss"
          )}.png`;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          toast.error("Error downloading QR code");
        });
    } catch (error: any) {
      toast.error("Error downloading QR code");
    }
  };

  return (
    <Button className="flex gap-2" onClick={onClick}>
      <QrCode /> {t("commons.download")}
    </Button>
  );
}
