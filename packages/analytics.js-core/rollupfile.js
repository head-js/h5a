import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';


export default {
  entry: 'lib/index.js',
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs({
      sourceMap: false,
    }),
  ],
  targets: [
    { dest: 'dist/analytics.core.js', format: 'iife', moduleName: 'analytics' },
  ],
};
