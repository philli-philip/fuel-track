import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabase";
import { Loading } from "../components/Dashboard/loading";
import { Theme, ThemeContext } from "../utils/colors/colors";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonText, Button } from "@/src/components/button";
import { DashboardData, getDashboardData } from "../actions/entryActions";
import { SummaryGrid } from "../components/Dashboard/Summary";
import { getCarID } from "../actions/carActions";
import RecentRefules from "../components/Dashboard/recentRefuels";

export default function Page() {
  const colors = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(true);
  const [latestPedo, setLatestPedo] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);
  const [car_id, setCar_id] = useState<number | null>(null);

  const styles = styling(colors);

  useEffect(() => {
    handleGettingData();
    getLatestPedo();
    setCarID();
  }, []);

  const setCarID = async () => {
    const carID = await getCarID();
    setCar_id(carID ?? null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const getLatestPedo = async () => {
    const { data } = await supabase
      .from("entries")
      .select("pedometer")
      .order("created_at")
      .limit(1);

    if (data && data.length > 0) {
      setLatestPedo(data[0].pedometer);
    } else {
      setLatestPedo(0);
    }
  };

  const handleGettingData = async () => {
    const data = await getDashboardData();
    console.log(data);

    if (!data) {
      setData({
        totalCost: 0,
        averagePricePerLitre: 0,
        totalFuel: 0,
        totalKm: 0,
        pricePer1: 0,
        pricePer100: 0,
        count: 0,
      });
    } else {
      setData(data);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons
            name="logout"
            size={24}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loading /> : data && <SummaryGrid data={data} />}
      <RecentRefules />
      <Button
        variant="solid"
        size="xl"
        action="primary"
        className="absolute bottom-24 right-4"
        onPress={() =>
          router.push({
            pathname: "/newEntry",
            params: { pedo: latestPedo, carID: car_id },
          })
        }
      >
        <ButtonText>New entry</ButtonText>
      </Button>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    btn: {
      position: "absolute",
      bottom: 48,
      right: 16,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 12,
      backgroundColor: theme.bg.accent,
    },
    btnDefault: {
      opacity: 1,
    },
    btnPressed: {
      opacity: 0.5,
    },
    container: {
      flexDirection: "column",
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      backgroundColor: theme.bg.default,
      position: "relative",
    },
    bar: {
      paddingBottom: 24,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });
