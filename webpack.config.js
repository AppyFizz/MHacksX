var Path = require("path")
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var cssOutputPath =  './static/app.[hash].css'
var jsOutputPath = './static/app.[hash].js'
var ExtractSASS = new ExtractTextPlugin(cssOutputPath);
require("babel-core").transform("code", {
  plugins: ["transform-class-properties"]
});


module.exports = {
	context: __dirname,

	entry: [
		Path.join(__dirname, './src/app/index')
	],

	output: {
		path: Path.join(__dirname, './public/'),
		filename: jsOutputPath,
	},

	plugins: [
		new webpack.ProvidePlugin({
			"React": "react",
		}),
		new HtmlWebpackPlugin({
			template: Path.join(__dirname, './src/index.html'),
			hash: true
		}),
		ExtractSASS
	],

    devtool: 'cheap-module-source-map',

	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			query: {
				cacheDirectory: true,
				presets: ['es2015', 'react']
			},
			include: Path.join(__dirname, './src/app/'),
			exclude: Path.join(__dirname, './node_modules/')
			}, {
				test: /\.scss$/,
				loader: ExtractSASS.extract(['css-loader', 'sass-loader']),
				include: Path.join(__dirname, './src/app/'),
				exclude: Path.join(__dirname, './node_modules/')
			}, {
				test: /\.css$/,
				loader: ExtractSASS.extract(['style-loader', 'css-loader', 'sass-loader']),
				include: Path.join(__dirname, './src/app/'),
				exclude: Path.join(__dirname, './node_modules/')
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},
	cache: true
}
