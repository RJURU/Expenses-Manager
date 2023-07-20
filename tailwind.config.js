/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
    theme: {
        extend: {
            height: {
                "screen-s": "100svh",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            fontSize: {
                tiny: ["0.6rem", { lineHeight: "1.2" }],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
