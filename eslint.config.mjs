import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Node build scripts (CommonJS) — `require` is correct here.
    "scripts/**",
    // Drizzle-generated migration metadata.
    "drizzle/**",
  ]),
  {
    rules: {
      // Effects here synchronize with external systems (auth status, fetched
      // progress, DOM theme class). This is a perf-oriented rule, not a
      // correctness one — keep it visible as a warning instead of failing CI.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
