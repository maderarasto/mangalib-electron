import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip"

type SimpleTooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  asChild?: boolean;
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  asChild,
  children,
  content,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}