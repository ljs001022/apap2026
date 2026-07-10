var USE9 = {
	scrollOff:function(){
		$(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
			e.preventDefault();
			return;
		});
		$(window).on("keydown.disableScroll", function(e) {
			var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
			for (var i = 0; i < eventKeyArray.length; i++) {
				if (e.keyCode === eventKeyArray [i]) {
					e.preventDefault();
					return;
				}
			}
		});
	}
	,scrollOn:function(){
		 $(window).off(".disableScroll");
	}
	,getUrlVars:function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	,getUrlVar:function(name){
		return USE9.getUrlVars()[name];
	}
	,setUrlVar:function(name,value){
		var url = window.location.href;
		if(USE9.getUrlVar(name))
		{
			url = url.replace(name+"="+USE9.getUrlVar(name),name+"="+value) ;
		}else
		{
			url += "&"+name+"="+value;
		}
		return url;
	}
	,get_share_link_url:function(sns_type){
		var url = "";
		

		if(location.pathname =="/mobile/index.asp"){
			url = "http://guesstheday.co.kr/#/?pagename=collection";
		}else if(location.pathname =="/mobile/video.asp"){
			url = "http://guesstheday.co.kr/#/?pagename=video";
		}else if(location.pathname =="/mobile/lookbook.asp"){
			url = "http://guesstheday.co.kr/#/?pagename=lookbook";
		}else if(location.pathname =="/mobile/event.asp"){
			url = "http://guesstheday.co.kr/#/?pagename=collection";
		}else if(location.pathname =="/mobile/info.asp"){
			url = "http://guesstheday.co.kr/#/?pagename=storeinfo";
		}else{
			url = location.href;
		}

		url  = url.replace("#","%23");
		url  = url.replace(/&/gi,"%26");


		
		var share_url;	
		if(sns_type == "fb"){
			share_url ='http://www.facebook.com/sharer.php?t=GUESSTHEDAY&u=' + url;
		}else if(sns_type == "ka"){
			share_url =url;
		}
		
		return share_url;
	}
	,getScreenType:function(){
		var type = ""
		if($(window).width()>=980){
			type = "desktop";
		}else{
			type = "mobile";
		}
		return type;

	}

	//함수에 배열을 넣어주면 가장 적은 value의 인덱스값을 리턴
	,getMinArrayNum:function(ary){
		var minNum = Math.min.apply(Math, ary);
		var returnValue = 0;
		console.log(minNum+"min num");
		$.each(ary, function( index, value ) {
			console.log(value+"///"+minNum+"min num");
			if(value==minNum){
				returnValue=index;
				return false
			}
		});

		return returnValue;
	}
	,getInternetExplorerVersion:function() {    
         var rv = -1; // Return value assumes failure.    
         if (navigator.appName == 'Microsoft Internet Explorer') {        
              var ua = navigator.userAgent;        
              var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
              if (re.exec(ua) != null)            
                  rv = parseFloat(RegExp.$1);    
             }    
         return rv; 
    }
    ,htmlEncode:function(value){
	  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
	  //then grab the encoded contents back out.  The div never exists on the page.
	  //return $('<div/>').html(decodeURIComponent(value));
	  
	  temp = decodeURIComponent(value);
	  temp = temp.replace("+"," ");
	  console.log(temp)
	  return temp;

	}
	,getExtensionOfFilename:function(filename) {

		var _fileLen = filename.length;

		/** 
		 * lastIndexOf('.') 
		 * 뒤에서부터 '.'의 위치를 찾기위한 함수
		 * 검색 문자의 위치를 반환한다.
		 * 파일 이름에 '.'이 포함되는 경우가 있기 때문에 lastIndexOf() 사용
		 */
		var _lastDot = filename.lastIndexOf('.');

		// 확장자 명만 추출한 후 소문자로 변경
		var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();

		return _fileExt;
	}
	,htmlDecode:function(value){
      var temp = decodeURIComponent(value);
      temp = temp.replace("+"," ");
      return temp;
   }
   ,return_deviceSize:function(){
        var winW = $(window).width();
        var device = "";
        if(winW>768){
            device = "desktop";
        }else{
            device = "mobile";
        }
        return device;
	}
	,checkMobile:function(){
		var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
 
		if ( varUA.indexOf('android') > -1) {
			//안드로이드
			return "android";
		} else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
			//IOS
			return "ios";
		} else {
			//아이폰, 안드로이드 외
			return "other";
		}
	}
}

var cookieF = {
	setCookieMobile:function( name, value, expiredays ){
	   var todayDate = new Date();
	   todayDate.setDate( todayDate.getDate() + expiredays );
	   document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toUTCString() + ';'
	}
	,getCookieMobile:function(name){ 
		var obj = name + "="; 
		var x = 0;
		var endOfCookie=''; 
		while ( x <= document.cookie.length ) 
		{ 
			var y = (x+obj.length); 
			if ( document.cookie.substring( x, y ) == obj ) 
			{ 
				if ((endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
					endOfCookie = document.cookie.length;
				return unescape( document.cookie.substring( y, endOfCookie ) ); 
			} 
			x = document.cookie.indexOf( " ", x ) + 1; 
			if ( x == 0 ) 
				break; 
		} 
		return ""; 

	}
 }