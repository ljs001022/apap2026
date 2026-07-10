실무에서 사용하는 boilerplate들을 정리해놓은 repository 입니다.

## branch 소개
### 1. node_ejs
 node + ejs(template engin) + less + gulp 로 구성된 boilerplate 입니다.
#### 사용방법
1. .env 설정
    + PORT : 포트 
    + NODE_ENV : dev (개발용), publish (배포용)
    + SESSION_SECRET : session secret
2. gulpfile.js 설정
    + projectName 변수를 변경하여 사용한다.
3. config 폴더
    + config.js : db, router 관련 설정 파일
        + db_url: project_name 수정하여 사용.
        + route_info
            + file: view폴더 설정. 
            + path: path설정
            + method: router method명 입력
            + type: get / post 
    + passport 폴더: passport strategy 파일 관리. local로그인, 회원가입은 기본. SNS passport는 프로젝트에 맞게 추가사용.
    + passport.js: serializeUser, deserializeUser 메소드 관리 
4. routes 폴더
    + project_name.js: 프로젝트명으로 파일명 변경하여 사용. 프론트 페이지 관련 모든 라우터 메소드 관리
    + modules 폴더
        + edo.js: 프론트 페이지 라우터 메소드에 공통으로 들어가는 객체 관리
    + admin 폴더: admin 기본 모듈 관련 라우터 메소드 관리
5. views 폴더
    + project_name 폴더 : 프로젝트명으로 파일명 변경하여 사용. ejs 파일 관리 폴더
        + include 폴더 : 페이지에 여러번 사용되는 component 단위 코드 관리
            + head : title, metatag 수정하여 사용. 필요시 링크 추가하여 사용
            + header
            + footer
        + template.ejs : page 기본 구조
    + admin 폴더 : 관리자 페이지 관리 폴더
        + includes 폴더: 페이지 공통으로 들어가는 component 단위 코드 관리
            + gnb.ejs: 프로젝트명, gnb list 모듈에 맞게 수정하여 사용.
            + head.ejs: title  프로젝트명으로 변경후 사용. project_name_write.js 파일명 변경하여 사용. 필요시 링크 추가하여 사용
        + module_name 폴더: 사용하는 모듈에따라 증감. 파일명은 모듈명으로 수정하여 사용. 
        + adminlogs.ejs: 관리자 로그 
        + login.ejs: 로그인. project_name, 프로젝트 이름 수정하여 사용.
        + signup.ejs: 회원가입
6. asset 폴더 : static 리소스 관리
    + common 폴더
        + css 폴더: web, tablet, mobile, reset less 관리 
            + libs: 라이브러리 css 관리
        + fonts 폴더: font 파일 관리
        + js 폴더: project_name 수정하여 사용. js.use9.kr.js - 회사 자주쓰는 모듈 모음
            + libs: 라이브러리 js 관리
    + images 폴더 : image 파일 관리
    + video 폴더: video 파일 관리
7. fn_modules 폴더
    + middlewares 폴더 
        + middlewares.js: 라우터 메소드애서 사용하는 미들웨어 메소드 관리
    + module_name 폴더: 관리자 페이지 연동하는 기능들을 기준으로 폴더 나누어서 관리. module_name 모듈 이름으로 변경하여 사용.
        + database 폴더 : database schema 관리
            + module_name_schema.js: module_name_schema 를 모듈 이름_schema로 변경하여 사용.
        + config.js: module_name, ModuleName 변경하여 사용.
        + routers.js: 모듈 관련 라우터 관리, read, create, update, delete 기본 기능 적용. 
        + init.js
    + init.js
8. public 폴더 
    + css, images, js 폴더: 관리자 페이지 관련 static 소스
    + og 이미지
    + favicon
        
      
    
         
            
    

