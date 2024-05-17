var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var babel   = require('gulp-babel');
var del     = require('del');

gulp.task('clean', function (cb) {
    del('lib', cb);
});

gulp.task('lint', function () {
    return gulp
        .src([
            'src/**/*.js',
            'test/**/*.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', gulp.series('clean', 'lint', function () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('lib'));
}));

gulp.task('test', gulp.series('build', async function () {
    const mocha = (await import('gulp-mocha')).default;

    return gulp
        .src('test/**.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 2000 : Infinity // NOTE: disable timeouts in debug
        }));
}));

gulp.task('preview', gulp.series('build', function (done) {
    var buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
    var pluginFactory       = require('./lib');
    var reporterTestCalls   = require('./test/utils/reporter-test-calls');
    var plugin              = buildReporterPlugin(pluginFactory);

    console.log();

    reporterTestCalls.forEach(function (call) {
        plugin[call.method].apply(plugin, call.args);
    });

    done();
}));
