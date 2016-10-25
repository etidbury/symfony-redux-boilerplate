const webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSCSS = new ExtractTextPlugin('css/[name].css');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';


var config = {
    entry: [
        //'./client/Recipes/startup/clientRegistration'
        './app/Resources/redux/startup/clientRegistration'

    ],
    output: {
        path: './web/dist/',
        publicPath: '/dist/',
        filename: 'client-bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        extractSCSS,
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            'jQuery'              : 'jquery',
            'window.jQuery'       : 'jquery',
        }),
        new CopyWebpackPlugin([
            { from: './app/Resources/img', to: './img' },
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
            },
        })
    ],
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
            {
                test: /\.jsx?$/, loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {test: /\.scss$/i, loader: extractSCSS.extract(['css','sass'])},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
            {test: /\.jpe?g$/, loader: 'file'}
        ],
    }
}

if (devBuild) {
    console.log('Webpack dev build');
    config.devtool = '#eval-source-map';
} else {
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );
    console.log('Webpack production build');
}

module.exports = config;
