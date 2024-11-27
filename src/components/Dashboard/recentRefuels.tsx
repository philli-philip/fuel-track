import { Link } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Skeleton } from "../skeleton/skeleton";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import { Item } from "./Entry";
import { useTranslation } from "react-i18next";
import { Message } from "../message/message";

export type Refule = {
  date: string;
  fuel_litre: number;
  total_cost: number;
  id: number;
};

export default function RecentRefules({
  isLoading,
  refules,
}: {
  isLoading: boolean;
  refules: Refule[] | null;
}) {
  const color = useContext(ThemeContext);
  const s = styling(color);
  const { t } = useTranslation(undefined, { keyPrefix: "refuelList" });

  if (isLoading)
    return (
      <View style={{ flex: 0, flexDirection: "column", gap: 32 }}>
        <Skeleton style={{ width: "20%", height: 12, paddingBottom: 16 }} />
        <Skeleton style={{ height: 40 }} />
        <Skeleton style={{ height: 40 }} />
        <Skeleton style={{ height: 40 }} />
      </View>
    );
  return (
    <View style={{ flexDirection: "column", gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <Text style={s.title}>{t("title")}</Text>
        <Link href="/refuel/all">
          <Text style={s.link}>{t("link")}</Text>
        </Link>
      </View>
      {refules?.length === 0 && <Message title={t("noEntries")} />}
      {refules && refules?.length > 0 && (
        <View style={s.list}>
          {refules.map((item, index) => (
            <Item
              item={item}
              key={item.id}
              last={index === refules.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.text.secondary,
    },
    link: {
      paddingVertical: 8,
      color: theme.text.accent,
    },
    list: {
      borderWidth: 1,
      overflow: "hidden",
      borderColor: theme.border,
      borderRadius: 16,
      flexDirection: "column",
      flex: 1,
    },
  });
