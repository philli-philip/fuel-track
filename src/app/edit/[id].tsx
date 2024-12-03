import Button from "@/src/components/button/button";
import { Skeleton } from "@/src/components/skeleton/skeleton";
import { ThemeContext } from "@/src/utils/colors/colors";
import { formatKM } from "@/src/utils/formatting/formatting";
import { supabase } from "@/src/utils/supabase/supabase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
const Page = () => {
  const { t } = useTranslation("translation", { keyPrefix: "editCar" });
  const { id } = useLocalSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [car, setCar] = useState<{
    name: string | null;
    starting_pedometer: number;
  } | null>(null);
  const color = useContext(ThemeContext);

  const getEntry = async () => {
    try {
      const { data, error, status } = await supabase
        .from("cars")
        .select("name, starting_pedometer")
        .eq("id", id)
        .limit(1)
        .single();
      if (data) {
        setLoading(false);
        setCar(data);
      } else if (status === 406) {
        setLoading(false);
        setCar(null);
      } else if (error) throw new Error("Error while loading the car");
    } catch (error) {
      throw new Error("Error while loading the car");
    }
  };

  const saveEntry = async () => {
    try {
      if (!car) {
        throw new Error("No car defined, so cannot save it.");
      }

      const { error, status } = await supabase
        .from("cars")
        .update({ name: car.name })
        .eq("id", id);

      if (error) throw new Error(error.message);

      if (status === 204) {
        router.replace({
          pathname: "../",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEntry();
  }, []);

  useEffect(() => {}, [id]);

  const style = StyleSheet.create({
    title: {
      color: color.text.primary,
      fontSize: 16,
      fontWeight: 400,
    },
    pedoLine: {
      flexDirection: "row",
      gap: 4,
    },
    group: {
      flexDirection: "column",
      gap: 8,
      flexShrink: 1,
    },
    value: {
      fontSize: 20,
      fontWeight: 600,
      color: color.text.primary,
    },
    label: {
      color: color.text.secondary,
    },
    content: {
      flex: 1,
      flexShrink: 1,
      flexDirection: "column",
      paddingHorizontal: 24,
      gap: 32,
      position: "relative",
      justifyContent: "flex-start",
    },
    input: {
      padding: 16,
      backgroundColor: color.bg.input,
      borderRadius: 8,
      fontSize: 18,
      fontWeight: 600,
      color: color.text.primary,
    },
    header: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
      paddingTop: 12,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    button: {
      position: "absolute",
      bottom: 24,
      right: 16,
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: color.bg.default }}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => router.navigate("../")}>
          <MaterialIcons
            name="chevron-left"
            size={24}
            style={{
              color: color.text.primary,
              padding: 12,
              borderRadius: 12,
              backgroundColor: color.bg.input,
            }}
          />
        </TouchableOpacity>
        <Text style={style.title}>{t("title")}</Text>
      </View>
      <View style={style.content}>
        {isLoading && <Loading />}
        {car && !isLoading && (
          <>
            <View style={style.group}>
              <Text style={style.label}>{t("name")}</Text>
              <TextInput
                style={style.input}
                placeholderTextColor={color.text.light}
                multiline={false}
                value={car?.name ?? ""}
                placeholder={t("namePlaceholder")}
                onChangeText={(text) => {
                  if (car) {
                    setCar({
                      name: text,
                      starting_pedometer: car.starting_pedometer,
                    });
                    setChanged(true);
                  }
                }}
              />
            </View>
            <View style={style.group}>
              <Text style={style.label}>{t("pedo")}</Text>
              <View style={style.pedoLine}>
                <Text style={style.value}>
                  {car &&
                    formatKM(car.starting_pedometer, { style: "decimal" })}
                </Text>
                <Text
                  style={[
                    style.value,
                    { color: color.text.secondary, fontWeight: 400 },
                  ]}
                >
                  km
                </Text>
              </View>
              <Text style={[style.label, { color: color.text.secondary }]}>
                {t("pedoHint")}
              </Text>
            </View>
          </>
        )}
        <Button
          title={t("save")}
          onPress={saveEntry}
          containerStyle={style.button}
        />
      </View>
    </View>
  );
};

const Loading = () => (
  <View>
    <Skeleton style={{ width: 120, height: 12, marginBottom: 8 }} />
    <Skeleton style={{ width: "100%", height: 24, marginBottom: 44 }} />
    <Skeleton style={{ width: 160, height: 12, marginBottom: 8 }} />
    <Skeleton style={{ width: "100%", height: 24, marginBottom: 44 }} />
  </View>
);

export default Page;
