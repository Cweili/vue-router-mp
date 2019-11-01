import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/*!
 * vue-router-mp by @Cweili - https://github.com/Cweili/vue-router-mp
 */`;

const plugins = [
  resolve(),
  commonjs(),
  babel(),
];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner,
      },
      {
        file: pkg.module,
        format: 'es',
        banner,
      },
    ],
    external: [
      'async-throttle-cache',
      'object-equal',
      'querystringify',
    ],
    plugins,
  },
  {
    input: 'src/index.js',
    output: [
      {
        name: 'VueRouter',
        file: pkg.unpkg,
        format: 'umd',
        banner,
      },
    ],
    plugins,
  },
];
