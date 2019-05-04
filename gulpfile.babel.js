import "babel-polyfill";
import gulp from 'gulp'
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify-es"
import imagemin from "gulp-imagemin";
import pug from "gulp-pug";

function gulpPug(){
    return gulp
    .src('views/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist/html'))
}

gulp.task('pug', gulpPug);

function gulpSass(){
    return gulp
    .src('')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
}

gulp.task('sass', gulpSass);

function gulpJS(){
    return gulp.src('')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
}

gulp.task('js', gulpJS)

function gulpImg(){
    return gulp.src('')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
}

gulp.task('imagemin', gulpImg);

function watch(){
    gulp.watch('', gulpSass);
    gulp.watch('', gulpJS)
    gulp.watch('', gulpImg)
    gulp.watch('', gulpPug)
}

gulp.task('watch', watch)

gulp.task('default', gulp.parallel('watch', 'js', 'sass', 'imagemin', 'pug'));
