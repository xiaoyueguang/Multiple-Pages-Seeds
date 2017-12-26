const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const pug = require('gulp-pug')
const rename = require('gulp-rename')

// 监视文件改动并重新载入
gulp.task('serve', ['babel', 'sass', 'template', 'assets'], function () {
  browserSync({
    server: {
      baseDir: 'dist',
    },
    open: false
  });

  gulp.watch('./src/**/index.scss', ['sass'])
  gulp.watch('./src/**/index.js', ['babel'])
  gulp.watch('./src/**/index.pug', ['template'])
  gulp.watch('./src/assets/**/*', ['assets'])

  gulp.watch('./dist/**/*', browserSync.reload)

});
// 转化 sass
gulp.task('sass', function () {
  return gulp.src('./src/**/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
})

// 转化 js
gulp.task('babel', function (cb) {
  return gulp.src('./src/**/index.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env'],
        plugins: ['transform-runtime']
    }).on('error', e => {
      cb(e)
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
})

// 转化 html
gulp.task('template', function () {
  console.log(111)
  return gulp.src('./src/**/index.pug')
    .pipe(pug({
      locals: require('./data.js')
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'))
})
