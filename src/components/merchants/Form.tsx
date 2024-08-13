"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Building } from "lucide-react";
import { Merchant, Role } from "@/types";
import { useTranslations } from "next-intl";
import { Formik, Field, Form } from "formik";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import { Card, CardContent } from "@/components/ui/card";
import TitleHeader from "@/components/commons/TitleHeader";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { PasswordInput } from "@/components/input/PasswordInput";
import FormActionButton from "@/components/commons/FormActionButton";
import { createMerchant, updateMerchant } from "@/actions/merchants";
import {
  CustomInput,
  CustomPhoneInput,
  CustomSelect,
} from "@/components/input/CustomInput";
import {
  createMerchantValidation,
  updateMerchantValidation,
} from "@/validations/merchantValidation";

const initialValues = (data?: Merchant) => ({
  email: data?.email || "",
  password: data?.password || "",
  username: data?.username || "",
  first_name: data?.first_name || "",
  last_name: data?.last_name || "",
  phone_number: data?.phone_number || "",
  status: data?.status || "active",
  role_id: data?.role?.id.toString() || "",
  level: data?.level || "ordinary",
});

interface Props {
  data?: Merchant;
  roles: Role[];
}

export default function MerchantForm({ data, roles }: Props) {
  const t = useTranslations();
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (values: any, actions: any) => {
    startTransition(async () => {
      const { status, message, error } = data
        ? await updateMerchant(data.id, values)
        : await createMerchant(values);
      if (status !== "success") {
        error
          ? actions.setErrors(error)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message);
      router.push("/merchants");
    });
  };

  const statusOptions = [
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.disable"), value: "disable" },
  ];
  const levelOptions = [
    { label: t("options.level.ordinary"), value: "ordinary" },
    { label: t("options.level.master"), value: "master" },
    { label: t("options.level.super"), value: "super" },
  ];
  const roleOptions = roles.map((role) => ({
    label: role.name,
    value: role.id.toString(),
  }));

  return (
    <div className="w-full mb-10">
      <Formik
        enableReinitialize
        initialValues={initialValues(data)}
        onSubmit={onSubmit}
        validationSchema={
          data ? updateMerchantValidation(t) : createMerchantValidation(t)
        }
      >
        {({ dirty }) => {
          return (
            <Form className="mb-10">
              <div className="flex sm:flex-row flex-col sm:gap-3 sm:items-center sm:mb-5 justify-between">
                <TitleHeader
                  title={
                    data
                      ? t("merchant.edit", {
                          value: `${data.username}`,
                        })
                      : t("merchant.create")
                  }
                  Icon={Building}
                />
                <div className="flex justify-end">
                  <FormActionButton
                    href="/merchants"
                    isLoading={isLoading}
                    dirty={dirty}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <Card className="lg:w-4/6 w-full p-4">
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4">
                    <div className="flex flex-col sm:col-span-1">
                      <Label required>{t("merchant.first_name")}</Label>
                      <Field
                        name="first_name"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.first_name")}
                      />
                      <ErrorMessage name="first_name" />
                    </div>
                    <div className="flex flex-col sm:col-span-1">
                      <Label required>{t("merchant.last_name")}</Label>
                      <Field
                        name="last_name"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.last_name")}
                      />
                      <ErrorMessage name="last_name" />
                    </div>
                    <div className="flex flex-col sm:col-span-1">
                      <Label required>{t("merchant.email")}</Label>
                      <Field
                        name="email"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.email")}
                      />
                      <ErrorMessage name="email" />
                    </div>
                    <div className="flex flex-col sm:col-span-1">
                      <Label required>{t("merchant.username")}</Label>
                      <Field
                        name="username"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.username")}
                      />
                      <ErrorMessage name="username" />
                    </div>
                    {!data && (
                      <>
                        <div className="flex flex-col sm:col-span-1">
                          <Label required htmlFor="password">
                            {t("merchant.password")}
                          </Label>
                          <Field
                            id="password"
                            name="password"
                            required
                            autoComplete="password"
                            component={PasswordInput}
                            placeholder={t("placeholder.password")}
                          />
                          <ErrorMessage name="password" />
                        </div>
                        <div className="flex flex-col sm:col-span-1">
                          <Label required>
                            {t("merchant.password_confirmation")}
                          </Label>
                          <Field
                            id="password_confirmation"
                            name="password_confirmation"
                            required
                            component={PasswordInput}
                            placeholder={t("placeholder.password_confirmation")}
                          />
                          <ErrorMessage name="password_confirmation" />
                        </div>
                      </>
                    )}
                    <div className="flex flex-col sm:col-span-1">
                      <Label required>{t("merchant.phone_number")}</Label>
                      <Field
                        name="phone_number"
                        required
                        component={CustomPhoneInput}
                        placeholder={t("placeholder.phone")}
                      />
                      <ErrorMessage name="phone_number" />
                      {/* {errors.phone_number && touched.phone_number && (
                        <p className="text-xs font-medium text-rose-500 mt-1">
                          {errors.phone_number}
                        </p>
                      )} */}
                    </div>
                  </div>
                </Card>
                <div className="lg:w-2/6 w-full">
                  <Card>
                    <CardContent className="space-y-3 mt-4">
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("merchant.role")}</Label>
                        <Field
                          name="role_id"
                          required
                          options={roleOptions}
                          component={CustomSelect}
                          placeholder={t("placeholder.select_role")}
                        />
                        <ErrorMessage name="role_id" />
                      </div>
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("commons.status")}</Label>
                        <Field
                          name="status"
                          required
                          options={statusOptions}
                          component={CustomSelect}
                          placeholder={t("placeholder.select_status")}
                        />
                        <ErrorMessage name="status" />
                      </div>
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("merchant.level")}</Label>
                        <Field
                          name="level"
                          required
                          options={levelOptions}
                          component={CustomSelect}
                          placeholder={t("placeholder.select_level")}
                        />
                        <ErrorMessage name="level" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
