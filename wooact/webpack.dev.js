const commonConfig = require("./webpack.common");
const path = require("path");

/** @type {import('webpack').Configuration} */
const prodConfig = {
	...commonConfig,
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: path.join(__dirname, "./public"),
		compress: false,
		port: 9000,
		open: true,
		hot: true,
	},
};

module.exports = prodConfig;
