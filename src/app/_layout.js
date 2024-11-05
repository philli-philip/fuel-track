import { ThemeContext, darkColors, lightColors } from "../utils/colors/colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const color = useColorScheme();
  return (
    <ThemeContext.Provider value={color === "dark" ? darkColors : lightColors}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="auth" />
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
  );
}
