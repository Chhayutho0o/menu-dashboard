import React from 'react'
import { cn } from '@/lib/utils'
import { Field, FieldArray } from 'formik'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { PlusCircle, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ErrorMessage from '@/components/commons/ErrorMessage'
import { CustomInput } from '@/components/input/CustomInput'

const initialContact = {
  name: "",
  phone: ""
}

export default function ContactForm({ values }: any) {
  const t = useTranslations("")
  return (
    <Card className="border p-2">
      <FieldArray name="socials">
        {(arrayHelpers: any) => (
          <>
            <div className="w-full flex flex-col gap-4 mt-2">
              {values?.socials?.map((contact: any, index: any) =>
                <Card className="grid grid-cols-2 gap-4 p-4 relative" key={index}>
                  <div className="flex flex-col sm:col-span-1 col-span-2">
                    <Label required>{t("store.name")}</Label>
                    <Field
                      name={`socials[${index}].name`}
                      type="text"
                      required
                      component={CustomInput}
                      placeholder={t("placeholder.name")}
                    />
                    <ErrorMessage name={`socials[${index}].name`} />
                  </div>
                  <div className="flex flex-col sm:col-span-1 col-span-2">
                    <Label required>{t("store.url")}</Label>
                    <Field
                      name={`socials[${index}].url`}
                      type="text"
                      required
                      component={CustomInput}
                      placeholder={t("placeholder.url")}
                    />
                    <ErrorMessage name={`socials[${index}].url`} />
                  </div>
                  <button
                    type="button"
                    className='absolute top-0 right-0 p-2'
                    onClick={() => arrayHelpers.remove(index)}>
                    <X className="size-5 text-red-500" />
                  </button>
                </Card>
              )}
            </div>
            <div className={cn("my-3 flex ", !values.socials.length ? "justify-center items-center" : "justify-end")}>
              <Button
                type="button"
                onClick={() => arrayHelpers.push(initialContact)}
                className="rounded-md bg-black text-white hover:bg-gray-700">
                <div className="flex items-center">
                  <PlusCircle className="h-5 w-5" />
                  <div className="ml-1">{t("store.add.social")}</div>
                </div>
              </Button>
            </div>
          </>
        )}
      </FieldArray>
    </Card>
  )
}
