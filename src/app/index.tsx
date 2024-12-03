import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Text,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabase";
import { Loading } from "../components/Dashboard/loading";
import { Theme, ThemeContext } from "../utils/colors/colors";
import { Link, router, useFocusEffect } from "expo-router";
import { DashboardData, getDashboardData } from "../actions/entryActions";
import { SummaryGrid } from "../components/Dashboard/Summary";
import { getCarID } from "../actions/carActions";
import RecentRefules, { Refule } from "../components/Dashboard/recentRefuels";
import Button from "../components/button/button";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../components/skeleton/skeleton";

export default function Page() {
  const colors = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [latestPedo, setLatestPedo] = useState(0);
  const [carName, setCarName] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [refuelData, setRefuelData] = useState<Refule[] | null>(null);
  const [car_id, setCar_id] = useState<number | null>(null);
  const [refuelsLoading, setRefuelsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const styles = styling(colors);

  useEffect(() => {
    handleGettingData();
    getRefuels();
    getLatestPedo();
    setCarID();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRefuels();
      handleGettingData();
    }, [])
  );

  const setCarID = async () => {
    const carID = await getCarID();
    const { data, error } = await supabase
      .from("cars")
      .select("id, name")
      .limit(1)
      .single();

    if (data) {
      setCar_id(data.id);
      setCarName(data.name ?? "Unknown");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const getRefuels = async () => {
    setRefuelsLoading(true);
    const { data, error } = await supabase
      .from("entries")
      .select("date, fuel_litre, total_cost, id")
      .order("date", { ascending: false })
      .limit(3);

    if (error) throw new Error("failed at loading entries refuels");
    setRefuelData(data);
    setRefuelsLoading(false);
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
    setLoading(true);
    const data = await getDashboardData();

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
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              handleGettingData(), getLatestPedo();
              getRefuels();
            }}
          />
        }
      >
        <View style={styles.bar}>
          <Link
            asChild
            href={{
              pathname: "/edit/[id]",
              params: { id: car_id?.toString() ?? "-1" },
            }}
          >
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>
                {isLoading ? (
                  <Skeleton style={{ width: 40, height: 8 }} />
                ) : (
                  carName
                )}
              </Text>
              <MaterialIcons
                name="settings"
                size={20}
                color={colors.text.secondary}
              />
            </Pressable>
          </Link>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons
              name="logout"
              size={24}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        </View>
        {isLoading && <Loading />}

        {!isLoading && data && <SummaryGrid data={data} />}
        <RecentRefules refules={refuelData} isLoading={refuelsLoading} />
      </ScrollView>
      <Button
        title={t("dashboard.create")}
        containerStyle={{
          position: "absolute",
          bottom: 72,
          right: 16,
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
        textStyle={{ fontSize: 18, fontWeight: 700 }}
        onPress={() =>
          router.push({
            pathname: "/newEntry",
            params: { pedo: latestPedo, carID: car_id },
          })
        }
      />
    </View>
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
    btnText: {
      color: theme.text.inverted,
    },
    container: {
      flexDirection: "column",
      flex: 1,
      backgroundColor: theme.bg.default,
      position: "relative",
      paddingLeft: 24,
      paddingRight: 24,
    },
    bar: {
      paddingTop: 24,
      paddingBottom: 24,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    link: {
      borderRadius: 8,
      paddingVertical: 4,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      flex: undefined,
      gap: 8,
      flexShrink: 1,
      flexGrow: undefined,
      wordWrap: "no",
      display: "flex",
    },
    linkText: {
      color: theme.text.primary,
    },
  });
