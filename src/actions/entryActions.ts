import { router } from "expo-router";
import { supabase } from "../utils/supabase/supabase";

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
      })
      .select();
  } catch (e) {
    console.log(e);
  }
  router.replace("/");
}
