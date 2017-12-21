var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
// var rename = require('gulp-rename');
var rename = require('./utils/gulp-rename');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var del = require('del');
var rollup = require('rollup');
var commonJsResolve = require('rollup-plugin-commonjs');
var nodeJsResolve = require('rollup-plugin-node-resolve');

const version = require('./package.json').version;

const commonUglifyopts = {
  compress: {
    drop_console: true
  },
};

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

const buildIntegrationFn = (basename) => () => {
  let nodeModulePath = path.resolve(__dirname, './node_modules/@lattebank');
  // FIXME! BE AWARE!
  // Hard naming conventions here to help automatically bundle integrations
  let integrations = fs.readdirSync(nodeModulePath)
    .filter(f => fs.statSync(path.join(nodeModulePath, f)).isDirectory())
    .filter(f => f.indexOf('analytics.js-integration') > -1)
    .map(f => path.join(nodeModulePath, f, 'dist', basename));
  integrations.forEach(it => {
    gulp.src(it)
      .pipe(rename(path => {
        let provider = /integration-(.+)-analytics/.exec(path.base)[1];
        path.basename = `analytics.integration.${provider}`;
      }))
      .pipe(gulp.dest('./dist'));
  });
}

gulp.task('build:integration:dev', buildIntegrationFn('integration.js'));

gulp.task('build:integration', buildIntegrationFn('integration.min.js'));

gulp.task('build:adapter:dev', function () {
  return rollup.rollup({
    entry: 'adapter/index.js',
    plugins: [
      nodeJsResolve({ browser: true }),
      commonJsResolve({ sourceMap: false })
    ]
  }).then(bundle => {
    return bundle.write({
      dest: './dist/analytics.adapter.js',
      file: './dist/analytics.adapter.js',
      format: 'iife',
      moduleName: 'NOT_A_MODULE',
      globals: {
        loadjs: 'loadjs'
      }
    })
  })
});

gulp.task('clean:adapter', function() {
  del(['dist/analytics.adapter.js']);
});

gulp.task('build:adapter', ['build:adapter:dev'], function() {
  return gulp.src([
    './dist/analytics.adapter.js'
  ])
  .pipe(uglify(commonUglifyopts))
  .pipe(header(`/* lattebank h5a v${version} */\n`))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build:dev', ['build:adapter:dev'], function () {
  return gulp
    .src([
      './node_modules/@lattebank/analytics.js-core/dist/analytics.core.js',
      './dist/analytics.adapter.js'
    ])
    .pipe(concat('analytics.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build:adapter'], function () {
  return gulp
    .src([
      './node_modules/@lattebank/analytics.js-core/dist/analytics.core.min.js',
      './dist/analytics.adapter.js'
    ])
    .pipe(concat('analytics.js'))
    .pipe(gulp.dest('./dist'));
});