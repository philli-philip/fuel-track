import { Stack } from "expo-router";
import { View } from "react-native";
// Import your global CSS file
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="newEntry"
        options={{
          headerShown: false,
          animation: "fade_from_bottom",
          presentation: "formSheet",
        }}
      />
    </Stack>
  );
}
