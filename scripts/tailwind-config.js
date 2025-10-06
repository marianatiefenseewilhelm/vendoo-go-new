tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-500)",
          ...Object.fromEntries(
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (v) => [v, `var(--primary-${v})`]
            )
          ),
        },
        secondary: {
          DEFAULT: "var(--secondary-500)",
          ...Object.fromEntries(
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (v) => [v, `var(--secondary-${v})`]
            )
          ),
        },
        tertiary: {
          DEFAULT: "var(--tertiary-500)",
          ...Object.fromEntries(
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (v) => [v, `var(--tertiary-${v})`]
            )
          ),
        },
        "background-light": "var(--background-light)",
        "background-dark": "var(--background-dark)",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "5px",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        "glow-primary": "0 0 20px 5px var(--primary-300)",
        "glow-secondary": "0 0 20px 5px var(--secondary-300)",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
    },
  },
};
