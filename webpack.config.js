const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {

    return {
        entry: {
            v1: "./src/V1/index.js",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            publicPath: "/dist"
        },
        devtool: false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [
                        path.resolve(__dirname, "./src")
                    ],
                    use: {
                        loader: "babel-loader",
                        options: {
                            "presets": [
                                [
                                    "@babel/preset-env",
                                    {
                                        "modules": false
                                    }
                                ]
                            ]
                          }
                  
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        (env.development || env.production) 
                        ? MiniCssExtractPlugin.loader 
                        : "style-loader", 
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                  },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CleanWebpackPlugin()
        ]
    }
};