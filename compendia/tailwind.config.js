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
                    "primary-100": "#1f8ec1",
                    "primary-200": "#1b7fad",
                    "primary-300": "#094166",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
}
