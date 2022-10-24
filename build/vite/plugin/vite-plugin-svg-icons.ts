/*
 * @Description:
 * @Autor: zwy
 * @Date: 2022-01-28 11:42:16
 * @LastEditors: zwy
 * @LastEditTime: 2022-02-11 16:25:31
 */
import viteSvgIcons from 'vite-plugin-svg-icons';
import { resolve } from 'path';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

export default function () {
  return viteSvgIcons({
    iconDirs: [pathResolve('src/assets/image/svgIcons')],
    symbolId: 'svgIcon-[dir]-[name]',
  });
}
