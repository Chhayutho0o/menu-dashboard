import React from "react";
import { Subscription } from "@/types";
import { useTranslations } from "next-intl";
import LabelRow from "@/components/commons/LabelRow";
import { currencyFormat, formatDate } from "@/lib/utils";
import dayjs from "dayjs";
import Duratin from "dayjs/plugin/duration";
import RelativeTime from "dayjs/plugin/relativeTime";
import Countdown from "react-countdown";

dayjs.extend(Duratin);
dayjs.extend(RelativeTime);

interface Props {
  data: Subscription;
}

export default function SubscriptionInfo({ data }: Props) {
  const t = useTranslations("");
  const {
    created_at,
    subscription: { duration },
  } = data;
  const currentTime = Date.now();
  const expirationTime =
    dayjs.unix(created_at).valueOf() + duration * 24 * 60 * 60 * 1000;

  return (
    <div className="flex flex-col">
      <LabelRow
        title={t("subscription.name")}
        value={data?.subscription.name}
      />
      <LabelRow
        title={t("subscription.price")}
        value={currencyFormat(data?.subscription.price)}
      />
      <LabelRow title={t("subscription.time_left")}>
        <Countdown date={Date.now() + expirationTime - currentTime}>
          <div>{t("subscription.expired")}</div>
        </Countdown>
      </LabelRow>
      <LabelRow
        title={t("subscription.duration")}
        value={t("subscription.day", { value: data?.subscription.duration })}
      />
      <LabelRow title={t("commons.status")} value={data?.status} />
      <LabelRow
        title={t("commons.created_at")}
        value={formatDate("YYYY-MM-DD HH:mm", data?.created_at)}
      />
    </div>
  );
}
