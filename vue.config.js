const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./phonegap-build/www"),
  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
