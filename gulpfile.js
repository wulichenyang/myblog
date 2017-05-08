// require gulp plugins
const gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-ruby-sass'),
  minify = require('gulp-clean-css'),
  jshint = require('gulp-jshint'),
  uglify  = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat  = require('gulp-concat'),
  merge = require('gulp-merge'),
  fileinclude = require('gulp-file-include'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  stripDebug = require('gulp-strip-debug'),
  clean = require('gulp-clean'),
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),
  livereload = require('gulp-livereload');

// resource path
const pathSrc = {
  //js
  dependence : [
    //angular
    './src/assets/angular/angular.min.js',
    './src/assets/angular/angular-modal-service.min.js',
    './src/assets/angular/angular-toasty.min.js',
    './src/assets/angular/angular-ui-router.min.js',
    './src/assets/angular/ui-bootstrap.js',
    './src/assets/angular/ui-bootstrap-tpls.js',
    // third-part js
    './src/assets/js/bootstrap.min.js',
    './src/assets/js/highchart-entry.js',
    './src/assets/js/highmaps-map.js',
    './src/assets/js/highcharts-export.js',
    './src/assets/js/highcharts-more.js',
    './src/assets/js/highcharts-ng.min.js',
    './src/assets/js/cn-all.js',
    './src/assets/js/init.min.js',
    './src/assets/js/jquery.slimscroll.min.js',
    './src/assets/js/select-tpls.min.js',
    './src/assets/js/unslider.min.js',
  ],
  initScript : [
    './src/assets/js/init.min.js'
  ],
  components : [
    './src/app.js',
    './src/components/**/*',
  ],
  //css
  css : [
    './src/assets/css/bootstrap.min.css',
    './src/assets/css/angular-toasty.min.css',
    './src/assets/css/dataTables.bootstrap.css',
    './src/assets/css/font-awesome.css',
    './src/assets/css/ionocions.min.css',
    './src/assets/css/oop.css',
    './src/assets/css/select.min.css',
    './src/assets/css/font-icons.css',
    './src/assets/css/github.css',
    './src/assets/css/reset.css',
    './src/assets/css/meterial-icon.css',
  ],
  sass : [
    './src/assets/sass/common.scss'
  ],
  //images
  img : [
    './src/assets/img/**/*'
  ],
  icon : './favicon.ico',
  //fonts
  fonts : [
    './src/assets/fonts/*'
  ],
  // single page & templates
  templates : [
    './src/templates/**/*'
  ],
};
// target path
const target = gulp.env.path || 'dist';
const releaseDir = `./${target}/*`;
const pathDes = {
  js : `./${target}/assets/js`,
  css : `./${target}/assets/css`,
  img : `./${target}/assets/img`,
  fonts : `./${target}/assets/fonts`,
  entry: `./${target}`,
  templates : `./${target}/blog-data-web/html`,
};

// common pipe
const iAutoprefixer = () => {
  return autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4');
}

const moveFile = moduleName => {
  return gulp.src(pathSrc[moduleName]).pipe(gulp.dest(pathDes[moduleName]));
}

// gulp tasks here
// for angular
gulp.task('dependence', () => {
  gulp.src(pathSrc.initScript).pipe(gulp.dest(pathDes.js))
  let code = gulp.src(pathSrc.dependence)
  if(process.env.NODE_ENV === 'production') {
    code = code.pipe(uglify())
      .pipe(stripDebug());
  }
  return code.pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(pathDes.js));
});

gulp.task('components', () => {
  let code = gulp.src(pathSrc.components)
    .pipe(babel({presets: ['es2015']}))
    .pipe(babel({plugins: ['babel-polyfill', 'transform-object-assign', 'array-includes']}))
    .pipe(jshint());
  if(process.env.NODE_ENV === 'production') {
    code = code.pipe(uglify())
      .pipe(stripDebug());
  }
  return code.pipe(concat('components.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(pathDes.js))
    .pipe(livereload());
});

// for scss
gulp.task('sass', () => {
  return sass(pathSrc.sass, { style: 'compressed' })
    .pipe(iAutoprefixer())
    .pipe(concat('main.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(pathDes.css))
    .pipe(livereload())
});

// for css
// gulp.task('css', () => {
//   return gulp.src(pathSrc.css)
//     // .pipe(iAutoprefixer())
//     .pipe(concat('base.min.css'))
//     .pipe(minify())
//     .pipe(gulp.dest(pathDes.css))
//     .pipe(livereload())
// });
gulp.task('css', () => {
  moveFile('css');
});

// @version
const currentTime = new Date().getTime();
// for single page & templates
gulp.task('templates', () => {
  gulp.src(pathSrc.templates)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        version: currentTime
      }
    }))
    .pipe(gulp.dest(pathDes.templates))
    .pipe(livereload())
  gulp.src('./src/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        version: currentTime
      }
    }))
    .pipe(gulp.dest(pathDes.entry))
    .pipe(livereload())
  return;
});

// for images
gulp.task('img', () => {
  gulp.src(pathSrc.img).pipe(imagemin()).pipe(gulp.dest(pathDes.img));
  gulp.src(pathSrc.icon).pipe(gulp.dest(pathDes.img));
  return;
});

// for images
gulp.task('fonts', () => {
  return gulp.src(pathSrc.fonts)
    .pipe(gulp.dest(pathDes.fonts))
});

// clean task
gulp.task('clean', () => {
  gulp.src('./release', { read: false }).pipe(clean())
  gulp.src('./dist', { read: false }).pipe(clean())
});

// gulp build
gulp.task('default', ['clean'], () => {
  gulp.start('sass', 'css', 'dependence', 'components', 'templates', 'img', 'fonts');
  gulp.src('').pipe(notify({ message: 'Build Project Completed!' }));
});

// gulp dev
gulp.task('dev', () => {
  gulp.start('sass', 'components', 'templates');
  gulp.src('').pipe(notify({ message: 'Complie Code Completed!' }));
});

// gulp watch
gulp.task('watch', () => {
  gulp.watch(pathSrc.components, () => {
    gulp.run('components');
  });
  gulp.watch('./src/assets/sass/*', () => {
    gulp.run('sass');
  });
  gulp.watch('./src/assets/css/*', () => {
    gulp.run('css');
  });
  gulp.watch(['./src/templates/**/*', './src/*.html'], () => {
    gulp.run('templates');
  });
  livereload.listen();
});
