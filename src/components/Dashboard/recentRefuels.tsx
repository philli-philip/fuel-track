import { supabase } from "@/src/utils/supabase/supabase";
import { VStack } from "@/src/utils/vstack";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Skeleton } from "./loading";

export type Refule = {
  date: string;
  fuel_litre: number;
  total_cost: number;
  id: number;
};

export const Item = ({ item }: { item: Refule }) => (
  <Link
    href={{
      pathname: "/refuel/[id]",
      params: { id: item.id },
    }}
    className="py-4 px-6 border-b flex border-gray-400 dark:border-gray-800 flex-row justify-between items-center"
  >
    <VStack space="xs">
      <Text className="text-gray-900 dark:text-gray-100 font-bold text-xl">
        {new Intl.DateTimeFormat("de-DE", {
          day: "numeric",
          month: "short",
        }).format(new Date(item.date))}
      </Text>
      <Text className="text-gray-800 dark:text-gray-200 text-xl">
        {new Intl.NumberFormat("de-DE", {
          style: "unit",
          unitDisplay: "long",
          unit: "liter",
        }).format(item.fuel_litre)}
      </Text>
    </VStack>
    <Text className="text-gray-800 dark:text-gray-200 text-xl">
      {new Intl.NumberFormat("de-DE", {
        style: "currency",
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 3,
        minimumFractionDigits: 2,
        currency: "EUR",
      }).format(item.total_cost)}
    </Text>
  </Link>
);

export default function RecentRefules() {
  const [data, setData] = useState<Refule[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  const getRefuels = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("date, fuel_litre, total_cost, id")
      .order("date")
      .limit(3);

    console.log(data, error);
    if (error) throw new Error("failed at loading entries: " + error.message);

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getRefuels();
  }, []);

  if (isLoading)
    return (
      <View>
        <Skeleton className="w-1/5 h-4 pb-4" />;
        <Skeleton className="w-full h-10 pb-2" />;
        <Skeleton className="w-full h-10 pb-2" />;
        <Skeleton className="w-full h-10" />;
      </View>
    );
  else if (data && data?.length > 0)
    return (
      <View>
        <VStack space="lg">
          <View className="flex-row justify-between items-center px-1">
            <Text className="text-gray-800 dark:text-gray-200">
              Recent refules
            </Text>
            <Link href="/refuel/all">
              <Text className="text-blue-500 dark:text-blue-500">
                All entries
              </Text>
            </Link>
          </View>
          <FlatList
            className="border -mb-[1px] border-gray-400 dark:border-gray-800 rounded-xl overflow-hidden"
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.date}
          />
        </VStack>
      </View>
    );
}
