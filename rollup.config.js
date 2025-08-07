import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser';
// import pkg from './package.json' with { type: 'json' };

export default [
	{
		input: './src/index.js',
		output: {
			// file: pkg['.']['exports'].['import'],
      file: './dist/utility.js',
			format: 'es',
			inlineDynamicImports: true
		},
		plugins: [
			json(),
			resolve(),
			// nodePolyfills(),
			commonjs(),/*,
      nodePolyfills()*/
			terser({
				compress: false,
				mangle: false
			})
		]
	}
];