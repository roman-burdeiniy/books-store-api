/**
 * Created by roman_b on 1/16/2017.
 */
var gulp = require('gulp');
var run = require('gulp-run');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-tsc');
var clean = require('gulp-clean');
var exec = require('child_process').exec;

const BUILD_PATH = './dist';
const SOURCE_PATH = './src';
const API_SOURCE_PATH = SOURCE_PATH + '/shop-api';
const ADMIN_SOURCE_PATH = SOURCE_PATH + '/shop-admin';

gulp.task('clean-dist', function () {
    return gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('clean-admin-dist', function () {
    return gulp.src(API_SOURCE_PATH + '/adminSource/*', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean-dist'], function() {
    gulp.src([API_SOURCE_PATH + '/views/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/views'));
    gulp.src([API_SOURCE_PATH + '/img/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/img'));
    gulp.src([API_SOURCE_PATH + '/public/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/public'));
    gulp.src([API_SOURCE_PATH + '/adminSource/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/adminSource'));
    return gulp.src([API_SOURCE_PATH + '/**/*.js',
        '!' + API_SOURCE_PATH + '/public/**/*',
        '!' + API_SOURCE_PATH + '/adminSource/**/*'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src/shop-api'}))
        .pipe(gulp.dest(BUILD_PATH + '/shop-api'));
});

gulp.task('build-admin-source', ['clean-admin-dist'], function() {
    var res =  gulp.src([ADMIN_SOURCE_PATH + '/src/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript())
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src/shop-admin/src'}))
        .pipe(gulp.dest(API_SOURCE_PATH + '/adminSource/src'));
    return res;
});

gulp.task('build-admin', function(done) {
    exec('npm run webpack-admin', function(error, stdout, stderr) {
        if(error) {
            console.log(error, stderr);
        }
        gulp.src([ADMIN_SOURCE_PATH + '/dist/**/*'])
            .pipe(gulp.dest(API_SOURCE_PATH + '/public'));
        done();
    });
});
