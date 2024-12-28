"use client";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { CalendarDays } from "lucide-react";
import React, { FC, useState } from "react";
import InputBase from "../Input/InputBase";
import type { CalendarDate, DateValue } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { formatDate } from "@/app/lib/utils";


interface IProps {
  dateChanger: (date: CalendarDate) => void;
}
const DateSelector: FC<IProps> = ({ dateChanger }) => {
  const today = parseDate(new Date().toISOString().slice(0, 10));
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDateChange = (date: CalendarDate) => {
    formatDate(date);
    setSelectedDate(date);
    setIsOpen(false);
    dateChanger(date);
  };
  const content = (
    <PopoverContent className="p-0">
      <Calendar
        aria-label="Date (Uncontrolled)"
        value={selectedDate}
        minValue={today}
        onChange={onDateChange}
      />
    </PopoverContent>
  );

  return (
    <Popover
      onOpenChange={(val) => setIsOpen(val)}
      isOpen={isOpen}
      placement="bottom"
    >
      <PopoverTrigger>
        <Button
          startContent={<CalendarDays className="text-blueMain" />}
          className="h-full bg-gray-100 font-semibold text-black"
        >
          {formatDate(selectedDate)}
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
  );
};

export default DateSelector;
