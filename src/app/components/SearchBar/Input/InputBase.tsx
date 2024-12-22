"use client";
import { Feature } from "@/app/interfaces/address.interface";
import { getAddressFromAPI } from "@/app/lib/requests/address.request";
import {
  Input,
  InputProps,
} from "@nextui-org/react";
import React, { FC, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import AddressList from "../AddressList/AddressList";

interface IProps extends InputProps {}

const InputBase: FC<IProps> = ({ ...args }) => {
  const startRef = useRef<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<Feature[]>();
  // const triggerRef = useRef<typeof PopoverTrigger>(null);

  const onChangeHandler = async (value: string) => {
    startRef.current = Date.now();
    setTimeout(async () => {
      const now = Date.now();
      if (startRef.current && now - startRef.current >= 500) {
        const data = await getAddressFromAPI(value);
        if (!data) {
          return;
        }
        setAddress(data);
        setIsOpen(true);
      }
    }, 500);
  };

  return (
    <div className="relative">
      <Input
        classNames={{
          base: "h-full relative",
          inputWrapper: "h-full",
          input: "font-semibold",
      }}
        className="relative"
        placeholder={args.placeholder}
        startContent={args.startContent}
        onValueChange={onChangeHandler}
      />
      {
        address && <AddressList list={address}/>
      }
    </div>
      
  );
};

export default InputBase;
