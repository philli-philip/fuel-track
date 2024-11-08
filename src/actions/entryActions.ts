import { router } from "expo-router";
import { supabase } from "../utils/supabase/supabase";
import { getProfileID } from "./userActions";

export async function createEntry({
  pedometer,
  profile_id,
  date,
  fuel_litre,
  fuel_price,
  total_cost,
}: {
  pedometer: number;
  profile_id: number;
  date?: string;
  fuel_litre?: number;
  fuel_price?: number;
  total_cost?: number;
}) {
  try {
    await supabase
      .from("entries")
      .insert({
        date: date,
        pedometer: 500,
        profile_id: 1,
        total_cost: 30,
        fuel_litre: 303,
        fuel_price: 2,
        car_id: 1,
      })
      .select();
  } catch (e) {
    console.log(e);
  }
  router.back();
}

export async function getDashboardData(car: number): Promise<{
  totalCost: number;
  averagePricePerLitre: number;
  totalFuel: number;
  totalKm: number;
  pricePer100: number;
  pricePer1: number;
}> {
  const user = getProfileID();
  const { data, error } = await supabase.from("entries").select("*");

  return {
    totalCost: 54,
    averagePricePerLitre: 1.35,
    totalFuel: 21.3,
    totalKm: 1244.12,
    pricePer100: 19.44,
    pricePer1: 1.94,
  };
}
