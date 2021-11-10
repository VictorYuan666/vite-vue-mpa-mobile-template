import { loadEnv } from 'vite';
import mpa from 'vite-plugin-mpa';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// import { viteVConsole } from 'vite-plugin-vconsole';
import compress from 'vite-plugin-compress';
import styleImport from 'vite-plugin-style-import';
import { resolve } from 'path';

const CWD = process.cwd();

export default ({ command, mode }) => {
  const isBuild = command === 'build';

  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD);

  let plugins = [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    mpa({
      open: '',
      scanDir: 'src/pages',
      scanFile: 'index.js',
      filename: 'index.html',
    }),
    // viteVConsole({
    //   entry: resolve('src/app.js'),
    //   localEnabled: true,
    //   enabled: true,
    // }),
  ];

  if (isBuild) {
    // plugins.pop();
    plugins.push(compress());
    plugins.push(
      legacy({
        targets: ['defaults', 'not IE 11'],
      })
    );
  }

  return {
    base: VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 8888,
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    plugins,
    optimizeDeps: {
      include: ['vant'],
      exclude: ['vue-demi'],
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },
  };
};
