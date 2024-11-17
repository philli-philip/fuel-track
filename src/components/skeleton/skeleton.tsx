import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

type SkeletonType = ViewProps & {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = ({ style }: SkeletonType) => {
  return <View style={[{ borderRadius: 8, backgroundColor: "#eee" }, style]} />;
};
