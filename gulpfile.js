const gulp = require('gulp');
const zip = require('gulp-zip');
const webpack = require('webpack-stream');

gulp.task('webpack', function() {
    return gulp.src('src/AmazonPrimeSubtitles.ts')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('zip', function() {
    return gulp.src('dist/**/*')
    .pipe(zip('amazon-prime-video-subtitles.zip'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.series('webpack', 'zip'));
