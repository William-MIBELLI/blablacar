'use server';

import { Trip } from "@prisma/client";
// import { Trip } from "@/app/interfaces/trip.interface";
import prisma from "../db/db";
import { TripSchemaType } from "../zod";
import { v4 as UUIDV4 } from "uuid";

export const getTrip = async () => {
  const trips = await prisma.address.findMany();
  return trips;
}

export const createTrip = async (trip: TripSchemaType): Promise<Trip | null> => {
  try {
    const { from, to, ...rest } = trip;
    const created = await prisma.trip.create({
      data: {
        ...rest,
        id: UUIDV4(),
        originId: from.id,
        destinationId: to.id
      }
    })
    return created;
  } catch (error: any) {
    console.log("ERROR CREATE TRIP REQUEST : ", error?.message);
    return null;
  }
}

