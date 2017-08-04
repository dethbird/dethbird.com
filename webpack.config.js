var webpack = require('webpack');

var isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    var plugins = [];

    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }));

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
        index: './src/frontend/js/pages/*.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: getPlugins(),
    resolve: {
        modules: [
            './node_modules',
            './src/frontend/js',
            './configs'
        ]
    },
    output: {
        path: process.cwd() + '/public/js/pages',
        filename: "[name].js"
    }
}
