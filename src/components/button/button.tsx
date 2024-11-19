import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  useColorScheme,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: "primary" | "error";
  variant?: "solid" | "soft";
};

const Button: React.FC<ButtonProps & TouchableOpacityProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  color = "primary",
  variant = "solid",
  ...props
}) => {
  const theme = useColorScheme();
  const colors = useContext(ThemeContext);
  const styles = styling(colors);

  const solidPrimary = StyleSheet.create({
    button: {
      backgroundColor: colors.bg.accent,
    },
    text: {
      color: colors.text.inverted,
    },
  });

  const solidError = StyleSheet.create({
    button: {
      backgroundColor: colors.bg.error,
    },
    text: {
      color: colors.text.inverted,
    },
  });

  const softError = StyleSheet.create({
    button: {
      backgroundColor: theme === "light" ? "#F6C3C3" : "#2E090A",
    },
    text: {
      color: colors.text.error,
    },
  });

  const softPrimary = StyleSheet.create({
    button: {
      backgroundColor: colors.bg.accent,
      opacity: 0.4,
    },
    text: {
      color: colors.text.accent,
    },
  });

  const stl = {
    solid: { primary: solidPrimary, error: solidError },
    soft: { primary: softPrimary, error: softError },
  };

  return (
    <TouchableOpacity
      style={[styles.button, stl[variant][color].button, containerStyle]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.text, stl[variant][color].text, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: theme.bg.accent,
    },
    text: {
      fontSize: 16,
      color: theme.text.inverted,
    },
  });

export default Button;
