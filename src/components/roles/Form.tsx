"use client";

import React, { useMemo, useTransition } from "react";
import clsx from "clsx";
import { groupBy } from "lodash";
import { Privileges, Role } from "@/types";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Formik, Field, Form } from "formik";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/hooks/useRouter";
import roleValidation from "@/validations/roleValidation";
import { createRoles, updateRole } from "@/actions/roles";
import TitleHeader from "@/components/commons/TitleHeader";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { CustomInput } from "@/components/input/CustomInput";
import FormActionButton from "@/components/commons/FormActionButton";
import { toast } from "sonner";

const initialValue = (data?: Role) => ({
  name: data?.name || "",
  privileges: data?.privileges.map((item: any) => item.id) || [],
  removeChecking: [],
});

interface Props {
  data?: Role;
  privileges: Privileges[];
}

export default function RoleForm({ data, privileges }: Props) {
  const t = useTranslations("");
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const groupedPrivileges = useMemo(() => {
    return groupBy(privileges, "group");
  }, [privileges]);

  const onSubmit = (values: any, setErrors: any) => {
    startTransition(async () => {
      const { status, message, error } = data
        ? await updateRole(data.id, values)
        : await createRoles(values);
      if (status === "error") {
        error ? setErrors(error) : toast.error(message);
      }
      if (status === "success") {
        toast.success(message);
        router.push("/roles");
      }
    });
  };

  const handleSelectAll = (e: any, setFieldValue: any) => {
    const privilegeIds = e.target.checked
      ? privileges.map((item: any) => item.id)
      : [];
    setFieldValue("privileges", privilegeIds);
  };

  const handleSelectGroup = (
    e: any,
    values: any,
    group: any,
    setFieldValue: any
  ) => {
    let newPrivilegeIds = [];
    if (e.target.checked) {
      newPrivilegeIds = values.concat(
        group.map(({ id }: { id: number }) => Number(id))
      );
    } else {
      newPrivilegeIds = values.filter(
        (id: number) => !group?.find((d: any) => d.id == id)
      );
    }
    setFieldValue("privileges", newPrivilegeIds);
  };

  const handleSelectItem = (
    e: any,
    values: any,
    setFieldValue: any,
    id: number
  ) => {
    const privilegeIds = e.target.checked
      ? values.concat(id)
      : values.filter((item: number) => item != id);
    setFieldValue("privileges", privilegeIds);
  };

  const isCheckAll = (privilegesIds: any, privileges: any) => {
    const totalChecked = [];
    privileges?.forEach((privilege: any) => {
      if (privilegesIds.includes(Number(privilege.id))) {
        totalChecked.push(privilege.id);
      }
    });
    return totalChecked.length === privileges.length;
  };

  return (
    <div className="w-full">
      <Formik
        enableReinitialize
        initialValues={initialValue(data)}
        onSubmit={onSubmit}
        validationSchema={roleValidation}
      >
        {({ dirty, setFieldValue, values }) => (
          <Form className="mb-10">
            <div className="flex sm:flex-row flex-col sm:gap-3 sm:items-center sm:mb-5 justify-between">
              <TitleHeader
                title={
                  data
                    ? t("role.edit", { value: data?.name })
                    : t("role.create")
                }
                Icon={ShieldCheck}
              />
              <div className="flex justify-end">
                <FormActionButton
                  href="/roles"
                  isLoading={isLoading}
                  dirty={dirty}
                />
              </div>
            </div>
            <Card className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 p-4">
              <div className="flex flex-col sm:col-span-1 gap-2">
                <Label required>{t("role.name")}</Label>
                <Field
                  name="name"
                  type="text"
                  required
                  component={CustomInput}
                  placeholder={t("placeholder.name")}
                />
                <ErrorMessage name="name" />
              </div>

              <div className="flex flex-col col-span-2 gap-2">
                <Label required>{t("role.privileges")}</Label>
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <Field
                    type="checkbox"
                    id="all"
                    checked={values.privileges.length === privileges?.length}
                    onChange={(e: any) => handleSelectAll(e, setFieldValue)}
                  />
                  <label htmlFor="all">{t("options.select_all")}</label>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-2">
                  {Object.entries(groupedPrivileges).map(
                    ([group, groupItems]) => {
                      return (
                        <div
                          key={group}
                          className={clsx(
                            "flex flex-col p-3 rounded-md border hover:border-black duration-200"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            <Field
                              name={`privileges[${group}]`}
                              type="checkbox"
                              id={group}
                              checked={isCheckAll(
                                values.privileges,
                                groupedPrivileges[group]
                              )}
                              onChange={(e: any) =>
                                handleSelectGroup(
                                  e,
                                  values?.privileges,
                                  groupedPrivileges[group],
                                  setFieldValue
                                )
                              }
                            />
                            <label
                              htmlFor={group}
                              className="capitalize font-semibold"
                            >
                              {group}
                            </label>
                          </div>
                          <div
                            className={clsx(
                              "border-l  ml-[10px] pb-1 px-3 mt-1 duration-200"
                            )}
                          >
                            {groupItems.map((item: any) => {
                              return (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-1"
                                >
                                  <Field
                                    type="checkbox"
                                    id={item.id}
                                    checked={values.privileges.includes(
                                      item.id
                                    )}
                                    onChange={(e: any) =>
                                      handleSelectItem(
                                        e,
                                        values?.privileges,
                                        setFieldValue,
                                        Number(item?.id)
                                      )
                                    }
                                    value={item?.id}
                                  />
                                  <label
                                    htmlFor={item.id}
                                    className="capitalize"
                                  >
                                    {item.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <ErrorMessage name="privileges" />
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
