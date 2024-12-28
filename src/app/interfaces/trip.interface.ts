import { Feature } from "./address.interface";

export interface Trip {
  from: Feature;
  to: Feature;
  date: Date;
  passengers: number;
  driver: string;
}