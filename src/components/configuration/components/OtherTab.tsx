"use client";

import React, { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Field, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/input/CustomInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OtherTab() {
  const t = useTranslations("");
  const [isLoading, startTransition] = useTransition();
  const onSubmit = async (values: any, actions: any) => {
    startTransition(async () => {});
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{}}>
      {({ dirty, values }) => {
        return (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>{t("config.others.title")}</CardTitle>
                <CardDescription>{t("config.others.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                Feature not yet finished
              </CardContent>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}
