
var gulp = require('gulp');
var Server = require('karma').Server;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var htmlReplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var ngTemplateCache = require('gulp-angular-templatecache');
var autoPrefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');


gulp.task('test', function (done) {

    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();


});

gulp.task('jshint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))

});

gulp.task('htmlReplace', function () {
    return gulp.src('src/index.html')
        .pipe(htmlReplace({
            'vender': 'scripts/vendor.js',
            'source': 'scripts/source.js'
        }))
        .pipe(gulp.dest('dist'))
});


gulp.task('bundle:source', function () {


    return es.merge(

        gulp.src('src/scripts/**/*.html')
        .pipe(ngTemplateCache({
            module: 'ngweb',
            root: 'scripts'
        })),

        gulp.src(
            [
                'src/scripts/app.js',
                'src/scripts/**/*.js'
            ])
    )

    .pipe(concat('source.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
});

gulp.task('bundle:vendor', function () {
    return gulp.src(
    [
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        'src/bower_components/angular-ui-router/release/angular-ui-router.min.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/scripts'))
});


gulp.task('copy:style', ['sass'], function () {
    gulp.src('src/styles/app.css')
        .pipe(autoPrefixer())
        .pipe(csso())
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('copy:image', function () {
    gulp.src('src/images/**/*.png')
        .pipe(gulp.dest('dist/images'))
});


gulp.task('serve', ['watch'], function () {
    browserSync({
        server: {
            baseDir: './src'
        }
    })
});

gulp.task('serve:dist', function () {
    browserSync({
        server: {
            baseDir: './dist'
        }
    })
});

gulp.task('sass', function () {
    return gulp.src('src/styles/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/styles'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['reload']);
    gulp.watch('src/**/*.html', ['reload']);
    gulp.watch('src/styles/**/*.scss', ['sass']);
});

gulp.task('build', ['htmlReplace', 'bundle:source', 'bundle:vendor', 'copy:style', 'copy:image']);

gulp.task('default', ['serve']);

gulp.task('heroku:production', ['build']);
