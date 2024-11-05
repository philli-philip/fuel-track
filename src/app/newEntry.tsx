import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { LinkButton } from "../components/button/button";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { ThemeContext } from "../utils/colors/colors";

export default function newEntry() {
  const colors = useContext(ThemeContext);
  const [price, setPrice] = useState(1.38);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dateFormater = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
  });

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
    inputRow: {
      flexDirection: "row",
      gap: 2,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View style={{ marginHorizontal: 24, paddingBottom: 24, flex: 1 }}>
          <View>
            <View style={{ height: 48, width: "auto", flex: 1 }}>
              <Text
                style={{ textAlign: "center", fontSize: 32, fontWeight: 700 }}
              >
                New entry
              </Text>
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
              <View style={styles.inputRow}>
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
              <View style={styles.inputRow}>
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
              <View style={styles.inputRow}>
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
      </Pressable>
    </KeyboardAvoidingView>
  );
}
