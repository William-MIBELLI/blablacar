import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ChevronDown, Minus, Plus, UserRound } from "lucide-react";
import React, { useState } from "react";

const PassengerSelector = () => {
  const [passenger, setPassenger] = useState<number>(1);
  const MAX_PASSENGER = 8;

  const onAddHandler = () => {
    if (passenger < MAX_PASSENGER) {
      setPassenger(passenger + 1);
    }
  };

  const onDescreaseHandler = () => {
    if (passenger > 1) {
      setPassenger(passenger - 1);
    }
  };

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button
          className="h-full flex justify-between bg-gray-100"
          // startContent={}
          endContent={<ChevronDown />}
        >
          <div className="flex items-center text-gray-500 font-semibold">
          <UserRound />
          {`${passenger} passager${passenger > 1 ? "s" : ""}`}

          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center justify-between p-2 gap-10 font-semibold">
          <p className="select-none">Passager</p>
          <div className="flex items-center gap-3">
            <Minus
              onClick={onDescreaseHandler}
              size={10}
              className={`passenger_button ${
                passenger > 1 ? "passenger_button_available" : ""
              }`}
            />
            <p className="select-none">{passenger}</p>

            <Plus
              onClick={onAddHandler}
              size={10}
              className={`passenger_button ${
                passenger < MAX_PASSENGER ? "passenger_button_available" : ""
              }`}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengerSelector;
