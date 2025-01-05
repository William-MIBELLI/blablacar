// import { Feature } from "@/app/interfaces/address.interface";
import { Address } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import React, { FC } from "react";

interface IProps {
  list: Address[];
  onSelectedAddress: (ad: Address) => void
}
const AddressList: FC<IProps> = ({ list, onSelectedAddress }) => {
  return (
    <ul className=" flex flex-col gap-4">
      {list.map((ad) => (
        <li
          key={ad.id}
          onClick={() => onSelectedAddress(ad)}
          className="flex items-center p-2 m-1 rounded-xl justify-between cursor-pointer hover:bg-gray-200"
        >
          <div className="flex flex-col font-semibold">
            <p className="text-gray-800">{ad.city}</p>
            <p className="text-gray-400 text-xs">{ad.context}</p>
          </div>
          <div>
            <ChevronRight className="text-gray-800" size={20}/>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AddressList;
