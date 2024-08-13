const yup = require("yup");

export const templateValidation = (t: any) => {
  return yup.object().shape({
    name: yup.string().required(t("validation.required.name")),
    category_ids: yup.array().min(1, t("validation.min.categories")),
  });
};
