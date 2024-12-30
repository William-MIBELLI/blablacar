"use client";

import React, { useEffect, useState } from "react";
import { Button, CalendarDate } from "@nextui-org/react";
import { ArrowLeftRight, Circle } from "lucide-react";
import DateSelector from "./DateSelector/DateSelector";
import InputBase from "./Input/InputBase";
import PassengerSelector from "./PassengerSelector/PassengerSelector";
import { Trip } from "@/app/interfaces/trip.interface";
import { Address } from "@prisma/client";
import { useFormState } from "react-dom";
import { createTripACTION } from "@/app/lib/actions/trip.action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { TripSchema } from "@/app/lib/zod";
// import { Feature } from "@/app/interfaces/address.interface";

export type NameBase = 'fromBase' | 'toBase'
const SearchBar = () => {
  const [trip, setTrip] = useState<Partial<Trip>>({
    from: undefined,
    to: undefined,
    date: new Date(),
    driver: "1945d7bd-85a1-4b32-ab52-50a287fee6ec",
    passengers: 1,
    
  });

  const onAddressChange = (ad: Address, origin: "from" | "to") => {
    const newTrip: Partial<Trip> = {
      ...trip,
      [origin]: ad,
    };
    setTrip(newTrip);
  };

  const getDateFromInput = (dateValue: CalendarDate) => {
    const date = dateValue.toDate("utc");
    setTrip({ ...trip, date });
  };

  const getPassengers = (nb: number) => {
    setTrip({ ...trip, passengers: nb });
  };

  useEffect(() => {
    console.log('TRIP : ', trip);
  }, [trip]);

  const switchFromTo = () => {
    const newFrom = trip.to;
    const newTo = trip.from;
    const newTrip = {
      ...trip,
      from: newFrom,
      to: newTo,
    };
    setTrip(newTrip);
  };

  const [lastResult, action] = useFormState(
    createTripACTION.bind(null, trip),
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      const validation = parseWithZod(formData, { schema: TripSchema });
      console.log('VALIDATION : ', validation);
      return validation;
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    console.log("STATE : ", lastResult);
  }, [lastResult]);

  return (
    <form
      id={form.id}
      action={action}
      className=" bg-gray-100 h-14 rounded-xl flex shadow-lg"
      noValidate
      onSubmit={form.onSubmit}
    >
      <input
        hidden
        name={fields.date.name}
        defaultValue={trip.date?.toISOString()}
        key={fields.date.key}
      />
      <input
        hidden
        name={fields.driver.name}
        defaultValue={trip.driver}
        key={fields.driver.key}
      />
      <input
        type="number"
        hidden
        name={fields.passengers.name}
        defaultValue={trip.passengers}
        key={fields.passengers.key}
      />
      <input
        type="text"
        hidden
        name={fields.from.name}
        defaultValue={trip.from?.city}
        key={fields.from.key}
      />
      <input
        type="text"
        hidden
        name={fields.to.name}
        defaultValue={trip.to?.city}
        key={fields.to.key}
      />
  
      <div className="flex items-center gap-1 py-0.5 px-1">
        <InputBase
          placeholder="Départ"
          name='fromBase'
          onChangeAddress={onAddressChange}
          defaultAd={trip.from}
          errorMessage={fields.from.errors}
        />
        <Button
          isDisabled={!trip.from && !trip.to}
          onPress={switchFromTo}
          isIconOnly
          variant="light"
        >
          <ArrowLeftRight size={16} className="text-blueMain" />
        </Button>
        <InputBase
          placeholder="Arrivée"
          name="toBase"
          onChangeAddress={onAddressChange}
          defaultAd={trip.to}
          errorMessage={fields.to.errors}

        />
        <DateSelector dateChanger={getDateFromInput} />
        <PassengerSelector handleNb={getPassengers} />
      </div>
      <Button
        radius="none"
        type="submit"
        className="bg-blueMain h-full pl-4 min-w-36 rounded-r-xl text-white font-semibold text-md "
      >
        Créer un trajet
      </Button>
    </form>
  );
};

export default SearchBar;
