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
    .src('css/scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
}

gulp.task('sass', gulpSass);

function gulpJS(){
    return gulp.src('js/main/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
}

gulp.task('js', gulpJS)

function gulpImg(){
    return gulp.src('img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
}

gulp.task('imagemin', gulpImg);

function watch(){
    gulp.watch('css/scss/*.scss', gulpSass);
    gulp.watch('js/main/*.js', gulpJS)
    gulp.watch('img/*', gulpImg)
    gulp.watch('views/**/*.pug', gulpPug)
}

gulp.task('watch', watch)

gulp.task('default', gulp.parallel('watch', 'js', 'sass', 'imagemin', 'pug'));
