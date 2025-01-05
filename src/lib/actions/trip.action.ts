"use server";

import { Trip } from "@/interfaces/trip.interface";
import { AddressSchema, TripSchema } from "../zod";
import { createAddress } from "../requests/address.request";
import { createTrip } from "../requests/trip.request";

export const createTripACTION = async (
  data: Partial<Trip>,
  state: unknown,
  fd: FormData
) => {
  const fdValue = Object.fromEntries(fd);

  const mergedObject = {
    ...fdValue,
    from: data.from,
    to: data.to,
    passengers: data.passengers,
  };

  try {
    const validation = TripSchema.safeParse(mergedObject);

    if (!validation.success) {
      const errors = validation.error.errors.join(", ");
      throw new Error(errors);
    }

    //INSERT LES 2 ADDRESS
    const fromCreated = await createAddress(validation.data.from);
    const toCreated = await createAddress(validation.data.to);

    if (!toCreated || !fromCreated) {
      throw new Error("Creation address failed.");
    }

    //INSERT LE TRIP
    const createdTrip = await createTrip(validation.data);

    if (!createdTrip) {
      throw new Error("No created trip.");
    }

    //RETURN SUCCESS AVEC LES DATAS
    return { success: true, trip: createdTrip };
  } catch (error: any) {
    console.log(error);
    return { success: false, error };
  }
};
