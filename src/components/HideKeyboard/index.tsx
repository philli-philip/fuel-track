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
    className={className}
    style={{ cursor: "auto", ...style }}
  >
    <View {...props}>{children}</View>
  </Pressable>
);
