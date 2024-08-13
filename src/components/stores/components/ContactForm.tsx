import React from "react";
import { Field, FieldArray } from "formik";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { PlusCircle, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CustomInput, CustomPhoneInput } from "@/components/input/CustomInput";
import ErrorMessage from "@/components/commons/ErrorMessage";

const initialContact = {
  name: "",
  phone: "",
};

export default function ContactForm({ values }: any) {
  const t = useTranslations("");
  return (
    <Card className="border p-2">
      <FieldArray name="contacts">
        {(arrayHelpers: any) => (
          <>
            <div className="w-full flex flex-col gap-4 mt-2">
              {values?.contacts?.map((contact: any, index: any) => (
                <Card
                  className="grid grid-cols-2 gap-4 p-4 relative"
                  key={index}
                >
                  <div className="flex flex-col sm:col-span-1 col-span-2">
                    <Label required>{t("store.name")}</Label>
                    <Field
                      name={`contacts[${index}].name`}
                      type="text"
                      required
                      component={CustomInput}
                      placeholder={t("placeholder.name")}
                    />
                    <ErrorMessage name={`contacts[${index}].name`} />
                  </div>
                  <div className="flex flex-col sm:col-span-1 col-span-2">
                    <Label required>{t("store.phone")}</Label>
                    <Field
                      name={`contacts[${index}].phone_number`}
                      type="text"
                      required
                      component={CustomPhoneInput}
                      placeholder={t("placeholder.phone")}
                    />
                    <ErrorMessage name={`contacts[${index}].phone_number`} />
                  </div>
                  {index !== 0 && (
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-2"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <X className="size-5 text-red-500" />
                    </button>
                  )}
                </Card>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                onClick={() => arrayHelpers.push(initialContact)}
                className="rounded-md bg-black text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <PlusCircle className="h-5 w-5" />
                  <div className="ml-1">{t("store.add.contact")}</div>
                </div>
              </Button>
            </div>
          </>
        )}
      </FieldArray>
    </Card>
  );
}
