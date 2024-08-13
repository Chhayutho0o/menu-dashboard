import React, {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Formik, Field, Form } from "formik";
import { Label } from "@/components/ui/label";
import { CustomInput, CustomSelect } from "@/components/input/CustomInput";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { Category, Template } from "@/types";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { createCategory, updateCategory } from "@/actions/categories";
import ImageLoader from "../commons/ImageLoader";
import categoryValidation from "@/validations/categoryValidation";

export interface SheetRef {
  open: (data: Template) => void;
  close: () => void;
}

const initialValue = (data?: Category | null) => ({
  name: {
    en: data?.name?.en || "",
    km: data?.name?.km || "",
    cn: data?.name?.cn || "",
  },
  status: data?.status || "active",
  image: data?.image || "",
});

const CategoryForm = forwardRef(({}, ref: ForwardedRef<SheetRef>) => {
  const t = useTranslations("");
  const [sheet, setSheet] = useState<{
    isOpen: boolean;
    data: Category | null;
  }>({
    isOpen: false,
    data: null,
  });
  const [createAnother, setCreateAnother] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [image, setImage] = useState(null);
  const imageRef = useRef<any>(null);

  const onChangeImage = (e: any, setFieldValue: any) => {
    const fileInput = e.currentTarget;
    const file = fileInput?.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setFieldValue("image", imageUrl);
    }
  };
  const previewImage = image ? URL.createObjectURL(image) : sheet.data?.image;

  const open = (data?: any) => {
    setSheet({ data, isOpen: true });
  };

  const close = () => {
    setSheet({ data: null, isOpen: false });
  };

  const handleSubmit = (values: any, actions: any) => {
    const formData = new FormData();
    formData.append("name[km]", values.name.km);
    formData.append("name[en]", values.name.en);
    formData.append("name[cn]", values.name.cn);
    formData.append("status", values.status);
    if (image) {
      formData.append("image", image as unknown as Blob);
    }
    startTransition(async () => {
      const { status, message, error } = sheet.data
        ? await updateCategory(sheet.data.id, formData)
        : await createCategory(formData);
      if (status !== "success") {
        error
          ? actions.setErrors(error)
          : toast.error(message || "Something went wrong");
        return;
      }
      toast.success(message);
      if (createAnother) {
        actions.resetForm();
        setImage(null);
        return;
      }
      close();
    });
  };

  useImperativeHandle(ref, () => ({ open, close }), []);

  const optionStatus = [
    { label: t("options.status.active"), value: "active" },
    { label: t("options.status.inactive"), value: "inactive" },
  ];
  return (
    <Sheet open={sheet.isOpen} onOpenChange={close}>
      <SheetContent side="right" onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader className="mb-7">
          <SheetTitle>
            {sheet.data
              ? t("category.edit", { value: sheet.data?.name.en })
              : t("category.create")}
          </SheetTitle>
        </SheetHeader>
        <Formik
          enableReinitialize
          initialValues={initialValue(sheet.data)}
          onSubmit={handleSubmit}
          validationSchema={categoryValidation(t)}
        >
          {({ dirty, setFieldValue, values, errors }) => {
            return (
              <Form className="mb-10 space-y-2">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
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
                </div>
                <div className="flex flex-col">
                  <Label>{t("category.image")}</Label>
                  <div className="grid w-full min-h-60">
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
                <SheetFooter className="flex flex-row gap-4 items-end justify-end sm:mt-0 mt-2">
                  {!sheet.data && (
                    <Button
                      disabled={!dirty || isLoading}
                      isLoading={isLoading}
                      onClick={() => setCreateAnother(true)}
                      variant={"outline"}
                      type="submit"
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 animate-spin size-5" />
                      )}
                      {t("commons.another")}
                    </Button>
                  )}
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
                </SheetFooter>
              </Form>
            );
          }}
        </Formik>
      </SheetContent>
    </Sheet>
  );
});

CategoryForm.displayName = "CategoryForm";

export default CategoryForm;
