var gulp = require('gulp'); 
var less = require('gulp-less'); 
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin'); 
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var del = require('del');
var autoprefixer= require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

const projectName = 'apap7' // project 이름으로 변경
const port = 8080; 

// 소스 파일 경로 
var PATH = { 
    EJS: `./views/${projectName}`
    ,ASSETS: { 
        FONTS: './asset/common/fonts'                       
        , IMAGES: './asset/images' 
        , STYLE: './asset/common/css' 
        , JS: './asset/common/js'
        , LIBCSS: './asset/common/css/plugin'
        , LIBJS:'./asset/common/js/plugin'
    } 
}, 
// 산출물 경로 
DEST_PATH = {
    HTML:'./dist' 
    ,EJS: `./dist/views/${projectName}`
    ,ASSETS: { 
        FONTS: './dist/asset/common/fonts' 
        , IMAGES: './dist/asset/images' 
        , STYLE: './dist/asset/common/css' 
        , JS: './dist/asset/common/js'
        , LIBCSS: './dist/asset/common/css/plugin'
        , LIBJS:'./dist/asset/common/js/plugin'
    } 
};

gulp.task('clean', () => { 
    return new Promise( resolve => { 
        del.sync(DEST_PATH.HTML); 
        resolve(); 
    }); 
});

gulp.task( 'less:compile', () => { 
    return new Promise( resolve => { 
        var options = { 
            outputStyle: "nested" // nested, expanded, compact, compressed 
            ,indentType: "tab" // space, tab 
            ,indentWidth: 4 // 
            , precision: 8 
            , sourceComments: true // 코멘트 제거 여부 
        }; 
        gulp.src( PATH.ASSETS.STYLE + '/*.less' ) 
            .pipe( sourcemaps.init() ) 
            .pipe( less(options) )
            .pipe(autoprefixer()) 
            .pipe(cleanCSS())
            .pipe( sourcemaps.write() ) 
            .pipe( gulp.dest( DEST_PATH.ASSETS.STYLE ) )
            .pipe( browserSync.reload({stream: true}) );

            resolve(); 
    }); 
}); 


gulp.task( 'ejs', () => { 
    return new Promise( resolve => { 
        gulp.src( PATH.EJS + '/*.ejs' ) 
        .pipe( gulp.dest( DEST_PATH.EJS ) )
        .pipe( browserSync.reload({stream: true}) );

        gulp.src( PATH.EJS + '/include/*.ejs' ) 
        .pipe( gulp.dest( DEST_PATH.EJS + '/include') )
        .pipe( browserSync.reload({stream: true}) );

         resolve(); 
    }); 
});

gulp.task( 'script', () => { 
    return new Promise( resolve => { 
        gulp.src( PATH.ASSETS.JS + '/*.js' )
        .pipe( sourcemaps.init() ) 
        .pipe(babel())
        .pipe(concat('common.js'))
        .pipe( sourcemaps.write() ) 
        .pipe(gulp.dest(DEST_PATH.ASSETS.JS))
        .pipe(uglify({
            mangle: true // 알파벳 한글자 압축
        }))
        .pipe( rename('common.min.js') ) 
        .pipe( gulp.dest( DEST_PATH.ASSETS.JS ) )
        .pipe( browserSync.reload({stream: true}) );

        resolve(); 
    }) 
});

gulp.task( 'nodemon:start', () => { 
    return new Promise( resolve => { 
        nodemon({ 
            script: 'app.js' 
            ,watch: DEST_PATH.HTML 
        }); 
        resolve(); 
    }); 
});

gulp.task('watch', () => { 
    return new Promise( resolve => { 
        gulp.watch(PATH.EJS + "/**/*.ejs", gulp.series(['ejs']));
        gulp.watch(PATH.ASSETS.STYLE + "/**/*.less", gulp.series(['less:compile']));
        gulp.watch(PATH.ASSETS.JS + "/**/*.js", gulp.series(['script']));

        resolve(); 
    }); 
});



gulp.task('browserSync',() => { 
    return new Promise( resolve => { 
        browserSync.init( null, { 
            proxy: `http://localhost:${port}` 
            ,port: 8063
        }); 
        resolve(); 
    }); 
});


var allSeries = gulp.series([
    // 'clean'
    'less:compile'
    ,'ejs'
    ,'script'
    ,'nodemon:start'
    ,'browserSync'
    ,'watch'
]);


    
gulp.task( 'default', allSeries);
