import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Theme, ThemeContext } from "../utils/colors/colors";
import { createEntry } from "../actions/entryActions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";

export default function newEntry() {
  const colors = useContext(ThemeContext);
  const { pedo } = useLocalSearchParams<{ pedo?: string }>();

  const [price, setPrice] = useState(1.38);
  const [open, setOpen] = useState(false);
  const [pedometer, setPedometer] = useState(pedo ? parseInt(pedo) : 0);
  const [fuelAmount, setFuelAmount] = useState(65);
  const [date, setDate] = useState(new Date());
  const dateFormater = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
  });

  const refulingPrice = fuelAmount * price;
  const styles = styling(colors);
  const profile_id = 1;
  const drivenKM =
    pedometer - (typeof pedo === "string" ? parseFloat(pedo) : pedometer);
  const enabled = fuelAmount > 0 && price > 0 && drivenKM > 0;

  const handlePrice = (input: string) => {
    const value = parseFloat(input);
    setPrice(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View>
              <View style={{ height: 48, width: "auto", flex: 1 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "red",
                  }}
                >
                  New entry
                </Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>Date</Text>
                {Platform.OS !== "ios" && (
                  <Pressable onPress={() => setOpen(true)}>
                    <Text style={styles.value}>
                      {dateFormater.format(date)}
                    </Text>
                  </Pressable>
                )}
                {(open || Platform.OS === "ios") && (
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
                    multiline
                  />
                  <Text style={styles.unit}>€/litre</Text>
                </View>
                <Text style={styles.note}>
                  {refulingPrice.toFixed(2)}€ for this refeuling?
                </Text>
              </View>
            </View>
            <Button
              isDisabled={!enabled}
              size="xl"
              onPress={() =>
                createEntry({
                  pedometer,
                  profile_id: profile_id,
                })
              }
            >
              <ButtonText>Create entry</ButtonText>
            </Button>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: theme.bg.default,
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
