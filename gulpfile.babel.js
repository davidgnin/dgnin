'use strict';
import gulp from 'gulp';
import jshint from 'gulp-jshint';
import jscs from 'gulp-jscs';
import browserify from 'browserify';
import fs from 'fs';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import clean from 'gulp-clean';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import cssmin from 'gulp-cssmin';
import template from 'gulp-template';
import transCA from './translates/ca';
import transES from './translates/es';
import transEN from './translates/en';

const NAME = 'script';

gulp.task('jshint', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src('js/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('build-1', ['jshint', 'jscs'], function () {
  return browserify('js/index.js')
    .transform('babelify', { presets: ['env']})
    .bundle()
    .pipe(fs.createWriteStream(`build/${NAME}.js`));
});

gulp.task('build-2', function (ye) {
  return gulp.src(['lib/*.js', `build/${NAME}-tmp.js`])
    .pipe(concat(`${NAME}.js`))
    .pipe(gulp.dest('build'));
});

gulp.task('build-3', function () {
  return gulp.src(`build/${NAME}-tmp.js`).pipe(clean());
});

gulp.task('build-css', function () {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest('build'));
});

gulp.task('watch-css', function () {
  gulp.watch('./scss/**/*.scss', ['build-css']);
});

gulp.task('build-html', function () {
  gulp.src('html/index.html')
    .pipe(template(transCA))
    .pipe(gulp.dest('build/ca'));
  gulp.src('html/index.html')
    .pipe(template(transES))
    .pipe(gulp.dest('build/es'));
  gulp.src('html/index.html')
    .pipe(template(transEN))
    .pipe(gulp.dest('build/en'));
});

gulp.task('build', function () {
  return runSequence('build-1', 'build-2', 'build-3', 'build-css',
    'build-html');
});

gulp.task('build-4', function () {
  return gulp.src(`build/${NAME}.js`)
    .pipe(uglify())
    .pipe(rename(`${NAME}-min.js`))
    .pipe(gulp.dest('build'));
});

gulp.task('build-min', function () {
  return runSequence('build-1', 'build-2', 'build-3', 'build-4', 'build-css',
    'build-html');
});
