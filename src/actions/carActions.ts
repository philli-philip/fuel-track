import { router } from "expo-router";
import { supabase } from "../utils/supabase/supabase";

export async function createCar({
  pedometer,
  name,
}: {
  pedometer: number;
  name: string;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    try {
      const { data, error } = await supabase
        .from("cars")
        .insert({
          starting_pedometer: pedometer,
          user_id: session.user.id,
        })
        .select();
    } catch (error) {
      throw new Error("Could not create car entry.");
    }
    router.replace("/");
  }
}

export const getCarID = async () => {
  const { data, error } = await supabase
    .from("cars")
    .select("id")
    .limit(1)
    .single();

  return data?.id;
};
