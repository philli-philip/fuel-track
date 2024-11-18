import React from "react";
import { Animated, StyleProp, View, ViewProps, ViewStyle } from "react-native";

type SkeletonType = ViewProps & {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = ({ style }: SkeletonType) => {
  const pulse = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse]);
  const pulseAnimation = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  return (
    <View
      style={[
        { borderRadius: 8, backgroundColor: "#eee", opacity: pulse },
        style,
      ]}
    />
  );
};
