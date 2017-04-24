/**
 * Created by roman_b on 1/16/2017.
 */
var gulp = require('gulp');
var run = require('gulp-run');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

const BUILD_PATH = './dist';
const SOURCE_PATH = './src';
const API_SOURCE_PATH = SOURCE_PATH + '/shop-api';

gulp.task('clean-dist', function () {
    return gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('populate-test-db', function() {
    return run('mongo ./data/scripts/populate-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('populate-prod-db', function() {
    return run('mongo ./data/scripts/populate-prod-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('populate-dev-db', function() {
    return run('mongo ./data/scripts/populate-local-db.js')
        .exec()
        .pipe(gulp.dest('./data/output'))
})

gulp.task('build', ['clean-dist'], function() {
    gulp.src([API_SOURCE_PATH + '/views/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/views'));
    gulp.src([API_SOURCE_PATH + '/img/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/img'));
    gulp.src([API_SOURCE_PATH + '/public/**/*'])
        .pipe(gulp.dest(BUILD_PATH + '/shop-api/public'));
    return gulp.src([API_SOURCE_PATH + '/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', "stage-2"]
        }))
        .pipe(sourcemaps.write('./maps',{includeContent:true, sourceRoot:'../../src/shop-api'}))
        .pipe(gulp.dest(BUILD_PATH + '/shop-api'));
});
