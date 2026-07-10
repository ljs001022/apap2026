const {authAdmin} = require('../middlewares/middlewares');

module.exports = function(app,router){
    const adminPath = app.get('adminPath');

    //1. read
    router.get(`${adminPath}/module_name/listboard`,authAdmin,function(req,res){
        let paramPage = req.query.page || 0,
            paramPerPage = req.query.perPage || 20,
            paramCategory = req.query.cat || 'all',
            paramStr = req.query.str || '',
            paramLng = req.query.lng || 'ko';
        let categoryOpt = "",
            strOpt ='';

        let transLang = '';
        switch (paramLng) {
            case 'ko':
                transLang='국문'
                break;
            case 'en':
                transLang='영문'
                break;
            case 'cn':
                transLang='중문'
                break;
        
            default: 'ko'
                break;
        }

        if(paramCategory=="all"){
            categoryOpt = {$ne:null};
        }else{
            paramCategory = decodeURIComponent(paramCategory);
    
            paramCategory = paramCategory.split(",");
            paramCategory.pop();
    
            categoryOpt = {$in:paramCategory};
        }

        strOpt = {'$regex': paramStr}

            
        const database = req.app.get('database');

        if(database.db){
            const options = {
                page: paramPage, 
                perPage: paramPerPage,
                findOption:{
                    category:categoryOpt,
                    title:strOpt,
                    lng:paramLng
                }
            };
            database.moduleNameModel.listOption(options)
            .then(results => {
                database.SelftourModel.count(options.findOption).exec(function(err, count) {
                    let context = {
                        page_name:"selftourlist",
                        category01:"셀프투어",
                        category02:`컨텐츠 관리 (${transLang})`,
                        posts: results,
                        page: parseInt(paramPage),
                        pageCount: Math.ceil(count / paramPerPage),
                        perPage: paramPerPage, 
                        totalRecords: count,
                        lng: paramLng,
                        user:req.user,
                        rootpath: adminPath
                    }
                    res.render('./admin/module_name/listboard.ejs',context);
                });    

            })
            .catch(err => res.status(500).send(err));  
        } 
        
    })

    //2. create 
    router.get(`${adminPath}/module_name/write`,authAdmin,function(req,res){
        const context = {
            page_name:"",
            category01:"",
            category02:"",
            posts:'',
            user:req.user,
            rootpath: adminPath,
            postpath: `${adminPath}/selftmodule_nameour/write`
        }

        res.render('./admin/module_name/listpost.ejs',context);
    })

    router.post(`${adminPath}/module_name/write`,authAdmin,function(req,res){
        const database = req.app.get('database');
        
        //1. 카테고리 검사
        if(!req.body.category){
            return res.status(500).json({ result: false , message: "카테고리 정보가 없습니다."});
        }
        //2. 비디오 코드 검사
        // if(!req.body.video){
        //     return res.status(500).json({ result: false , message: "비디오 코드 정보가 없습니다."});
        // }

        if(database.db){
            const data = {
                category: req.body.category
                ,title: req.body.title
                ,lng: req.body.lng
                ,thumbnail_img: req.body.thumbimg
                ,img: req.body.img
                ,video: req.body.video
                ,video_type: 'vimeo'
            }

            database.SelftourModel.createOne(data)
            .then(results => {
                // res.json({ result: true, message: "추가 성공" });
               return res.redirect(`${adminPath}/module_name/listboard?page=0&perPage=20&lng=${req.body.lng}&cat=all&str=%20`)
            })
            .catch(err => res.status(500).send(err));
        }
        
    })

    //3.update
    router.get(`${adminPath}/module_name/show/:postid`,authAdmin,function(req,res){
        const postId = req.params.postid; 
        if(!postId){
            return res.redirect(`${adminPath}/module_name/listboard?page=0&perPage=20&lng=ko&cat=all&str=%20`);
        }
        const database = req.app.get('database');
        if (database.db){
            database.SelftourModel.findById(postId)
            .then(results=>{
                let context = {
                    page_name:"",
                    category01:"",
                    category02:"",
                    posts: results,
                    user:req.user,
                    rootpath: adminPath,
                    postpath: `${adminPath}/module_name/show/${postId}`
                }
                res.render('./admin/module_name/listpost.ejs',context);
                
            })
            .catch(err => res.status(500).send(err));  
        }
    })

    router.post(`${adminPath}/module_name/show/:postid`,authAdmin,function(req,res){
        const postId = req.params.postid; 
        if(!postId){
            return res.redirect(`${adminPath}/module_name/listboard`);
        }
        const database = req.app.get('database');
        if (database.db){
            const data = {
                category: req.body.category
                ,title: req.body.title
                ,lng: req.body.lng
                ,thumbnail_img: req.body.thumbimg
                ,img: req.body.img
                ,video: req.body.video
                ,video_type: ''
                ,updated_at: new Date()
            }
            database.SelftourModel.updateById(postId,data)
            .then(results => {
                // res.json({ result: true, message: "추가 성공" });
                return res.redirect(`${adminPath}/module_name/listboard?page=0&perPage=20&lng=${req.body.lng}&cat=all&str=%20`)
            })
            .catch(err => res.status(500).send(err));
        }
    });

    //4. delete 
    router.post(`${adminPath}/module_name/delete`,authAdmin,function(req,res){
        const database = req.app.get('database');
        const postId = req.body.postid;
        if(database.db){
            database.SelftourModel.deleteById(postId)
            .then(results =>{
                return res.json({ result: true, message: "삭제 성공" });
            })
            .catch(err => res.status(500).send(err));
        }
    })
}