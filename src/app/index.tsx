import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { router, useRootNavigationState } from "expo-router";
import { supabase } from "../utils/supabase/supabase";

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (rootNavigationState?.key) {
      if (session) router.replace("/dashboard");
      if (!session) router.replace("/login");
    }
  }, [rootNavigationState]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
