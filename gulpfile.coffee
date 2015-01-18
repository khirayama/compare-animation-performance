gulp = require 'gulp'
# markups
jade = require 'gulp-jade'
# scripts
jsx = require 'gulp-react'
# files
imagemin = require 'gulp-imagemin'
# utils
notify = require 'gulp-notify'
cached = require 'gulp-cached'
changed = require 'gulp-changed'
plumber = require 'gulp-plumber'
browserSync = require 'browser-sync'

config = require './gulp.config'
options = config.options

# dev ###########################################################################################
# markups #######################################################################################
gulp.task 'markups', ->
  gulp.src config.markups.src
    .pipe(cached('markups'))
    .pipe(plumber options.plumber)
    .pipe(jade options.jade)
    .pipe(gulp.dest(config.markups.dest))
    .pipe(browserSync.reload({stream: true}))
# styles ########################################################################################
# scripts #######################################################################################
gulp.task 'scripts', ->
  gulp.src config.scripts.src
    .pipe(cached('scripts'))
    .pipe(plumber options.plumber)
    .pipe(jsx())
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.reload({stream: true}))
# files #########################################################################################
gulp.task 'files', ->
  gulp.src config.files.src
    .pipe(plumber options.plumber)
    .pipe(changed config.dest)
    .pipe(imagemin options.imagemin)
    .pipe(gulp.dest(config.files.dest))
    .pipe(browserSync.reload({stream: true}))
# utils #########################################################################################
gulp.task 'browserSync', ['watch'], ->
  browserSync options.browserSync

gulp.task 'watch', ['markups', 'scripts', 'files'], ->
  gulp.watch config.markups.src, ['markups']
  gulp.watch config.scripts.src, ['scripts']
  gulp.watch config.files.src, ['files']

gulp.task 'default', ['browserSync']
