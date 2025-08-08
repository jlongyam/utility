import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' }

const plugins = [
	json(),
	resolve(),
	commonjs(),
	terser({
		compress: false,
		mangle: false
	})
]
export default [
	{
		input: pkg.main,
		output: {
			file: pkg.exports['.']['import'],
			format: 'es',
			inlineDynamicImports: true
		},
		plugins: plugins
	},
	{
		input: pkg.main,
		output: {
			file: pkg.exports['.']['require'],
			format: 'cjs'
		},
		plugins: plugins
	}
];