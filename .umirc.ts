/*
 * @Author: Vane
 * @Date: 2021-07-01 11:36:59
 * @LastEditTime: 2021-07-01 15:07:33
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vcomps\.umirc.ts
 */
import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  title: 'vcomps',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    null,
    {
      title: 'google',
      path: 'https://www.google.com',
    },
  ],
  alias: {
    'vcomps/lib': join(__dirname, 'src'), // 用来按需加载css文件，demo中不写样式，就是使用了这个别名 babel-plugin-import
    // vcomps: join(__dirname, 'src'), // import { Transition } from 'vcomps'
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
