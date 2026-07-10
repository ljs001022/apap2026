/**
 * 패스포트 설정 파일
 * 
 * 로컬 인증방식을 사용하는 패스포트 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true   // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
	}, function(req, email, password, done) { 
		//console.log('passport의 local-login 호출됨 : ' + email + ', ' + password);

		if(req.session.loginFails>4){
			
			//return done(null, false, req.flash('loginMessage', '5회이상 실패 - 3분후 다시 시도해주세요'));
			
			if((req.session.loginFailTime-Date.now())>-30000){
				return done(null, false, req.flash('loginMessage', '5회이상 실패 - 잠시 후 다시 시도해주세요'));
			}
				
		}
		
		var database = req.app.get('database');
	    database.UserModel.findOne({ 'email' :  email }, function(err, user) {
	    	if (err) { return done(err); }

	    	// 등록된 사용자가 없는 경우
	    	if (!user) {
	    		// console.log('계정이 일치하지 않음.');
	    		return done(null, false, req.flash('loginMessage', '등록된 계정이 없습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
	    	}
	    	
	    	// 비밀번호 비교하여 맞지 않는 경우
			var authenticated = user.authenticate(password, user._doc.salt, user._doc.hashed_password);
			if (!authenticated) {
				// console.log('비밀번호 일치하지 않음.');

				if(!req.session.loginFails){
					req.session.loginFails = 0;
				}
				req.session.loginFails = req.session.loginFails+1;
				req.session.loginFailTime = Date.now();

				console.log(req.session.loginFails,req.session.loginFailTime)

				return done(null, false, req.flash('loginMessage', '비밀번호가 일치하지 않습니다.'));  // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리


			}

			if(user.level==9){
				if (database.db) {


		            
		            var ip = req.headers['x-forwarded-for'] || 
		            		 req.connection.remoteAddress || 
					         req.socket.remoteAddress || 
					         req.connection.socket.remoteAddress;

		            var LogData = {
		            	email:user.email
		            	,action:'관리자 로그인'
		            	,ip:ip
		            }

		           	

		            //if(ip == "::ffff:220.94.234.239" || ip == "::ffff:110.9.81.85"){
		            // if(ip == "::ffff:220.94.234.239" || req.headers.host=='localhost'){

		            	var logs =  new database.LogsModel(LogData);
			            logs.savelogs(function(err, result) {
			            	console.log(err);
			            	console.log("log save",LogData);
			            })

		            	return done(null, user);

		            // }else{

		            // 	return done(null, false, req.flash('loginMessage', '관리자는 외부 접속이 차단 됩니다.')); 
		            // }
		            
		        }
			}else{
				// 정상인 경우
				console.log('계정과 비밀번호가 일치함.');
				// if(!user.level){
				// 	user.level = 4;
				// }
				
				return done(null, user);  // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
			}
			
			
	    });

	});

