import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

export const createMerchantValidation = (t: any) => {
  return yup.object().shape({
    phone_number: yup
      .string()
      .required(t("validation.required.phone"))
      .test("phone", t("validation.invalid.phone"), (item) => {
        const isValid = isValidPhoneNumber(item);
        if (!isValid) return false;
        return true;
      }),
    first_name: yup.string().required(t("validation.required.first_name")),
    last_name: yup.string().required(t("validation.required.last_name")),
    username: yup.string().required(t("validation.required.username")),
    status: yup.string().required(t("validation.required.status")),
    role_id: yup.string().required(t("validation.required.role")),
    level: yup.string().required(t("validation.required.level")),
    email: yup
      .string()
      .email(t("validation.invalid.email"))
      .required(t("validation.required.email")),
    password: yup
      .string()
      .min(8, t("validation.length.password"))
      .required(t("validation.required.password")),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.match.confirm_password"))
      .required(t("validation.required.confirm_password")),
  });
};
export const updateMerchantValidation = (t: any) => {
  return yup.object().shape({
    phone_number: yup
      .string()
      .required(t("validation.required.phone"))
      .test("phone", t("validation.invalid.phone"), (item) => {
        const isValid = isValidPhoneNumber(item);
        if (!isValid) return false;
        return true;
      }),
    first_name: yup.string().required(t("validation.required.first_name")),
    last_name: yup.string().required(t("validation.required.last_name")),
    username: yup.string().required(t("validation.required.username")),
    status: yup.string().required(t("validation.required.status")),
    role_id: yup.string().required(t("validation.required.role")),
    level: yup.string().required(t("validation.required.level")),
    email: yup
      .string()
      .email(t("validation.invalid.email"))
      .required(t("validation.required.email")),
  });
};
