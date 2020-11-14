const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path');

module.exports = {
    entry: './src/AmazonPrimeSubtitles.ts',
    mode: 'none',
    output: {
        path: path.resolve(__dirname, './dist/assets/js/'),
        filename: 'script.js',
        libraryTarget: 'umd',
        library: 'AmazonPrimeSubtitles',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
}
