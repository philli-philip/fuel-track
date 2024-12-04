import { Refule } from "@/src/components/Dashboard/recentRefuels";
import { Skeleton } from "@/src/components/skeleton/skeleton";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import { supabase } from "@/src/utils/supabase/supabase";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Item } from "@/src/components/Dashboard/Entry";
import { useTranslation } from "react-i18next";
import { Message } from "@/src/components/message/message";
import Header from "@/src/components/header/header";

export default function All() {
  const [data, setData] = useState<Refule[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation(undefined, { keyPrefix: "refuelList" });

  const color = useContext(ThemeContext);
  const style = styling(color);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      getRefuels();
    }, [])
  );

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

  const leftAction = (
    <Link asChild href="../">
      <Feather
        name="chevron-left"
        size={24}
        style={{
          color: color.text.primary,
          padding: 12,
          paddingLeft: 4,
        }}
      />
    </Link>
  );

  const Loading = () => (
    <View style={{ flex: 1, flexDirection: "column", gap: 32, paddingTop: 32 }}>
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
    <>
      <Header leftAction={leftAction} centerContent={t("title")} />
      <ScrollView
        style={[style.container, { paddingTop: insets.top }]}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getRefuels} />
        }
      >
        {isLoading && <Loading />}
        {!isLoading && data?.length === 0 && (
          <Message title={t("noEntries")} description={t("noEntriesHint")} />
        )}
        {!isLoading && data && data.length > 0 && (
          <View
            style={{ flex: 1, flexDirection: "column", paddingBottom: 144 }}
          >
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
    </>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.bg.default,
      flex: 1,
      paddingHorizontal: 16,
      gap: 16,
      flexDirection: "column",
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
