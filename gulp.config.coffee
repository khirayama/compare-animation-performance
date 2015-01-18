# if you need init and update all
# npm i -D gulp coffee-script flux react jsx-loader object-assign gulp-jade gulp-sass gulp-pleeease gulp-imagemin gulp-webpack gulp-notify gulp-cached gulp-changed gulp-plumber browser-sync
notify = require 'gulp-notify'

dev = 'dev/'
dest = 'public/'

config =
  dev: dev
  dest: dest
  markups:
    src: ["#{dev}**/*.jade"]
    dest: dest
  scripts:
    src: ["#{dev}**/*.jsx"]
    dest: dest
  files:
    src: ["#{dev}**/*.+(jpg|jpeg|png|gif|svg|js|html|css)"]
    dest: dest

  options:
    jade:
      pretty: true
    plumber:
      errorHandler: notify.onError "Error: <%= error.message %>"
    browserSync:
      server:
        baseDir: dest
      notify: false

module.exports = config
