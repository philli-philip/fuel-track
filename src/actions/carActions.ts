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
      console.log(data, error);
    } catch (e) {
      console.log(e);
    }
    router.replace("/");
  }
}
