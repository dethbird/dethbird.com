var webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/frontend/js/pages/index.js'
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
    // plugins: [
    //     new webpack.DefinePlugin({ //<--key to reduce React's size
    //         'process.env': {
    //             'NODE_ENV': JSON.stringify('production')
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin()
    // ],
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
