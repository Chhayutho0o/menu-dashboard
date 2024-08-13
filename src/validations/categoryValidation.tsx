import * as yup from 'yup';

const categoryValidation = (t: any) => {
  return yup.object().shape({
    name: yup.object().shape({
      en: yup.string().required(t("validation.required.name")),
      km: yup.string().required(t("validation.required.name_km")),
      cn: yup.string().required(t("validation.required.name_cn")),
    }),
    status: yup.string().required(t("validation.required.status"))
  });
}

export default categoryValidation;
