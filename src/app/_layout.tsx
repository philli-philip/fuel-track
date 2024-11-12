import { ThemeContext, darkColors, lightColors } from "../utils/colors/colors";
import { GluestackUIProvider } from "@/src/utils/gluestack-ui-provider";
import { router, Stack, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SessionContext, supabase } from "../utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";

import "@/global.css";

export default function RootLayout() {
  const color = useColorScheme();
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
      if (session) {
        supabase
          .from("profile")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1)
          .then(({ data }) => {
            console.log(data);
            if (data && data[0].id) {
              supabase
                .from("cars")
                .select("*")
                .eq("profile_id", data[0].id)
                .then((cars) => {
                  console.log("cars: ", cars);
                });
            }
          });
        router.replace("/login");
      }
      if (!session) router.replace("/login");
    }
  }, []);

  return (
    <GluestackUIProvider mode="system">
      <SessionContext.Provider value={session}>
        <ThemeContext.Provider
          value={color === "dark" ? darkColors : lightColors}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen
              name="newEntry"
              options={{
                headerShown: true,
                animation: "fade_from_bottom",
                presentation: "formSheet",
                headerShadowVisible: false,
                title: "New entry",
              }}
            />
          </Stack>
        </ThemeContext.Provider>
      </SessionContext.Provider>
    </GluestackUIProvider>
  );
}
