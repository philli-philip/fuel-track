import { createContext } from "react";
import { ColorValue } from "react-native";

export interface Theme {
  text: {
    primary: ColorValue;
    secondary: ColorValue;
    light: ColorValue;
  };
  bg: {
    default: ColorValue;
    input: ColorValue;
  };
}

export const lightColors: Theme = {
  text: {
    primary: "#000",
    secondary: "#666",
    light: "#999",
  },
  bg: {
    default: "#EEE",
    input: "#DDD",
  },
};

export const darkColors: Theme = {
  text: {
    primary: "#fff",
    secondary: "#999",
    light: "#888",
  },
  bg: {
    default: "#111",
    input: "#222",
  },
};

export const ThemeContext = createContext(lightColors);
