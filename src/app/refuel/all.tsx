import { Refule } from "@/src/components/Dashboard/recentRefuels";
import { Skeleton } from "@/src/components/skeleton/skeleton";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import { supabase } from "@/src/utils/supabase/supabase";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Item } from "@/src/components/Dashboard/Entry";

export default function All() {
  const [data, setData] = useState<Refule[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const color = useContext(ThemeContext);
  const style = styling(color);
  const insets = useSafeAreaInsets();

  const getRefuels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("entries")
      .select("date, fuel_litre, total_cost, id")
      .order("date", { ascending: false })
      .limit(100);

    if (error) throw new Error("Loading refuels failed.");

    setData(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    getRefuels();
  }, []);

  const Loading = () => (
    <View>
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
      <Skeleton style={style.skeleton} />
    </View>
  );

  return (
    <ScrollView
      style={[style.container, { paddingTop: insets.top }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getRefuels} />
      }
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          paddingTop: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.navigate("../")}>
          <MaterialIcons
            name="chevron-left"
            size={24}
            style={{
              color: color.text.primary,
              padding: 12,
              paddingLeft: 4,
            }}
          />
        </TouchableOpacity>
        <Text style={style.title}>Recent refules</Text>
      </View>
      {isLoading && <Loading />}
      {!isLoading && data && (
        <View style={{ flex: 1, flexDirection: "column", paddingBottom: 144 }}>
          <View style={style.list} key={21}>
            {data.map((item, index) => (
              <Item
                item={item}
                key={item.id}
                last={index === data.length - 1}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.text.primary,
      fontSize: 24,
      fontWeight: 700,
    },
    container: {
      backgroundColor: theme.bg.default,
      flex: 1,
      paddingHorizontal: 16,
      gap: 16,
    },
    list: {
      borderWidth: 1,
      overflow: "hidden",
      borderColor: theme.border,
      borderRadius: 16,
      flexDirection: "column",
      flex: 1,
      flexShrink: 1,
      alignContent: "stretch",
      alignItems: "stretch",
    },
    skeleton: {
      flex: 1,
      height: 40,
      paddingBottom: 32,
    },
  });
