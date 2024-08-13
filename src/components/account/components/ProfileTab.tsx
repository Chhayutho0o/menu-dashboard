"use client";

import React, { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { CustomInput, CustomPhoneInput } from "@/components/input/CustomInput";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { updateProfileValidation } from "@/validations/accountValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function ProfileTab({ data }: any) {
  const t = useTranslations("");
  const [isLoading, startTransition] = useTransition();
  const onSubmit = async (values: any, actions: any) => {
    startTransition(async () => {
      const { status, message, errors } = await updateProfile(values);
      if (status !== "success") {
        errors
          ? actions.setErrors(errors)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message || "Update profile successfully");
      actions.resetForm();
    });
  };
  return (
    <Formik
      validationSchema={updateProfileValidation(t)}
      onSubmit={onSubmit}
      initialValues={{
        phone_number: data?.phone_number,
        first_name: data?.first_name,
        last_name: data?.last_name,
        username: data?.username,
        email: data?.email,
      }}
    >
      {({ dirty }) => {
        return (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>{t("account.profile.title")}</CardTitle>
                <CardDescription>{t("account.profile.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:w-2/4 w-full">
                <div className="space-y-1">
                  <Label required htmlFor="first_name">
                    {t("account.profile.first_name")}
                  </Label>
                  <Field
                    name="first_name"
                    className="sm:w-[350px] w-full"
                    component={CustomInput}
                  />
                  <ErrorMessage name="first_name" />
                </div>
                <div className="space-y-1">
                  <Label required htmlFor="last_name">
                    {t("account.profile.last_name")}
                  </Label>
                  <Field
                    name="last_name"
                    className="sm:w-[350px] w-full"
                    component={CustomInput}
                  />
                  <ErrorMessage name="last_name" />
                </div>
                <div className="space-y-1">
                  <Label required htmlFor="username">
                    {t("account.profile.username")}
                  </Label>
                  <Field
                    name="username"
                    className="sm:w-[350px] w-full"
                    required
                    component={CustomInput}
                  />
                  <ErrorMessage name="username" />
                </div>
                <div className="space-y-1">
                  <Label required htmlFor="email">
                    {t("account.profile.email")}
                  </Label>
                  <Field
                    name="email"
                    type="email"
                    required
                    className="sm:w-[350px] w-full"
                    component={CustomInput}
                  />
                  <ErrorMessage name="email" />
                </div>
                <div className="space-y-1">
                  <Label required htmlFor="phone_number">
                    {t("account.profile.phone_number")}
                  </Label>
                  <div className="sm:w-[350px] w-full">
                    <Field
                      name="phone_number"
                      required
                      component={CustomPhoneInput}
                    />
                  </div>
                  <ErrorMessage name="phone_number" />
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
