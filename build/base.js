/*
 * @Author: Howie 
 * @Date: 2019-07-17 09:36:40 
 * @Last Modified by: Bryan
 * @Last Modified time: 2020-05-28 15:01:08
 */

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

let resCof = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    name: 'named'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        ["@babel/preset-env"]
      ],
      plugins: [
      ],
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
};

export default resCof
