import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export default defineConfig([
  ...typescriptEslint.configs.recommended,
  globalIgnores([".next/**", "coverage/**", "next-env.d.ts", "node_modules/**"]),
]);
