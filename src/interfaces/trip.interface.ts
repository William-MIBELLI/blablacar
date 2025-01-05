// import { Feature } from "./address.interface";

import { Address } from "@prisma/client";

export interface Trip {
  from: Address;
  to: Address;
  date: Date;
  passengers: number;
  driver: string;
}