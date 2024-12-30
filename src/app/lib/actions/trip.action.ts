"use server";

import { Trip } from "@prisma/client";

export const createTripACTION = async (data: Partial<Trip>, state: unknown, fd: FormData) => {
  console.log('ACTION TRIP : ', data);
  return {}
}