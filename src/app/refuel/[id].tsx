import { Skeleton } from "@/src/components/Dashboard/loading";
import {
  formatDate,
  formatEuro,
  formatEurPerLitre,
  formatKM,
  formatLitre,
} from "@/src/utils/formatting/formatting";
import { supabase } from "@/src/utils/supabase/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const deleteEntry = async (id: number | string) => {
  const { error } = await supabase.from("entries").delete().eq("id", id);

  if (error) throw new Error("error while deleting entry: " + error.message);

  router.replace("../");
};

type Entry = {
  date: string;
  km_added: number;
  fuel_price: number;
  fuel_litre: number;
  total_cost: number;
  pedometer: number;
  startingPedo: number;
  id: string;
};

export default function Page() {
  const { id } = useLocalSearchParams();
  const [isLoading, setloading] = useState(true);
  const [entry, setEntry] = useState<Entry | null>(null);

  const getEntry = async () => {
    try {
      const { data, error } = await supabase
        .from("entries")
        .select("date, km_added, fuel_price, fuel_litre, total_cost, pedometer")
        .eq("id", id)
        .limit(1)
        .single();
      if (error) console.error(error.message);
      if (data) {
        setEntry({
          ...data,
          startingPedo: data.pedometer - data.km_added,
          id: id as string,
        });
        setloading(false);
      }
    } catch (error) {
      throw new Error("Error while loading the entry");
    }
  };

  useEffect(() => {
    getEntry();
  }, []);

  return (
    <View className="h-full w-full flex-col justify-start px-6 pt-8">
      {isLoading ? (
        <Loading />
      ) : entry ? (
        <Entry entry={entry} />
      ) : (
        <Text>Failed to load</Text>
      )}
    </View>
  );
}

const Entry = ({ entry }: { entry: Entry }) => (
  <View className="flex-col gap-12 w-full">
    <View className="flex-row justify-between items-center">
      <Pressable
        className="w-12 h-12 flex-col items-start justify-center"
        onPress={() => router.navigate("../")}
      >
        <MaterialIcons
          name="chevron-left"
          size={32}
          className="text-black dark:text-white"
        />
      </Pressable>
      <Text className="text-black dark:text-gray-200 text-xl font-bold">
        {formatDate(new Date(entry.date))}
      </Text>
      <View className="w-12 h-12" />
    </View>
    <View className="flex-row">
      <View className="flex-col gap-1 w-1/2">
        <Text className="text-gray-700 dark:text-gray-400">Total price</Text>
        <Text className="font-bold text-black dark:text-gray-200 text-3xl">
          {formatEuro(entry.total_cost)}
        </Text>
      </View>
      <View className="flex-col gap-1 w-1/2">
        <Text className="text-gray-700 dark:text-gray-400">Fuel added</Text>
        <Text className="font-bold text-black dark:text-gray-200 text-3xl">
          {formatLitre(entry.fuel_litre)}
        </Text>
      </View>
    </View>
    <View className="flex-row w-full">
      <View className="flex-col gap-1 w-1/2">
        <Text className="text-gray-700 dark:text-gray-400">km added</Text>
        <Text className="font-bold text-black dark:text-gray-200 text-3xl">
          {formatKM(entry.km_added)}
        </Text>
        <Text className=" text-gray-700 dark:text-gray-400 text-sm">
          {formatKM(entry.startingPedo) + " → " + formatKM(entry.pedometer)}
        </Text>
      </View>
      <View className="flex-col gap-1 w-1/2">
        <Text className="text-gray-700 dark:text-gray-400">
          Price per liter
        </Text>
        <Text className="font-bold text-black dark:text-gray-200 text-3xl">
          {formatEurPerLitre(entry.fuel_price)}
        </Text>
      </View>
    </View>
    <Pressable
      className="w-full bg-red-600/10 hover:bg-red-600/20 dark:bg-red-600/20 dark:hover:bg-red-600/40 p-4 rounded-xl flex-row justify-center"
      onPress={() => deleteEntry(entry.id)}
    >
      <Text className="text-red-600 dark:text-red-600 font-bold text-md">
        Delete
      </Text>
    </Pressable>
  </View>
);

const Loading = () => (
  <View className="flex-col gap-12 w-full h-full">
    <View className="flex-row justify-between items-center">
      <Pressable
        className="w-12 h-12 flex-col items-start justify-center"
        onPress={() => router.navigate("../")}
      >
        <MaterialIcons
          name="chevron-left"
          size={32}
          className="text-black dark:text-white"
        />
      </Pressable>
      <Skeleton className="flex h-8 w-1/4" />
      <View className="w-12 h-12" />
    </View>
    <View className="flex-row gap-6 ">
      <View className="flex-col gap-2 flex-1">
        <Skeleton className="w-1/4 h-2" key={"1-1"} />
        <Skeleton className="w-full h-8" key={"1-2"} />
      </View>
      <View className="flex-col gap-2 flex-1">
        <Skeleton className="w-1/4 h-2" key={"2-1"} />
        <Skeleton className="w-full h-8" key={"2-2"} />
      </View>
    </View>
    <View className="flex-row gap-6">
      <View className="flex-col gap-2 flex-1">
        <Skeleton className="w-1/4 h-2" key={"1-1"} />
        <Skeleton className="w-full h-8" key={"1-2"} />
      </View>
      <View className="flex-col gap-2 flex-1">
        <Skeleton className="w-1/4 h-2" key={"2-1"} />
        <Skeleton className="w-full h-8" key={"2-2"} />
      </View>
    </View>
  </View>
);
