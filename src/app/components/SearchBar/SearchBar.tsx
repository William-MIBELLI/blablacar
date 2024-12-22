"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { CalendarDays, Circle, UserRound } from "lucide-react";
import DateSelector from "./DateSelector/DateSelector";
import InputBase from "./Input/InputBase";
import PassengerSelector from "./PassengerSelector/PassengerSelector";

const SearchBar = () => {
  return (
    <div className="w-3/4 bg-gray-100 h-14  rounded-xl flex shadow-lg">
      <div className="grid grid-cols-4 gap-1 py-0.5 px-1">
        <InputBase
          placeholder="Départ"
          startContent={<Circle />}
        />
        <InputBase
          placeholder="Arrivée"
          startContent={<Circle />}
        />
        <DateSelector />
        <PassengerSelector/>
      </div>
      <Button  className="bg-blueMain h-full pl-4 min-w-36 rounded-r-xl text-white font-semibold text-md ">
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
