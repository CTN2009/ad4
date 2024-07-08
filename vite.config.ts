import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

const entryPoints = {
  main: resolve(__dirname, "./src/main.ts"),
};

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    root: "src/",
    publicDir: "./src/public",
    build: {
      outDir: "../dist",
      lib: {
        entry: entryPoints,
        name: "Components",
      },
    },
    plugins: [svelte({ configFile: "../svelte.config.js" }), tsconfigPaths()],
    // 開発モードの場合のみ server の設定を追加
    server: isDevelopment ? { host: true } : {},
  };
});
