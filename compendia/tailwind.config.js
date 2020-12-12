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
                    primary: "#1f8ec1",
                    primaryDark: "#1b7fad",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
}
