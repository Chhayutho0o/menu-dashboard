import * as yup from "yup";

const menuValidation = (t: any) => {
  return yup.object().shape({
    name: yup.object().shape({
      en: yup.string().required(t("validation.required.name")),
      km: yup.string().required(t("validation.required.name_km")),
      cn: yup.string().required(t("validation.required.name_cn")),
    }),
    status: yup.string().required(t("validation.required.status")),
    images: yup.string().required(t("validation.required.image")),
    price: yup
      .number()
      .required(t("validation.required.price"))
      .min(1, t("validation.min.price")),
    categories: yup.array().min(1, t("validation.min.categories")),
  });
};

export default menuValidation;
