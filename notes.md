## Webpack is responsible for bundling our javascript modules.

* We pass Webpack the entry point to our application, and it builds a graph of the projects dependency tree. 
* we also specify an output property. This informs webpack how to treat the bundled code, and where to save it on disk.
* Similar (but different) to tasks in Gulp, Webpack has "loaders". Using loaders we can transform non js files such as images and css into modules that Webpack understands and can include in the dependency graph.
* In doing so, we can ensure all of our assets are handled by Wepback.
* Loaders allow us to perform transformations on files during their conversion into Webpack modules.
* While Loaders perform transformations on a per-file basis, Webpack Plugins allow us to perform functionality on compilations, or chunks, of bundled modules.

## Using Webpack with React & ES6...

* Webpack's module bundler and React's component model are a great fit.
* We can also make use of the latest and greatest ES6 features, including ES6 module syntax.
* Webpack will convert ES6 import/export syntax into an ES5 compatible wrapper automatically for us.
* In the case of other new JS features such as arrow functions etc, we can use a Loader to transform our code.
* In the webpack config file we can test for .js and/or .jsx files, and apply the babel-loader transformations when Webpack runs the bundling mechanism.
* This babel-loader will transpile our jsx and es6 code into compatible code which can be served to the browser.
* This allows us to make use of javascript's latest and greatest during development.

## Using CSS Modules with Webpack...

* We mentioned that the goal is to have webpack manage all of our assets, including css, images, fonts etc.
* However webpack only "understands" javascript. 
* We know we can use loaders to process files of a certain type in order to merge them into webpacks dependency graph.
* One such laoder for css is "css-loader". This transforms css files into webpack modules, allowing them to be imported/required in our js.
* In the process, css-loader allows us to "switch on" support for CSS Modules, a bit like how Babel provdes support for the latest ES6.
* Essentially by managing our css modules within webpack, we can treat them as dependencies that our javascript can require on a component basis.
* Whilst css-loader transforms our css into webpack modules, and allows us to require them in our js, it doesn't actually do anything with the styles other than inline them within the javascript bundle.
* The DOM is so far unaware of them, so we need to use "style-loader" in addition to "css-loader".
* style-loader is responsible for actually injecting the css into the dom via a style tag.

## Using images and fonts with Webpack

* Again our goal should be to manage all assets within webpack. We've already dealt with React's jsx files, our ES6 scripts, and our css modules.
* There are some other assets we'll need more webpack loaders for, namely images and webfonts.
* "file-loader" is a webpack loader which allows us to test for image files and font files and transform those files into webpack compatible modules.
* By default the filename of the resulting file is the MD5 hash of the file's contents.

## Generating the bundle...

* When running webpack from the CLI: ./node_modules/.bin/webpack, this will automatically pick up a webpack.config.js file in the current directory and behave accordingly.
* This results in our bundled file being emitted to the output path specified in the config file.
* For non js assets such as images and fonts, the file-loader that we discussed earlier will emmit the files into the output folder alongside the webpack js bundle.
* We could then serve these static assets with our preferred web server...

## Using the Webpack Development Server...

* Webpack makes it even easier to serve these static assets during development with the webpack Development Server.
* This dev server consults the webpack.config.js file to establish the webpack environment setup.
* Whereas if we were to run webpack from the CLI (as above) it would write our bundle to disk, the dev server actually holds the bundle in memory, it is not emmitted to the file system.
* Using the webpack.config.js file the dev sever already knows where the applications entry point js is, but it also needs to know which html file to serve to the browser.
* By default it will serve the files in the current directory, or we can specify explicitly where to serve the content from. The dev server will pick up any options set in the devServer object in the webpack config file. We can set the devServer.contentBase property to specify where content should be served from.
* Webpack watches the source files and recompiles the bundle whenever changes are detected. 
* Crucially, the recompiled bundle is served from memory, it is not written to the output folder as would be the case if we ran webpack itself.
* The dev server also ships with a nice feature of automatic page refresh.

## Auto generating the HTML file...

* We can improve the process of creating the html file responsible for serving the bundle.js using the HtmlWebpackPlugin plugin.
* This plugin will automatically generate an HTML file for us in the output path alongside the bundle.
* Again NB that when using the webpack dev server, this file is actually stored in memory rather than being written to disk.
* When generating the html file the plugin automatically inserts a script tag referencing the bundle. This is particularly useful if the bundle includes a hash in the filename.
* We can also specify that the auto generated html file be based on a template that exists somewhere within our project.

## Deploying for production...

* So far we've seen how to run webpack with the development server during development.
* We noted that the output files are not saved to disk anywhere, but rather served from memory.
* There are some additional steps required to prepare our project for deployment.
* On the face of it, all we need to do is run webpack rather than the webpack dev server, and our bundle and other static assets will be written to disk. We can then deploy to our host.
* Whilst this is true, there are some additional optimisations we can and should make.
* Typically this extra processing would be defined in a different configuration file, which we can tell webpack to use with the --config flag.
* We use the HtmlWebpackPlugin again to auto generate an html file, using the same base html template as before.
* So far we've only seen that we can inject css into the dom via the bundle js.
* For production this isn't appropriate, we instead want to serve a static file.
* * We instead use the ExtractTextPlugin to first run the same css-loader transformations as before, but then move the inline css within the javascript bundle into a separate styles.css file and write this to disk in the output folder.
* For deployment, we can also run webpack in production mopde (-p flag) which sets the node env variable, and ensures our bundle js and extracted css undergo uglification/minification.

## Simplifying with npm scripts...

* So far we've discussed that we use 2 different webpack configurations to run webpack in different ways: dev focused via the development server, and to generate a production-ready build.
* We can simplify the commands we need to run from the terminal using npm scripts defined in package.json:
```
"scripts": {
	"start": "webpack-dev-server",
	"build": "webpack -p --config webpack.config.prod.js"
}
```
