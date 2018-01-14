'use strict';

const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const jshint = require('gulp-jshint');
const imagemin = require("gulp-imagemin");
    // jpgs
    const imageminJpegRecompress = require('imagemin-jpeg-recompress');
    //pngs
    const imageminPngquant = require('imagemin-pngquant');
const livereload = require("gulp-livereload");
const include = require("gulp-include");
const concat = require('gulp-concat');
const resources = "./src";
const outdest = "./static";
const paths = {
    js: resources+"/js",
    css: resources+"/css",
    scss: resources+"/sass",
    images: resources+"/img",
};
const dpaths = {
  js: outdest+"/js",
  css: outdest+"/css",
  images: outdest+"/img",
};

// what is run with "gulp"
gulp.task("default", ["sass:watch"]);

// sass task
gulp.task("sass", function () {
    return gulp.src([
        paths.scss+"/*.scss",
        "!"+paths.scss+"/*/*.scss"
      ])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "nested"}).on("error", sass.logError))
	  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
      }))
    .pipe(gulp.dest(dpaths.css)) // nested css
	  .pipe(cssnano())
	  .pipe(rename(function (path) {
		  if(path.extname === '.css') {
			  path.basename += '.min'
		  }
    }))
    .pipe(sourcemaps.write("./maps")) // needs to be after autoprefixer which adds to sourcemap
	  .pipe(gulp.dest(dpaths.css)) // minified css
    .pipe(livereload()); // refresh the page
});

// watch
gulp.task("sass:watch", function() {
    livereload.listen();
    gulp.watch(['./src/sass/*/*.scss', './index.*'], ['sass']);
});

// js task
gulp.task("js", function() {
    // ignore .min.js files
    return gulp.src([
            paths.js+"/**/*.js",
            "!"+paths.js+"/**/*.min.js"
        ])
        .pipe(include()) // include plugin allows includes in js files
        .pipe(jshint()) // run jshin
        .pipe(jshint.reporter('jshint-stylish')) // run the jshint prettyfier
        .pipe(sourcemaps.init()) // start creating the source maps
        .pipe(uglify()) // minify stuff
        .on('error', onError) // error handling
        .pipe(rename({
            suffix: ".min" // add ".min" to the end of the filename
        }))
        .pipe(sourcemaps.write()) // finish creating the source map
        .pipe(gulp.dest(dpaths.js)) // created minified files at this path
        .pipe(livereload()); // refresh the page
});

//imagemin
gulp.task("imagemin", function(){
    return gulp.src(paths.images+"/**/*")
        .pipe(imagemin([
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 60
            }),
            imageminPngquant({quality: '65-85'})
        ]))
        .pipe(gulp.dest(dpaths.images));
});

// error function
function onError(err) {
    notify.onError({
        message: 'Error: <%= err %>'
    });
    this.emit('end');
}