import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HideKeyboard } from "../components/HideKeyboard";
import { useState } from "react";
import { Button, ButtonText } from "../components/button";
import { createCar } from "../actions/carActions";

export default function Setup() {
  const [carName, setCarName] = useState("");
  const [pedometer, setPedometer] = useState(0);
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        className="bg-white dark:bg-black"
      >
        <HideKeyboard className="flex-1 px-12">
          <Text>Setup</Text>
          <View className="pb-12">
            <Text className="text-sm text-gray-800 dark:text-gray-400">
              Name of your car
            </Text>
            <View className="gap-2 flex-row">
              <TextInput
                className="text-4xl text-black dark:text-white"
                defaultValue="Name your car"
                onChangeText={(e) => setCarName(e)}
                keyboardType="default"
                autoFocus
              />
            </View>
          </View>
          <View className="pb-12">
            <Text className="text-sm text-gray-800 dark:text-gray-400">
              Current pedometer
            </Text>
            <View className="gap-2 flex-row">
              <TextInput
                className="text-4xl text-black dark:text-white"
                defaultValue="100.000"
                onChangeText={(e) => setPedometer(parseFloat(e))}
                keyboardType="numeric"
                autoFocus
              />
              <Text className="text-4xl text-gray-800 dark:text-gray-400">
                km
              </Text>
            </View>
          </View>
          <Button
            className="mb-2"
            size="xl"
            variant="solid"
            action="primary"
            onPress={() =>
              createCar({
                pedometer: pedometer,
                name: carName,
              })
            }
          >
            <ButtonText>Get started</ButtonText>
          </Button>
        </HideKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
