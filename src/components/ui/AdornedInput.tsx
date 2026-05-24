import React from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../shadcn/input-group";
import clsx from "clsx";

type AdornedInputProps = React.ComponentProps<'input'> & {
  leftAddon?: React.ReactNode;
  leftAddonClassName?: string;
  rightAddon?: React.ReactNode;
  rightAddonClassName?: string;
};

export const AdornedInput: React.FC<AdornedInputProps> = ({
  leftAddon,
  leftAddonClassName,
  rightAddon,
  rightAddonClassName,
  ...props
}) => {
  return (
    <InputGroup>
      <InputGroupAddon align="inline-start"  className={clsx(leftAddonClassName)}>
        {leftAddon}
      </InputGroupAddon>
      <InputGroupInput {...props} />
      <InputGroupAddon align="inline-end" className={clsx(rightAddonClassName)}>
        {rightAddon}
      </InputGroupAddon>
    </InputGroup>
  )
}