let gulp = require('gulp');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let spawn = require('child_process').spawn;
let node;

gulp.task('build', function () {
    return browserify({entries: './frontend/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch_frontend', ['build'], function () {
    gulp.watch(['./frontend/components/*.jsx', './frontend/app.jsx'], ['build']);
});

gulp.task('watch_backend', () => {
   gulp.watch(['./backend/**/*.js'], ['runserver']);
});

// gulp.task('runserver', function(){
//     require('./backend/app.js');
// });

gulp.task('runserver', function() {
  if (node) node.kill();
  node = spawn('node', ['./backend/app.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', ['watch_frontend', 'runserver', 'watch_backend']);

