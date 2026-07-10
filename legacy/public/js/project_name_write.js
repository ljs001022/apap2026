var popupOpen = function(){
    $(".layerBg").show();
}

var popupClose = function(){
    $(".layerBg").hide();
}

var onLoading = function($target){
var tempHtml = '<div class="popupLoadingLayer"><img src="/public/images/loading.svg"/></div>';
$target.append(tempHtml);
}

var offLoading = function($target){
$target.find(".popupLoadingLayer").remove();
}


PROJECT_NAME_EDITER={
    val:{
        croper_titleImg:{croper:false, width:432, height:250}
    }
    ,init:function(page){
        this.setDefaultEvent();
        this.writePost(page);
    }
    ,setDefaultEvent:function(){
        var that = this;

        var readFile = function(input,target,viewer){
			
			if (input.files && input.files[0]) {
		    	
				var reader = new FileReader();
				
				reader.onload = function () {
					
					$(viewer).show();
					
					$(viewer).attr("src",reader.result);
					var image = document.querySelector(viewer);
					//console.log(typeof target)
					if(!target.croper){
						target.croper = new Cropper(image, {
							dragMode: 'move',
							aspectRatio: target.width / target.height,
							autoCropArea: 0.9,
							restore: false,
							guides: false,
							center: false,
							highlight: false,
							cropBoxMovable: false,
							cropBoxResizable: false,
							toggleDragModeOnDblclick: false,
						});

						
					}else{
						//console.log("두번째");
						target.croper.replace(image.src);
					}
		              
				}
				

				reader.readAsDataURL(input.files[0]);
				
			}else {
				
		    }


		}

        var cropimageUpload = function(terget,cb){
			var cropImg = terget;
			$(".form-slideimg-data input[name='imgStr']").attr("value",cropImg.toDataURL());

            var form = $('.form-slideimg-data')[0];

            // Create an FormData object
            var senddata = new FormData(form);
            
			$.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
				url:'/upload/uploadCropImg',
				data: senddata,
				success:function(data){
					
					var result = jQuery.parseJSON(data);


					cb(result);
					

				},
				error:function(err){
					console.log("다시 시도해 주세요"+err);
					
				}

			})
		}


        //타이틀 이미지 등록하기
		$(".titleImageOpen").on("click",function(e){
			e.preventDefault();
			popupOpen();
			$(".titleImgupload").show();
			offLoading($(".titleImgupload"));
		})

		$('#upload_poster_titleImg').on('change', function () {console.log("poster slider");readFile(this,that.val.croper_titleImg,"#img_crop_titleImg"); });

		$(".titleImgUploadBtn").on("click",function(e){
			e.preventDefault();
			var tempTarget = that.val.croper_titleImg.croper.getCroppedCanvas({"width":432,"height":250});
			onLoading($(".titleImgupload"));
            console.log('tempTarget',tempTarget);
			cropimageUpload(tempTarget,function(result){
				
				$(".form-post-data input[name='thumbimg']").attr("value",result.img);
					
				$(".detail-preview .pop_img img").attr("src",result.img);
				$(".titleImgupload .closeBtn").trigger("click");

			});
		})

    }
    ,writePost:function(page){
        var checkValueSave = function(){
            
            //1. 카테고리 선택 확인
            if($(".form-post-data select[name='category']").val()==""){
                alert("카테고리를 선택해주세요");
                return false;
            }
			
			//2. 언어 선택 확인
			if(!$(".form-post-data input[name='lng']:checked").val()){
                alert("언어를 선택해주세요");
                return false;
            }

			//3. 타이틀 입력 확인
			if($(".form-post-data input[name='title']").val()==""){
                alert("제목을 입력해주세요");
                return false;
            }

			// 페이지 이름에 따른 분기 적용
			if (page==="페이지 이름"){
				
			}

			

            return true;
        }

        $(".postSave").on("click",function(e){
            e.preventDefault();
            
            if(checkValueSave()){

                $(".form-post-data").submit();
            }
            
        });
    }
}