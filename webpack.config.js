const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { env, isDev, isProd, isBeta, isMock } = require('./build/lib/env');

const { publicPath, PUBLIC_PATH } = require('./build/lib/public-path');

const babelConfig = require('antd-tools/lib/getBabelCommonConfig')(false);
const postcssConfig = require('antd-tools/lib/postcssConfig');

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        'main': './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: publicPath()
    },
    devtool: 'cheap-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        modules: ['./node_modules'],
        alias: {
            'modules': path.join(__dirname, 'src/modules'),
            'service': path.join(__dirname, 'src/service'),
            'style': path.join(__dirname, 'src/assets'),
            'components': path.join(__dirname, 'src/components'),
            'lib': path.join(__dirname, 'src/lib'),
            'config': path.join(__dirname, 'src/config')
        }
    },
    resolveLoader: {
        modules: ['./node_modules']
    },
    module: {
        rules: [
            {
                test: /\.html|\.ejs$/,
                loader: 'raw-loader',
                include: /src/
            },
            {
                test: /\.woff|ttf|woff2|eot$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelConfig,
            },
            {
                test: /\.ts?x?$/,
                include: /src/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: Object.assign(
                                {},
                                postcssConfig,
                                { sourceMap: true }
                            ),
                        },
                    ],
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: Object.assign(
                                {},
                                postcssConfig,
                                { sourceMap: true }
                            ),
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
        ]
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.join(__dirname, './html'),
        port: 8888,
        host: 'localhost',
        historyApiFallback: true,
        inline: false,
        disableHostCheck: true,
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true,
        })
    ]
};

if (isMock) {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.NormalModuleReplacementPlugin(/src\/(.*)\/service.ts/,'./service-mock.ts')
    ])
}

if (isProd) {
    // module.exports.devtool = '#source-map'
    // module.exports.plugins = (module.exports.plugins || []).concat([
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ])
}