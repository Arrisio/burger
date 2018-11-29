var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	rsync = require('gulp-rsync'),
	wait = require('gulp-wait'),
	sourcemaps = require('gulp-sourcemaps')
cors = require('cors');

gulp.task('browser-sync', function () {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: true,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});
var syntax = 'scss'; // Syntax: sass or scss;
gulp.task('styles', function () {
	return gulp.src('./app/scss/*.scss')
		// return gulp.src('app/' + syntax + '/*.' + syntax + '')
		.pipe(wait(500))
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sass({
			outputStyle: 'compressed' // 'expanded'
		}).on("error", notify.onError()))
		// .pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browsersync.reload({
			stream: true
		}))
});

gulp.task('js', function () {
	return gulp.src([
			'app/js/module.js', 'app/js/map.js' // Always at the end
		])
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(concat('app.min.js'))
		//.pipe(uglify()) // Mifify js (opt.)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js'))
		.pipe(browsersync.reload({
			stream: true
		}))
});
gulp.task('html', function () {
	return gulp.src([
			'app/sections/*.html'
		])
		.pipe(concat('index.html'))
		.pipe(gulp.dest('app'));
});

gulp.task('rsync', function () {
	return gulp.src('app/**')
		.pipe(rsync({
			root: 'app/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
});

gulp.task('connect', function () {
	connect.server({

		root: './framework/src/',
		middleware: function () {
			return [cors()];
		},
		port: 3000,
		livereload: true
	});
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function () {
	gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/*.js'], ['js']);
	gulp.watch(['app/sections/*.html'], ['html']);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);