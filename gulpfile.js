var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps')
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var buildProduction = utilities.env.production;

/*
Combines all front end interface files using gulp-concat package. Stores them as allConcat in a temp folder.
*/
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

/*
Browserify translates node commands (export, require, etc.) into something readable by the browser.
*/
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

/*
Minify simplifies the scripts into one line, faster browser viewing in production.
*/
gulp.task('minifyScripts', ['jsBrowserify'], function () {
  return gulp.src(',/build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

/*
Combines all JS bower libraries into a minified vendor file, which can be accessed through the html head in one clean line.
*/
gulp.task('bowerJS', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

/*
Does the same as previous task but for CSS libraries
*/
gulp.task('bowerCSS', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

/*
Combines JS and CSS bowers into one gulp task
*/
gulp.task('bower', ['bowerJS', 'bowerCSS']);

/*
Cleans the tmp and build folders after each dev or production build.
*/
gulp.task('clean', function() {
  return del (['build', 'tmp']);
});

/*
Linter to check the all the js contents of the js folder.
*/
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


/*
reloads all js, bower files, html, and scss after changes are made, add ability to watch for changes.
*/
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function () {
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function () {
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});

gulp.task('cssBuild', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

/*
starts a local development server on localhost:3000, and watches for changes in the js files, bower libs,
html, and scss files.
*/
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['scss/*.scss'], ['cssBuild']);
});

/*
Specifies whether or not to run a production build or development build. Uses utils, and the buildProduction variable.
*/
gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});
