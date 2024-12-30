'use server';

import { Trip } from "@/app/interfaces/trip.interface";
import prisma from "../db/db";

export const getTrip = async () => {
  const trips = await prisma.address.findMany();
  return trips;
}

