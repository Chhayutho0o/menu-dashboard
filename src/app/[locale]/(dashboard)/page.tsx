import {
  getOverviewStat,
  getMenuStat,
  getMerchantsStat,
  getStoreStat,
  getPurchaseStat,
} from "@/actions/statistic";
import Overview from "@/components/overview";
import { redirect } from "@/hooks/navigation";
import React from "react";

export default async function page() {
  const { data } = await getOverviewStat();
  const { menuStat } = await getMenuStat();
  const { merchantStat } = await getMerchantsStat();
  const { storeStat } = await getStoreStat();
  const { purchaseStat } = await getPurchaseStat();
  return (
    <Overview
      data={data}
      menuStat={menuStat}
      merchantStat={merchantStat}
      storeStat={storeStat}
      purchaseStat={purchaseStat}
    />
  );
}
