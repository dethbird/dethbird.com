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
