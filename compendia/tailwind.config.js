module.exports = {
    purge: [],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        fontFamily: {
            base: [
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Oxygen",
                "Ubuntu",
                "Cantarell",
                "Fira Sans",
                "Droid Sans",
                "Helvetica Neue",
            ],
        },
        extend: {
            colors: {
                blue: {
                    "primary-50": "#78C1D7",
                    "primary-100": "#1f8ec1",
                    "primary-200": "#1b7fad",
                    "primary-300": "#026694",
                    "primary-400": "#094166",
                },
            },
            borderRadius: {
                "4xl": "7rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
}
