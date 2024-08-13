"use client";

import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Category } from "@/types";
import { Tags } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Formik, Field, Form } from "formik";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import TitleHeader from "@/components/commons/TitleHeader";
import ImageLoader from "@/components/commons/ImageLoader";
import ErrorMessage from "@/components/commons/ErrorMessage";
import categoryValidation from "@/validations/categoryValidation";
import FormActionButton from "@/components/commons/FormActionButton";
import { createCategory, updateCategory } from "@/actions/categories";
import { CustomInput, CustomSelect } from "@/components/input/CustomInput";

const initialValue = (data?: Category) => ({
  name: {
    en: data?.name?.en || "",
    km: data?.name?.km || "",
    cn: data?.name?.cn || "",
  },
  status: data?.status || "",
  image: data?.image || "",
});

interface Props {
  data?: Category;
}

export default function CategoryForm({ data }: Props) {
  const t = useTranslations("");
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
      setFieldValue("image", imageUrl);
    }
  };
  const previewImage = image ? URL.createObjectURL(image) : data?.image;

  const onSubmit = async (values: any, actions: any) => {
    const formData = new FormData();
    formData.append("name[km]", values.name.km);
    formData.append("name[en]", values.name.en);
    formData.append("name[cn]", values.name.cn);
    formData.append("status", values.status);
    if (image) {
      formData.append("image", image as unknown as Blob);
    }
    startTransition(async () => {
      const { status, message, error } = data
        ? await updateCategory(data.id, formData)
        : await createCategory(formData);
      if (status !== "success") {
        error
          ? actions.setErrors(error)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message);
      router.push("/categories");
    });
  };

  const optionStatus = [
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.inactive"), value: "inactive" },
  ];
  return (
    <div className="mx-auto xl:w-5/6 w-full mb-10">
      <Formik
        enableReinitialize
        initialValues={initialValue(data)}
        onSubmit={onSubmit}
        validationSchema={categoryValidation(t)}
      >
        {({ dirty, setFieldValue, values, errors }) => {
          return (
            <Form className="mb-10">
              <div className="flex gap-3 items-center mb-5 justify-between">
                <TitleHeader
                  title={
                    data
                      ? t("category.edit", {
                          value: `${data?.name.en} / ${data?.name.km}`,
                        })
                      : t("category.create")
                  }
                  Icon={Tags}
                />
                <div className="flex justify-end">
                  <FormActionButton
                    href="/categories"
                    isLoading={isLoading}
                    dirty={dirty}
                  />
                </div>
              </div>
              <Card className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 p-4">
                <div className="flex flex-col sm:col-span-1">
                  <Label required>{t("category.name")}</Label>
                  <Field
                    name="name.en"
                    type="text"
                    required
                    component={CustomInput}
                    placeholder={t("placeholder.name")}
                  />
                  <ErrorMessage name="name.en" />
                </div>
                <div className="flex flex-col sm:col-span-1">
                  <Label required>{t("category.name_km")}</Label>
                  <Field
                    name="name.km"
                    type="text"
                    required
                    component={CustomInput}
                    placeholder={t("placeholder.name_km")}
                  />
                  <ErrorMessage name="name.km" />
                </div>
                <div className="flex flex-col sm:col-span-1">
                  <Label required>{t("category.name_cn")}</Label>
                  <Field
                    name="name.cn"
                    type="text"
                    required
                    component={CustomInput}
                    placeholder={t("placeholder.name_cn")}
                  />
                  <ErrorMessage name="name.cn" />
                </div>
                <div className="flex flex-col sm:col-span-1">
                  <Label required>{t("commons.status")}</Label>
                  <Field
                    name="status"
                    required
                    options={optionStatus}
                    component={CustomSelect}
                    placeholder={t("placeholder.select_status")}
                  />
                  <ErrorMessage name="status" />
                </div>
                <div className="flex flex-col sm:col-span-2 col-span-1">
                  <Label>{t("category.image")}</Label>
                  <div className="grid sm:w-1/2 w-full h-full">
                    <div
                      onClick={() => imageRef.current.click()}
                      className={
                        "border-2 border-dashed hover:border-black duration-200 p-5 my-2 grid place-items-center gap-5"
                      }
                    >
                      {previewImage || values.image ? (
                        <div className="relative w-52 h-52">
                          <ImageLoader
                            src={image ? previewImage : values.image}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          {t("placeholder.select_file")}
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
                  </div>
                  <ErrorMessage name="image" />
                </div>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
