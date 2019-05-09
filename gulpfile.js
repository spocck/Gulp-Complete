const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const del = require('del');
const browserify = require('gulp-browserify')
const babelify = require('babelify')
const pug = require('gulp-pug')

const paths = {
    styles: {
        src: "",
        dest: "",
        srcWatch: ""
    },
    scripts: {
        src: "",
        dest: "",
        srcWatch: ""
    },
    htmls: {
        src: "",
        dest: "",
        srcWatch: ""
    }
};

function clean(){
    return del(['dist'])
}
function htmls(){
    return gulp.src(paths.htmls.src)
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(paths.htmls.dest))
}
function styles(){
    return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(browserify({
        transform: ['babelify'],
      }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch(){
    gulp.watch(paths.scripts.srcWatch, styles);
    gulp.watch(paths.scripts.srcWatch, scripts);
    gulp.watch(paths.htmls.srcWatch, htmls)
}


const build = gulp.series(clean, gulp.parallel(styles, scripts, htmls));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.watch = watch;
exports.build = build;

exports.default = build;
