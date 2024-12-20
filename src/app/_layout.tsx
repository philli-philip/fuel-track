import { ThemeContext, darkColors, lightColors } from "../utils/colors/colors";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SessionContext, supabase } from "../utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { Platform, useColorScheme } from "react-native";
import init18n from "../utils/translation/translation";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import * as StatusBar from "expo-status-bar";

export default function RootLayout() {
  const color = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [isloading, setLoading] = useState(true);

  const bg = color === "dark" ? darkColors.bg.default : lightColors.bg.default;

  init18n();

  useEffect(() => {
    if (Platform.OS == "android") {
      NavigationBar.setBackgroundColorAsync(bg);
      StatusBar.setStatusBarBackgroundColor(bg);
    }
  }, [bg]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (isloading) return;

    if (!session) router.replace("/login");

    supabase
      .from("cars")
      .select("*")
      .then((cars) => {
        if (cars.data?.length === 0) {
          router.replace("/setup");
        }
      });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <ThemeContext.Provider
        value={color === "dark" ? darkColors : lightColors}
      >
        <ThemeProvider value={color === "dark" ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="edit/[id]" />
            <Stack.Screen
              name="newEntry"
              options={{
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            />
          </Stack>
        </ThemeProvider>
      </ThemeContext.Provider>
    </SessionContext.Provider>
  );
}
