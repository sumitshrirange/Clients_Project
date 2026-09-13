/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAFA",
        "canvas-tint": "#F2EEFC",
        ink: "#1A1A2E",
        "ink-soft": "#4B4B6B",
        "ink-faint": "#8888A6",
        primary: {
          DEFAULT: "#6C4CF1",
          dark: "#4B2FC4",
          light: "#8B70F7",
        },
        blue: {
          DEFAULT: "#3E63F5",
        },
        lavender: "#E7E1FB",
        mint: "#9FF0C9",
        cream: "#FBF0E1",
        line: "#E3DEF3",
        // Dark-mode surface palette — deep indigo-black rather than pure
        // black, so the purple brand color still reads as the same family.
        "surface-dark": "#181732",
        "surface-dark-alt": "#211F42",
        "line-dark": "#34335C",
        "canvas-dark": "#100F22",
      },
      fontFamily: {
        // Expressive, slightly quirky geometric grotesk for headings — reads
        // as a designer's typeface choice, not a default template font.
        display: ["'Bricolage Grotesque'", "sans-serif"],
        // Clean, highly legible workhorse for body copy.
        body: ["Inter", "sans-serif"],
        // Editorial serif used sparingly for pull-quote style accents
        // (taglines, statement lines) — the "creative portfolio" flourish.
        accent: ["'Fraunces'", "serif"],
        // Monospace used for kickers, numbers, tags, and dates — gives the
        // UI a "design-system" / technical polish similar to Figma/Linear.
        mono: ["'Space Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, #ECE7F9 1px, transparent 1px), linear-gradient(to bottom, #ECE7F9 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        floaty: "0 20px 60px -20px rgba(76, 47, 196, 0.25)",
        card: "0 10px 40px -12px rgba(26, 26, 46, 0.12)",
        "card-hover": "0 16px 48px -14px rgba(76, 47, 196, 0.28)",
        glow: "0 0 0 1px rgba(108,76,241,0.15), 0 8px 30px -8px rgba(108,76,241,0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
