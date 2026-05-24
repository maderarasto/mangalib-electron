import React from "react";
import { Control, Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { FieldError, FieldGroup } from "../shadcn/field";
import { AdornedInput } from "../ui/AdornedInput";
import { AlertCircleIcon, CornerDownLeft } from "lucide-react";
import clsx from "clsx";
import { Spinner } from "../shadcn/spinner";
import { Kbd } from "../shadcn/kbd";

type InlineControlInput<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  isLoading?: boolean;
  placeholder?: string;
  leftAddon?: React.ReactNode;
  showError?: boolean;
  type?: React.ComponentProps<'input'>['type'];
}

export const InlineControlInput = <T extends FieldValues>({
  control,
  name,
  isLoading = false,
  placeholder,
  leftAddon,
  showError = false,
  type
}: InlineControlInput<T>) => {
  const {
    formState: { errors }
  } = useFormContext<T>();

  const resolveRightAddon = () => {
    if (isLoading) {
      return <Spinner />
    }

    return (
      <Kbd className="group-hover:border border-gray-300">
        <CornerDownLeft />
      </Kbd>
    );
  }

  const resolveErrorMessage = () => {
    if (!errors[name]) {
      return undefined;
    }

    return errors[name].message as string;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FieldGroup className="gap-2">
          <AdornedInput
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={placeholder}
            leftAddon={leftAddon}
            rightAddon={resolveRightAddon()}
            value={field.value}
            type={type}
          />
          {showError && errors[name] && (
            <FieldError className="flex items-center gap-1 px-1 text-xs">
              <AlertCircleIcon size="12" />
              {resolveErrorMessage()}
            </FieldError>
          )}
        </FieldGroup>
      )}
    />
  );
}