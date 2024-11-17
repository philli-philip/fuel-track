import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Theme, ThemeContext } from "../utils/colors/colors";
import { createEntry } from "../actions/entryActions";
import { useLocalSearchParams } from "expo-router";
import { HideKeyboard } from "../components/HideKeyboard";
import Button from "../components/button/button";

export default function newEntry() {
  const colors = useContext(ThemeContext);
  const styles = styling(colors);

  const { pedo, carID } = useLocalSearchParams<{
    pedo?: string;
    carID?: string;
  }>();

  const [fuelPrice, setPrice] = useState(1.38);
  const [open, setOpen] = useState(false);
  const [pedometer, setPedometer] = useState(pedo ? parseInt(pedo) : 0);
  const [fuelAmount, setFuelAmount] = useState(65);
  const [date, setDate] = useState(new Date());
  const dateFormater = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
  });

  const total_cost = fuelAmount * fuelPrice;
  const drivenKM =
    pedometer - (typeof pedo === "string" ? parseFloat(pedo) : pedometer);
  const enabled = fuelAmount > 0 && fuelPrice > 0 && drivenKM > 0;

  const handlePrice = (input: string) => {
    const value = parseFloat(input.replace(",", ".").replace(" ", ""));
    setPrice(value);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <HideKeyboard style={{ flex: 1 }}>
          <View>
            <View
              style={styles.group}
              className="flex-col flex-1 justify-start"
            >
              <Text style={styles.label}>Date</Text>
              {Platform.OS !== "ios" ? (
                <Pressable onPress={() => setOpen(true)}>
                  <Text style={styles.value}>{dateFormater.format(date)}</Text>
                </Pressable>
              ) : (
                open && (
                  <View className="flex-1 flex-row justify-start p-0 -mx-4">
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
                  </View>
                )
              )}
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>New pedometer value</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.value}
                  value={pedometer >= 0 ? pedometer.toString() : "0"}
                  onChangeText={(e) => setPedometer(parseInt(e))}
                  keyboardType="numeric"
                  autoFocus
                />
                <Text style={styles.unit}>km</Text>
              </View>
              {pedo && drivenKM > 0 && (
                <Text style={styles.note}>{drivenKM}km driven</Text>
              )}
              {pedo && drivenKM < 0 && (
                <Text style={styles.noteAlert}>
                  You cannot deduct from your pedometer
                </Text>
              )}
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Added fuel</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.value}
                  defaultValue={fuelAmount > 0 ? fuelAmount.toString() : "0"}
                  keyboardType="numeric"
                  onChangeText={(text) => setFuelAmount(parseFloat(text))}
                />
                <Text style={styles.unit}>litre</Text>
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Fuel price</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.value}
                  defaultValue="1.89"
                  keyboardType="numeric"
                  onChangeText={(text) => handlePrice(text)}
                />
                <Text style={styles.unit}>€/litre</Text>
              </View>
              <Text style={styles.note}>
                {total_cost.toFixed(2)}€ for this refeuling?
              </Text>
            </View>
          </View>
          {carID ? (
            <Button
              title="Create new"
              onPress={() => {
                console.log(carID);
                createEntry({
                  pedometer,
                  date: date.toDateString(),
                  fuel_litre: fuelAmount,
                  fuel_price: fuelPrice,
                  total_cost: total_cost,
                  km_added: drivenKM,
                  car_id: parseInt(carID),
                });
              }}
            />
          ) : (
            <Text>No car ID</Text>
          )}
        </HideKeyboard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    label: {
      fontSize: 14,
      color: theme.text.secondary,
    },
    value: {
      fontSize: 32,
      color: theme.text.primary,
    },
    unit: {
      fontSize: 32,
      color: theme.text.light,
      fontWeight: 400,
    },
    group: {
      paddingBottom: 48,
    },
    inputRow: {
      flexDirection: "row",
      gap: 2,
    },
    container: {
      flexDirection: "column",
      flex: 1,
      paddingVertical: 16,
      backgroundColor: theme.bg.sheet,
    },
    note: {
      fontSize: 16,
      color: theme.text.secondary,
    },
    noteAlert: {
      fontSize: 16,
      color: theme.text.error,
    },
  });
