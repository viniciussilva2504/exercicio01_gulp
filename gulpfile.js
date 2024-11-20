// Importação dos módulos necessários
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Caminhos dos arquivos
const paths = {
    styles: {
        src: './src/sass/**/*.scss',
        dest: './dist/css'
    },
    images: {
        src: './src/images/**/*',
        dest: './dist/images'
    },
    scripts: {
        src: './src/js/**/*.js',
        dest: './dist/js'
    }
};

// Tarefa para compilar SASS
function compileSass() {
    return gulp.src(paths.styles.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' })) // Renomeia para adicionar .min
        .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para comprimir imagens
function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para comprimir JavaScript
function compressScripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' })) // Renomeia para adicionar .min
        .pipe(gulp.dest(paths.scripts.dest));
}

// Watch para observar mudanças
function watchFiles() {
    gulp.watch(paths.styles.src, compileSass);
    gulp.watch(paths.images.src, compressImages);
    gulp.watch(paths.scripts.src, compressScripts);
}

// Tarefas públicas
exports.sass = compileSass;
exports.images = compressImages;
exports.scripts = compressScripts;
exports.watch = watchFiles;

// Tarefa padrão
exports.default = gulp.series(
    gulp.parallel(compileSass, compressImages, compressScripts),
    watchFiles
);
