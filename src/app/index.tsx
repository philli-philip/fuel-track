import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../colors";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View className="h-full relative flex-col w-full mx-auto my-safe px-6 py-4 ">
      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Price per 100km</Text>
          <Text style={styles.value}>15,93 €</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Price per 1km</Text>
          <Text style={styles.value}>1,59 €</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>km tracked</Text>
          <Text style={styles.value}>192 km</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Fuel used</Text>
          <Text style={styles.value}>59 litre</Text>
        </View>
      </View>
      <Link href={"./newEntry"} asChild>
        <Pressable className="absolute bg-blue-600 active:bg-blue-700 rounded-xl px-6 py-3 right-8 bottom-32">
          <Text className="text-white text-xl">New entry</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "50%",
  },
  value: {
    fontWeight: 700,
    fontSize: 32,
    color: colors.text.primary,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    paddingBottom: 48,
  },
});
