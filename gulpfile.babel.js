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

gulp.task('build', function () {
  return runSequence('build-1', 'build-2', 'build-3');
});

gulp.task('build-4', function () {
  return gulp.src(`build/${NAME}.js`)
    .pipe(uglify())
    .pipe(rename(`${NAME}-min.js`))
    .pipe(gulp.dest('build'));
});

gulp.task('build-min', function () {
  return runSequence('build-1', 'build-2', 'build-3', 'build-4');
});
