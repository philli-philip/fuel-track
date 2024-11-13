import { Keyboard, Platform, Pressable, View } from "react-native";

export const HideKeyboard = ({
  children,
  style,
  ...props
}: {
  children?: JSX.Element | JSX.Element[];
  style?: {};
}) => (
  <Pressable
    onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
    accessible={false}
    focusable={false}
    style={{ cursor: "auto", ...style }}
  >
    <View {...props}>{children}</View>
  </Pressable>
);
