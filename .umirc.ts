/*
 * @Author: Vane
 * @Date: 2021-07-01 11:36:59
 * @LastEditTime: 2021-07-02 16:01:03
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vcomps\.umirc.ts
 */
import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  title: 'vcomps',
  favicon:
    'https://gitee.com/vaned/admin-cdn/raw/master/v3/favicon/favicon.ico',
  logo: 'https://gitee.com/vaned/admin-cdn/raw/master/v3/favicon/favicon.ico',
  theme: {
    '@primary-color': '#1890ff',
  },
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
  ],
  alias: {
    'vcomps/lib': join(__dirname, 'src'), // 用来按需加载css文件，demo中不写样式，就是使用了这个别名 babel-plugin-import
    vcomps: join(__dirname, 'src'), // import { Transition } from 'vcomps'
  },
  extraBabelPlugins: [
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'lib', style: true },
      'antd',
    ],
    [
      'import',
      { libraryName: 'vcomps', libraryDirectory: 'lib', style: true },
      'vcomps',
    ],
  ],
  devServer: {
    port: 9000,
  },
  // more config: https://d.umijs.org/config
});
