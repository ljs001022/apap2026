const userPassport =  require('./user_passport');
const logSite = require('./log_site');
const multer = require('./multer');


module.exports = function(app, router, passport){
    //0. multer 라우터 등록
    multer(app, router);
    //1. 로그인 관련 라우터 
    userPassport(app, router, passport);
    //2. 로그 관련 라우터
    logSite(app, router);
    
}