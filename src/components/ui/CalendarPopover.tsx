import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { Calendar, CalendarDayButton } from "../shadcn/calendar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../shadcn/spinner";
import { Edit2Icon } from "lucide-react";

type CalendarPopoverProps = {
  asChild?: boolean;
  isLoading?: boolean;
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date;
}

export const CalendarPopover: React.FC<CalendarPopoverProps> = ({
  asChild,
  isLoading,
  onSelectDate,
  selectedDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();

  const handleDayClick = (date: Date) => {
    onSelectDate?.(date);
    setIsOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Popover modal onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild={asChild}>
        <Edit2Icon className="size-4 stroke-slate-700 cursor-pointer hover:stroke-black" />
      </PopoverTrigger>
      <PopoverContent className="w-auto mt-1 mr-3 p-0" align="start">
        <Calendar 
          components={{
            DayButton: ({ className, ...props }) => (
              <CalendarDayButton 
                className={cn(className, ' hover:bg-slate-300')}
                {...props} 
              />
            )
          }}
          fixedWeeks
          mode="single"
          modifiers={{
            today: [today]
          }}
          modifiersClassNames={{
            today: 'rounded-md bg-slate-200'
          }}
          onDayClick={handleDayClick}
          selected={selectedDate}
          
      />
      </PopoverContent>
    </Popover>
  )
}