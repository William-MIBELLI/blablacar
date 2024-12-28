"use client";
import { Feature } from "@/app/interfaces/address.interface";
import { getAddressFromAPI } from "@/app/lib/requests/address.request";
import { Input, InputProps } from "@nextui-org/react";
import React, { FC, useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import AddressList from "../AddressList/AddressList";
import { Circle } from "lucide-react";

interface IProps extends InputProps {
  onChangeAddress: (ad: Feature, origin: "from" | "to") => void;
  name: "from" | "to";
  defaultAd: Feature | undefined;
}

const InputBase: FC<IProps> = ({ onChangeAddress, defaultAd, ...args }) => {
  const startRef = useRef<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<Feature[]>();
  const [selectedAddress, setSelectedAddress] = useState<Feature>();
  const [value, setValue] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultAd) {
      setSelectedAddress(defaultAd)
      setValue(defaultAd.properties.city);
      return;
    }
    setValue(prev => "")
    setSelectedAddress(undefined)
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
  const onSelectAddress = (ad: Feature) => {
    setSelectedAddress(ad);
    setValue(ad.properties.city);
    setIsOpen(false);
    onChangeAddress(ad, args.name);
  };

  return (
    <div className="relative">
      <Input
        color={undefined}
        ref={inputRef}
        classNames={{
          base: `h-full`,
          inputWrapper: "h-full",
          input: "font-semibold ",

        }}
        {...args}
        value={value}
        onValueChange={onChangeHandler}
        onFocus={() => address && setIsOpen(true)}
        startContent={<Circle className={`${selectedAddress ? 'text-blueMain' : 'text-gray-400'}`} />}
      />
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
