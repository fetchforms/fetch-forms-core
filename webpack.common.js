module.exports = {
	entry: {
		main: "./src/index.js",
		embed: "./src/embed.js",
	},
	output: {
		library: "fetchforms",
		libraryTarget: "umd",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: "babel-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /(node_modules)/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js"],
	},
};
