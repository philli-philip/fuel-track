import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabase";
import { Loading } from "../components/Dashboard/loading";
import { Theme, ThemeContext } from "../utils/colors/colors";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const colors = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(true);
  const [totalFueled, setTotalFueled] = useState(0);
  const [totalKM, setTotalDistance] = useState(0);
  const [pricePer100, setPricePer100] = useState(0);
  const [pricePer1, setPricePer1] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [latestPedo, setLatestPedo] = useState(0);

  const styles = styling(colors);

  useEffect(() => {
    getData();
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const getData = async () => {
    const { data, error } = await supabase.from("entries").select();

    if (data) {
      setTotalFueled(data.reduce((x, item) => x + (item.fuel_litre ?? 0), 0));
      setTotalCost(
        data.reduce(
          (x, item) => x + (item.fuel_litre ?? 0) * item.fuel_price,
          0
        )
      );
      const baseKM = data[0].pedometer;
      const lastKM = data[data.length - 1].pedometer;
      const trackedDistance = lastKM - baseKM;

      setTotalDistance(trackedDistance);
      setAveragePrice(totalCost / totalFueled);
      setPricePer1(totalCost / trackedDistance);
      setPricePer100((totalCost / trackedDistance) * 100);
      setLatestPedo(lastKM);
    }

    setLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.group}>
            <Text style={styles.label}>Price per 100km</Text>
            <Text style={styles.value}>{pricePer100.toFixed(2)} €</Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Price per 1km</Text>
            <Text style={styles.value}>{pricePer1.toFixed(2)} €</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.group}>
            <Text style={styles.label}>km tracked</Text>
            <Text style={styles.value}>{totalKM} km</Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Fuel used</Text>
            <Text style={styles.value}>{totalFueled.toFixed(2)} litre</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.group}>
            <Text style={styles.label}>Total spent</Text>
            <Text style={styles.value}>{totalCost.toFixed(2)} €</Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Average price</Text>
            <Text style={styles.value}>{averagePrice.toFixed(2)} €/litre</Text>
          </View>
        </View>
        <Link
          href={{ pathname: "/newEntry", params: { pedo: latestPedo } }}
          asChild
        >
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: colors.text.inverted }}>New entry</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    );
  }
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
    label: {
      fontSize: 14,
      color: theme.text.secondary,
    },
    group: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      width: "50%",
    },
    value: {
      fontWeight: 700,
      fontSize: 32,
      color: theme.text.primary,
    },
    row: {
      flexDirection: "row",
      display: "flex",
      paddingBottom: 72,
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
