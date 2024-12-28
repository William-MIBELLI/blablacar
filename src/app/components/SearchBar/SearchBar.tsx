"use client";

import React, { useEffect, useState } from "react";
import { Button, CalendarDate } from "@nextui-org/react";
import {  ArrowLeftRight, Circle } from "lucide-react";
import DateSelector from "./DateSelector/DateSelector";
import InputBase from "./Input/InputBase";
import PassengerSelector from "./PassengerSelector/PassengerSelector";
import { Trip } from "@/app/interfaces/trip.interface";
import { Feature } from "@/app/interfaces/address.interface";

const SearchBar = () => {

  const [trip, setTrip] = useState<Partial<Trip>>({
    from: undefined,
    to: undefined,
    date: new Date(),
    driver: '',
    passengers: 1
  });

  const onAddressChange = (ad: Feature, origin: 'from' | 'to') => {
    const newTrip: Partial<Trip> = {
      ...trip,
      [origin]: ad
    }
    setTrip(newTrip);
  }

  const getDateFromInput = (dateValue: CalendarDate) => {
    const date = dateValue.toDate('utc')
    setTrip({...trip, date})
  }

  useEffect(() => {
    console.log('TRIP : ', trip);
  }, [trip]);
  
  const switchFromTo = () => {
    const newFrom = trip.to;
    const newTo = trip.from;
    const newTrip = {
      ...trip,
      from: newFrom,
      to: newTo
    }
    setTrip(newTrip);
  }

  return (
    <div className=" bg-gray-100 h-14 rounded-xl flex shadow-lg">
      <div className="flex items-center gap-1 py-0.5 px-1">
        <InputBase
          placeholder="Départ"
          name="from"
          onChangeAddress={onAddressChange}
          defaultAd={trip.from}
        />
         <Button isDisabled={!trip.from && !trip.to} onPress={switchFromTo} isIconOnly variant="light">
              <ArrowLeftRight size={16} className="text-blueMain"/>
         </Button>
        <InputBase
          placeholder="Arrivée"
          name="to"
          onChangeAddress={onAddressChange}
          defaultAd={trip.to}
        />
        <DateSelector dateChanger={getDateFromInput} />
        <PassengerSelector/>
      </div>
      <Button radius="none"  className="bg-blueMain h-full pl-4 min-w-36 rounded-r-xl text-white font-semibold text-md ">
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
