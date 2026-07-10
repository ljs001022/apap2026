const module_name = reauire('./module_name/init');

module.exports = function(app,router){
    module_name(app,router);
}