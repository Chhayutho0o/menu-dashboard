import React from "react";
import { FieldProps } from "formik";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@/assets/css/custom-react-phone-number-input.css";
import PhoneInput from "react-phone-number-input";

export const CustomInput = ({ field, form: {}, ...props }: FieldProps) => {
  return <Input {...field} {...props} />;
};

export const CustomTextArea = ({ field, form: {}, ...props }: FieldProps) => {
  return <Textarea {...field} {...props} />;
};

export const CustomPhoneInput = ({
  field,
  form: { setFieldValue, errors },
  ...props
}: FieldProps) => {
  const handleChange = (values: any) => {
    setFieldValue(field.name, values);
  };

  return (
    <PhoneInput
      {...field}
      defaultCountry="KH"
      onChange={handleChange}
      {...props}
    />
  );
};

interface CustomSelectProps extends FieldProps {
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
}

export const CustomSelect = ({
  options,
  field,
  form: { setFieldValue },
  ...props
}: CustomSelectProps) => {
  const t = useTranslations("placeholder");
  return (
    <Select
      {...field}
      {...props}
      value={field.value}
      onValueChange={(value: any) => setFieldValue(field.name, value)}
    >
      <SelectTrigger>
        <SelectValue placeholder={props?.placeholder || t("select")} />
      </SelectTrigger>
      <SelectContent>
        {options.length ? (
          options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))
        ) : (
          <SelectValue placeholder={t("empty")} />
        )}
      </SelectContent>
    </Select>
  );
};
