import babel from 'rollup-plugin-babel';

const config = {
    input: 'src/index.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ],
    output: {
        format: 'umd',
        name: 'index',
    },
};
export default config;