var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var PUBLIC_DIR = path.resolve(__dirname, 'public');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PUBLIC_DIR + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

var config = {
	entry: {
		javascript: APP_DIR + '/js/app.js'
	},
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				use: ['babel-loader']
			},
			{
        		test: /\.(png|gif|jpe?g|svg)$/i,
        		use: 'file-loader'
      		},
      		{ 
      			test: /\.(woff2?|ttf|eot|svg)$/,
      			use: 'file-loader' 
      		},
      		{
      			test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]"
		        })
      		}
		]
	},
	plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin('styles.css')]	
};

module.exports = config;
