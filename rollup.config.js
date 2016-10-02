import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/typifyData.js',

	format: 'cjs',
	moduleName: 'typifyData',

	dest: 'dist/typifyData.js',

	plugins: [
		babel()
	]
};
