"use client";

import React, { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateConfig } from "@/actions/configuations";
import { CustomInput } from "@/components/input/CustomInput";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { generalConfigValidation } from "@/validations/configValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function GeneralTab({ data }: any) {
  const t = useTranslations("");
  const [isLoading, startTransition] = useTransition();
  const onSubmit = async (values: any, actions: any) => {
    startTransition(async () => {
      const { status, message, error } = await updateConfig(data.id, values);
      if (status !== "success") {
        error
          ? actions.setErrors(error)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message || "Update configuration successfully");
      actions.resetForm();
    });
  };
  return (
    <Formik
      validationSchema={generalConfigValidation(t)}
      onSubmit={onSubmit}
      initialValues={{
        merchant_per_account: data.merchant_per_account,
        subscription_price: data.subscription_price,
        due_date_duration: data.due_date_duration,
      }}
    >
      {({ dirty }) => (
        <Form>
          <Card>
            <CardHeader>
              <CardTitle>{t("config.general.title")}</CardTitle>
              <CardDescription>{t("config.general.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-1">
                <Label required htmlFor="merchant_per_account">
                  {t("config.general.merchant_per_account")}
                </Label>
                <Field
                  name="merchant_per_account"
                  type="number"
                  component={CustomInput}
                  className="sm:w-[200px] w-full"
                />
                <span className="text-xs text-neutral-600 leading-3">
                  {t("config.general.per_account_desc")}
                </span>
                <ErrorMessage name="merchant_per_account" />
              </div>
              <div className="space-y-1">
                <Label required htmlFor="subscription_price">
                  {t("config.general.subscription_price")}
                </Label>
                <Field
                  name="subscription_price"
                  type="number"
                  component={CustomInput}
                  className="sm:w-[200px] w-full"
                />
                <span className="text-xs text-neutral-600 leading-3">
                  {t("config.general.subscription_desc")}
                </span>
                <ErrorMessage name="subscription_price" />
              </div>
              <div className="space-y-1">
                <Label required htmlFor="due_date_duration">
                  {t("config.general.due_date_duration")}
                </Label>
                <Field
                  name="due_date_duration"
                  type="number"
                  component={CustomInput}
                  className="sm:w-[200px] w-full"
                />
                <span className="text-xs text-neutral-600 leading-3">
                  {t("config.general.due_date_desc")}
                </span>
                <ErrorMessage name="due_date_duration" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!dirty || isLoading}
                isLoading={isLoading}
                type="submit"
              >
                {isLoading && <Loader2 className="mr-2 animate-spin size-5" />}
                {t("commons.save")}
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
