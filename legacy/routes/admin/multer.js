
const multer = require('multer');
const uniqueFilename = require('unique-filename');
const sizeOf = require('image-size');
const Jimp = require("jimp");
const fs = require('fs');

const {authAdminMulter} = require('../modules/middlewares');


module.exports = function(app,router){
    try{
        fs.readdirSync('uploads');
    }catch(error){
        fs.mkdirSync('uploads');
    }

    try{
        fs.readdirSync('uploads/origin');
    }catch(error){
        fs.mkdirSync('uploads/origin');
    }

    try{
        fs.readdirSync('uploads/resize');
    }catch(error){
        fs.mkdirSync('uploads/resize');
    }

    try{
        fs.readdirSync('uploads/croper');
    }catch(error){
        fs.mkdirSync('uploads/croper');
    }

    try{
        fs.readdirSync('uploads/file');
    }catch(error){
        fs.mkdirSync('uploads/file');
    }
    
    const storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, 'uploads/origin/');
        },
    
        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            var milliseconds = new Date().getTime()
            var filename = uniqueFilename('')+milliseconds;
    
    
            console.log(filename);
            file.uploadedFile = {
                name: filename,
                ext: file.mimetype.split('/')[1]
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    })
    const upload = multer({ storage: storage })
    
    const storage_file = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/file/')
      },
      filename: function (req, file, cb) {
        var filename = file.originalname.split('.')[0]+'_'+Date.now()
        var ext = file.originalname.split('.')[1]
        cb(null, filename+'.'+ext)
      }
    })
    
    const upload_file = multer({ storage: storage_file,limits:{ fileSize: 10 * 1024 * 1024 } }) //10MB 제한



//1. 이미지 업로드
//1-1. 기본 
    router.post('/upload/uploadImage', authAdminMulter, upload.single('uploadImage'), function(req, res){
        

        //console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.

        var fileinfo = req.body.imageInfo;

        var ofile = req.file.filename;

        //console.log(path.join(appRoot, 'uploads/')+ofile);

        // im.convert([path.join(appRoot, 'uploads/')+ofile, '-resize', '25x120', path.join(appRoot, 'uploads/thum/')+ofile], 
        // function(err, stdout){
        //   if (err) throw err;
        //   console.log('stdout:', stdout);
        // });

        var imgWidth = "auto";

        sizeOf("uploads/origin/"+ofile, function (err, dimensions) {
          if(dimensions.width>700){
            imgWidth = 700;
            
          }

          Jimp.read("uploads/origin/"+ofile).then(function (imagefile) {
            console.log(imagefile);
            if(imgWidth!="auto"){
                imagefile.resize(imgWidth, Jimp.AUTO);            // resize 
            }            
            imagefile.quality(90);                 // set JPEG quality 
            imagefile.write("uploads/resize/"+ofile); // save 

            //DB 저장

            //json 반환
            res.send(JSON.stringify({ "fileSrc":"/uploadimg/resize/"+ofile,"info":fileinfo}));

          }).catch(function (err) {
            console.error(err);
          });     
        });
 

    });
//1-2. crop 된 이미지
    router.post('/upload/uploadCropImg', authAdminMulter, upload.none(), function(req,res){
        //res.send('Uploaded! : '+req.file); // object를 리턴함
        // console.log(req.query.testdata)
        //res.send('testdata='+req.query.testdata)
        //res.send('testdata='+req.body.namei)
        //console.log(req.body.imgStr);
        
        console.log("/upload/uploadCropImg 호출");
        

        var milliseconds = new Date().getTime();
        var filename = uniqueFilename('')+milliseconds;

       
        var img = req.body.imgStr;


        var data = img.replace(/^data:image\/\w+;base64,/, "");

        
        var buf = new Buffer(data, 'base64');

       

        Jimp.read(buf,function(err,lenna){

            lenna.quality(100).write('uploads/croper/'+filename+'.jpg');
            res.send(JSON.stringify({sucess:true,img:'/uploadimg/croper/'+filename+'.jpg'}));
        });
        //fs.writeFile('public/uploads/image'+imgMakeNum+'.png', buf);
        
  

        //res.send('Uploaded! : '+req.body); // object를 리턴함
      //console.log(req.body); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
      // if(req.xhr || req.accepts('json,html')==='json'){
      //   res.send({sucess:true});
      // }
    });



//2. file 업로드 
    router.post('/upload/uploadFile', authAdminMulter, upload_file.single('uploadFile'), function(req, res){

        //console.log("/upload/uploadFile");
        //console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.

        var fileinfo = req.body.imageInfo;

        var ofile = req.file.filename;

        // console.log(path.join(appRoot, 'uploads/')+ofile);


       res.send(JSON.stringify({ "fileSrc":"/uploadimg/file/"+ofile,"filename":ofile,"info":fileinfo}));
 

    });


}