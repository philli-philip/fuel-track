import { StyleSheet, Text, View } from "react-native";
import { LinkButton } from "../components/button/button";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabase";
import { Loading } from "../components/Dashboard/loading";
import { ThemeContext } from "../utils/colors/colors";

export default function Page() {
  const colors = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(true);
  const [totalFueled, setTotalFueled] = useState(0);
  const [totalKM, setTotalDistance] = useState(0);
  const [pricePer100, setPricePer100] = useState(0);
  const [pricePer1, setPricePer1] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  const styles = StyleSheet.create({
    label: {
      fontSize: 14,
      color: colors.text.secondary,
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
      color: colors.text.primary,
    },
    row: {
      flexDirection: "row",
      display: "flex",
      paddingBottom: 48,
    },
  });

  useEffect(() => {
    getData();
  });

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

      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
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
        <LinkButton
          href="/newEntry"
          className="absolute right-8 bottom-32"
          size="md"
        >
          <Text>New entry</Text>
        </LinkButton>
      </View>
    );
  }
}
