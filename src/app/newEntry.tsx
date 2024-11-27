import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useContext, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Theme, ThemeContext } from "../utils/colors/colors";
import { createEntry } from "../actions/entryActions";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../components/button/button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

export default function newEntry() {
  const colors = useContext(ThemeContext);
  const styles = styling(colors);

  const { pedo, carID } = useLocalSearchParams<{
    pedo?: string;
    carID?: string;
  }>();

  const [fuelPrice, setPrice] = useState(1.38);
  const [open, setOpen] = useState(false);
  const [pedometer, setPedometer] = useState(pedo ? parseFloat(pedo) : 0);
  const [fuelAmount, setFuelAmount] = useState(65);
  const [date, setDate] = useState(new Date());
  const pedoRef = useRef<TextInput | null>(null);
  const fuelAmountRef = useRef<TextInput | null>(null);
  const fuelPriceRef = useRef<TextInput | null>(null);
  const { t } = useTranslation("translation", { keyPrefix: "newEntry" });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.sheet }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              paddingTop: 0,
              paddingHorizontal: 16,
              paddingBottom: 8,
            }}
          >
            <TouchableOpacity onPress={() => router.navigate("../")}>
              <MaterialIcons
                name="close"
                size={20}
                style={{
                  color: colors.text.primary,
                  padding: 12,
                  paddingLeft: 4,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{t("title")}</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.group}>
                <Text style={styles.label}>{t("date")}</Text>
                {Platform.OS !== "ios" && (
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text style={styles.value}>
                      {dateFormater.format(date)}
                    </Text>
                  </TouchableOpacity>
                )}
                {open ||
                  (Platform.OS === "ios" && (
                    <DateTimePicker
                      style={{
                        padding: 0,
                        margin: 0,
                        marginTop: 4,
                        left: -10,
                      }}
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      onChange={(e) => {
                        setDate(new Date(e.nativeEvent.timestamp));
                        setOpen(false);
                      }}
                    />
                  ))}
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>{t("newPedo")}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    ref={pedoRef}
                    style={styles.value}
                    value={pedometer >= 0 ? pedometer.toString() : "0"}
                    onChangeText={(e) =>
                      setPedometer(
                        parseFloat(e.replace(",", ".").replace(" ", ""))
                      )
                    }
                    keyboardType="numeric"
                    multiline={false}
                    selectTextOnFocus
                    autoFocus
                  />
                  <Pressable onPress={() => pedoRef.current?.focus()}>
                    <Text style={styles.unit}>km</Text>
                  </Pressable>
                </View>
                {pedo && drivenKM > 0 && (
                  <Text style={styles.note}>{drivenKM}km driven</Text>
                )}
                {pedo && drivenKM < 0 && (
                  <Text style={styles.noteAlert}>
                    {t("errorNegativePedo")}{" "}
                  </Text>
                )}
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>{t("addedFuel")}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.value}
                    ref={fuelAmountRef}
                    defaultValue={fuelAmount > 0 ? fuelAmount.toString() : "0"}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setFuelAmount(
                        parseFloat(text.replace(",", ".").replace(" ", ""))
                      )
                    }
                    multiline={false}
                    selectTextOnFocus
                  />
                  <Pressable onPress={() => fuelAmountRef.current?.focus()}>
                    <Text style={styles.unit}>litre</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.group}>
                <Text style={styles.label}>{t("fuelPrice")}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.value}
                    ref={fuelPriceRef}
                    defaultValue="1.89"
                    keyboardType="numeric"
                    onChangeText={(text) => handlePrice(text)}
                    multiline={false}
                    selectTextOnFocus
                  />
                  <Pressable onPress={() => fuelPriceRef.current?.focus()}>
                    <Text style={styles.unit}>€/litre</Text>
                  </Pressable>
                </View>
                <Text style={styles.note}>
                  {t("fuelPriceHint", { price: total_cost.toFixed(2) })}
                </Text>
              </View>
            </View>
          </ScrollView>
          {carID && (
            <Button
              title={t("create")}
              containerStyle={{
                position: "absolute",
                right: 24,
                bottom: 24,
              }}
              disabled={!enabled}
              onPressIn={() => {
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
          )}
        </View>
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
      fontWeight: 700,
    },
    unit: {
      fontSize: 32,
      color: theme.text.light,
      fontWeight: 400,
    },
    group: {
      paddingBottom: 48,
      paddingHorizontal: 24,
      gap: 8,
    },
    form: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    inputRow: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
    },
    title: {
      color: theme.text.primary,
      fontSize: 20,
      fontWeight: 700,
    },
    container: {
      flex: 1,
      paddingTop: 16,
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
