"use client";
import React, { useState, useTransition } from "react";
import { Formik, Field, Form } from "formik";
import { useTranslations } from "next-intl";
import authValidation from "@/validations/authValidation";
import { useRouter } from "@/hooks/useRouter";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import ErrorMessage from "../commons/ErrorMessage";
import { CustomInput } from "../input/CustomInput";
import { Label } from "../ui/label";
import { login } from "@/actions/auth";
import { toast } from "sonner";

const AuthForm = () => {
  const t = useTranslations("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const handleSubmit = async (values: any, setError: any) => {
    startTransition(async () => {
      try {
        const { status, message, errors } = await login(values);
        if (status !== "success") {
          if (errors) {
            setError(errors);
            return;
          }
          toast.error(message);
          return;
        }
        toast.success(message);
        router.push("/");
      } catch (error: any) {
        setError(error);
      }
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center p-10 rounded-lg border shadow-md">
        <div className="w-[30em] max-[580px]:w-full">
          <div className="text-4xl font-semibold uppercase text-center">
            {t("login_admin")}
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={authValidation}
            onSubmit={(values: any, { setErrors }) => {
              handleSubmit(values, setErrors);
            }}
          >
            {(formik) => (
              <Form>
                <div className="flex flex-col mt-5 gap-1">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Field
                    type="email"
                    name="email"
                    placeholder={t("auth.enter_email")}
                    component={CustomInput}
                  />
                  <ErrorMessage name="email" />
                </div>
                <div className="mt-5">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <div className="relative flex w-full item-center">
                    <Field
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth.enter_password")}
                      name="password"
                      component={CustomInput}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-4"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" />
                </div>

                <Button type="submit" className="w-full my-5 h-12">
                  {isPending && <Loader2 className="animate-spin" />}
                  {!isPending ? t("auth.login") : ""}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
