import {
  formatDate,
  formatEuro,
  formatEurPerLitre,
  formatKM,
  formatLitre,
} from "@/src/utils/formatting/formatting";
import { supabase } from "@/src/utils/supabase/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import Button from "@/src/components/button/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "@/src/components/skeleton/skeleton";

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
  const [entry, setEntry] = useState<Entry | null>(null);
  const [isLoading, setLoading] = useState(true);

  const color = useContext(ThemeContext);
  const style = styling(color);

  const getEntry = async () => {
    try {
      const { data, error, status } = await supabase
        .from("entries")
        .select("date, km_added, fuel_price, fuel_litre, total_cost, pedometer")
        .eq("id", id)
        .limit(1)
        .single();
      if (data) {
        setLoading(false);
        setEntry({
          ...data,
          startingPedo: data.pedometer - data.km_added,
          id: id as string,
        });
      } else if (status === 406) {
        setLoading(false);
        setEntry(null);
      } else if (error) throw new Error("Error while loading the entry");
    } catch (error) {
      throw new Error("Error while loading the entry");
    }
  };

  useEffect(() => {
    getEntry();
  }, []);

  return (
    <SafeAreaView style={style.container}>
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
        <Text style={style.title}>
          {entry ? formatDate(new Date(entry.date)) : <Skeleton />}
        </Text>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : entry ? (
        <Entry entry={entry} />
      ) : (
        <Text>Not found</Text>
      )}
    </SafeAreaView>
  );
}

const Entry = ({ entry }: { entry: Entry }) => {
  const color = useContext(ThemeContext);
  const style = styling(color);
  return (
    <View
      style={{
        flexDirection: "column",
        flexShrink: 1,
        flex: 1,
        justifyContent: "flex-start",
        paddingVertical: 16,
      }}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={style.row}>
          <View style={style.valueGroup}>
            <Text style={style.label}>Total price</Text>
            <Text style={style.value}>{formatEuro(entry.total_cost)}</Text>
          </View>
          <View style={style.valueGroup}>
            <Text style={style.label}>Fuel added</Text>
            <Text style={style.value}>{formatLitre(entry.fuel_litre)}</Text>
          </View>
        </View>
        <View style={style.row}>
          <View style={style.valueGroup}>
            <Text style={style.label}>km added</Text>
            <Text style={style.value}>{formatKM(entry.km_added)}</Text>
            <Text style={style.label}>
              {formatKM(entry.startingPedo) + " → " + formatKM(entry.pedometer)}
            </Text>
          </View>
          <View style={style.valueGroup}>
            <Text style={style.label}>Price per liter</Text>
            <Text style={style.value}>
              {formatEurPerLitre(entry.fuel_price)}
            </Text>
          </View>
        </View>
      </View>
      <Button title="Delete" onPress={() => deleteEntry(entry.id)} />
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexBasis: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingHorizontal: 16,
      backgroundColor: theme.bg.default,
    },
    row: {
      flexDirection: "column",
      flex: 1,
    },
    value: {
      fontSize: 32,
      fontWeight: 700,
      color: theme.text.primary,
    },
    label: {
      fontSize: 16,
      color: theme.text.secondary,
    },
    valueGroup: {
      flex: 1,
      gap: 1,
      flexDirection: "column",
    },
    title: {
      color: theme.text.primary,
      fontSize: 24,
      fontWeight: 700,
    },
    header: {
      flex: 1,
      flexBasis: 48,
      flexGrow: 0,
      flexShrink: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
