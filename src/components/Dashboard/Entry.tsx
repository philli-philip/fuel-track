import { Link } from "expo-router";
import { Refule } from "./recentRefuels";
import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";

export const Item = ({ item, last }: { item: Refule; last?: boolean }) => {
  const colors = useContext(ThemeContext);
  const s = styling(colors);

  return (
    <View style={s.container}>
      <Link
        href={{
          pathname: "/refuel/[id]",
          params: { id: item.id },
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{ flexDirection: "column", gap: 4, flex: 1, flexGrow: 1 }}
          >
            <Text style={s.title}>
              {new Intl.DateTimeFormat("de-DE", {
                day: "numeric",
                month: "short",
              }).format(new Date(item.date))}
            </Text>
            <Text style={s.amount}>
              {new Intl.NumberFormat("de-DE", {
                style: "unit",
                unitDisplay: "long",
                unit: "liter",
              }).format(item.fuel_litre)}
            </Text>
          </View>
          <Text style={s.price}>
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              minimumSignificantDigits: 2,
              maximumSignificantDigits: 3,
              minimumFractionDigits: 2,
              currency: "EUR",
            }).format(item.total_cost)}
          </Text>
        </View>
      </Link>
      {!last && (
        <View
          style={{
            backgroundColor: colors.border,
            height: 1,
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
          }}
          id="line"
        />
      )}
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
      position: "relative",
    },
    containerLast: {
      borderBottomColor: "transparent",
    },
    title: {
      color: theme.text.primary,
      fontWeight: 700,
      fontSize: 18,
    },
    amount: {
      color: theme.text.secondary,
      fontSize: 18,
    },
    price: {
      color: theme.text.secondary,
      fontSize: 18,
      display: "flex",
    },
  });
