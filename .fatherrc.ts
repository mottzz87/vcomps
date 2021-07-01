/*
 * @Author: Vane
 * @Date: 2021-07-01 11:36:59
 * @LastEditTime: 2021-07-01 14:46:47
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vcomps\.fatherrc.ts
 */
export default {
  // esm: 'rollup',
  // cjs: 'rollup',

  // rollup 打包，css会与js分离，导致不会css不会被打包进去
  // 这里babel方式 进行打包，且搭配 babel-plugin-import 对 antd 样式进行按需加载
  esm: 'babel',
  cjs: { type: 'babel', lazy: true },
  runtimeHelpers: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
