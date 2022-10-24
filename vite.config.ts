/*
 * @Description:
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-11 17:56:04
 */
import { ConfigEnv, defineConfig, loadEnv } from 'vite'; // defineConfig:帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import { resolve } from 'path';
import { primaryColor, primaryColorHover, primaryColorActive } from './build/config/themeConfig';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import createVitePlugins from './build/vite/plugin/index';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/', // 这里是将src目录配置别名为 /@/ 方便在项目中导入src目录下的文件
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': primaryColor, //antd主题色
            'link-color': primaryColor,
            'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
        scss: {
          additionalData: `$primaryColor: ${primaryColor};
                  $primaryColorHover: ${primaryColorHover};
                  $primaryColorActive: ${primaryColorActive};`,
          charset: false,
        },
      },
    },
    server: {
      host: true, //指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT, //启动端口
      proxy: createProxy(VITE_PROXY), //代理接口
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: VITE_DROP_CONSOLE, //控制不同环境下的console
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  };
});
