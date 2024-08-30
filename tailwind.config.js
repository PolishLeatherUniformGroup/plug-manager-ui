import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    "themes": {
      "light": {
        "colors": {
          "default": {
            "50": "#fafafa",
            "100": "#f2f2f3",
            "200": "#ebebec",
            "300": "#e3e3e6",
            "400": "#dcdcdf",
            "500": "#d4d4d8",
            "600": "#afafb2",
            "700": "#8a8a8c",
            "800": "#656567",
            "900": "#404041",
            "foreground": "#000",
            "DEFAULT": "#d4d4d8"
          },
          "primary": {
            "50": "#dff1f9",
            "100": "#b3ddf0",
            "200": "#86c9e7",
            "300": "#59b5df",
            "400": "#2da1d6",
            "500": "#008dcd",
            "600": "#0074a9",
            "700": "#005c85",
            "800": "#004361",
            "900": "#002a3e",
            "foreground": "#000",
            "DEFAULT": "#008dcd"
          },
          "secondary": {
            "50": "#e4f5f8",
            "100": "#bfe7ee",
            "200": "#99d9e4",
            "300": "#73cadb",
            "400": "#4ebcd1",
            "500": "#28aec7",
            "600": "#2190a4",
            "700": "#1a7181",
            "800": "#13535f",
            "900": "#0c343c",
            "foreground": "#000",
            "DEFAULT": "#28aec7"
          },
          "success": {
            "50": "#e7ede9",
            "100": "#c5d3cb",
            "200": "#a3b9ac",
            "300": "#819f8e",
            "400": "#5f856f",
            "500": "#3d6b51",
            "600": "#325843",
            "700": "#284635",
            "800": "#1d3326",
            "900": "#122018",
            "foreground": "#fff",
            "DEFAULT": "#3d6b51"
          },
          "warning": {
            "50": "#fef4e4",
            "100": "#fce4be",
            "200": "#fad497",
            "300": "#f9c571",
            "400": "#f7b54b",
            "500": "#f5a525",
            "600": "#ca881f",
            "700": "#9f6b18",
            "800": "#744e12",
            "900": "#4a320b",
            "foreground": "#000",
            "DEFAULT": "#f5a525"
          },
          "danger": {
            "50": "#f7e5e5",
            "100": "#ebc0c0",
            "200": "#df9b9b",
            "300": "#d37676",
            "400": "#c75151",
            "500": "#bb2c2c",
            "600": "#9a2424",
            "700": "#7a1d1d",
            "800": "#591515",
            "900": "#380d0d",
            "foreground": "#fff",
            "DEFAULT": "#bb2c2c"
          },
          "background": "#ffffff",
          "foreground": {
            "50": "#dfdfdf",
            "100": "#b3b3b3",
            "200": "#868686",
            "300": "#595959",
            "400": "#2d2d2d",
            "500": "#000000",
            "600": "#000000",
            "700": "#000000",
            "800": "#000000",
            "900": "#000000",
            "foreground": "#fff",
            "DEFAULT": "#000000"
          },
          "content1": {
            "DEFAULT": "#ffffff",
            "foreground": "#000"
          },
          "content2": {
            "DEFAULT": "#f4f4f5",
            "foreground": "#000"
          },
          "content3": {
            "DEFAULT": "#e4e4e7",
            "foreground": "#000"
          },
          "content4": {
            "DEFAULT": "#d4d4d8",
            "foreground": "#000"
          },
          "focus": "#4d85c5",
          "overlay": "#000000",
          "divider": "#111111"
        }
      },
      "dark": {
        "colors": {
          "default": {
            "50": "#0a0b19",
            "100": "#11132a",
            "200": "#171b3b",
            "300": "#1e234c",
            "400": "#515574",
            "500": "#83869d",
            "600": "#b6b8c5",
            "700": "#e9e9ed",
            "foreground": "#fff",
            "DEFAULT": "#171b3b"
          },
          "primary": {
            "50": "#002e43",
            "100": "#004e71",
            "200": "#006d9f",
            "300": "#008dcd",
            "400": "#39a7d8",
            "500": "#73c0e4",
            "600": "#acdaef",
            "700": "#e6f4fa",
            "foreground": "#fff",
            "DEFAULT": "#006d9f"
          },
          "secondary": {
            "50": "#0d3941",
            "100": "#16606d",
            "200": "#1f879a",
            "300": "#28aec7",
            "400": "#58c0d4",
            "500": "#89d2e0",
            "600": "#b9e5ed",
            "700": "#eaf7f9",
            "foreground": "#000",
            "DEFAULT": "#1f879a"
          },
          "success": {
            "50": "#14231a",
            "100": "#223b2d",
            "200": "#2f533f",
            "300": "#3d6b51",
            "400": "#698c78",
            "500": "#94ae9f",
            "600": "#c0cfc6",
            "700": "#ecf0ee",
            "foreground": "#fff",
            "DEFAULT": "#2f533f"
          },
          "warning": {
            "50": "#50360c",
            "100": "#875b14",
            "200": "#be801d",
            "300": "#f5a525",
            "400": "#f7b956",
            "500": "#face87",
            "600": "#fce2b8",
            "700": "#fef6e9",
            "foreground": "#000",
            "DEFAULT": "#be801d"
          },
          "danger": {
            "50": "#3d0e0e",
            "100": "#671818",
            "200": "#912222",
            "300": "#bb2c2c",
            "400": "#ca5b5b",
            "500": "#da8b8b",
            "600": "#e9baba",
            "700": "#f8eaea",
            "foreground": "#fff",
            "DEFAULT": "#912222"
          },
          "background": "#1a1c2f",
          "foreground": {
            "50": "#535353",
            "100": "#8c8c8c",
            "200": "#c6c6c6",
            "300": "#ffffff",
            "400": "#ffffff",
            "500": "#ffffff",
            "600": "#ffffff",
            "700": "#ffffff",
            "foreground": "#000",
            "DEFAULT": "#c6c6c6"
          },
          "content1": {
            "DEFAULT": "#18181b",
            "foreground": "#fff"
          },
          "content2": {
            "DEFAULT": "#27272a",
            "foreground": "#fff"
          },
          "content3": {
            "DEFAULT": "#3f3f46",
            "foreground": "#fff"
          },
          "content4": {
            "DEFAULT": "#52525b",
            "foreground": "#fff"
          },
          "focus": "#4d85c5",
          "overlay": "#ffffff",
          "divider": "#ffffff"
        }
      }
    },
    "layout": {
      "fontSize": {
        "tiny": "0.75rem",
        "small": "0.875rem",
        "medium": "1rem",
        "large": "1.125rem"
      },
      "lineHeight": {
        "tiny": "1rem",
        "small": "1.25rem",
        "medium": "1.5rem",
        "large": "1.75rem"
      },
      "radius": {
        "small": "0.5rem",
        "medium": "0.75rem",
        "large": "0.875rem"
      },
      "borderWidth": {
        "small": "1px",
        "medium": "2px",
        "large": "3px"
      },
      "disabledOpacity": "0.5",
      "dividerWeight": "1",
      "hoverOpacity": "0.9"
    }
  })],
  
}
