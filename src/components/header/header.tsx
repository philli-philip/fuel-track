import { ThemeContext } from "@/src/utils/colors/colors";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

const Header = ({
  leftAction,
  centerContent,
  rightAction,
}: {
  leftAction?: JSX.Element;
  centerContent?: JSX.Element | string;
  rightAction?: JSX.Element;
}) => {
  const color = useContext(ThemeContext);

  const styles = StyleSheet.create({
    bar: {
      paddingTop: 24,
      paddingBottom: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      backgroundColor: color.bg.default,
      alignItems: "center",
      gap: 16,
    },
  });

  return (
    <View style={styles.bar}>
      {leftAction && (
        <Pressable
          style={(pressed) => ({
            backgroundColor: pressed ? color.bg.sheet : color.bg.input,
            borderRadius: 12,
          })}
        >
          {leftAction}
        </Pressable>
      )}
      <Text
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          color: color.text.primary,
        }}
      >
        {centerContent}
      </Text>
      <Pressable
        style={(pressed) => ({
          backgroundColor: pressed ? color.bg.sheet : color.bg.input,
          borderRadius: 12,
        })}
      >
        {rightAction}
      </Pressable>
    </View>
  );
};

export default Header;
