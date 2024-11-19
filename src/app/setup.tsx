import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { createCar } from "../actions/carActions";
import Button from "../components/button/button";
import { Theme, ThemeContext } from "../utils/colors/colors";

export default function Setup() {
  const [carName, setCarName] = useState("");
  const [pedometer, setPedometer] = useState(0);

  const disabled = carName === "" ? true : false;

  const styling = (theme: Theme) =>
    StyleSheet.create({
      container: {
        flexDirection: "column",
        flexGrow: 1,
        flexShrink: 0,
        backgroundColor: theme.bg.default,
      },
      title: {
        fontSize: 18,
        color: theme.text.primary,
      },
      label: {
        fontSize: 12,
        color: theme.text.secondary,
      },
      input: {
        fontSize: 32,
        color: theme.text.primary,
        fontWeight: 700,
        flexBasis: "auto",
      },
      unit: {
        fontSize: 32,
        color: theme.text.secondary,
      },
      group: {
        paddingBottom: 24,
      },
      form: {
        paddingHorizontal: 24,
      },
    });

  const colors = useContext(ThemeContext);
  const s = styling(colors);

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, flexGrow: 1, flexDirection: "column" }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              padding: 16,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={s.title}>Setup your car</Text>
          </View>
          <View style={s.form}>
            <View style={s.group}>
              <Text style={s.label}>Name of your car</Text>
              <TextInput
                style={s.input}
                placeholder="Name your car"
                onChangeText={(e) => setCarName(e)}
                keyboardType="default"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                multiline={false}
                placeholderTextColor={colors.text.light}
              />
            </View>
            <View style={s.group}>
              <Text style={s.label}>Current pedometer</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={s.input}
                  defaultValue={pedometer.toString()}
                  onChangeText={(e) => setPedometer(parseFloat(e))}
                  keyboardType="numeric"
                  spellCheck={false}
                  autoComplete="off"
                  multiline={false}
                />
                <Text style={s.unit}>km</Text>
              </View>
            </View>
          </View>
          <Button
            title="Create car"
            disabled={disabled}
            containerStyle={{ position: "absolute", bottom: 72, right: 24 }}
            onPress={() =>
              createCar({
                pedometer: pedometer,
                name: carName,
              })
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
