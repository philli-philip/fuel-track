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
          <FlatList
            className="border -mb-[1px] border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.date}
          />
        </VStack>
      </View>
    </SafeAreaView>
  );
}
