import { ThemeContext } from "@/src/utils/colors/colors";
import { useContext } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

export const Message = ({
  title,
  description,
}: {
  title: string;
  description?: string;
} & ViewProps) => {
  const colors = useContext(ThemeContext);

  const style = StyleSheet.create({
    title: {
      color: colors.text.primary,
      fontWeight: 600,
      fontSize: 16,
    },
    description: {
      color: colors.text.secondary,
      fontSize: 14,
      maxWidth: 240,
      textAlign: "center",
      lineHeight: 20,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 48,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      {description && <Text style={style.description}>{description}</Text>}
    </View>
  );
};
