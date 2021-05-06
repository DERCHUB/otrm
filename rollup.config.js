import pkg from './package.json';
import { babel } from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';


export default [
    {
        input: 'src/bundle.js',
        output: [
            {
                file: pkg.umd,
                format: 'umd',
                name: 'OTRM',
                sourcemap: true,
                exports: "named",
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'prop-types': 'PropTypes'
                },
            },
        ],
        plugins: [
            postcss(),
            json(),
            image(),
            babel({
                exclude: /node_modules/,
                babelHelpers: "runtime",
            }),
            commonjs(),
            nodePolyfills(),
            nodeResolve(),
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': JSON.stringify('production'),
                'process.env.PUBLIC_URL': JSON.stringify('.'),
            }),
            terser()
        ],
    },
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
        ],
        external: [
            "@material-ui/core",
            "date-fns",
            "handlebars",
            "react",
            "react-router-dom",
            "react-dom/server",
            "react-youtube",
            "react-markdown",
            "remark-highlight.js",
            "remark-gfm",
            "rehype-raw"
        ],
        plugins: [
            postcss(),
            json(),
            image(),
            babel({
                exclude: /node_modules/,
                babelHelpers: "runtime",
            }),
            nodeResolve(),
            commonjs(),
        ],
    }
];