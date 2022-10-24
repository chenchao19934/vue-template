import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function () {
  return Components({
    resolvers: [AntDesignVueResolver({ importStyle: 'less', resolveIcons: true })],
    dirs: ['src/components'],
    dts: false,
  });
}
