const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const mustache = require('gulp-mustache')
const rename = require('gulp-rename')

// 监视文件改动并重新载入
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'dist',
    },
    open: false
  });

  gulp.watch('./src/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.js', ['babel'])
  gulp.watch('./src/**/*.html', ['template'])
  gulp.watch('./src/assets/**/*', ['assets'])

  gulp.watch('./dist/**/*', browserSync.reload)

});
// 转化 sass
gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
})

// 转化 js
gulp.task('babel', function (cb) {
  return gulp.src('./src/**/*.js')
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
  return gulp.src('./src/**/*.html')
    .pipe(mustache(require('./data.js')))
    .pipe(rename(path => {
      path.extname = '.html'
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'))
})
