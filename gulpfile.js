const gulp = require('gulp')
const gulpReplace = require('gulp-replace')
const gulpRename = require('gulp-rename')
const del = require('del')
const tiny = require('gulp-tinypng-nokey')
const notify = require("gulp-notify")

const hash = (new Date().getTime())

const replacePugResource = (reg, ext, match) => {
  const sliceStr = reg.exec(match)[1]
  const slice = match.split('/')
  const slice_front = slice[0] + '/'
  const slice_back = match.split(`.${ext}`)[1]
  return slice_front + slice_back + `${sliceStr}.${hash}.${ext}`
}

gulp.task('clear', (cb) => {
  del([
    'public/views/**/*',
    'public/static/**/*',
    'public/dist/**/*'
  ], cb)
})

gulp.task('tinypng', function(cb) {
  gulp.src(`client/assets/images/**/*.{jpg,jpeg,png,gif}`)
    .pipe(tiny())
    .pipe(gulp.dest(`client/assets/images/`))
    .pipe(notify('压缩图片完成'))
})

gulp.task('replace', () => {
  // 替换 pug 里面的 js、css 文件的 hash 值
  gulp.src(['client/views/**/*.pug'])
    .pipe(gulpReplace(/styles\/.+\.css/g, (match) => {
      return replacePugResource(/^styles\/(\S+)\.css$/, 'css', match)
    }))
    .pipe(gulpReplace(/js\/.+\.js/g, (match) => {
      return replacePugResource(/^js\/(\S+)\.js$/, 'js', match)
    }))
    .pipe(gulp.dest('public/views/'))
})

gulp.task('addHash', () => {
  gulp.src(['public/dist/js/*.js'])
    .pipe(gulpRename((path) => {
      path.basename += `.${hash}`
    }))
    .pipe(gulp.dest('public/dist/js/'))

  gulp.src(['public/dist/styles/*.css'])
    .pipe(gulpRename((path) => {
      path.basename += `.${hash}`
    }))
    .pipe(gulp.dest('public/dist/styles/'))
})

gulp.task('build', ['replace', 'addHash'], () => {
  gulp.src('app.js').pipe(notify('打包完成'))
})
