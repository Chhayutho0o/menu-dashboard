"use client";

import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/actions/auth";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { PasswordInput } from "@/components/input/PasswordInput";
import { changePasswordValidation } from "@/validations/accountValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function PasswordTab() {
  const t = useTranslations("");
  const [isLoading, startTransition] = useTransition();
  const onSubmit = async (values: any, actions: any) => {
    startTransition(async () => {
      const { status, message } = await updatePassword(values);
      if (status !== "success") {
        actions.setFieldError("password", message);
        return;
      }
      toast.success(message || "Update password successfully");
      actions.resetForm();
    });
  };
  return (
    <Formik
      validationSchema={changePasswordValidation(t)}
      onSubmit={onSubmit}
      initialValues={{
        password: "",
        new_password: "",
        confirmation_password: "",
      }}
    >
      {({ dirty, errors }) => {
        return (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>{t("account.password.title")}</CardTitle>
                <CardDescription>{t("account.password.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-1">
                  <Label required htmlFor="password">
                    {t("account.password.current_password")}
                  </Label>
                  <Field
                    id="password"
                    name="password"
                    required
                    autoComplete="password"
                    component={PasswordInput}
                    className="sm:w-[350px] w-full"
                  />
                  <ErrorMessage name="password" />
                </div>
                <div className="space-y-1">
                  <Label required htmlFor="new_password">
                    {t("account.password.new_password")}
                  </Label>
                  <Field
                    id="new_password"
                    name="new_password"
                    required
                    autoComplete="new_password"
                    component={PasswordInput}
                    className="sm:w-[350px] w-full"
                  />
                  <ErrorMessage name="new_password" />
                </div>
                <div className="space-y-1">
                  <Label required htmlFor="confirm_password">
                    {t("account.password.confirm_password")}
                  </Label>
                  <Field
                    id="confirm_password"
                    name="confirm_password"
                    required
                    autoComplete="confirm_password"
                    component={PasswordInput}
                    className="sm:w-[350px] w-full"
                  />
                  <ErrorMessage name="confirm_password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={!dirty || isLoading}
                  isLoading={isLoading}
                  type="submit"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 animate-spin size-5" />
                  )}
                  {t("commons.save")}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}
