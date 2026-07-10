

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

var removeObj = "";
var removeObject = function(){
	if(removeObj){
		$(removeObj).remove();
	}
	
}
$(document).ready(function() {
	  $(".nonelink").on("click",function(e){
	  	e.preventDefault();
	  })
	 
  
  // var tempNode = $("<a href='#'>test</a>")[0]
  // $('#summernote').summernote('insertNode', tempNode);
  //$('#summernote').summernote('insertImage', "http://localhost/uploadimg/testfile.jpeg", "test");
  $(".contents_popup .closeBtn").on("click",function(e){
  	e.preventDefault();
  	popupClose();
  	$(this).parents(".contents_popup").hide();
  })

  

  $(".imgUploadBtn").on("click",function(e){
	  	
	  	e.preventDefault();					
	  	var fileNm = $(".form-imgupload input[name='uploadImage']").val();
			
		if (fileNm != "") {
		 
		    var ext = fileNm.slice(fileNm.lastIndexOf(".") + 1).toLowerCase();
		 
		    if (!(ext == "gif" || ext == "jpg" || ext == "png")) {
		        alert("이미지파일 (.jpg, .png, .gif ) 만 업로드 가능합니다.");
		        return false;
		    }
		 
		}else{
			alert("이미지 파일을 등록해 주세요");
			return false;
		}

		
		var form = $('.form-imgupload')[0];

		// Create an FormData object
        var data = new FormData(form);

		// If you want to add an extra field for the FormData
        

		// disabled the submit button
		onLoading($(".imguploadpopup"))

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/upload/uploadImage",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {

            	var result = jQuery.parseJSON(data);
                console.log(result);

                var tempNode = $("<p><img src='"+result.fileSrc+"'/><br/><span>"+result.info+"</span></p>")[0]
     			//	$('#summernote').summernote('saveRange');
 				// $('#summernote').summernote('insertNode',tempNode);			                
 				setTimeout(function(){
 					$('#summernote').summernote('insertImage',result.fileSrc);
 					//$('#summernote').summernote('insertNode',tempNode);			                
 					$(".imguploadpopup .closeBtn").trigger("click");
 				},500)
 				
                //$('#summernote').summernote('insertImage', result.fileSrc, result.info);

            },
            error: function (e) {


                console.log("ERROR : ", e);


            }
        });
  })

	$(".fileuploadpopup input[name=uploadFile]").bind( 'change', function (e){
        if( !$(this).val() ) return;
        var f = this.files[0];
        var size = f.size || f.fileSize;
        var limit = 5*1024*1024;
        //200kb
        
        //영문 숫자
        if( size > limit ){
            alert( '파일용량은 5메가를 넘을수 없습니다.' );
            $(this).val('');
            return;
        }
	            	
	});

	$(".fileUploadBtn").on("click",function(e){
	  	
	  	e.preventDefault();					
	  	var fileNm = $(".form-fileupload input[name='uploadFile']").val();
	
		if (fileNm != "") {
		 
		    var ext = fileNm.slice(fileNm.lastIndexOf(".") + 1).toLowerCase();
		 
		    if ((ext == "js")) {
		        alert("등록할수 없는 파일 형식 입니다.");
		        return false;
		    }
		 
		}else{
			alert("파일을 등록해 주세요");
			return false;
		}

		
		var form = $('.form-fileupload')[0];

		// Create an FormData object
        var data = new FormData(form);

		// If you want to add an extra field for the FormData
        

		// disabled the submit button
		onLoading($(".fileuploadpopup"))

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/upload/uploadFile",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 300000,
            success: function (data) {

            	var result = jQuery.parseJSON(data);
                console.log(result);

                // var tempNode = $("<a href='"+result.fileSrc+"' class='uploadfile_link' target='_blank' donwload>"+result.filename+"</a>")[0]
     			//	$('#summernote').summernote('saveRange');
 				// $('#summernote').summernote('insertNode',tempNode);			                
 				setTimeout(function(){
 					//$('#summernote').summernote('insertImage',result.fileSrc);
 					//$('#summernote').summernote('insertNode',tempNode);
					 // $(".filelist").append("<a href='"+result.fileSrc+"'>"+result.filename+"</a>")
					 $(".form-post-data input[name='mainvisual']").val(result.fileSrc)
					 $(".fileuploadpopup .closeBtn").trigger("click");
					 $(".mainVisualview").attr("src",result.fileSrc)

 					
 				},500)
 				
                //$('#summernote').summernote('insertImage', result.fileSrc, result.info);

            },
            error: function (e) {


                console.log("ERROR : ", e);


            }
        });
    })

	$(".filelist li").each(function(idx,val){
		$(val).append("<a href='#' class='btn_type10 fileDeleteBtn'>삭제</a>")
	})

	$(".filelist li .fileDeleteBtn").unbind("click").bind("click",function(e){
		e.preventDefault();
		$(this).parents("li").remove();
	})


  
  
});


GGC_EDITER = {
	val:{
		initOption:{}
		,croper_thumnail:{croper:false,width:383,height:383}
		,croper_slide:{croper:false,width:600,height:600}
		,croper_titleImg:{croper:false,width:413,height:275}
		,GGMA02:{
			1:["도민 미래 정책 오디션","청년 경기 상상워크숍","팝업투어","캠퍼스 투어","권역별 워크숍","도민창의대회","유쾌한테이블6"]
			,2:["경기도 아카이브전","청년 상상품","미디어파사드"]
			,3:["청년 DMZ 답사단","천년 배움","그레이트북스"]
			,4:["작가"]
			,5:["경기천년 기념식","경기천년 대축제","천년의 빛,천년 파티","2017 경기천년소풍","2018 경기천년소풍"]
			,6:["천년영상","천년경기 목소리 공모전","팟캐스트"]
			,7:["보도자료","언론보도","천천천 경기천년 기자단"]
		}
	}
	,init:function(option){
		console.log("ggc editer init");
		this.val.initOption = option;

		this.setDefaultEvent();
		this.writePost.init();

		this.previewUpdate();
		this.setSummerEditer();
		this.writeInfoAdd.init();
	}

	,setSummerEditer:function(){
		$('#summernote').summernote({
			placeholder: '여기에 글을 써주세요!'
			,minHeight:800
			,width:720
			,lang: "ko-KR"
			,fontSizes: ['8', '9', '10', '11', '12', '14','16', '18', '24', '36']
			,toolbar: [
				// [groupName, [list of button]]
				//['para',['style']],
				['style', ['bold']],
				['style', ['italic']],
				['style', ['underline']],
				['style', ['clear']],
				['font', ['strikethrough']],
				['color', ['color']],
				['para', ['ul']],
				['para', ['ol']],
				['para', ['paragraph']],
				['Insert',['link']],
				['Insert',['video']],
				['Insert',['table']],
				['Insert',['hr']],
				['fontsize', ['fontsize']],
				['codeview', ['codeview']]

			]
			,callbacks: {
				onPaste: function (e) {
					console.log(e);
					var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
					e.preventDefault();

					console.log(bufferText)
					$('#summernote').summernote('focus');
					$('#summernote').summernote('editor.insertText', bufferText);
				}
	    	}
			,disableDragAndDrop: true
	  	});
  
		

		$(".note-resizebar").hide();
		
		$(".note-toolbar").append("<div class='note-btn-group btn-group note-Insert'><a href='#' class='editerImg uploadImg'><i class='note-icon-picture'></i></a></div>");
		$(".note-toolbar").append("<div class='note-btn-group btn-group note-Insert'><a href='#' class='editerImg addTextBox'>ㅁ</a></div>");
		// $(".note-toolbar").append("<div class='note-btn-group btn-group note-Insert'><a href='#' class='editerImg uploadFile'>upload</a></div>");
		//$(".note-toolbar").append("<div class='note-btn-group btn-group note-Insert'><a href='#' class='editerImg uploadArt'>작품</a></div>");
		 // $(".note-toolbar").append("<div class='note-btn-group btn-group note-Insert'><a href='#' class='editerImg uploadEmot'>이모티콘</a></div>");

		// 일반 이미지 업로드
		$(".uploadImg").on("click",function(e){
			e.preventDefault();
			$(".imguploadpopup").show();
			popupOpen();
			offLoading($(".imguploadpopup"));

			$(".form-imgupload input[name='uploadImage']").val("");
		})

		$(".addTextBox").on("click",function(e){
			e.preventDefault();
			var tempHtml = '<div class="cont_container"><div class="cell"><p class="text"><span style="font-size: 16px;">여기에 내용을 작성 하시면 됩니다.</span><span style="font-size: 16px;"><span style="font-size: 16px;"><br/><b>굵은 텍스트</b></span></span></p></div></div>'

			$('#summernote').summernote('pasteHTML', tempHtml);
		})

		//파일 업로드
		$(".mainVisualUploadBtn").on("click",function(e){
			e.preventDefault();
			 $(".fileuploadpopup").show();
			 popupOpen();

			 offLoading($(".fileuploadpopup"));

			 $(".form-fileupload input[name='uploadFile']").val("");
			//alert("오류 수정중입니다.");
		})

		$(".uploadArt").on("click",function(e){
			e.preventDefault();
			alert("오류 수정중입니다.");
		})

		$(".uploadEmot").on("click",function(e){
			e.preventDefault();
			$(".emotupload").show();
			popupOpen();
		})

		$(".emotupload ul a").on("click",function(e){
			e.preventDefault();
			var imgsrc = $(this).find("img").attr("src");

			var tempNode = $("<p class='emoticon'><img src='"+imgsrc+"'/></p>")[0];
			//	$('#summernote').summernote('saveRange');
			// $('#summernote').summernote('insertNode',tempNode);			                
			setTimeout(function(){
				//$('#summernote').summernote('insertImage','/ggcnew/images/emot/01.png');
				$('#summernote').summernote('insertNode',tempNode);			                
				$(".emotupload .closeBtn").trigger("click");
			},500)
		})

		$(".fileuploadBtn").on("click",function(e){
			e.preventDefault();
			$(".fileuploadpopup").show();
			popupOpen();
			offLoading($(".fileuploadpopup"));
			$(".form-fileupload input[name='uploadFile']").val("");
			//alert("오류 수정중입니다.");
		})
	}


	,setDefaultEvent:function(){
		var that = this;
		console.log(that.val.initOption.curCategory)
		if(that.val.initOption.curCategory!=""){
			$(".category_select").val(that.val.initOption.curCategory);
		}

		if(that.val.initOption.curAge!=""){
			$(".age_select").val(that.val.initOption.curAge);
		}


		/* 미리보기 update*/		
		$(".form-post-data input[name='title']").on("change",function(e){
			that.previewUpdate();			
		})

		$(".form-post-data input[name='subcategory']").on("change",function(e){
			that.previewUpdate();			
		})

		$(".subtitle_area").on("change",function(e){
			that.previewUpdate();			
		})

		$(".form-post-data input[name='age']").on("change",function(e){
			that.previewUpdate();			
		})

		$(".form-post-data input[name='inquiry']").on("change",function(e){
			that.previewUpdate();			
		})

		$(".age_select").on("change",function(e){
			that.previewUpdate();			
		})

		$(".category_select").on("change",function(e){
			that.previewUpdate();			
		})

	

	
		$.datepicker.setDefaults({
	        dateFormat: 'yy.mm.dd',
	        prevText: '이전 달',
	        nextText: '다음 달',
	        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	        
	        
	    });
		/* 기간 설정  */

		//$(".date_input").datepicker();
		var rangeDate = 31; // set limit day
		var setSdate, setEdate;
		$("#popupDatepicker").datepicker({
		    dateFormat: 'yy.mm.dd',
		    changeMonth: true,
      		changeYear: true,
		    onSelect: function(selectDate){
		        var stxt = selectDate.split("-");
		            stxt[1] = stxt[1] - 1;
		        var sdate = new Date(stxt[0], stxt[1], stxt[2]);
		        var edate = new Date(stxt[0], stxt[1], stxt[2]);
		            edate.setDate(sdate.getDate() + rangeDate);

		        $('#popupDatepicker1').datepicker('option', {
		            minDate: selectDate,
		            beforeShow : function () {
		                $("#to").datepicker( "option", "maxDate", edate );
		                setSdate = selectDate;
		                //console.log(setSdate)
		        }});
		        //to 설정

		        that.previewUpdate();


		    }
		    //from 선택되었을 때
		});

		$("#popupDatepickerIng").datepicker({
		    dateFormat: 'yy.mm.dd',
		    changeMonth: true,
      		changeYear: true,
		    onSelect: function(selectDate){
		        var stxt = selectDate.split("-");
		            stxt[1] = stxt[1] - 1;
		        var sdate = new Date(stxt[0], stxt[1], stxt[2]);
		        var edate = new Date(stxt[0], stxt[1], stxt[2]);
		            edate.setDate(sdate.getDate() + rangeDate);

		        $('#popupDatepickerIng1').datepicker('option', {
		            minDate: selectDate,
		            beforeShow : function () {
		                $("#to").datepicker( "option", "maxDate", edate );
		                setSdate = selectDate;
		                //console.log(setSdate)
		        }});
		        //to 설정

		        that.previewUpdate();


		    }
		    //from 선택되었을 때
		});

		$("#popupDatepicker1").datepicker({
		    dateFormat: 'yy.mm.dd',
		    changeMonth: true,
      		changeYear: true,
		    onSelect : function(selectDate){
		        setEdate = selectDate;
		        //console.log(setEdate)
		        that.previewUpdate();
		    }
		});

		$("#popupDatepickerIng1").datepicker({
		    dateFormat: 'yy.mm.dd',
		    changeMonth: true,
      		changeYear: true,
		    onSelect : function(selectDate){
		        setEdate = selectDate;
		        //console.log(setEdate)
		        that.previewUpdate();
		    }
		});

		$("#popupDatepicker2").datepicker({
		    dateFormat: 'yy.mm.dd',
		    changeMonth: true,
      		changeYear: true
		    
		});

		$(".ggma_category01").on("change",function(e){
			
			if($(this).val()==0){
				$('.ggma_category02').hide();
				return;
			}
			var category02 = that.val.GGMA02[$(this).val()];
			$('.ggma_category02').show();
			$('.ggma_category02 option').remove();
			$.each(category02,function(idx,value){
				$('.ggma_category02').append('<option value="'+(idx+1)+'">'+value+'</option>');
			})
			

		});

		/***************ggma 2차 카테고리*********************/
		if($(".ggma_category01").attr("data")!=0){
			$(".ggma_category01").val($(".ggma_category01").attr("data"));
			$(".ggma_category01").trigger("change");
			$(".ggma_category02").val($(".ggma_category02").attr("data"));
		}

		/************ 사진등록 *****************/

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
			$(".form-thumimg-data input[name='imgStr']").attr("value",cropImg.toDataURL());

			$.ajax({
				url:'/upload/uploadCropImg',
				type:'POST',
				data:$(".form-thumimg-data").serialize(),
				success:function(data){
					
					var result = jQuery.parseJSON(data);


					cb(result);
					

				},
				error:function(err){
					console.log("다시 시도해 주세요"+err);
					
				}

			})
		}

		

		//썸네일 이미지 등록하기

		$(".thumUploadOpen").on("click",function(e){
			e.preventDefault();
			popupOpen();
			$(".thumupload").show();
			offLoading($(".thumupload"));
		})

		$('#upload_poster').on('change', function () {readFile(this,that.val.croper_thumnail,"#img_crop_eogo"); });

		$(".thumUploadBtn").on("click",function(e){
			e.preventDefault();
			console.log(that.val.croper_thumnail)
			var tempTarget = that.val.croper_thumnail.croper.getCroppedCanvas({"width":383,"height":383});
			onLoading($(".thumupload"));
			cropimageUpload(tempTarget,function(result){
				$(".form-post-data input[name='thumimg']").attr("value",result.img);
					
				$(".list-preview .target .thum").css("background-image","url('"+result.img+"'");
				$(".thumupload .closeBtn").trigger("click");
				
			});
		})

		//슬라이드 이미지 등록하기

		$(".slideUploadOpen").on("click",function(e){
			e.preventDefault();
			popupOpen();
			$(".slideupload").show();
			offLoading($(".slideupload"));
		})

		$('#upload_poster_slider').on('change', function () {console.log("poster slider");readFile(this,that.val.croper_slide,"#img_crop_slider"); });

		$(".slideUploadBtn").on("click",function(e){
			e.preventDefault();
			var tempTarget = that.val.croper_slide.croper.getCroppedCanvas({"width":600,"height":600});
			onLoading($(".slideupload"));
			cropimageUpload(tempTarget,function(result){
				
				$(".form-post-data input[name='slideimg']").attr("value",result.img);
					
				$(".slide-preview .target .thum").css("background-image","url('"+result.img+"'");
				$(".slideupload .closeBtn").trigger("click");
				
			});
		})

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
			var tempTarget = that.val.croper_titleImg.croper.getCroppedCanvas({"width":413,"height":275});
			onLoading($(".titleImgupload"));
			cropimageUpload(tempTarget,function(result){
				
				$(".form-post-data input[name='titleImg']").attr("value",result.img);
					
				$(".detail-preview .pop_img img").attr("src",result.img);
				$(".titleImgupload .closeBtn").trigger("click");

			});
		})

		
	}

	,previewUpdate:function(){
		//console.log($(".form-post-data input[name='title']").val())

		var subCategory = ""
		if($(".category_select").val()!=""){
			subCategory = "["+$(".category_select").val()+"] ";
		}
		 
		var prevTitle = subCategory+$(".form-post-data input[name='title']").val();

		var prevSubtitle = $(".form-post-data input[name='start_date']").val()+"-"+$(".form-post-data input[name='last_date']").val();
		var prevAge = $(".form-post-data input[name='age']").val()

		
		var prevDate = "";

		if($(".form-post-data input[name='start_date']").val()==$(".form-post-data input[name='last_date']").val()){
			prevDate = $(".form-post-data input[name='start_date']").val()+" / ";
		}else if($(".form-post-data input[name='start_date']").val()!=""){
			prevDate = $(".form-post-data input[name='start_date']").val()+"-"+$(".form-post-data input[name='last_date']").val()+" / ";
		}

		//console.log(prevDate)
		$(".list-preview .target .tit").html(prevTitle);
		$(".list-preview .target .on_going_des").html(prevSubtitle)


		$(".detail-preview .tit").html(prevTitle)
		$(".detail-preview .sublist li").eq(0).html("<span class='list_tit'>일정</span>"+prevSubtitle)
		$(".detail-preview .sublist li").eq(1).html("<span class='list_tit'>대상</span>"+$(".age_select").val())
		$(".detail-preview .sublist li").eq(2).html("<span class='list_tit'>문의</span>"+$(".form-post-data input[name='inquiry']").val())
		$(".detail-preview .txt").html($(".subtitle_area").val())
		// $(".slide-preview .target p").html(prevTitle)
		// $(".titleBlock .tit").html(prevTitle);
		// $(".titleBlock .date").html(prevDate + prevSubtitle);
	}

	,writePost:{
		init:function(){
			this.setEvent();
		}
		,setEvent:function(){
			var checkValueSave = function(){
				$(".form-post-data input[name='contents']").attr("value",$('#summernote').summernote('code'));
				$(".form-post-data input[name='category']").attr("value",$(".category_select").val())
				$(".form-post-data input[name='age']").attr("value",$(".age_select").val())
				$(".form-post-data input[name='ggma_category01']").attr("value",$(".ggma_category01").val())
				$(".form-post-data input[name='ggma_category02']").attr("value",$(".ggma_category02").val())
				$(".form-post-data input[name='gip_category']").attr("value",$(".gip_category").val())
					
				$(".form-post-data input[name='lng']").attr("value",$(".form-post-data input[name='lngcheck']:checked").val());
				$(".form-post-data input[name='subinfo']").attr("value",$(".wartime_report").html());

				var filelist = "";
				$(".filelist li").each(function(idx,value){
					$(value).find(".fileDeleteBtn").remove();
					filelist += "<li>"+$(value).html()+"</li>"
				})
				$(".form-post-data input[name='files']").attr("value",filelist);



				if($(".form-post-data input[name='title']").val()==""){
					alert("제목을 입력 해 주세요");
					return false;
				}

				//console.log($(".form-post-data input[name='gip_category']").val()+"카테고리 저장")

				return true;
			}

			$(".postSave").on("click",function(e){
				e.preventDefault();
				
				if(checkValueSave()){

					$(".form-post-data input[name='savetype']").attr("value","submit");
					$(".form-post-data").submit();
				}
				
			});

			$(".postSaveAjax").on("click",function(e){
				e.preventDefault();
				
				if(checkValueSave()){
					
					$(".form-post-data input[name='savetype']").attr("value","ajax");
					var formData = $('.form-post-data').serialize();

					// Create an FormData object
					//$(".form-post-data input[name='contents']").attr("value",$('#summernote').summernote('code'));
			        
					//console.log(formData)
			        //여기오류 페이지에서 데이터 못받음

			        $.ajax({
			            type: "POST",
			            url: "/edupost/addpost",
			            data: formData,
			            datatype:"json",
			            success: function (data){
			            	var result = jQuery.parseJSON(data);
			                if(result.result){
			                	var d = new Date();
			                	$(".postSaveAjax span").html(d.getHours()+"시 "+d.getMinutes()+"분 "+d.getSeconds()+"초 저장");

			                	$(".filelist li").each(function(idx,val){
									$(val).append("<a href='#' class='btn_type10 fileDeleteBtn'>삭제</a>")
								})
			                }
			            },
			            error: function (e) {
			                console.log("ERROR : ", e);
			            }
			        });

				}
			})
		}
	}

	,writeInfoAdd:{
		init:function(){
			this.setEvent();
			this.resetEvent();
		}
		,setEvent:function(){
			var that = this;
			console.log("writeInfoAdd setEvent")
			$(".infoAdd").on("click",function(e){
				e.preventDefault();
				popupOpen();
				$(".infoaddPopup").show();
			})

			$(".infoAddBtn").on("click",function(e){
				e.preventDefault();
				console.log("addinfo")

				var tempAlign = $(".form-infowrite input[name='alignChk']:checked").val();
				var tempTitle = $(".form-infowrite input[name='title']").val();
				console.log(tempTitle)
				var tempInfo = "";
				if($(".form-infowrite input[name='info']").val()!=""){
					tempInfo = "/ "+$(".form-infowrite input[name='info']").val();
				}
				var tempHtml = "<p><span>"+tempTitle+"</span>"+tempInfo+"</p>";

				var $target;
				if(tempAlign=="left"){
					$target = $(".wartime_report ul li").eq(0);
				}else{
					$target = $(".wartime_report ul li").eq(1);
				}

				$target.append(tempHtml);

				$(".form-infowrite input[name='title']").val("");
				$(".form-infowrite input[name='info']").val("");
				// $(".infoaddPopup .closeBtn").trigger("click");

				that.resetEvent();
			});

			
		}
		,resetEvent:function(){
			$(".wartime_report li p").off("mouseenter");
			$(".wartime_report li p").off("mouseleave");
			$(".wartime_report li p").on("mouseenter",function(e){
				e.preventDefault();
				console.log("enter");
				var $target = $(this);
				removeObj = this;

				$target.css({"background":"#093c71","color":"#fff"});
				$target.append('<a href="#" class="btn_type03" onclick="removeObject();return false">-</a>');
			})

			$(".wartime_report li p").on("mouseleave",function(e){
				e.preventDefault();
				console.log("leave");
				var $target = $(this);

				removeObj = null;

				$target.css({"background":"#fff","color":"#093c71"});
				$target.find("a").remove();
			})
		}
	}
}
