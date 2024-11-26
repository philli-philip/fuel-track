import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  useColorScheme,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: "primary" | "error" | "neutral";
  variant?: "solid" | "soft";
};

/**
 *
 * @param color "primary", "error"
 * @param variant "solid", "soft"
 */
const Button: React.FC<ButtonProps & TouchableOpacityProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  color = "primary",
  variant = "solid",
  disabled,
  ...props
}) => {
  const theme = useColorScheme();
  const colors = useContext(ThemeContext);
  const styles = styling(colors);

  const btnContainer = {
    soft: {
      error: { backgroundColor: theme === "light" ? "#F6C3C3" : "#2E090A" },
      primary: { backgroundColor: colors.bg.accent },
      disabled: { backgroundColor: colors.bg.input },
      neutral: { backgroundColor: colors.bg.input },
    },
    solid: {
      error: { backgroundColor: colors.bg.error },
      primary: { backgroundColor: colors.bg.accent },
      disabled: { backgroundColor: colors.bg.input },
      neutral: { backgroundColor: colors.bg.input },
    },
  };

  const btnText = {
    soft: {
      error: { color: colors.text.error },
      primary: { color: colors.text.accent },
      disabled: { color: colors.text.light },
      neutral: { color: colors.text.primary },
    },
    solid: {
      error: { color: colors.text.inverted },
      primary: { color: colors.text.inverted },
      disabled: { color: colors.text.light },
      neutral: { color: colors.text.secondary },
    },
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        btnContainer[variant][color],
        disabled && btnContainer[variant]["disabled"],
        containerStyle,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.text,
          btnText[variant][color],
          disabled && btnText[variant]["disabled"],
          textStyle,
        ]}
      >
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
      borderRadius: 8,
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: 600,
    },
  });

export default Button;
