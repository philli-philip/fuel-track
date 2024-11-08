import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, ButtonProps } from "react-native";

interface Button extends React.FC<ButtonProps> {
  label: string;
}

export const MyButton = ({ label, ...props }: Button) => {
  const colors = useContext(ThemeContext);
  const styles = styling(colors);

  return (
    <TouchableOpacity style={styles.btn} {...props}>
      <Text style={{ color: colors.text.inverted }}>{label}</Text>
    </TouchableOpacity>
  );
};

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
  });
