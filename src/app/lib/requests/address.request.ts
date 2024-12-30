'use server';

// import { Feature } from "@/app/interfaces/address.interface";
import prisma from "../db/db";
import { Address } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid'


export const getAddressFromAPI = async (keyword: string): Promise<Address[] | null> => {
  try {

    const query = encodeURIComponent(keyword)
    const API_URL = "https://api-adresse.data.gouv.fr/search/?q"

    const res = await fetch(`${API_URL}=${query}&limit=5`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json() as { "features" : Feature[]};

    const mappedData: Address[] = data.features.map(item => {
      const { _type, ...address } = item.properties
      return address
    })
    return mappedData;
  } catch (error: any) {
    console.log('ERROR GET ADDRESS FROM API : ', error?.message);
    return null;
  }
}

export const createAddress = async (address: Address) => {
  try {
    const created = await prisma.address.create({
      data: {
        ...address,
        id: uuidV4()
      }
    })
    
    return created
    
  } catch (error: any) {
    console.log('ERROR CREATE ADDRESS REQUEST : ', error?.message);
    return null;
  }
}