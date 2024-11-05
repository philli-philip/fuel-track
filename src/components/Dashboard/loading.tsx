import { View } from "react-native";

export const Loading = () => (
  <View className="my-safe px-6 py-6 gap-4">
    <View className="flex-row gap-6">
      <View className="bg-gray-200 rounded-lg h-32 flex-1"></View>
      <View className="bg-gray-200 rounded-lg h-32 flex-1"></View>
    </View>
    <View className="flex-row gap-6">
      <View className="bg-gray-200 rounded-lg h-32 flex-1"></View>
      <View className="bg-gray-200 rounded-lg h-32 flex-1"></View>
    </View>
  </View>
);
