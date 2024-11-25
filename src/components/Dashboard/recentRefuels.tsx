import { supabase } from "@/src/utils/supabase/supabase";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Skeleton } from "../skeleton/skeleton";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import { Item } from "./Entry";

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

  if (isLoading)
    return (
      // TODO Fix Skeleton
      <View>
        <Skeleton className="w-1/5 h-4 pb-4" />
        <Skeleton className="w-full h-10 pb-2" />
        <Skeleton className="w-full h-10 pb-2" />
        <Skeleton className="w-full h-10" />
      </View>
    );
  else if (refules && refules?.length > 0)
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
          <Text style={s.title}>Recent refules</Text>
          <Link href="/refuel/all">
            <Text style={s.link}>All entries</Text>
          </Link>
        </View>
        <View style={s.list}>
          {refules.map((item, index) => (
            <Item
              item={item}
              key={item.id}
              last={index === refules.length - 1}
            />
          ))}
        </View>
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
