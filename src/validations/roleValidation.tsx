import * as yup from "yup"

const roleValidation = yup.object().shape({
  name: yup.string().required("Role name is required"),
  privileges: yup.array()
    .min(1, "At least select 1 privilege")
    .required("Privilege is required")
});

export default roleValidation