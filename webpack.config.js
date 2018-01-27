const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
    entry: {
        main: [
            './src/main/resources/js/index.js', './src/main/resources/sass/main.scss'
        ]
    },
    output: {
        path: __dirname + '/src/main/resources/static/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                ascii_only: true,
            },
            sourceMap: shouldUseSourceMap,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        })
    ]
};