import React, {
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
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
import MultiSelect from "@/components/input/MultiSelect";
import { CustomInput } from "@/components/input/CustomInput";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { templateValidation } from "@/validations/templateValidation";
import { Template } from "@/types";
import { useTranslations } from "next-intl";
import { createTemplate, updateTemplate } from "@/actions/templates";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export interface SheetRef {
  open: (data: Template) => void;
  close: () => void;
}

const initialValue = (data?: Template | null) => ({
  name: data?.name || "",
  category_ids:
    data?.categories?.map((item) => ({
      value: item.id,
      label: item.name?.en,
    })) || [],
});

interface ComponentProps extends PropsWithChildren {
  categories: any;
}

const TemplateForm = forwardRef(
  ({ categories }: ComponentProps, ref: ForwardedRef<SheetRef>) => {
    const t = useTranslations("");
    const [sheet, setSheet] = useState<{
      isOpen: boolean;
      data: Template | null;
    }>({
      isOpen: false,
      data: null,
    });
    const [createAnother, setCreateAnother] = useState(false);
    const [isLoading, startTransition] = useTransition();

    const open = (data?: any) => {
      setSheet({ data, isOpen: true });
    };

    const close = () => {
      setSheet({ data: null, isOpen: false });
    };

    const handleSubmit = (values: any, actions: any) => {
      const params = {
        ...values,
        category_ids: values.category_ids.map((item: any) => item.value),
      };
      startTransition(async () => {
        const { status, message, error } = sheet.data
          ? await updateTemplate(sheet.data.id, params)
          : await createTemplate(params);
        if (status !== "success") {
          error
            ? actions.setErrors(error)
            : toast.error(message || "Something went wrong");
          return;
        }
        toast.success(message);
        if (createAnother) {
          actions.resetForm();
          return;
        }
        close();
      });
    };

    useImperativeHandle(ref, () => ({ open, close }), []);

    return (
      <Sheet open={sheet.isOpen} onOpenChange={close}>
        <SheetContent side="right" onOpenAutoFocus={(e) => e.preventDefault()}>
          <SheetHeader className="mb-7">
            <SheetTitle>
              {sheet.data ? "Edit: " + sheet.data.name : "Create"}
            </SheetTitle>
          </SheetHeader>
          <Formik
            enableReinitialize
            initialValues={initialValue(sheet?.data)}
            onSubmit={handleSubmit}
            validationSchema={templateValidation(t)}
          >
            {({ dirty, errors, values, setFieldValue, touched }) => {
              return (
                <Form className="mb-10">
                  <div className="flex flex-col sm:col-span-1">
                    <Label required>{t("template.name")}</Label>
                    <Field
                      name="name"
                      type="text"
                      required
                      component={CustomInput}
                      placeholder={t("placeholder.name")}
                    />
                    <ErrorMessage name="name" />
                  </div>
                  <div className="flex flex-col col-span-2 mt-2">
                    <Label required className="mb-2">
                      {t("template.category")}
                    </Label>
                    <MultiSelect
                      options={categories}
                      value={values.category_ids}
                      placeholder={t("placeholder.select_category")}
                      onValueChange={(values) =>
                        setFieldValue("category_ids", values)
                      }
                    />
                    {errors.category_ids && touched.category_ids && (
                      <span className="text-xs font-medium text-rose-500">
                        {errors.category_ids as any}
                      </span>
                    )}
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
  }
);

TemplateForm.displayName = "TemplateForm";

export default TemplateForm;
