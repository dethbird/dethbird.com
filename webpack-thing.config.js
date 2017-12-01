var webpack = require('webpack');

var isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    var plugins = [];

    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }));

    plugins.push(new webpack.LoaderOptionsPlugin({
        debug: true
    }))

    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: true
        }));
    } else {
        // ...
    }

    return plugins;
}

module.exports = {
    entry: {
        graphics001: './src/frontend/js/pages/thing/graphics001.js',
        cabo: './src/frontend/js/pages/thing/cabo.js',
        parallax001: './src/frontend/js/pages/thing/parallax001.js'
    },
    output: {
        path: process.cwd() + '/public/js/pages/thing',
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".css"],
        modules: [
            './node_modules',
            './src/frontend/js',
            './configs'
        ]
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["es2015", { modules: false }],
                        "stage-2",
                        "react"
                    ],
                    plugins: [
                        "transform-node-env-inline"
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    "postcss-loader" // has separate config, see postcss.config.js nearby
                ]
            },
        ]
    },
    plugins: getPlugins()
}
