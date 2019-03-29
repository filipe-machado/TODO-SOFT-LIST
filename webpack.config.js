const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextWebpackPlugin({
    filename: '[name].bundle.min.css',
    disable: false,
})

const entries = {
    entry: {
        main: './src/js/main.js'
    },
}

const chunks = Object.keys(entries.entry).filter((name) => !name.match(/service-worker/))

const config = {
    ...entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: '[name].bundle.min.js',
            chunks,
        }),
        extractSass,
        new UglifyJsWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {
                            modules: false,
                        }],
                    ],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        { 
                            loader: 'sass-loader', 
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    }
};

if (process.env.NODE_ENV === 'development') {
    config.watch = true;
    config.devtool = 'source-map';
  } else if (process.env.NODE_ENV === 'hot') {
    config.devtool = 'source-map';
    config.devServer = {
      hot: true,
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

module.exports = config