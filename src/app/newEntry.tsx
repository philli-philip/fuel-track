import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { LinkButton } from "../components/button/button";
import { colors } from "../colors";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

export default function newEntry() {
  const [price, setPrice] = useState(1.38);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dateFormater = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
  });

  return (
    <View className="my-safe flex-1 pb-6 mx-6">
      <View className="flex-1 flex-col">
        <View className="h-12 w-full">
          <Text className="text-center text-2xl font-bold">New entry</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Date</Text>
          {Platform.OS !== "ios" && (
            <Pressable onPress={() => setOpen(true)}>
              <Text style={styles.value}>{dateFormater.format(date)}</Text>
            </Pressable>
          )}
          {open ||
            (Platform.OS === "ios" && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={(e) => {
                  setDate(new Date(e.nativeEvent.timestamp));
                  setOpen(false);
                }}
              />
            ))}
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>New pedometer value</Text>
          <View className="flex-row gap-2">
            <TextInput
              style={styles.value}
              defaultValue="82 083 399"
              keyboardType="numeric"
              multiline
            />
            <Text style={styles.unit}>km</Text>
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Added fuel</Text>
          <View className="flex-row gap-2">
            <TextInput
              style={styles.value}
              defaultValue="38"
              keyboardType="numeric"
              multiline
            />
            <Text style={styles.unit}>litre</Text>
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Fuel price</Text>
          <View className="flex-row gap-2">
            <TextInput
              style={styles.value}
              defaultValue="1,39"
              keyboardType="numeric"
              onChangeText={(text) => setPrice(parseFloat(text))}
              multiline
            />
            <Text style={styles.unit}>€/litre</Text>
          </View>
        </View>
      </View>

      <LinkButton href="../" size="lg">
        <Text>Close</Text>
      </LinkButton>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  value: {
    fontSize: 32,
    color: colors.text.primary,
  },
  unit: {
    fontSize: 32,
    color: colors.text.light,
    fontWeight: 400,
  },
  group: {
    paddingBottom: 48,
  },
});
