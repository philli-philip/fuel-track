import { createContext } from "react";
import { ColorValue } from "react-native";

export interface Theme {
  text: {
    primary: ColorValue;
    secondary: ColorValue;
    light: ColorValue;
    inverted: ColorValue;
    error: ColorValue;
    accent: ColorValue;
  };
  bg: {
    default: ColorValue;
    input: ColorValue;
    sheet: ColorValue;
    accent: ColorValue;
    error: ColorValue;
  };
  border: ColorValue;
}

export const lightColors: Theme = {
  text: {
    primary: "#000",
    secondary: "#666",
    light: "#999",
    inverted: "#FFF",
    error: "#F00",
    accent: "#007AFF",
  },
  bg: {
    default: "#EEE",
    input: "#DDD",
    sheet: "#EEE",
    accent: "#0E6EFE",
    error: "#E62E31",
  },
  border: "#E5E5E5",
};

export const darkColors: Theme = {
  text: {
    primary: "#fff",
    secondary: "#999",
    light: "#555",
    inverted: "#EEE",
    error: "#FD5356",
    accent: "#0E6EFE",
  },
  bg: {
    default: "#0a0a0a",
    sheet: "#121212",
    input: "#222",
    accent: "#0E6EFE",
    error: "#E62E31",
  },
  border: "#333",
};

export const ThemeContext = createContext(lightColors);
