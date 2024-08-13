"use client";

import React, { useMemo, useRef, useState, useTransition } from "react";
import { Category, Menu } from "@/types";
import { toast } from "sonner";
import { BookOpen, StoreIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Formik, Field, Form, FormikValues } from "formik";
import { Label } from "@/components/ui/label";
import { createMenu, updateMenu } from "@/actions/menus";
import { Card, CardContent } from "@/components/ui/card";
import menuValidation from "@/validations/menuValidation";
import ImageLoader from "@/components/commons/ImageLoader";
import TitleHeader from "@/components/commons/TitleHeader";
import ErrorMessage from "@/components/commons/ErrorMessage";
import FormActionButton from "@/components/commons/FormActionButton";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "@/components/input/CustomInput";
import { useRouter } from "@/hooks/useRouter";
import MultiSelect from "../input/MultiSelect";

const initialValue = (data?: Menu) => ({
  name: {
    en: data?.name?.en || "",
    km: data?.name?.km || "",
    cn: data?.name?.cn || "",
  },
  status: data?.status || "active",
  description: data?.description || "",
  price: data?.price || "",
  images: data?.images[0]?.image || "",
  categories:
    data?.categories?.map((item) => ({
      label: item?.name?.en,
      value: item.id,
    })) || [],
});

interface Props {
  data?: Menu;
  categories: Category[];
}

export default function MenuForm({ data, categories }: Props) {
  const t = useTranslations();
  const [isLoading, startTransition] = useTransition();
  const [image, setImage] = useState(null);
  const imageRef = useRef<any>(null);
  const router = useRouter();
  const onChangeImage = (e: any, setFieldValue: any) => {
    const fileInput = e.currentTarget;
    const file = fileInput?.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setFieldValue("images", imageUrl);
    }
  };
  const previewImage = image ? URL.createObjectURL(image) : data?.images[0];

  const onSubmit = async (values: any, actions: any) => {
    const formData = new FormData();
    formData.append("name[km]", values.name.km);
    formData.append("name[en]", values.name.en);
    formData.append("name[cn]", values.name.cn);
    formData.append("status", values.status);
    formData.append("price", values.price);
    formData.append("description", values.description);
    if (image) {
      formData.append(`image`, image as unknown as Blob);
    }
    for (let i = 0; i < values.categories.length; i++) {
      formData.append(`category_ids[${i}]`, values.categories[i].value);
    }

    startTransition(async () => {
      const { status, message, error } = data
        ? await updateMenu(data.id, formData)
        : await createMenu(formData);
      if (status !== "success") {
        error
          ? actions.setErrors(error)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message);
      router.push("/menus");
    });
  };

  const openStatusOption = [
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.inactive"), value: "inactive" },
  ];

  const categoryOptions = useMemo(() => {
    return categories.map((item) => ({
      label: item?.name?.en,
      value: item.id,
    }));
  }, [categories]);

  return (
    <div className="w-full mb-10">
      <Formik
        enableReinitialize
        initialValues={initialValue(data)}
        onSubmit={onSubmit}
        validationSchema={menuValidation(t)}
      >
        {({ dirty, setFieldValue, values, errors }) => {
          return (
            <Form className="mb-10">
              <div className="flex sm:flex-row flex-col sm:gap-3 sm:items-center sm:mb-5 justify-between">
                <TitleHeader
                  title={
                    data
                      ? t("menu.edit", { value: data?.name?.en })
                      : t("menu.create")
                  }
                  Icon={BookOpen}
                />
                <div className="flex justify-end">
                  <FormActionButton
                    href="/menus"
                    isLoading={isLoading}
                    dirty={dirty}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <Card className="lg:w-4/6 w-full p-4">
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4">
                    <div className="flex flex-col sm:col-span-1 col-span-2">
                      <Label required>{t("menu.name")}</Label>
                      <Field
                        name="name.en"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.name")}
                      />
                      <ErrorMessage name="name.en" />
                    </div>
                    <div className="flex flex-col sm:col-span-1 col-span-2">
                      <Label required>{t("menu.name_km")}</Label>
                      <Field
                        name="name.km"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.name_km")}
                      />
                      <ErrorMessage name="name.km" />
                    </div>
                    <div className="flex flex-col sm:col-span-1 col-span-2">
                      <Label required>{t("menu.name_cn")}</Label>
                      <Field
                        name="name.cn"
                        type="text"
                        required
                        component={CustomInput}
                        placeholder={t("placeholder.name_cn")}
                      />
                      <ErrorMessage name="name.cn" />
                    </div>
                    <div className="flex flex-col sm:col-span-1 col-span-2">
                      <Label required>{t("menu.price")}</Label>
                      <Field
                        name="price"
                        required
                        type="number"
                        component={CustomInput}
                        placeholder={t("placeholder.price")}
                      />
                      <ErrorMessage name="price" />
                    </div>
                    <div className="flex flex-col sm:col-span-1 col-span-2">
                      <Label required>{t("commons.status")}</Label>
                      <Field
                        name="status"
                        required
                        options={openStatusOption}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_status")}
                      />
                      <ErrorMessage name="status" />
                    </div>
                    <div className="flex flex-col sm:col-span-2 w-full">
                      <Label required>{t("store.categories")}</Label>
                      <MultiSelect
                        options={categoryOptions}
                        value={values.categories as any}
                        placeholder={t("placeholder.select")}
                        onValueChange={(value) =>
                          setFieldValue("categories", value)
                        }
                      />
                      <ErrorMessage name="categories" />
                    </div>
                    <div className="flex flex-col col-span-2 space-y-2">
                      <Label>{t("menu.description")}</Label>
                      <Field
                        name="description"
                        type="text"
                        component={CustomTextArea}
                        placeholder={"....."}
                      />
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </Card>
                <div className="lg:w-2/6 w-full">
                  <Card>
                    <CardContent className="space-y-3 mt-4">
                      <Label required>{t("store.image")}</Label>
                      <div
                        onClick={() => imageRef.current.click()}
                        className={
                          "border-2 border-dashed hover:border-black duration-200 p-5 my-2 grid place-items-center gap-5"
                        }
                      >
                        {previewImage || values.images ? (
                          <div className="relative w-52 h-56 ">
                            <ImageLoader
                              src={image ? previewImage : values.images}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            {t("commons.select_file")}
                          </div>
                        )}
                        <Field name="images">
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
                      <ErrorMessage name="images" />
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
