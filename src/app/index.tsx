import { StyleSheet, TouchableOpacity, View } from "react-native";
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

export default function Page() {
  const colors = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(true);
  const [latestPedo, setLatestPedo] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);

  const styles = styling(colors);

  useEffect(() => {
    handleGettingData();
    getLatestPedo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const getLatestPedo = async () => {
    const { data } = await supabase
      .from("entries")
      .select("pedometer")
      .order("created_at")
      .single();

    if (data) {
      setLatestPedo(data.pedometer);
    }
  };

  const handleGettingData = async () => {
    const data = await getDashboardData(1);

    if (data) {
      try {
        setData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
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
      <Button
        variant="solid"
        size="xl"
        action="primary"
        className="absolute bottom-24 right-4"
        onPress={() =>
          router.push({ pathname: "/newEntry", params: { pedo: latestPedo } })
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
