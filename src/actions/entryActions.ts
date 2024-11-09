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
  km_added,
}: {
  pedometer: number;
  profile_id: number;
  date?: string;
  fuel_litre?: number;
  fuel_price?: number;
  total_cost?: number;
  km_added?: number;
}) {
  try {
    await supabase
      .from("entries")
      .insert({
        date: date,
        pedometer: pedometer,
        profile_id: 1,
        total_cost: total_cost,
        fuel_litre: fuel_litre,
        fuel_price: fuel_price,
        car_id: 1,
        km_added: km_added,
      })
      .select();
  } catch (e) {
    console.log(e);
  }
  router.replace("/");
}
export interface DashboardData {
  totalCost: number;
  averagePricePerLitre: number;
  totalFuel: number;
  totalKm: number;
  pricePer100: number;
  pricePer1: number;
}

export async function getDashboardData(
  car: number
): Promise<DashboardData | null> {
  const profile_id = await getProfileID();

  type Sums = {
    total_km: number;
    total_price: number;
    total_fuel: number;
  }[];
  const res = await supabase
    .from("entries")
    .select(
      "total_km:km_added.sum(), total_fuel:fuel_litre.sum(), total_price:total_cost.sum()"
    )
    .eq("profile_id", profile_id)
    .returns<Sums>();

  if (res.data) {
    return {
      totalCost: res.data[0].total_price,
      averagePricePerLitre: res.data[0].total_price / res.data[0].total_fuel,
      totalFuel: res.data[0].total_fuel,
      totalKm: res.data[0].total_km,
      pricePer100: (res.data[0].total_price / res.data[0].total_km) * 100,
      pricePer1: res.data[0].total_price / res.data[0].total_km,
    };
  } else {
    return null;
  }
}
