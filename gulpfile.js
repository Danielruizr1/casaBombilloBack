const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');
const livereload = require('gulp-livereload');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();


gulp.task('scripts-concat', () => {
	gulp.src(['resources/assets/scripts/main.js','resources/assets/scripts/providers.js', 'resources/assets/scripts/**/*.js'])
		.pipe($.concat('main.js'))
		.pipe(gulp.dest('public/js/final'))
		.pipe(livereload());

});

gulp.task('styles', () => {
	gulp.src('resources/assets/styles/*.scss')
		.pipe($.sass({outputStyle:'compressed'}).on('error', $.sass.logError))
	    .pipe($.autoprefixer({
	      browsers: ['last 2 versions']
	    }))
	    .pipe(gulp.dest('public/css'))
	    .pipe(livereload());


});

gulp.task('templates', () => {
	gulp.src('resources/assets/templates/*.html')
		.pipe($.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('public/templates'))
		.pipe(livereload());

});


gulp.task('wiredep', () => {
  gulp.src('resources/views/admin.blade.php')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('resources/views'));
});

gulp.task('watch', () => {
	livereload.listen();
	gulp.watch('resources/assets/scripts/**/*.js', ['scripts-concat']);
	gulp.watch('resources/assets/styles/*.scss', ['styles']);
	gulp.watch('resources/assets/templates/*.html', ['templates']);
});



gulp.task('laraserve', (callback) => {
	 runSequence(['scripts-concat', 'templates','styles'], ['watch'], callback);
})