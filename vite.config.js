import mpa from "vite-plugin-mpa";
import vue from "@vitejs/plugin-vue";
import vitePluginImp from "vite-plugin-imp";
import { viteVConsole } from "vite-plugin-vconsole";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  let plugins = [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: "vant",
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file
              return false;
            }
            return `vant/es/${name}/style/index.js`;
          },
        },
      ],
    }),
    mpa({
      open: "",
      scanDir: "src/pages",
      scanFile: "main.js",
      filename: "index.html",
    }),
    viteVConsole({
      entry: resolve("src/app.js"),
      localEnabled: true,
      enabled: true,
    }),
  ];

  if (mode === "release") {
    plugins.pop();
  }

  return {
    server: {
      port: 8888,
      proxy: {
        "/api": {
          // 免费的在线REST API
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      entries: "vant/es/**/*.js",
    },
    plugins,
  };
};
