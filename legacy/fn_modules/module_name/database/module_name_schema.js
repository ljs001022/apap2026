/**
 * module name를 위한 데이터베이스 스키마를 정의하는 모듈
 *
 * @date 0000-00-00
 * @author mangojang
 **/

const SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	const ModuleNameSchema = mongoose.Schema({
		category: {type: String, trim: true, require: true}		// 카테고리
		,lng: {type: String, trim: true} // 다국어  
		,title: {type: String, trim: true}		// 제목
		,thumbnail_img:{type: String, trim: true}	// 이미지 경로
		,video:{type: String, trim: true,'default':''}	// 비디오 코드
		,video_type:{type: String, trim: true,'default':''}	// 비디오 코드
		,img:{type: String, trim: true,'default':''}	// 이미지 경로
		,created_at: {type: Date, index: {unique: false}, 'default': Date.now}
		,updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

	//위치정보 인덱스 설정
	// CustomerSchema.index({geometry:'2dsphere'});
	
	
	// 스키마에 인스턴스 메소드 추가
	ModuleNameSchema.methods = {
		read: function(){
			console.log('this는',this); 
		}
	}
	
	// 관련 메소드 설정
	ModuleNameSchema.statics = {
		createOne: function (data){ //create
			console.log('create 실행');
			const video = new this(data);
			return video.save();
		}
		,findAll: function(){ //read
			console.log('find 실행');
			return this.find().exec();
		}
		,listOption: function(options){
			console.log('list 옵션 실행');
			return this.find(options.findOption)
			.sort({'created_at': -1})
			.limit(Number(options.perPage))
			.skip(options.perPage * options.page)
			.exec();
		}
		,findById: function(id){
			console.log('find id 실행');
			return this.findOne({_id:id}).exec();
		}
		,findBySort: function(options){
			console.log('findBySortOption 실행');
			return this.find(options.findOption)
			.sort(options.sortOption)
			.limit(Number(options.cnt))
			.exec();
		}
		,updateById: function(id,data){ //update
			console.log('update 실행');
			return this.updateOne({_id:id},data).exec();
		}
		,deleteById: function(id){ //delete
			console.log('delete 실행');
			return this.deleteOne({_id:id}).exec();
		}
		,prevById: function(options){
			console.log('prevById 실행');
			return this.find(options.findOption)
			.sort({'created_at': 1})
			.limit(Number(options.cnt))
			.exec();
		}
		,nextById: function(options){
			console.log('nextById 실행');
			return this.find(options.findOption)
			.sort({'created_at': -1})
			.limit(Number(options.cnt))
			.exec();
		}
		,countByOptions: function(options){
			return this.countDocuments(options).exec();
		}
		
	}
	

	return ModuleNameSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;

