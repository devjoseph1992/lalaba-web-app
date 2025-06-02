// .eslintrc.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    // 1) Keep whatever Next/TypeScript/React presets you already had:
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // 2) THEN add a standalone object with "rules" to disable the ones you want:
    {
        rules: {
            // turn off "no-explicit-any" everywhere
            "@typescript-eslint/no-explicit-any": "off",

            // allow unescaped quotes/apostrophes in JSX
            "react/no-unescaped-entities": "off",

            // allow plain <img> instead of requiring next/image
            "@next/next/no-img-element": "off",

            // (you can add more rules here if needed)
        },
    },
];
