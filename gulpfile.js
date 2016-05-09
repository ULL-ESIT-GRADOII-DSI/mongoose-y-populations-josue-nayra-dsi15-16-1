var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

gulp.task('servidor_app', function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detectado.');
    }
  });
})

gulp.task('default', function() {
  gulp.run('servidor_app')

  gulp.watch(['app.js'], function() {
    gulp.run('servidor_app')
  })
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})