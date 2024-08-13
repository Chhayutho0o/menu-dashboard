import * as Yup from "yup";

const authValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum password of 8 character")
    .required("Password is required"),
});
export default authValidation;
