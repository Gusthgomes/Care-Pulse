import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForm";

import Image from "next/image";
import PhoneInput from "react-phone-number-input/input";
import { E164Number } from "libphonenumber-js/core";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-00 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="BR"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="w-full rounded-md border border-solid-white bg-dark-300 h-12 px-2"
          />
        </FormControl>
      );
    case FormFieldTypes.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          {/* <FormControl>
              <ReactDatePicker
                showTimeSelect={props.showTimeSelect ?? false}
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                timeInputLabel="Time:"
                dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                wrapperClassName="date-picker"
              />
            </FormControl> */}
        </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType === FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
