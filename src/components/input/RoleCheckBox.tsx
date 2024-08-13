"use client";

import { Label } from "../ui/label";
import { CustomInput } from "./CustomInput";

const RoleCheckBox = ({
  field,
  label,
  groupId = "",
  form,
  ...props
}: any) => {
  const checkChanged = (e: any) => {
    const privilegeIds = e.target.checked
      ? form?.values?.privileges?.concat(field.value)
      : form?.values?.privileges?.filter((item: any) => item != field.value);
    const removeChecking = [
      ...form?.values?.removeChecking,
      ...form?.values?.privileges?.filter((item: any) => item === field.value),
    ];
    form.setFieldValue("privileges", privilegeIds);
    form.setFieldValue("removeChecking", removeChecking);
  };

  return (
    <div>
      <Label className="flex items-center gap-1">
        <CustomInput
          {...props}
          {...field.value}
          type='checkbox'
          onChange={checkChanged}
          id={groupId}
        />
        {label}
      </Label>
    </div>
  );
};
export default RoleCheckBox;
