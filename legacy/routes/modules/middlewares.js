// 기본 로그인 인증확인 미들웨어
exports.authAdmin = (req, res, next) =>{
    const adminPath = req.app.get('adminPath');
    if(!req.isAuthenticated()){
        console.log('사용자 인증 안된 상태임.');
        res.redirect(adminPath);
        return
    }else{
        if (req.user.level >= 4){
            //관리자 입니다.
            next();
        }else{
            res.redirect(adminPath);
        }
    }
}

// multer router 에 사용되는 로그인 인증확인 미들웨어
exports. authAdminMulter =(req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log('사용자 인증 안된 상태임.');
        res.send(JSON.stringify({ "fileSrc":"error"}));
        return;
    }else{
        if (req.user.level >= 4){
            //관리자 입니다.
            next();
        }else{
            res.send(JSON.stringify({ "fileSrc":"error"}));
        }
    }
}
