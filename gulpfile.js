var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var fs = require('fs');
var path = require('path');

const version = require('./package.json').version;

gulp.task('build:tracking', function () {
  var opts = {
    compress: {
      drop_console: true,
    },
    output: {
      max_line_len: 64,
    },
  };

  return gulp
    .src('./tracking/index.js')
    .pipe(uglify(opts))
    .pipe(rename('tracking.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:integration', function() {
  let nodeModulePath = path.resolve(__dirname, './node_modules');
  let integrations = fs.readdirSync(nodeModulePath)
    .filter(f => fs.statSync(path.join(nodeModulePath, f).isDirectory()))
    .filter(f => f.indexOf('analytics.js-integration') > -1)
    .map(f => path.join(nodeModulePath, f, 'dist', 'integration.js'));
  return gulp
    .src(integrations)
    .rename(path => {
      return /integration-(.+)-analytics/.exec(path)[1];
    })
    .pipe(copy('./dist'))
});

gulp.task('build:dev', function () {
  return gulp
    .src([
      './node_modules/@lattebank/analytics.js-core/analytics.core.js',
      './adapter/index.js'
    ])
    .pipe(concat('analytics.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
  let opts = {
    compress: {
      drop_console: true,
    },
  };
  return gulp
    .src([
      './node_modules/@lattebank/analytics.js-core/analytics.core.js',
      './adapter/index.js'
    ])
    .pipe(uglify(opts))
    .pipe(header(`/* lattebank h5a v${version} */\n`))
    .pipe(concat('analytics.js'))
    .pipe(gulp.dest('./dist'));
});