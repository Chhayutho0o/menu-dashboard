"use client";

import React, { useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { StoreIcon } from "lucide-react";
import {
  createStoreValidation,
  editStoreValidation,
} from "@/validations/storeValidation";
import { useTranslations } from "next-intl";
import { Formik, Field, Form } from "formik";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import TimeInput from "@/components/input/TimeInput";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import MultiSelect from "@/components/input/MultiSelect";
import SingleSelect from "@/components/input/SelectSearch";
import ImageLoader from "@/components/commons/ImageLoader";
import TitleHeader from "@/components/commons/TitleHeader";
import MapForm from "@/components/stores/components/MapForm";
import { createStore, updateStore } from "@/actions/stores";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { Category, Merchant, Store, Template } from "@/types";
import SocialForm from "@/components/stores/components/SocialsForm";
import ContactForm from "@/components/stores/components/ContactForm";
import FormActionButton from "@/components/commons/FormActionButton";
import { CustomInput, CustomSelect } from "@/components/input/CustomInput";

const initialContact = {
  name: "",
  phone_number: "",
};

interface Props {
  data?: Store;
  merchants: Merchant[];
  templates: Template[];
  categories: Category[];
}

export default function StoreForm({
  data,
  merchants,
  templates,
  categories,
}: Props) {
  const t = useTranslations();
  const [isLoading, startTransition] = useTransition();
  const [image, setImage] = useState(null);
  const imageRef = useRef<any>(null);
  const router = useRouter();
  const initialValues = useMemo(
    () => ({
      name: data?.name || "",
      address: data?.address || "",
      contacts: data?.contacts || [initialContact],
      socials: data?.socials || [],
      operation_hours: data?.operation_hours || {
        start_hour: "",
        end_hour: "",
      },
      operation_days: data?.operation_days || [],
      is_holiday_break: data?.is_holiday_break || false,
      latitude: data?.latitude || 11.5564,
      longitude: data?.longitude || 104.9282,
      opening_status: data?.opening_status || "open",
      currency: data?.currency || "KHR",
      image: data?.image || "",
      merchant_id: data?.merchant_id || "",
      templates:
        data?.templates?.map((item) => ({
          value: item.id,
          label: item?.name,
        })) || [],
      categories:
        data?.categories?.map((item) => ({
          value: item.id,
          label: item.name?.en || item?.name?.cn || item.name?.km,
        })) || [],
      slug: data?.slug || "",
    }),
    [data]
  );

  const onChangeImage = (e: any, setFieldValue: any) => {
    const fileInput = e.currentTarget;
    const file = fileInput?.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setFieldValue("image", imageUrl);
    }
  };
  const previewImage = image ? URL.createObjectURL(image) : data?.image;

  const onSubmit = async (values: any, actions: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append(
      "operation_hours[start_hour]",
      values.operation_hours.start_hour
    );
    formData.append(
      "operation_hours[end_hour]",
      values.operation_hours.end_hour
    );
    formData.append("is_holiday_break", values.is_holiday_break);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("opening_status", values.opening_status);
    formData.append("currency", values.currency);
    formData.append("merchant_id", values.merchant_id);
    formData.append("slug", values.slug);
    for (let i = 0; i < values.templates.length; i++) {
      formData.append(`template_ids[${i}]`, values.templates[i].value);
    }
    for (let i = 0; i < values.categories.length; i++) {
      formData.append(`category_ids[${i}]`, values.categories[i].value);
    }
    if (image) {
      formData.append("image", image as unknown as Blob);
    }
    for (let i = 0; i < values.operation_days.length; i++) {
      values?.operation_days[i] &&
        formData.append(`operation_days[${i}]`, values.operation_days[i]);
    }
    for (let i = 0; i < values.contacts.length; i++) {
      values?.contacts[i] &&
        formData.append(`contacts[${i}][name]`, values.contacts[i].name);
      values?.contacts[i] &&
        formData.append(
          `contacts[${i}][phone_number]`,
          values.contacts[i].phone_number
        );
    }
    for (let i = 0; i < values.socials.length; i++) {
      values?.socials[i] &&
        formData.append(`socials[${i}][name]`, values.socials[i].name);
      values?.socials[i] &&
        formData.append(`socials[${i}][url]`, values.socials[i].url);
    }

    startTransition(async () => {
      const { status, message, error } = data
        ? await updateStore(data.id, formData)
        : await createStore(formData);
      if (status !== "success") {
        error
          ? actions.setErrors(error)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message);
      router.push("/stores");
    });
  };

  const currencyOption = [
    { label: "KHR", value: "KHR" },
    { label: "USD", value: "USD" },
  ];
  const openStatusOption = [
    { label: t("options.opening_status.close"), value: "close" },
    { label: t("options.opening_status.open"), value: "open" },
  ];
  const daysOption = [
    t("options.days.monday"),
    t("options.days.tuesday"),
    t("options.days.wednesday"),
    t("options.days.thursday"),
    t("options.days.friday"),
    t("options.days.saturday"),
    t("options.days.sunday"),
  ];

  const handleSelectItem = (
    checkValue: boolean,
    values: string[],
    setFieldValue: any,
    day: string
  ) => {
    const privilegeIds = checkValue
      ? values.concat(day)
      : values.filter((item) => item !== day);
    setFieldValue("operation_days", privilegeIds);
  };

  const handleSelectAll = (value: any, setFieldValue: any) => {
    const days = value ? daysOption.map((item: any) => item) : [];
    setFieldValue("operation_days", days);
  };

  const categoryOptions =
    useMemo(
      () =>
        categories?.map((category) => ({
          label: category.name?.en,
          value: category.id,
        })),
      [categories]
    ) || [];

  const merchantOption = useMemo(
    () =>
      merchants?.map((merchant) => ({
        label: merchant.username,
        value: merchant.id,
      })),
    [merchants]
  );

  const templateOptions = useMemo(
    () =>
      templates?.map((template) => ({
        label: template.name,
        value: template.id,
      })),
    [templates]
  );

  return (
    <div className="w-full mb-10">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={
          !data ? createStoreValidation(t) : editStoreValidation(t)
        }
      >
        {({ dirty, setFieldValue, values, errors, touched }) => {
          return (
            <Form className="mb-10">
              <div className="flex sm:flex-row flex-col sm:gap-3 sm:items-center sm:mb-5 justify-between">
                <TitleHeader
                  title={
                    data
                      ? t("store.edit", { value: data?.name })
                      : t("store.create")
                  }
                  Icon={StoreIcon}
                />
                <div className="flex justify-end">
                  <FormActionButton
                    href="/stores"
                    isLoading={isLoading}
                    dirty={dirty}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <Card className="lg:w-4/6 w-full p-4">
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4">
                    <div className="flex flex-col sm:col-span-1">
                      <Label required>{t("store.name")}</Label>
                      <Field
                        name="name"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.name")}
                      />
                      <ErrorMessage name="name" />
                    </div>
                    <div className="flex flex-col sm:col-span-1 space-y-2">
                      <Label>{t("store.slug")}</Label>
                      <Field
                        name="slug"
                        type="text"
                        component={CustomInput}
                        placeholder={t("placeholder.slug")}
                      />
                      <ErrorMessage name="slug" />
                    </div>

                    <div className="flex flex-col sm:col-span-2">
                      <Label required>{t("store.address")}</Label>
                      <Field
                        name="address"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.address")}
                      />
                      <ErrorMessage name="address" />
                    </div>
                  </div>
                  <Separator className="my-5" />

                  {data && (
                    <>
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("store.categories")}</Label>
                        <MultiSelect
                          options={categoryOptions}
                          value={values.categories as any}
                          placeholder={t("placeholder.select")}
                          onValueChange={(value) =>
                            setFieldValue("categories", value)
                          }
                        />
                        {errors.categories && touched.categories && (
                          <span className="text-xs font-medium text-rose-500">
                            {errors.categories as any}
                          </span>
                        )}
                      </div>
                      <Separator className="my-5" />
                    </>
                  )}

                  <div className="flex flex-col">
                    <Label required>{t("store.contacts")}</Label>
                    <ContactForm values={values} />
                  </div>
                  <div className="flex flex-col mt-4 gap-2">
                    <Label>{t("store.socials")}</Label>
                    <SocialForm values={values} />
                  </div>

                  <div className="flex flex-col mt-4">
                    <Label>{t("store.location")}</Label>
                    <MapForm
                      values={{
                        latitude: values.latitude,
                        longitude: values.longitude,
                      }}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </Card>
                <div className="lg:w-2/6 w-full">
                  {!data && (
                    <Card className="mb-5">
                      <CardContent className="space-y-3 mt-4">
                        <div className="flex flex-col sm:col-span-1">
                          <Label required>{t("store.merchant")}</Label>
                          <SingleSelect
                            options={merchantOption}
                            value={values.merchant_id}
                            placeholder={t("placeholder.select")}
                            onChangeValue={(val: string) =>
                              setFieldValue("merchant_id", val)
                            }
                          />
                          <ErrorMessage name="merchant_id" />
                        </div>
                        <div className="flex flex-col sm:col-span-1">
                          <Label required>{t("store.templates")}</Label>
                          <MultiSelect
                            options={templateOptions}
                            value={values.templates as any}
                            placeholder={t("placeholder.select")}
                            onValueChange={(value) =>
                              setFieldValue("templates", value)
                            }
                          />
                          {errors.templates && touched.templates && (
                            <span className="text-xs font-medium text-rose-500">
                              {errors.templates as any}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  <Card>
                    <CardContent className="space-y-3 mt-4">
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("store.currency")}</Label>
                        <Field
                          name="currency"
                          required
                          options={currencyOption}
                          component={CustomSelect}
                          placeholder={t("placeholder.select_currency")}
                        />
                        <ErrorMessage name="currency" />
                      </div>
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("store.opening_status")}</Label>
                        <Field
                          name="opening_status"
                          required
                          options={openStatusOption}
                          component={CustomSelect}
                          placeholder={t("placeholder.select_status")}
                        />
                        <ErrorMessage name="opening_status" />
                      </div>
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("store.operation_hours")}</Label>
                        <TimeInput values={values} className="w-full" />
                        <ErrorMessage name="operation_hours" />
                      </div>
                      <div className="flex flex-col sm:col-span-1">
                        <Label required>{t("store.operation_days")}</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Label
                            className={`day-all capitaliz flex items-center ml-2`}
                          >
                            <Checkbox
                              className="mr-2"
                              onCheckedChange={(value: boolean) =>
                                handleSelectAll(value, setFieldValue)
                              }
                              checked={
                                values.operation_days.length ===
                                daysOption.length
                              }
                            />
                            {t("options.select_all")}
                          </Label>
                          {daysOption.map((day) => (
                            <Label
                              className={`day-${day} capitalize flex items-center ml-2 cursor-pointer`}
                              key={day}
                            >
                              <Checkbox
                                className="mr-2"
                                name={`operation_days-${day}`}
                                value={day}
                                onCheckedChange={(value: boolean) =>
                                  handleSelectItem(
                                    value,
                                    values.operation_days,
                                    setFieldValue,
                                    day
                                  )
                                }
                                checked={values.operation_days.some(
                                  (item: any) => item === day
                                )}
                              />
                              {day}
                            </Label>
                          ))}
                        </div>
                        <ErrorMessage name="operation_days" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4 items-center my-2">
                          <Switch
                            name="is_holiday_break"
                            checked={values.is_holiday_break}
                            onCheckedChange={(value) =>
                              setFieldValue("is_holiday_break", value)
                            }
                          />
                          <Label className="mt-0.5">
                            {t("store.is_holiday_break")}
                          </Label>
                        </div>
                        <ErrorMessage name="is_holiday_break" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="mt-5">
                    <CardContent className="space-y-3 mt-4">
                      <Label required>{t("store.image")}</Label>
                      <div
                        onClick={() => imageRef.current.click()}
                        className={
                          "border-2 border-dashed hover:border-black duration-200 p-5 my-2 grid place-items-center gap-5"
                        }
                      >
                        {previewImage || values.image ? (
                          <div className="relative w-52 h-56 ">
                            <ImageLoader
                              src={image ? previewImage : values.image}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            {t("commons.select_file")}
                          </div>
                        )}
                        <Field name="image">
                          {() => (
                            <input
                              ref={imageRef}
                              hidden
                              id="file"
                              name="file"
                              type="file"
                              onChange={(e: any) =>
                                onChangeImage(e, setFieldValue)
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <ErrorMessage name="image" />
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
