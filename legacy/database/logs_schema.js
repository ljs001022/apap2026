


var SchemaLogsObj = {};

SchemaLogsObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var LogsSchema = mongoose.Schema({
		email: {type: String, 'default':''},
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    ip: {type: String, 'default':''},
	    action:{type: String, 'default':''}
	});

		
	// 필수 속성에 대한 'required' validation
	LogsSchema.path('email').required(true,  '아이디는 필수 입니다.');
	
	// 스키마에 인스턴스 메소드 추가
	LogsSchema.methods = {

		savelogs: function(callback) {		
			console.log(this);
			var self = this;
			this.save(callback);
		}
	}
	
	LogsSchema.statics = {
		load: function(options,callback) {
			this.find(options).limit(50).sort({'created_at': -1}).exec(callback);
		}
	}


	
	console.log('LogsSchema 정의함.');

	return LogsSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaLogsObj;

