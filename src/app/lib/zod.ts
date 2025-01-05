import { Address } from "@prisma/client";
import { z } from "zod";


export const AddressSchema = z.object({
  id: z.string().uuid(),
  postcode: z.string().length(5),
  x: z.number(),
  y: z.number(),
  city: z.string(),
  context: z.string(),
}) 

export const TripFrontSchema = z.object({
  from: z.string().uuid(),
  to: z.string().uuid(),
  date: z.string().datetime(),
  passengers: z.number().min(1).max(8),
  driver: z.string().uuid()
})

export const TripSchema = TripFrontSchema.omit({
  from: true,
  to: true
}).extend({
  from: AddressSchema,
  to: AddressSchema
})

export type TripSchemaType = z.infer<typeof TripSchema>