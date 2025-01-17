import { defineConfig } from "vite";
// import legacy from '@vitejs/plugin-legacy'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import { hotUpdatePlugin } from "./vitePlugins/hotUpdate";
import { VueHooksPlusResolver } from "@vue-hooks-plus/resolvers";
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      UnoCSS(),
      hotUpdatePlugin(),
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          VueHooksPlusResolver(),
        ],
        imports: [
          "vue",
          "vue-router",
          // 添加其他需要自动导入的模块
        ],
        dts: "./src/types/auto_gen_types/auto-imports.d.ts",
        dirs: [
          "./src/api/**",
          "./src/hooks/**",
          "./src/router/**",
          "./src/store/**",
          "./src/types/**",
          "./src/utils/**",
          "./src/*.ts",
          "./src/invokes/*.ts",
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(), // 自动注册图标组件
        ],
        dts: "./src/types/auto_gen_types/components.d.ts",
        dirs: ["./src/components/**", "./src/pages/**", "./src/views/**"],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // Tauri expects a fixed port, fail if that port is not available
    server: {
      strictPort: true,
      port: mode.includes("play") ? 5174 : 5173,
    },
    // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
    // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
    // env variables
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      target: mode.includes("play")
        ? "ESNext"
        : process.env.TAURI_PLATFORM == "windows"
        ? "chrome105"
        : "safari13",
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      // 为调试构建生成源代码映射 (sourcemap)
      sourcemap: !!process.env.TAURI_DEBUG,
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    // 强制预构建插件包
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`,
      ],
    },
  };
});
