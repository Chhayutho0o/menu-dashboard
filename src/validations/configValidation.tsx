import * as yup from "yup";

export const generalConfigValidation = (t: any) => {
  return yup.object().shape({
    merchant_per_account: yup
      .string()
      .min(1, t("validation.min.merchant_per_account"))
      .required(t("validation.required.merchant_per_account")),
    subscription_price: yup
      .string()
      .min(1, t("validation.min.subscription_price"))
      .required(t("validation.required.subscription_price")),
    due_date_duration: yup
      .string()
      .min(1, t("validation.min.due_date_duration"))
      .required(t("validation.required.due_date_duration")),
  });
};
