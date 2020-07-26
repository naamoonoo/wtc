const path = require("path");
const babelConfig = require("./babel.config");

/** @type {import('webpack').Configuration} */
const config = {
	entry: ["@babel/polyfill", "./src/index.ts"],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: {
					loader: "babel-loader",
					options: {
						...babelConfig,
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				loader: "url-loader?limit=100000",
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "src/public/"),
	},
};

module.exports = config;
