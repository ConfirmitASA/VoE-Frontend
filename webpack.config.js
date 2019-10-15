const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
   // context: __dirname,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader',  'postcss-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'my-styles.css'})
    ]
};