const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass =  require('gulp-sass');

//task
gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'public/src/scss/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/jam-icons/js/jam.min.js'
    ])
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('icons', () => {
    return gulp.src([
        'node_modules/jam-icons/css/jam.min.css'
    ]).pipe(gulp.dest('public/css'))
});

gulp.task('fonts-icons', () => {
    return gulp.src([
        'node_modules/jam-icons/fonts/*'
    ]).pipe(gulp.dest('public/assets/fonts/font-icons'))
});

gulp.task('server', ['sass'], () => {
    browserSync.init({
        server: './public/src'
    });
    gulp.watch([
        'node_module/bootstrap/scss/bootstrap.scss',
        'public/src/scss/*.scss'
    ], ['sass']);
    
    gulp.watch('public/*.html').on('change', browserSync.reload);
});


gulp.task('default', ['js', 'fonts-icons', 'icons', 'sass' ])
