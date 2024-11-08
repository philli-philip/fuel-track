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
      if (session) router.replace("/");
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
                headerShown: false,
                animation: "fade_from_bottom",
                presentation: "formSheet",
              }}
            />
          </Stack>
        </ThemeContext.Provider>
      </SessionContext.Provider>
    </GluestackUIProvider>
  );
}
