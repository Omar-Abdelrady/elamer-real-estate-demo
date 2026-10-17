import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  ...typescriptEslint.configs.recommended,
  globalIgnores([".next/**", "out/**", "coverage/**", "next-env.d.ts", "node_modules/**"]),
]);
