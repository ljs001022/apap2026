const config = require('./config');
const routers = require('./routers');

module.exports= function(app,router){
    const appconfig= app.get("config");
    //1. router 연결
    routers(app, router);
    //2. db 연결
  for (var j = 0; j < config.db_schemas.length; j++) {
		var databaseSchema = config.db_schemas[j];
		appconfig.db_schemas.push(databaseSchema);
	}
}