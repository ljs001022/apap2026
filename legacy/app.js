

/****************************************************/
/* node_ejs_boilerplate
/* 
/* 
/*
/* @date 2021-11
/* @dev mangojang@gmail.com
/****************************************************/




//----- Express 기본 모듈 불러오기

const express = require('express')
  , http = require('http')
  , path = require('path')
  , dotenv = require('dotenv')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , passport = require('passport')
  , flash = require('connect-flash')
  , router = express.Router()
  , expressErrorHandler = require('express-error-handler')
  , mongoose = require('mongoose');
  
 
const app = express();

//------ env 설정

dotenv.config();

//------ config 불러오기

const config = require(path.join(__dirname,'config/config'));

//------ set 설정

//port
app.set('port', process.env.PORT || 8080);
//devmode
app.set('devmode',process.env.NODE_ENV==='dev'? true : false);
//ejs
app.set('views', path.join(__dirname,'views'));
app.set('view engin', 'ejs');
//config
app.set('config', config);
//admin root api 
app.set('adminPath', '/admin');

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

//----- db 설정

// const database = require(path.join(__dirname,'database/database'));

//----- 공통 미들웨어 설정

//morgan
app.use(morgan(process.env.NODE_ENV==='dev'?'dev':'combined'));

//static
app.use('/asset',express.static(path.join(__dirname,'asset')));
app.use('/static',express.static(path.join(__dirname,'dist/asset/common')));
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/uploadimg', express.static(path.join(__dirname,'uploads')))

//cookie-parser
app.use(cookieParser());

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//session
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET,
	cookie:{
		httpOnly: true,
	},
	name: 'connect.sid'
}));

//passport
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


//----- passport 설정
// const configPassport = require(path.join(__dirname,'config/passport'));
// configPassport(app, passport);


//multer

//----- 라우터 설정

const route_loader = require(path.join(__dirname,'routes/route_loader'));
route_loader.init(app,router);

// ----- admin 기본 라우터 설정

// const adminRouter =  require(path.join(__dirname,'routes/admin/admin'));
// adminRouter(app, router, passport);

// // ----- admin 모듈 라우터 설정

// const adminModuleRouter = require(path.join(__dirname,'fn_modules/init'));
// adminModuleRouter(app,router);

//----- 에러 미들웨어 설정

const errorHandler = expressErrorHandler({
	static: {
		'404': './public/404.html'
	}
});
   
app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

//----- 서버 시작

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	// if (database.db) {
	// 	database.db.close();
	// }
});

const server = http.createServer(app).listen(app.get('port'),()=>{
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
	// console.log("데이터베이스 초기화");
	// database.init(app, config);
});













