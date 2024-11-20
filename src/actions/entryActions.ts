import { router } from "expo-router";
import { supabase } from "../utils/supabase/supabase";

export async function createEntry({
  pedometer,
  date,
  fuel_litre,
  fuel_price,
  total_cost,
  km_added,
  car_id,
}: {
  pedometer: number;
  date?: string;
  fuel_litre?: number;
  fuel_price?: number;
  total_cost?: number;
  km_added?: number;
  car_id: number;
}) {
  try {
    await supabase.from("entries").insert({
      date: date,
      pedometer: pedometer,
      total_cost: total_cost,
      fuel_litre: fuel_litre,
      fuel_price: fuel_price,
      car_id: car_id,
      km_added: km_added,
    });
  } catch (e) {
    throw new Error("Could not create new entry.");
  }
  router.replace("/");
}
export interface DashboardData {
  totalCost?: number;
  averagePricePerLitre?: number;
  totalFuel?: number;
  totalKm?: number;
  pricePer100?: number;
  pricePer1?: number;
  count: number;
}

type Sums = {
  total_km: number;
  total_price: number;
  total_fuel: number;
  count: number;
}[];

export async function getDashboardData() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const res = await supabase
      .from("entries")
      .select(
        "total_km:km_added.sum(), total_fuel:fuel_litre.sum(), total_price:total_cost.sum(), count:fuel_litre.count()"
      )
      .limit(1)
      .returns<Sums>();

    if (res.data && res.data[0].count > 0) {
      return {
        totalCost: res.data[0].total_price,
        averagePricePerLitre: res.data[0].total_price / res.data[0].total_fuel,
        totalFuel: res.data[0].total_fuel,
        totalKm: res.data[0].total_km,
        pricePer100: (res.data[0].total_price / res.data[0].total_km) * 100,
        pricePer1: res.data[0].total_price / res.data[0].total_km,
        count: res.data[0].count,
      };
    }
  }
  return null;
}
