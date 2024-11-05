import { Href, Link } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface LinkButton {
  href: Href<string | object>;
  children?: JSX.Element | string;
  className?: string;
  size?: "lg" | "md" | "sm";
}

export const LinkButton: React.FC<LinkButton> = ({
  href,
  children,
  className,
  size,
}) => {
  const sizes = {
    lg: "px-8 py-4",
    md: "px-6 py-3",
    sm: "px-4 py-2",
  };
  // bg-blue-600 active:bg-blue-700 rounded-xl px-6 py-3
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
          {children}
        </Text>
      </Pressable>
    </Link>
  );
};
