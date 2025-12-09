import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

export default defineConfig([
  // Next.js recommended rules
  ...nextVitals,
  ...nextTs,

  // Add Prettier integration (MUST come after next config)
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // show prettier issues in ESLint
    },
  },

  // Disable any conflicting formatting rules
  prettier,

  // Override default Next.js ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])
