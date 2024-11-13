import { ThemeContext, darkColors, lightColors } from "../utils/colors/colors";
import { GluestackUIProvider } from "@/src/utils/gluestack-ui-provider";
import { router, Stack, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SessionContext, supabase } from "../utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";

import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

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

    supabase
      .from("cars")
      .select("*")
      .then((cars) => {
        if (cars.data?.length === 0) {
          router.replace("/setup");
        }
      });

    if (!session) router.replace("/login");
  }, []);

  return (
    <GluestackUIProvider mode="system">
      <SessionContext.Provider value={session}>
        <ThemeContext.Provider
          value={color === "dark" ? darkColors : lightColors}
        >
          <ThemeProvider value={color === "dark" ? DarkTheme : DefaultTheme}>
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
          </ThemeProvider>
        </ThemeContext.Provider>
      </SessionContext.Provider>
    </GluestackUIProvider>
  );
}
