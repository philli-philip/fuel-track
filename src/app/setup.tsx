import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Button, ButtonText } from "../components/button";
import { createCar } from "../actions/carActions";
import { VStack } from "../utils/vstack";

export default function Setup() {
  const [carName, setCarName] = useState("");
  const [pedometer, setPedometer] = useState(0);

  const disabled = carName === "" ? true : false;

  return (
    <SafeAreaView id="safe" className="h-full relative">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack className="p-4 h-full">
          <Text className="text-xl text-black pb-12 dark:text-white">
            Setup your car
          </Text>
          <View className="pb-12">
            <Text className="text-sm text-gray-800 dark:text-gray-400">
              Name of your car
            </Text>
            <View className="gap-2 flex-row">
              <TextInput
                className="text-4xl text-black dark:text-white font-bold"
                placeholder="Name your car"
                onChangeText={(e) => setCarName(e)}
                keyboardType="default"
                autoFocus
              />
            </View>
          </View>
          <View className="pb-12 mb-auto flex-1">
            <Text className="text-sm text-gray-800 dark:text-gray-400">
              Current pedometer
            </Text>
            <View className="gap-2 flex-row">
              <TextInput
                className="text-4xl shrink flex text-black dark:text-white font-bold"
                defaultValue={pedometer.toString()}
                onChangeText={(e) => setPedometer(parseFloat(e))}
                keyboardType="numeric"
              />
              <Text className="text-4xl text-gray-800 dark:text-gray-400">
                km
              </Text>
            </View>
          </View>
          <Button
            className="absolute bottom-8 right-4 opacity-100 disabled:opacity-40"
            size="xl"
            disabled={disabled}
            variant="solid"
            action="primary"
            onPress={() =>
              createCar({
                pedometer: pedometer,
                name: carName,
              })
            }
          >
            <ButtonText>Create car</ButtonText>
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
