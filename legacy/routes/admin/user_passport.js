
/****************************************************/
/* cassia
/* 
/* 패스포트 라우팅 함수 정의
/*
/* @date 2020-07
/* @dev use9@use9.kr
/****************************************************/

var authAdmin = function(user,level,success,fail){
    if (!user) {
        fail();
    } else {
        if(user.level >= level){
            success();
        }else{
            fail();
        }
        //res.render('index.ejs', {login_success:true,page_name:"index"});
    }
}


  
module.exports = function(app, router, passport) {
    console.log('user_passport 호출됨.');
    const adminPath = app.get('adminPath');

    // 홈 화면
    router.route(adminPath).get(function(req, res) {
        console.log('/ 패스 요청');

        console.log('req.user의 정보');
        //console.log(req.user);


        // 인증 안된 경우
        authAdmin(req.user,4,function(){
            console.log('사용자 인증된 상태임.');
            //첫페이지 설정
            res.redirect(`${adminPath}/customer/listboard?page=0&perPage=20`);
            
        },function(){
            console.log('사용자 인증 안된 상태임.');
            res.redirect(`${adminPath}/login`); 
        })
    });

   
    // 로그인 화면
    router.route(`${adminPath}/login`).get(function(req, res) {
        console.log('/login 패스 요청됨.');

        authAdmin(req.user,0,function(){
            //관리자일 경우
            console.log('사용자 인증된 상태임.');
            res.redirect(adminPath);
        },function(){
            //아닐경우
            console.log('사용자 인증 안된 상태임.');
            res.render('./admin/login.ejs', {message: req.flash('loginMessage'), rootpath: adminPath}); 
        })

    });

    
    // 회원가입 화면
    router.route(`${adminPath}/signup`).get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        
        if (req.app.get('devmode')){
            res.render('./admin/signup.ejs', {message: req.flash('signupMessage'),user: req.user,page_name:"singup", rootpath: adminPath});
        }else{
            res.redirect(adminPath);
        }
        
    });

  
    // 로그아웃
    router.route(`${adminPath}/logout`).get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect(adminPath);
    });


    // 로그인 인증
    router.route(`${adminPath}/login`).post(passport.authenticate('local-login', {
        successRedirect : adminPath, 
        failureRedirect : `${adminPath}/login`, 
        failureFlash : true 
    }));

   

    // 회원가입 인증
    router.route(`${adminPath}/signup`).post(passport.authenticate('local-signup', {
        successRedirect : `${adminPath}/login`, 
        failureRedirect : `${adminPath}/signup`, 
        failureFlash : true 
    }));

   

    //사용자 비밀번호 변경
    router.route(`${adminPath}/useredite`).post(function(req, res) {
        console.log('/useredite 패스 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect(adminPath);
            return;
        }

        console.log('사용자 인증')

        var paramId = req.user.email;

        var paramNewPassword = req.body.newpassword || req.query.newpassword;
        var paramPassword = req.body.password || req.query.password;

        console.log(paramPassword,paramNewPassword)
    
        var database = req.app.get('database');
        var setData = {
            password:paramNewPassword
        }
    
        // 데이터베이스 객체가 초기화된 경우
        if (database.db) {
            
            console.log("db접속");
            // 1. 아이디를 이용해 사용자 검색
            database.UserModel.update(paramId,paramPassword,setData,function(err,result){
                

                if (err) {
                    
                                      
                    res.send(JSON.stringify({ "result":false}));
                    res.end();
                    
                    return;
                }
                
                if (result) {
                    res.send(JSON.stringify({ "result":true}));
                    res.end();
                }
            })
        }
    });


    //회원 레벨 변경
    router.route(`${adminPath}/usereditelevel`).post(function(req, res) {
        
        console.log('/usereditelevel 패스 요청됨.');

        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect(adminPath);
            return;
        }

        var paramId = req.body.email || req.query.email;
        var paramLevel = req.body.level || req.query.level;

        
       
    
        var database = req.app.get('database');
        var setData = {
            level:paramLevel
        }
    
        // 데이터베이스 객체가 초기화된 경우
        if (database.db) {
            
            console.log("db접속");
            // 1. 아이디를 이용해 사용자 검색
            database.UserModel.updateprofile(paramId,setData,function(err,result){
                

                if (err) {
                    
                    req.user.info = paramInfo;
                    req.user.profileimg = paramProfileimg;
                              

                    res.send(JSON.stringify({ "result":false}));
                    res.end();
                    
                    return;
                }
                
                if (result) {
                    res.send(JSON.stringify({ "result":true}));
                    res.end();
                }
            })
        }
    });
 
    
};