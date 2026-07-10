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
	,setUrlVarInUrl:function(URL,name,value){
		var url = URL;
		if(USE9.getUrlVar(name))
		{
			url = url.replace(name+"="+USE9.getUrlVar(name),name+"="+value) ;
		}else
		{
			url += "&"+name+"="+value;
		}
		return url;
	}
	,setUrlVarInUrlTure:function(URL,name,value){
		var url = URL;
		if(USE9.getUrlVar(name))
		{
			url = url.replace(name+"="+USE9.getUrlVar(name),name+"="+value) ;
		}
		return url;
	}
	,get_share_link_url:function(sns_type,title,targetURL){
		var url = targetURL || location.href;

		url  = url.replace("#","%23");
		url  = url.replace(/&/gi,"%26");


		
		var share_url;	
		if(sns_type == "fb"){
			
			share_url ='http://www.facebook.com/sharer/sharer.php?t='+title+'&u='+url;
		}else if(sns_type == "tw"){
			share_url ='https://twitter.com/intent/tweet?text='+title+'&url='+url;
		}
		
		return share_url;
	}
	,goto_share_link:function(sns_type,title,targetURL){
		var that = this;
		var url = that.get_share_link_url(sns_type,title,targetURL);

		var pWidth = 640;
		var pHeight = 380;
		var pLeft = 100;
		var pTop = 100;
		window.open(url,'','width='+ pWidth +',height='+ pHeight +',left='+ pLeft +',top='+ pTop +',location=no,menubar=no,status=no,scrollbars=no,resizable=no,titlebar=no,toolbar=no');

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
    ,htmlDecode:function(value){
			  
		var temp = decodeURIComponent(value);
		temp = temp.replace("+"," ");
		return temp;

	}
}