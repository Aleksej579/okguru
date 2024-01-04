var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		sourcemaps 	   = require('gulp-sourcemaps'),
		converter 		 = require('sass-convert'),
		babel 		   	 = require('gulp-babel'),
		notify         = require('gulp-notify');
var gulpIf				 = require('gulp-if');

var config				 = require('./theme-config.js');
var THEME_NAME     = config.name;

gulp.task('browser-sync', function() {
	browserSync({
		proxy: config.sync.proxy,
		notify: false,
	});
});

gulp.task('sass', function() {
	return gulp.src(THEME_NAME + '/sass/*.sass')
	.pipe(gulpIf(config.css.sourcemap,sourcemaps.init()))
	.pipe(sass({
		outputStyle: 'expand',
		includePaths: require('node-bourbon').includePaths
	}).on("error", notify.onError()))
	// .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulpIf(config.css.clean, cleanCSS())) // Опционально, закомментировать при отладке
	.pipe(gulpIf(config.css.sourcemap, sourcemaps.write()))
	.pipe(gulp.dest(THEME_NAME + '/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
	return gulp.src([
		THEME_NAME + '/js/src/*.js'
	])
	.pipe(babel({
      presets: ['babel-preset-es2015']
  	}))
	.pipe(gulpIf(config.js.concat, concat('scripts.min.js')))
	.pipe(gulpIf(config.js.minify, uglify())) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest(THEME_NAME + '/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch(THEME_NAME + '/sass/**/*.sass', ['sass']);
	gulp.watch(THEME_NAME + '/js/src/*.js', ['js']);
	gulp.watch([THEME_NAME + '/js/*.js'], browserSync.reload);
	gulp.watch(THEME_NAME + '/css/*.css', browserSync.reload);
});

gulp.task('deploy-watch', function() {

	var conn = ftp.create({
		host:      config.ftp.host,
	  user:      config.ftp.user,
	  password:  config.ftp.password,
		parallel:  10,
		log: gutil.log
	});
	var globs = [
		THEME_NAME + '/css/**',
		THEME_NAME + '/images/**',
    THEME_NAME + '/js/**',
    THEME_NAME + '/fonts/**/**',
		THEME_NAME + '/templates/**',
    THEME_NAME + '/' + THEME_NAME + '.info',
    THEME_NAME + '/sass/**',
    THEME_NAME + '/template.php',
	];
	gulp.watch(globs)
		.on('change', function(event) {
		console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

		return gulp.src( [event.path], { base: '.' + THEME_NAME + '/', buffer: false } )
			.pipe( conn.newer( config.ftp.path ) ) // only upload newer files
			.pipe( conn.dest( config.ftp.path ) )
		;
	});
});

// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      config.ftp.host,
// 	   user:      config.ftp.user,
// 	   password:  config.ftp.password,
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	THEME_NAME + '/**',
// 	// 'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest(config.ftp.path));

// });

gulp.task('removedist', function () { return del.sync(THEME_NAME); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['deploy-watch', 'watch']);
