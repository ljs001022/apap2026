
const {authAdmin} = require('../modules/middlewares');

module.exports = function(app,router){
    const adminPath = app.get('adminPath');


    router.get(`${adminPath}/adminlogs`,authAdmin,function(req,res){

        if(req.user.level != 9){
            console.log('접근 권한 없음');
            res.redirect(adminPath);
            return; 
        }
    
        var database = req.app.get('database');
        if (database.db) {
            var options={}

            var defulatObj = function(results){
                let obj={
                    page_name:"logs",
                    user:req.user,
                    result:results,
                    rootpath:adminPath
                }
                return obj;
            }
            
    
            database.LogsModel.load(options, function(err, results) {
                res.render('./admin/adminlogs.ejs',defulatObj(results));
                res.end();
            })
        }
    
        
    });
    
}

