import { Skeleton } from "@/src/components/Dashboard/loading";
import { Item, Refule } from "@/src/components/Dashboard/recentRefuels";
import { supabase } from "@/src/utils/supabase/supabase";
import { VStack } from "@/src/utils/vstack";
import { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const [data, setData] = useState<Refule[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  const getRefuels = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("date, fuel_litre, total_cost, id")
      .order("date")
      .limit(100);

    console.log(data, error);
    if (error) console.log(error);

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getRefuels();
  }, []);

  return (
    <SafeAreaView>
      <View className="p-6">
        <VStack space="lg">
          <Text className="text-gray-800 dark:text-gray-200 font-bold text-2xl">
            Recent refules
          </Text>
          {isLoading && <Loading />}
          {data && (
            <FlatList
              className="border -mb-[1px] border-gray-400 dark:border-gray-800 rounded-xl overflow-hidden"
              data={data}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.date}
            />
          )}
        </VStack>
      </View>
    </SafeAreaView>
  );
}

const Loading = () => (
  <View className="flex-col gap-2">
    <Skeleton className="w-full h-16" key={1} />
    <Skeleton className="w-full h-16" key={2} />
    <Skeleton className="w-full h-16" key={3} />
    <Skeleton className="w-full h-16" key={4} />
    <Skeleton className="w-full h-16" key={5} />
    <Skeleton className="w-full h-16" key={6} />
    <Skeleton className="w-full h-16" key={7} />
    <Skeleton className="w-full h-16" key={8} />
  </View>
);
