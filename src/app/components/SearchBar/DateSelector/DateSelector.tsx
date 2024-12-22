'use client';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { CalendarDays } from "lucide-react";
import React, { useState } from "react";
import InputBase from "../Input/InputBase";
import type { DateValue } from "@nextui-org/react";
import {  parseDate} from "@internationalized/date";

const DateSelector = () => {

  const today = parseDate(new Date().toISOString().slice(0, 10));
  const content = (
    <PopoverContent className="p-0">
      <Calendar
        aria-label="Date (Uncontrolled)"
        defaultValue={today}
        minValue={today}
      />
    </PopoverContent>
  );

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button
          startContent={<CalendarDays />}
          className="h-full bg-gray-100 font-semibold text-gray-500"
        >
          Aujourd'hui
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
  );
};

export default DateSelector;
