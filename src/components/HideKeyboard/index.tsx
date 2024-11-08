import { Keyboard, Platform, Pressable, View } from "react-native";

export const HideKeyboard = ({
  children,
  className,
  style,
  ...props
}: {
  children?: JSX.Element;
  className?: string;
  style?: {};
}) => (
  <Pressable
    onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
    accessible={false}
    focusable={false}
    style={{ cursor: "auto" }}
  >
    <View {...props}>{children}</View>
  </Pressable>
);
