$(document).ready(function(){
	var windowResize = function(){
    //console.log("기본 높이 설정");
    var headerHeight = $("header").height();
    var footerHeight = $("footer").height();
    var minHeight = $(window).height() - headerHeight - footerHeight;
    var conWidth = $(window).width() - 210;
    if(minHeight<550)minHeight=550;
    $("article").css("min-height", minHeight);
    $(".gnb").css("min-height", minHeight);
    $(".contents").css("width", conWidth);
    $(".contents").css("min-height", minHeight);
  }
  //setTimeout(windowResize,500);
  //$(window).resize(windowResize);

  //최상단 체크박스 클릭
  $("#chk01").click(function(){
      if($("#chk01").prop("checked")){
          //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
          $("input[name=chk]").prop("checked",true);
      }else{
          //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
          $("input[name=chk]").prop("checked",false);
      }
  })
  //$("#chk01").trigger("click");
  $("input[name=chk]").click(function(){
      if($("input[name=chk]").is("checked") == false){
        $("#chk01").prop("checked",false);
      }
  })
  $(".sub_menu li").on("click", function(){
    $(".sub_menu li").removeClass("on_lnb");
    $(this).addClass("on_lnb");
  })

  $(".paging a").on("click", function(e){
    e.preventDefault();
    if($(this).hasClass("arrow_btn") == false){
      $(".paging a").removeClass("on_page");
      $(this).addClass("on_page");
    }
  })

  var tableSort = $('.dataTable').DataTable({
    paging: false,
    searching: false,
    info:false
  });

  
  tableSort
    .order( [ 5, 'desc' ] )
    .draw();
})

