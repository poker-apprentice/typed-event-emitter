const path = require('path');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');

const extensions = ['.js', '.ts'];

const env = process.env.NODE_ENV ?? 'development';

module.exports = {
  input: './src/index.ts',
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      exclude: /node_modules/,
      configFile: path.resolve(__dirname, 'babel.config.js'),
    }),
  ],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: env === 'production' ? true : 'inline',
      plugins: [terser({ compress: true, mangle: true, output: { comments: false } })],
    },
  ],
};
