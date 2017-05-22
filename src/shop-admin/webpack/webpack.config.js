/**
 * Created by roman_b on 4/25/2017.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require('./helpers');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        'polyfills':  helpers.root('./src/polyfills.ts'),
        'vendor':  helpers.root('./src/vendor.ts'),
        'admin': helpers.root('./src/main.ts')
    },

    output: {
        path: helpers.root('./dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: helpers.root('./', 'tsconfig.json') }
                    } , 'angular2-template-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('./src', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new ExtractTextPlugin('admin.bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['admin', 'vendor', 'polyfills']
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        )
    ]
};