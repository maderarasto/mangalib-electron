import { Control, Controller, FieldPath, FieldValues, Path, useFormContext } from "react-hook-form"
import { FieldError, FieldGroup, FieldLabel } from "../shadcn/field";
import { Input } from "../shadcn/input";
import clsx from "clsx";
import { AlertCircleIcon } from "lucide-react";

type ControlInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: React.ComponentProps<'input'>['type']
}

export const ControlInput = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  type,
}: ControlInputProps<T>) => {
  const {
    formState: { errors }
  } = useFormContext<T>();

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
          {label && (
            <FieldLabel className="text-sm">{label}</FieldLabel>
          )}
          <Input
            className={clsx(!!errors[name] && 'ring-1 ring-red-500 focus-visible:ring-red-500')}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={placeholder}
            value={field.value}
            type={type}
          />
          {errors[name] && (
            <FieldError className="flex items-center gap-1 text-xs">
              <AlertCircleIcon size="12" />
              {resolveErrorMessage()}
            </FieldError>
          )}
        </FieldGroup>
      )}
    />
  )
}