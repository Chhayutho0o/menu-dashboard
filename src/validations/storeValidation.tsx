import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

export const createStoreValidation = (t: any) => {
  return yup.object().shape({
    name: yup.string().required(t("validation.required.name")),
    address: yup.string().required(t("validation.required.address")),
    slug: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: t("validation.invalid.slug"),
        excludeEmptyString: true,
      })
      .required(t("validation.required.slug")),
    contacts: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(t("validation.required.contact_name")),
          phone_number: yup
            .string()
            .required(t("validation.required.contact_phone"))
            .test("phone", t("validation.invalid.phone"), (item) => {
              const isValid = isValidPhoneNumber(item);
              if (!isValid) return false;
              return true;
            }),
        })
      )
      .min(1, t("validation.min.contact")),
    socials: yup.array().of(
      yup.object().shape({
        name: yup.string().required(t("validation.required.social_name")),
        url: yup
          .string()
          .url(t("validation.invalid.social_url"))
          .required(t("validation.required.social_url")),
      })
    ),
    operation_hours: yup.object().shape({
      start_hour: yup.string().required(t("validation.required.start_hour")),
      end_hour: yup.string().required(t("validation.required.end_hour")),
    }),
    operation_days: yup
      .array()
      .of(yup.string().required(t("validation.required.operation_day")))
      .min(1, t("validation.min.operation_day")),
    is_holiday_break: yup.boolean(),
    opening_status: yup
      .string()
      .oneOf(["open", "close"], t("validation.invalid.opening_status"))
      .required(t("validation.required.opening_status")),
    currency: yup
      .string()
      .oneOf(["USD", "KHR"], t("validation.invalid.currency"))
      .required(t("validation.required.currency")),
    image: yup.string().required(t("validation.required.image")),
    templates: yup.array().min(1, t("validation.min.templates")),
    merchant_id: yup.string().required(t("validation.required.merchant")),
  });
};

export const editStoreValidation = (t: any) => {
  return yup.object().shape({
    name: yup.string().required(t("validation.required.name")),
    slug: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: t("validation.invalid.slug"),
        excludeEmptyString: true,
      })
      .required(t("validation.required.slug")),
    address: yup.string().required(t("validation.required.address")),
    contacts: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(t("validation.required.contact_name")),
          phone_number: yup
            .string()
            .required(t("validation.required.contact_phone"))
            .test("phone", t("validation.invalid.phone"), (item) => {
              const isValid = isValidPhoneNumber(item);
              if (!isValid) return false;
              return true;
            }),
        })
      )
      .min(1, t("validation.min.contact")),
    socials: yup.array().of(
      yup.object().shape({
        name: yup.string().required(t("validation.required.social_name")),
        url: yup
          .string()
          .url(t("validation.invalid.social_url"))
          .required(t("validation.required.social_url")),
      })
    ),
    operation_hours: yup.object().shape({
      start_hour: yup.string().required(t("validation.required.start_hour")),
      end_hour: yup.string().required(t("validation.required.end_hour")),
    }),
    operation_days: yup
      .array()
      .of(yup.string().required(t("validation.required.operation_day")))
      .min(1, t("validation.min.operation_day")),
    is_holiday_break: yup.boolean(),
    opening_status: yup
      .string()
      .oneOf(["open", "close"], t("validation.invalid.opening_status"))
      .required(t("validation.required.opening_status")),
    currency: yup
      .string()
      .oneOf(["USD", "KHR"], t("validation.invalid.currency"))
      .required(t("validation.required.currency")),
    image: yup.string().required(t("validation.required.image")),
    categories: yup.array().min(1, t("validation.min.categories")),
  });
};
