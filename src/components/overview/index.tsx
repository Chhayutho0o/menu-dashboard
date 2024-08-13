import React from "react";
import { useTranslations } from "next-intl";
import { SquareGanttChart } from "lucide-react";
import TitleHeader from "@/components/commons/TitleHeader";
import StatCard from "@/components/overview/components/StatCard";
import { PurchaseChart } from "@/components/overview/components/PurchaseChart";
import { StoreChart } from "./components/StoreChart";
import { MerchantChart } from "./components/MerchantChart";
import { MenuChart } from "./components/MenuChart";

export default function Overview({ ...props }: any) {
  const t = useTranslations("");
  const data = {
    store_total: props.data.stores,
    merchant_total: props.data.merchant,
    purchase_total: props.data.purchases,
    menu_total: props.data.menus,
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("overview.title")} Icon={SquareGanttChart} />
      </div>
      <StatCard data={data} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
        <PurchaseChart data={props.purchaseStat} />
        <StoreChart data={props.storeStat} />
        <MerchantChart data={props.merchantStat} />
        <MenuChart data={props.menuStat} />
      </div>
    </div>
  );
}
