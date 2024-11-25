import { ThemeContext } from "@/src/utils/colors/colors";
import React, { useContext } from "react";
import { Animated, StyleProp, View, ViewProps, ViewStyle } from "react-native";

type SkeletonType = ViewProps & {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = ({ style }: SkeletonType) => {
  const pulse = React.useRef(new Animated.Value(0)).current;
  const colors = useContext(ThemeContext);
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse]);
  const pulseAnimation = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0.4],
  });
  return (
    <Animated.View
      style={[
        {
          borderRadius: 8,
          backgroundColor: "#999",
          opacity: pulseAnimation,
        },
        style,
      ]}
    />
  );
};
