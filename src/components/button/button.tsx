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
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
}) => {
  const colors = useContext(ThemeContext);
  const styles = styling(colors);

  return (
    <TouchableOpacity style={[styles.button, containerStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: "center",
      backgroundColor: theme.bg.accent,
    },
    text: {
      fontSize: 16,
      color: theme.text.inverted,
    },
  });

export default Button;
