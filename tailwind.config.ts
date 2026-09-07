import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        /* Brand */
        accent:  { DEFAULT: "#00b8db", dark: "#006a7e", light: "#33cceb" },
        /* Surfaces */
        surface: { DEFAULT: "#0c1322", card: "#121a2d", elevated: "#1a2340" },
        /* Text */
        text:    { DEFAULT: "#e2e8f0", muted: "#94a3b8", faint: "#4a5a7a" },
        /* Semantic */
        green:   "#22d3a4",
        amber:   "#fbbf24",
        violet:  "#818cf8",

        /* shadcn compat */
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
