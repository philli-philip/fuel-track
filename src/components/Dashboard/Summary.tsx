import { DashboardData } from "@/src/actions/entryActions";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text } from "react-native";

export const SummaryGrid = ({ data }: { data: DashboardData }) => {
  const colors = useContext(ThemeContext);
  const styles = styling(colors);
  const { t } = useTranslation(undefined, { keyPrefix: "dashboard" });

  return (
    <>
      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>{t("pricePer100")}</Text>
          <Text style={styles.value}>{data.pricePer100?.toFixed(2)} €</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>{t("pricePer1")}</Text>
          <Text style={styles.value}>{data.pricePer1?.toFixed(2)} €</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>{t("totalKm")}</Text>
          <Text style={styles.value}>{data.totalKm} km</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>{t("totalFuel")}</Text>
          <Text style={styles.value}>{data.totalFuel?.toFixed(2)} litre</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>{t("totalCost")}</Text>
          <Text style={styles.value}>{data.totalCost?.toFixed(2)} €</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>{t("avgPrice")}</Text>
          <Text style={styles.value}>
            {data.averagePricePerLitre?.toFixed(2)} €/l
          </Text>
        </View>
      </View>
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
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
  });
