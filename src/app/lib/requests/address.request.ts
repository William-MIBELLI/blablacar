'use server';

import { Feature } from "@/app/interfaces/address.interface";


export const getAddressFromAPI = async (keyword: string) => {
  try {

    const query = encodeURIComponent(keyword)
    const API_URL = "https://api-adresse.data.gouv.fr/search/?q"

    const res = await fetch(`${API_URL}=${query}&limit=5`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json() as { "features" : Feature[]};

    return data.features;
  } catch (error: any) {
    console.log('ERROR GET ADDRESS FROM API : ', error?.message);
    return null;
  }
}