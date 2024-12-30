import { Address } from "@prisma/client";
import { z } from "zod";


export const AddressSchema = z.object({
  id: z.string().uuid(),
  label: z.string(),
  score: z.number(),
  banId: z.string(),
  type: z.string(),
  name: z.string(),
  postcode: z.string().length(5),
  citycode: z.string().length(5),
  x: z.number(),
  y: z.number(),
  population: z.number(),
  city: z.string(),
  context: z.string(),
  importance: z.number(),
  municipality: z.string()
}) 

export const TripSchema = z.object({
  from: z.string(),
  to: z.string(),
  date: z.string().datetime(),
  passengers: z.number().min(1).max(8),
  driver: z.string().uuid()
})