
const glob                 = require( "glob" );
const HtmlWebpackPlugin    = require( "html-webpack-plugin" );
const ImageMinimizerPlugin = require( "image-minimizer-webpack-plugin" );
const path                 = require( "node:path" );
const url                  = require( "node:url" );

module.exports = {
  devServer: {
    compress: true,
    host    : "localhost",
    port    : 9000,
    static  : { directory: "./dist" },
  },

  // Entry    : "/src/main/script.js",
  devtool: "source-map",

  entry: glob.sync( "./src/**/*.js" ),

  mode: "development",

  module: {
    rules: [{
      test: /\.css$/i,
      use : ["style-loader", "css-loader"],
    }, {
      test: /\.(png|svg|jpg|jpeg|gif|jfif|webp)$/i,
      type: "asset",
    },

    // compress images
    {
      test: /\.(png|svg|jpg|jpeg|gif|jfif|webp)$/i,
      use : [{
        loader: ImageMinimizerPlugin.loader,

        // enforce: "pre",
        options: {
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options       : {
              plugins: [
                "imagemin-gifsicle",
                "imagemin-mozjpeg",
                "imagemin-pngquant",
                "imagemin-svgo",
              ],
            },
          },
        },
      }],
    }],
  },

  output: {
    clean   : true,
    filename: "main.js",
    path    : path.resolve( path.dirname( url.fileURLToPath( import.meta.url ) ), "dist" ),
  },

  plugins: [
    new HtmlWebpackPlugin( {
      templateContent: `
  <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ysp2yzy.css">
        <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
        <script src="//code.iconify.design/1/1.0.6/iconify.min.js" defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="content"></div>
      </body>
    </html>
  `,
      title: "Test",
    } ),
  ],
};
