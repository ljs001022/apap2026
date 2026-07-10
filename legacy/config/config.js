
/*
 * 설정
*/

module.exports = {
	db_url: 'mongodb://127.0.0.1:27017/project_name',
	db_schemas: [
		{file:'./user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'}
		,{file:'./logs_schema', collection:'logs', schemaName:'LogsSchema', modelName:'LogsModel'}
	],
	route_info: [
		{file:'./apap7', path:'/', method:'index', type:'get'}
		,{file:'./apap7', path:'/indexPub', method:'indexPub', type:'get'}
		,{file:'./apap7', path:'/exhibitionPub', method:'exhibitionPub', type:'get'}
		,{file:'./apap7', path:'/communityPub', method:'communityPub', type:'get'}
		,{file:'./apap7', path:'/aboutPub', method:'aboutPub', type:'get'}
	]
}