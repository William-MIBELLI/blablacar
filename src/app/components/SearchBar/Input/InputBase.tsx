"use client";
// import { Feature } from "@/app/interfaces/address.interface";
import { createAddress, getAddressFromAPI } from "@/app/lib/requests/address.request";
import { Input, InputProps } from "@nextui-org/react";
import React, { FC, useEffect, useRef, useState } from "react";
import SearchBar, { NameBase } from "../SearchBar";
import AddressList from "../AddressList/AddressList";
import { Circle } from "lucide-react";
import { Address } from "@prisma/client";

interface IProps extends InputProps {
  onChangeAddress: (ad: Address, origin: "from" | "to") => void;
  name: NameBase;
  defaultAd: Address | undefined;
}

const InputBase: FC<IProps> = ({ onChangeAddress, defaultAd, ...args }) => {
  const startRef = useRef<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<Address[]>();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [value, setValue] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  //REMISE A ZERO DU COMPOSANT
  useEffect(() => {
    if (defaultAd) {
      setSelectedAddress(defaultAd)
      setValue(defaultAd.city);
      return;
    }
    setValue(prev => "")
    setSelectedAddress(undefined)
    setAddress(undefined)
  }, [defaultAd]);
  

  //ONCHANGE DU INPUT AVEC LE TIMER
  const onChangeHandler = async (value: string) => {
    setValue(value);
    startRef.current = Date.now();
    setTimeout(async () => {
      const now = Date.now();
      if (
        startRef.current &&
        now - startRef.current >= 500 &&
        value.length > 3
      ) {
        const data = await getAddressFromAPI(value);
        if (!data) {
          return;
        }
        setAddress(data);
        setIsOpen(true);
      }
    }, 500);
  };

  //CLICK OUTSIDE POUR GERER LA DISPARATION DE LA POPOVER
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (
        addressRef.current &&
        !addressRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  //SELECTION D'UNE ADRESSE
  const onSelectAddress = async (ad: Address) => {
    setSelectedAddress(ad);
    setValue(ad.city);
    setIsOpen(false);
    onChangeAddress(ad, args.name === 'fromBase' ? 'from' : 'to');
  };

  return (
    <div className="relative">
      <Input
        color={undefined}
        ref={inputRef}
        classNames={{
          base: `h-full `,
          inputWrapper: `h-full  ${args.errorMessage ? 'border-red-400 border border-2' : ''}`,
          input: "font-semibold ",

        }}
        {...args}
        value={value}
        onValueChange={onChangeHandler}
        onFocus={() => address && setIsOpen(true)}
        startContent={<Circle className={`${selectedAddress ? 'text-blueMain' : 'text-gray-400'}`} />}
      />
      {
        args.errorMessage && (
          <p className="absolute top-100 mt-2 ml-5 font-semibold text-xs  text-red-500 ">
            {args.errorMessage.toString()}
          </p>
        )
      }
      {address && isOpen && (
        <div
          ref={addressRef}
          className="absolute top-100 w-full border rounded-xl bg-gray-50 mt-1  min-h-fit"
        >
          <AddressList list={address} onSelectedAddress={onSelectAddress} />
        </div>
      )}
    </div>
  );
};

export default InputBase;
