import { terser } from "rollup-plugin-terser";
import pkg from './package.json';
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import RollupPluginPreprocess from "rollup-plugin-preprocess";
import replace from "@rollup/plugin-replace";
import { babel } from "@rollup/plugin-babel";

function replaceVersion() {
    return replace({
        delimiters: ["", ""],
        "0.0.0": pkg.version
    });
}

function matchSubmodules(externals) {
    return externals.map(e => new RegExp(`^${e}(?:[/\\\\]|$)`));
}

const umdExternals = matchSubmodules([
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {})
]);
const externals = matchSubmodules([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {})
]);

const umd = {
    input: "src/index.js",
    output: [
        {
            file: "dist/jspdf.umd.js",
            format: "umd",
            name: "jspdf",
            exports: "none",
            sourcemap: true
        },
        {
            file: "dist/jspdf.umd.min.js",
            format: "umd",
            name: "jspdf",
            plugins: [terser({})],
            exports: "none",
            sourcemap: true
        }
    ],
    external: umdExternals,
    plugins: [
        resolve(),
        commonjs(),
        RollupPluginPreprocess({ context: { MODULE_FORMAT: "umd" } }),
        replaceVersion(),
        babel({ babelHelpers: "bundled", configFile: "./.babelrc.json" })
    ]
};

const es = {
    input: "src/index.js",
    output: [
        {
            file: pkg.module.replace(".min", ""),
            format: "es",
            name: "jspdf",
            sourcemap: true,
            plugins: []
        },
        {
            file: pkg.module,
            format: "es",
            name: "jspdf",
            sourcemap: true,
            plugins: [terser({})]
        }
    ],
    external: externals,
    plugins: [
        resolve(),
        RollupPluginPreprocess({ context: { MODULE_FORMAT: "es" } }),
        replaceVersion(),
        babel({ babelHelpers: "runtime", configFile: "./.babelrc.esm.json" })
    ]
};
const node = {
    input: "src/index.js",
    output: [
        {
            file: pkg.main.replace(".min", ""),
            format: "cjs",
            name: "jspdf",
            exports: "none",
            sourcemap: true,
            plugins: []
        },
        {
            file: pkg.main,
            format: "cjs",
            name: "jspdf",
            exports: "none",
            sourcemap: true,
            plugins: [terser({})]
        }
    ],
    external: externals,
    plugins: [
        resolve(),
        RollupPluginPreprocess({ context: { MODULE_FORMAT: "cjs" } }),
        replaceVersion()
    ]
};


export default [es, module, node];