import { Button, ButtonText } from "@/src/components/button";
import { supabase } from "@/src/utils/supabase/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const deleteEntry = async (id: number | string) => {
  const { error } = await supabase.from("entries").delete().eq("id", id);

  if (error) throw new Error("error while deleting entry: " + error.message);

  router.replace("../");
};

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <View className="h-full w-full flex-col justify-center items-center">
      <Text className="dark:text-white text-black">{id}</Text>
      <Button
        action="negative"
        size="lg"
        variant="outline"
        onPress={() => deleteEntry(id as string)}
      >
        <ButtonText>Delete</ButtonText>
      </Button>
    </View>
  );
}
