let auth = require('./pass');

module.exports = {
  name: 'okguru',
  sync: {
    proxy: 'https://okguru.art-coral.com/',
  },
  js: {
    // do you needto minify js?
    minify: false,
    // do you need to concat js?
    concat: false,
  },
  css: {
    // do you need to minify css?
    clean: false,
    // do you want to add .min suffix to minified file?
    rename: false,
    // do you need a sourcemap?
    sourcemap: false,
  },
  ftp: {
    host: 'okguru.art-coral.com',
    user: auth.user,
    password: auth.password,
    path: "www/okguru.art-coral.com/sites/all/themes/okguru/",
  },
}