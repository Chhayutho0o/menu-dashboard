import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

export const changePasswordValidation = (t: any) => {
  return yup.object().shape({
    password: yup
      .string()
      .min(8, t("auth.validation.password.min"))
      .required(t("auth.validation.password.required")),
    new_password: yup
      .string()
      .min(8, t("auth.validation.password.min"))
      .required(t("auth.validation.password.required")),
    confirm_password: yup
      .string()
      .required(t("validation.required.confirm_password"))
      .oneOf([yup.ref("new_password")], t("validation.match.confirm_password")),
  });
};

export const updateProfileValidation = (t: any) => {
  return yup.object().shape({
    first_name: yup.string().required(t("validation.required.first_name")),
    last_name: yup.string().required(t("validation.required.last_name")),
    username: yup.string().required(t("validation.required.username")),
    email: yup
      .string()
      .required(t("auth.validation.email.required"))
      .email(t("auth.validation.email.invalid")),
    phone_number: yup
      .string()
      .required(t("validation.required.phone"))
      .test("phone", t("validation.invalid.phone"), (item) => {
        const isValid = isValidPhoneNumber(item);
        if (!isValid) return false;
        return true;
      }),
  });
};
