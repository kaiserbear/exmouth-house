'use strict';

const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const exec = require('child_process').exec;

const config = {
  src: './src',
  dest: './',
  watchers: [
    {
      match: ['./src/**/**/*.hbs'],
      tasks: ['html']
    }
  ]
};

gulp.task('serve', () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['google-chrome'],
    open: false,
    files: ['./views/**/*.ejs', './sass/**/*.scss', './public/js/*.js']
  });
  exec('node app.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback(err);
  });
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch', () => {
  config.watchers.forEach(item => {
    gulp.watch(item.match, item.tasks);
  });
});

gulp.task('default', done => {
  gulp.start('serve');
  gulp.start('watch');
  gulp.start('sass');
  gulp.start('sass:watch');
  done();
});
