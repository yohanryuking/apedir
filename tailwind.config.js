// tailwind.config.js
import { nextui } from "@nextui-org/react";

export const content = [
  // ...
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [nextui({
  themes: {
    light: {
      colors: {
        primary: "#5E17EB",
        secondary: "#5E17EB",
        //default: "#000000",
      }
    },
    dark: {
      colors: {
        primary: "#5E17EB",
        secondary: "#FFD600",
        //default: "#5E17EB",
      }
    },
  },
}),
];