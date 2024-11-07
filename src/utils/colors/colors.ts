import { createContext } from "react";
import { ColorValue } from "react-native";

export interface Theme {
  text: {
    primary: ColorValue;
    secondary: ColorValue;
    light: ColorValue;
    inverted: ColorValue;
  };
  bg: {
    default: ColorValue;
    input: ColorValue;
    accent: ColorValue;
  };
}

export const lightColors: Theme = {
  text: {
    primary: "#000",
    secondary: "#666",
    light: "#999",
    inverted: "#FFF",
  },
  bg: {
    default: "#EEE",
    input: "#DDD",
    accent: "#0E6EFE",
  },
};

export const darkColors: Theme = {
  text: {
    primary: "#fff",
    secondary: "#999",
    light: "#888",
    inverted: "#EEE",
  },
  bg: {
    default: "#111",
    input: "#222",
    accent: "#0E6EFE",
  },
};

export const ThemeContext = createContext(lightColors);
