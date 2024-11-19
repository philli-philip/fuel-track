import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
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
  const [pedometer, setPedometer] = useState(pedo ? parseFloat(pedo) : 0);
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
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.label}>Date</Text>
        {Platform.OS !== "ios" && (
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={styles.value}>{dateFormater.format(date)}</Text>
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
        <Text style={styles.label}>New pedometer value</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.value}
            value={pedometer >= 0 ? pedometer.toString() : "0"}
            onChangeText={(e) =>
              setPedometer(parseFloat(e.replace(",", ".").replace(" ", "")))
            }
            keyboardType="numeric"
            multiline={false}
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
            onChangeText={(text) =>
              setFuelAmount(parseFloat(text.replace(",", ".").replace(" ", "")))
            }
            multiline={false}
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
            multiline={false}
          />
          <Text style={styles.unit}>€/litre</Text>
        </View>
        <Text style={styles.note}>
          {total_cost.toFixed(2)}€ for this refeuling?
        </Text>
      </View>
      {carID && (
        <Button
          title="Create new"
          containerStyle={{ position: "absolute", right: 24, bottom: 48 }}
          onPress={() => {
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
      flex: 1,
      flexDirection: "column",
      paddingHorizontal: 24,
    },
    form: {
      flex: 1,
    },
    inputRow: {
      flexDirection: "row",
      gap: 2,
    },
    container: {
      flex: 1,
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
