"use strict";

var UIevents = {
  init: function init() {
    this.selectType2Event();
    this.bodyClickEvent();
  },
  selectType2Event: function selectType2Event() {
    var selectbox = document.querySelector(".select--type2") || null;

    if (!selectbox) {
      return false;
    }

    var selected_box = selectbox.querySelector(".select--type2__selected_box");
    var options_box = selectbox.querySelector(".select--type2__options_box");
    var options = selectbox.querySelectorAll(".select--type2__option");
    selectbox.addEventListener('click', function () {
      if (options_box.style.display === 'none') {
        options_box.style.display = "block";
        this.classList.add("select--type2--active");
      } else {
        options_box.style.display = "none";
        this.classList.remove("select--type2--active");
      }
    });
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        var value = this.getAttribute('data-value');
        var option = this.getAttribute('data-option');
        selected_box.textContent = option;
        selected_box.setAttribute("data-value", value);
      });
    });
  },
  exceptedClickSelectType2: function exceptedClickSelectType2(target) {
    var selectbox = document.querySelector(".select--type2") || null;

    if (!selectbox) {
      return false;
    }

    var options_box = selectbox.querySelector(".select--type2__options_box");

    if (!target.closest('.select--type2')) {
      if (options_box.style.display != 'none') {
        selectbox.click();
      }
    }
  },
  bodyClickEvent: function bodyClickEvent() {
    var that = this;
    var body = document.querySelector('body');
    body.addEventListener('click', function (e) {
      var target = e.target;
      that.exceptedClickSelectType2(target);
    });
  }
}; // const comments ={
//     init:function(){
//         this.onClickAddComment();
//     }
//     ,val: {
//         sectionID:''
//         ,value:''
//         ,coord:{}
//         ,created_at:''
//     }
//     ,onClickAddComment:function(){
//         const that =this;
//         const button  = $(".addImageComment");
//         button.on("click",function(){
//             const parent = $(this).parents(".addImageCommentsIssue");
//             const view = parent.find(".addImageCommentsArea");
//             if(!$(this).hasClass("btn--type2A--active")){
//                 $(this).addClass("btn--type2A--active");
//                 const viewW = view.width(),
//                     viewH = view.height();
//                 view.on('click',function(e){
//                     console.log(e);
//                     //1-1. 클릭 지점 좌표 퍼센트 추출
//                     let pcntX, pcntY;
//                     const x = e.offsetX;
//                     const y = e.offsetY;
//                     pcntX = x/viewW*100;
//                     pcntY = y/viewH*100;
//                     pcntX = pcntX.toFixed(1);
//                     pcntY = pcntY.toFixed(1);
//                     that.val.coord.x = pcntX;
//                     that.val.coord.y = pcntY;
//                     console.log(that.val.coord);
//                     //1-2. 생성날짜 추출 
//                     const date = new Date();
//                     that.val.created_at = date;
//                     console.log(that.val.created_at);
//                     //1-3. sectionID값 추출
//                     const sectionID = parent.attr("data-id");
//                     that.val.sectionID = sectionID;
//                     console.log(that.val.sectionID);
//                     //2-1. 클릭 지점에 버튼 삽입
//                     //  html 변경 예정
//                     const comments_html = ` <div class="comment" style="position:absolute; left:${pcntX}%; top:${pcntY}%;">
//                     <div class="comment__inner">
//                         <span class="comment__order">1</span>
//                         <div class="comment__select_box">
//                             <ul>
//                                 <li>
//                                     <div class="checkbox">
//                                         <input type="checkbox" id="선택1" name="선택1">
//                                         <label for="선택1"><span></span>선택1</label>
//                                     </div>
//                                 </li>
//                                 <li>
//                                     <div class="checkbox">
//                                         <input type="checkbox" id="선택2" name="선택2">
//                                         <label for="선택2"><span></span>선택2</label>
//                                     </div>
//                                 </li>
//                             </ul>
//                             <div class="comment__button_box">
//                                 <button class="comment__confirm"><span>선택완료</span></button>
//                                 <button class="comment__cancle"><span>닫기</span></button>
//                             </div>
//                         </div>
//                     </div>
//                     </div>`;
//                     view.prepend(comments_html);
//                     //2-2. 코멘츠 더하기 기능 막기
//                     view.off("click");
//                     //2-3. 버튼 클릭 이벤트 실행
//                     const button = $(".comment");
//                     button.on("click",function(){
//                         const popup = $(this).find(".comment__select_box");
//                         if(popup.css("display")==="none"){
//                             popup.show();
//                             console.log("팝업 오픈");
//                         }else{
//                             popup.hide();
//                             console.log("팝업 클로즈");
//                         }
//                     });
//                     //3. 
//                 });    
//             }else{
//                 $(this).removeClass("btn--type2A--active");
//                 //2. 코멘츠 더하기 기능 제거
//             }
//         });
//     }
//     ,onClickCommentButton: function(e){
//         console.log('버튼 클릭');
//         const button = $(".comment");
//         button.on("click",function(){
//             const popup = $(this).find(".comment__select_box");
//             if(popup.css("display")==="none"){
//                 popup.show();
//                 console.log("팝업 오픈");
//             }else{
//                 popup.hide();
//                 console.log("팝업 클로즈");
//             }
//         });
//     }
// }

document.addEventListener("DOMContentLoaded", function () {
  UIevents.init();
});
$(document).on('ready', function () {// comments.init();
});
"use strict";

var UIeventEB = {
  init: function init() {
    this.hamClick();
    this.lnbOpen();
    this.accordionBtnClick();
  },
  hamClick: function hamClick() {
    //메뉴버튼, gnb 컨트롤
    var menuBtn = document.querySelector(".ham_btn");
    var isMenuOpen = false;
    menuBtn.addEventListener("click", function () {
      if (!isMenuOpen) {
        //   menuBtn.classList.add("close");
        $(".ham_btn>.inner>span").stop().animate({
          width: "37px"
        }, 120, function () {
          $(this).stop().animate({
            width: 0
          }, 120, function () {
            menuBtn.classList.add("close");
          });
        });
        $("html body").css({
          overflow: "hidden"
        });
        $("#header").addClass("gnb_active");
        $("#nav").addClass("active");
      } else {
        menuBtn.classList.remove("close");
        $(".ham_btn>.inner>span").stop().animate({
          width: "37px"
        }, 120, function () {
          $(this).stop().animate({
            width: 26 + "px"
          }, 120);
        });
        $("html body").css({
          overflow: "visible"
        }, 300);
        $("#nav").removeClass("active");
        $("#header").removeClass("gnb_active");
      }

      isMenuOpen = !isMenuOpen;
    });
  },
  lnbOpen: function lnbOpen() {
    $("#nav .gnb >li").on('mouseenter', function () {
      var that = $(this);
      var idx = that.index(); // console.log(idx)

      $("#nav .gnb >li").removeClass("on");
      that.addClass("on");
      $("#header .lnb_area").addClass("on");
      $("#header .lnb_area .lnb_menu").removeClass("on");
      $("#header .lnb_area .lnb_menu").eq(idx).addClass("on");
    }); // $("#header .lnb_area").on('mouseenter',function(){
    //     $(".header").addClass("on");
    // });

    var active;

    if ($("#nav .gnb >li").hasClass("on")) {
      // console.log("true")
      active = $("#nav .gnb >li.on");
      $("#header .lnb_area").on("mouseleave", function () {
        $("#header .lnb_area").removeClass("on");
        $("#nav .gnb >li").removeClass("on");
        active.addClass("on");
      });
    } else {
      $("#header .lnb_area").on("mouseleave", function () {
        $("#header .lnb_area").removeClass("on");
        $("#nav .gnb >li").removeClass("on");
      });
    } // console.log(active)

  },
  accordionBtnClick: function accordionBtnClick() {
    var winW = window.innerWidth;
    var winWChk = '';
    var acc = $(".accordion_btn");
    var i;
    var j;

    var clickListener = function clickListener() {
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          $(this).find(".btn_type3").stop().toggleClass("active");
          var panel = this.nextElementSibling;

          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    };

    clickListener();
  }
};
var motion = {
  init: function init() {
    this.rollingBanner();
    this.scrollHeader();
    this.scrollFooter(); // this.mainMotion();

    this.gnbHover();
    this.scrollMotion2();
    this.circleMotion();
    this.cursorCostom();
    this.startMotion();
  },
  cursorCostom: function cursorCostom() {
    var $window = $(window);
    var oldWChk = '';
    var hoverPlus = $("a, .hover_plus");
    $window.on('load resize', function () {
      var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';

      if (newWChk != oldWChk) {
        oldWChk = newWChk;
      }

      if (newWChk == 'pc') {
        cursorInit();
      }

      if (newWChk == 'mo') {
        $window.off("mousemove");
        hoverPlus.off("mouseenter");
        hoverPlus.off("mouseleave");
        hoverPlus.css("cursor", "pointer");
      }
    });

    function cursorInit() {
      var num = 0.5;
      var cursor = document.getElementById('cursor');
      hoverPlus.on('mouseenter', function () {
        $(cursor).addClass("mouse_plus");
        $(this).css("cursor", "none");
        num = 0.2;
      });
      hoverPlus.on('mouseleave', function () {
        $(cursor).removeClass("mouse_plus");
        num = 0.5;
      }); // dots is an array of Dot objects,
      // mouse is an object used to track the X and Y position
      // of the mouse, set with a mousemove event listener below

      var dots = [],
          mouse = {
        x: 0,
        y: 0
      }; // The Dot object used to scaffold the dots

      var Dot = function Dot() {
        // this.x = 0;
        // this.y = 0;
        // this.node = (function(){
        // var n = dot.clone();
        // n.appendTo('#cursor')
        // return n;
        // }());
        this.x = 0;
        this.y = 0;

        this.node = function () {
          var n = document.createElementNS("http://www.w3.org/2000/svg", "path");
          n.classNameNS = "cursor_circle"; // n.appendTo('#cursor')

          document.getElementById("cursor").appendChild(n);
          return n;
        }();
      }; // The Dot.prototype.draw() method sets the position of 
      // the object's <div> node


      Dot.prototype.draw = function () {
        // console.log(this)
        this.node.setAttribute('d', "M59.2,30c0,16.1-13.1,29.2-29.2,29.2S0.8,46.1,0.8,30C0.8,13.9,13.9,0.8,30,0.8S59.2,13.9,59.2,30z");
        this.node.style.transform = "translate(".concat(this.x + "px," + this.y, "px) scale(").concat(num, ")");
      }; // Creates the Dot objects, populates the dots array


      for (var i = 0; i < 60; i++) {
        var d = new Dot();
        dots.push(d);
      } // This is the screen redraw function


      function draw() {
        // Make sure the mouse position is set everytime
        // draw() is called.
        var x = mouse.x,
            y = mouse.y; // This loop is where all the 90s magic happens

        dots.forEach(function (dot, index, dots) {
          var nextDot = dots[index + 1] || dots[0];
          dot.x = x;
          dot.y = y;
          dot.draw();
          x += (nextDot.x - dot.x) * .1;
          y += (nextDot.y - dot.y) * .1;
        });
      }

      var line = document.querySelector("#cursor .line");
      $window.stop().on("mousemove", function (event) {
        //event.preventDefault();
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        line.setAttribute('style', "transform:translate(".concat(mouse.x - 24 + "px," + (mouse.y - 24), "px)"));
      }); // animate() calls draw() then recursively calls itself
      // everytime the screen repaints via requestAnimationFrame().

      function animate() {
        draw();
        requestAnimationFrame(animate);
      } // And get it started by calling animate().


      animate();
    }
  },
  rollingBanner: function rollingBanner() {
    var originalID, cloneID;
    var roller = document.querySelector(".roller");
    roller.id = "roller1";
    var clone = roller.cloneNode(true);
    clone.id = "roller2";
    document.querySelector(".rolling_banner").appendChild(clone);
    flowBannerAct(); //반응형 :: 디바이스가 변경 될 때마다 배너 롤링 초기화

    var oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
    $(window).on('resize', function () {
      var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';

      if (newWChk != oldWChk) {
        oldWChk = newWChk;
        $("#roller1").off("mouseenter");
        $("#roller2").off("mouseenter");
        $("#roller1").off("mouseleave");
        $("#roller2").off("mouseleave");
        flowBannerAct(); // console.log("!");
      }
    });

    function flowBannerAct() {
      stopRoller(); //위치 지정

      document.querySelector("#roller1").style.left = "0px";
      document.querySelector("#roller2").style.left = document.querySelector(".roller ul").offsetWidth + 'px';
      roller.classList.add('original');
      clone.classList.add('clone');
      var rollerWidth = document.querySelector('.roller ul').offsetWidth; //회전 배너 너비값

      var betweenDistance = 1; //이동 크기 - 정수여야 함
      //롤링 시작

      function startRoller() {
        originalID = setInterval(function () {
          betweenRollCallback(betweenDistance, document.querySelector('#roller1'));
        }, parseInt(1000 / 50));
        cloneID = setInterval(function () {
          betweenRollCallback(betweenDistance, document.querySelector('#roller2'));
        }, parseInt(1000 / 50));
      } //롤링 정지


      function stopRoller() {
        clearInterval(originalID);
        clearInterval(cloneID);
      } //마우스 호버시 롤링이 멈추었다 벗어나면 다시 롤링이 되도록 처리


      $("#roller1").stop().on("mouseenter", function () {
        // console.log("실행!!")
        stopRoller();
      });
      $("#roller2").stop().on("mouseenter", function () {
        stopRoller();
      });
      $("#roller1").stop().on("mouseleave", function () {
        // console.log("실행!!")
        startRoller();
      });
      $("#roller2").stop().on("mouseleave", function () {
        startRoller();
      }); // document.getElementById('roller1').addEventListener('mouseenter',()=>{ stopRoller(); console.log("@")});
      // document.getElementById('roller2').addEventListener('mouseenter',()=>{stopRoller()});
      // document.getElementById('roller1').addEventListener('mouseleave',()=>{startRoller()});
      // document.getElementById('roller2').addEventListener('mouseleave',()=>{startRoller()});
      //인터벌 애니메이션 함수(공용)

      function betweenRollCallback(d, roller) {
        var left = parseInt(roller.style.left); // console.log(left)

        roller.style.left = left - d + 'px'; //이동
        //조건부 위치 리셋

        if (rollerWidth + (left - d) <= 0) {
          roller.style.left = rollerWidth + 'px';
        }
      }

      startRoller(); //롤링 초기화
    }
  },
  scrollHeader: function scrollHeader() {
    var pageY = window.pageYOffset;
    var scrollNum;
    var winW = window.innerWidth;
    var winWChk = '';
    var headerH;
    var headerScollH; //헤더 빼야하는 높이

    var logoW; //로고넓이

    var logoH; //로고높이

    var logoScrollW; //로고 빼야하는 넓이

    var logoScrollH; //로고 빼야하는 높이

    var txtW; //h2넓이

    var txtH; //h2높이

    var txtScrollW; //h2 빼야하는 넓이

    var txtScrollH; //h2 빼야하는 높이

    $(window).on(' scroll resize', function () {
      // console.log("resize")
      winW = window.innerWidth;
      pageY = window.pageYOffset;

      if (winWChk != 'mo' && winW <= 1024) {
        //모바일
        winWChk = 'mo';
        headerH = 72;
        headerScollH = 0;
        txtW = $("#header h2").innerWidth();
        txtH = $("#header h2").innerHeight();
        logoW = $("#header .logo").innerWidth();
        logoH = $("#header .logo").innerHeight();
      } else if (winWChk != 'pc' && winW >= 1025) {
        //PC 테블릿
        winWChk = 'pc';
        headerH = 160;
        headerScollH = 96;
        logoW = $("#header .logo").innerWidth();
        logoH = $("#header .logo").innerHeight();
        logoScrollW = 192;
        logoScrollH = 65;
        txtW = $("#header h2").innerWidth();
        txtH = $("#header h2").innerHeight();
        txtScrollW = 161;
        txtScrollH = 15;
      }

      scrollNum = pageY / 400 * 100;

      if (scrollNum > 100) {
        scrollNum = 100;
      }

      var header = $("#header >.wrap");
      var logo = $("#header .logo");
      var num = scrollNum / 100;
      var txt = $("#header h2");
      var nav = $(" #nav");
      header.css({
        "height": headerH - headerScollH * num + "px"
      });

      var deMotion = function deMotion() {
        logo.css({
          width: logoW - logoScrollW * num + "px",
          height: logoH - logoScrollH * num + "px",
          marginBottom: 24 - 15 * num + "px" // transform: "scale("+(1 - (0.585 * num))+")"

        });
        txt.css({
          width: txtW - txtScrollW * num + "px",
          height: txtH - txtScrollH * num + "px",
          marginBottom: 24 - 15 * num + "px" // transform: "scale("+(1 - (1 * num))+")",
          // opacity: (1 - (1 * num)),
          // marginBottom: (26 - (15 * num))+"px",

        });
        nav.css({
          marginTop: 109 - 88 * num + "px"
        });
      };

      if (winWChk == 'pc') {
        deMotion();
      }
    });
  },
  scrollFooter: function scrollFooter() {
    var footerTop = $("#footer .footer_top");
    var footerH = $("#footer").innerHeight();
    var pageY = window.pageYOffset;
    var pageH = $(".total_wrap").innerHeight();
    var footerTopH = footerTop.innerHeight();
    var footerPoint = pageH - (window.innerHeight + footerH - footerTopH);
    var oldWChk = '';
    $(window).on('scroll resize', function () {
      var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
      pageY = window.pageYOffset;
      footerH = $("#footer").innerHeight();
      pageY = window.pageYOffset;
      pageH = $(".total_wrap").innerHeight();
      footerTopH = footerTop.innerHeight(); // console.log(footerH, pageY, pageH, footerTopH, window.innerHeight)

      footerPoint = pageH - (window.innerHeight + footerH - footerTopH);

      if (pageY >= footerPoint) {
        footerTop.addClass("sticky");
      } else {
        footerTop.removeClass("sticky");
      }

      if (newWChk != oldWChk) {
        oldWChk = newWChk;
      }
    });
  },
  smoothScroll: function smoothScroll() {},
  headerMotion: function headerMotion() {
    $("#header>.wrap").stop().animate({
      opacity: 1
    }, 700);
    $(".footer_top>.wrap").stop().animate({
      opacity: 1
    }, 700);
  },
  mainMotion: function mainMotion() {
    if ($("#contentsWrap").hasClass("main_page") == true) {
      var headerLine = function headerLine() {
        var leng = $("#header>.line").length;
        var leng2 = $("#footer_top .line").length;

        var lineAni = function lineAni(idx) {
          var animateFlag = true;
          $("#header>.line").eq(idx).animate({
            width: 100 + "%"
          }, {
            duration: 500,
            step: function step(now, fx) {
              //   console.log(fx);
              if (fx.start == 0) {
                if (now > 60 && animateFlag) {
                  //aniamtion 70% 이상이면 다음 target animation 실행
                  lineAni(++idx);
                  animateFlag = false;
                }
              }
            },
            complete: function complete() {
              if (idx == 1) {
                lineAni3(0);
                lineAni2(0);
              }

              if (idx === leng) {
                // lineAni3(0);
                return false; // 완료시 종료 
              }
            }
          });
        };

        var lineAni2 = function lineAni2(idx) {
          // console.log("실행")
          var animateFlag = true;
          $(".footer_top .line").eq(idx).animate({
            width: 100 + "%"
          }, {
            duration: 500,
            step: function step(now, fx) {
              //   console.log(fx);
              if (fx.start == 0) {
                if (now > 60 && animateFlag) {
                  //aniamtion 70% 이상이면 다음 target animation 실행
                  lineAni2(++idx);
                  animateFlag = false;
                }
              }
            },
            complete: function complete() {
              if (idx === leng) {
                //lineAni3(0)
                circleMotion();
                return false; // 완료시 종료 
              }
            }
          });
        };

        var lineAni3 = function lineAni3(idx) {
          var animateFlag = true;
          $(".column_area .line_wrap .line").eq(idx).stop().animate({
            height: 100 + "%"
          }, {
            duration: 200,
            step: function step(now, fx) {
              //   console.log(fx);
              if (fx.start == 0) {
                if (now > 80 && animateFlag) {
                  lineAni3(++idx);
                  animateFlag = false;
                }
              }
            },
            complete: function complete() {
              if (idx === leng) {
                motion.scrollMotion();
                motion.headerMotion();
                return false;
              }
            }
          });
        };

        var circleMotion = function circleMotion() {
          var circle = $(".item_wrap .circle");
          var circleLine = $(".item_wrap .circle svg ellipse");
          circleLine.stop().animate({
            strokeDashoffset: 0,
            strokeDasharray: "none"
          }, 1500, function () {
            circle.find(".bg").stop().animate({
              opacity: 1
            }, 400);
            circle.find(".layer_2").stop().animate({
              opacity: 1
            }, 400, function () {
              circle.addClass("active"); // console.log("!")

              lineAni3(0);
            });
          });
        };

        lineAni(0);
      };

      // console.log("main")
      var leng = $(".column_area .line_wrap .line").length;
      headerLine();
      var oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
      $(window).on('resize', function () {
        var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';

        if (newWChk != oldWChk) {
          oldWChk = newWChk;
          $("#header .line").css({
            width: 0
          });
          $(".column_area .line_wrap .line").css({
            height: 0
          });
          $("#header .logo").css({
            width: '',
            height: '',
            marginBottom: ''
          });
          $("#header h2").css({
            width: '',
            height: '',
            marginBottom: ''
          });
          $(" #nav").css({
            marginTop: ''
          });
          $("#header>.wrap, .footer_top>.wrap").css({
            opacity: ''
          });
          setTimeout(function () {
            headerLine();
          }, 200);
        }
      });
    }
  },
  circleMotion: function circleMotion() {
    var lastScrollY = 0;
    var active = true;
    var circle = $(".circle");
    addEventListener("scroll", function (e) {
      circle.css({
        "transform": "translateY(-" + window.pageYOffset / 100 + "%)"
      });
      var scrollY = window.scrollY; // 이전의 스크롤 위치와 비교하기

      var direction = scrollY > lastScrollY ? "Scroll Down" : "Scroll Up"; // 현재의 스크롤 값을 저장

      lastScrollY = scrollY; //   console.log(direction);

      if (direction === "Scroll Up") {} else if (direction === "Scroll Down") {}
    });
  },
  scrollMotion: function scrollMotion() {
    var $window = $(window);
    var winW = $window.innerWidth(),
        delayPosition = -100,
        windowheight;
    insertTargetPosition();
    var position = $window.scrollTop() + windowheight + delayPosition;
    setTimeout(function () {
      motion.target01($(".active_item"), position);
    }, 300);
    var oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
    $window.on('load resize scroll', function () {
      var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
      insertTargetPosition();
      var position = $window.scrollTop() + windowheight + delayPosition;
      setTimeout(function () {
        motion.target01($(".active_item"), position);
      }, 300);
    });

    function insertTargetPosition() {
      windowheight = $window.outerHeight();
      $('.active_item').each(function () {
        $(this).data('offsetTop', $(this).offset().top);
      });
    }
  },
  target01: function target01(target, position) {
    $(target).each(function () {
      if (!$(this).hasClass("active") && $(this).data('offsetTop') < position) {
        $(this).addClass("active");
        $(this).removeClass("ready");
      }
    });
  },
  gnbHover: function gnbHover() {
    $(".wave_txt .top").each(function () {
      var item = $(this).find("span");

      for (var j = 0; j < item.length; j++) {
        $($(item)[j]).css({
          'transition-delay': 0.0 + j / 20 + 's'
        });
      }
    });
    $(".wave_txt .bt").each(function () {
      var item = $(this).find("span");

      for (var j = 0; j < item.length; j++) {
        $($(item)[j]).css({
          'transition-delay': 0.0 + j / 20 + 's'
        });
      }
    });
  },
  scrollMotion2: function scrollMotion2() {
    var $window = $(window);
    var oldWChk = '';
    $window.on('load resize scroll', function () {
      var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';

      if (newWChk != oldWChk) {
        oldWChk = newWChk;
      }

      if (newWChk == 'pc') {
        desktopMotion(window.pageYOffset);
      }

      if (newWChk == 'mo') {
        moMotion(window.pageYOffset);
      }
    });

    function desktopMotion(scroll) {
      $(".d_scoll_type1").css({
        "transform": "translateY(-" + scroll / 400 + "%)"
      });
      $(".d_scoll_type2").css({
        "transform": "translateY(" + scroll / 400 + "%)"
      });
      $(".d_scoll_type3").css({
        "transform": "translateY(" + scroll / 350 + "%)"
      });
    }

    function moMotion(scroll) {
      $(".m_scoll_type1").css({
        "transform": "translateY(-" + scroll / 400 + "%)"
      });
      $(".m_scoll_type2").css({
        "transform": "translateY(-" + scroll / 400 + "%)"
      });
      $(".m_scoll_type3").css({
        "transform": "translateY(" + scroll / 350 + "%)"
      });
      $(".m_scoll_type4").css({
        "transform": "translateY(-" + scroll / 500 + "%)"
      });
    }
  },
  startMotion: function startMotion() {
    var leng = $(".motion_item_area .line_wrap .line").length;
    headerLine();

    function headerLine() {
      var leng = $("#header>.line").length;
      var leng2 = $("#footer_top .line").length;

      var lineAni = function lineAni(idx) {
        var animateFlag = true;
        $("#header>.line").eq(idx).animate({
          width: 100 + "%"
        }, {
          duration: 500,
          step: function step(now, fx) {
            //   console.log(fx);
            if (fx.start == 0) {
              if (now > 60 && animateFlag) {
                //aniamtion 70% 이상이면 다음 target animation 실행
                lineAni(++idx);
                animateFlag = false;
              }
            }
          },
          complete: function complete() {
            if (idx == 1) {
              lineAni3(0);
              lineAni2(0);
            }

            if (idx === leng) {
              // lineAni3(0);
              return false; // 완료시 종료 
            }
          }
        });
      };

      var lineAni2 = function lineAni2(idx) {
        // console.log("실행")
        var animateFlag = true;
        $(".footer_top .line").eq(idx).animate({
          width: 100 + "%"
        }, {
          duration: 500,
          step: function step(now, fx) {
            //   console.log(fx);
            if (fx.start == 0) {
              if (now > 60 && animateFlag) {
                //aniamtion 70% 이상이면 다음 target animation 실행
                lineAni2(++idx);
                animateFlag = false;
              }
            }
          },
          complete: function complete() {
            if (idx === leng) {
              //lineAni3(0)
              circleMotion();
              return false; // 완료시 종료 
            }
          }
        });
      };

      var lineAni3 = function lineAni3(idx) {
        var animateFlag = true;
        $(".motion_item_area .line_wrap .line").eq(idx).stop().animate({
          height: 100 + "%"
        }, {
          duration: 200,
          step: function step(now, fx) {
            //   console.log(fx);
            if (fx.start == 0) {
              if (now > 80 && animateFlag) {
                lineAni3(++idx);
                animateFlag = false;
              }
            }
          },
          complete: function complete() {
            if (idx === leng) {
              motion.scrollMotion();
              motion.headerMotion();
              return false;
            }
          }
        });
      };

      var circleMotion = function circleMotion() {
        var circle = $(".item_wrap .circle");
        var circleLine = $(".item_wrap .circle svg ellipse");
        circleLine.stop().animate({
          strokeDashoffset: 0,
          strokeDasharray: "none"
        }, 1500, function () {
          circle.find(".bg").stop().animate({
            opacity: 1
          }, 400);
          circle.find(".layer_2").stop().animate({
            opacity: 1
          }, 400, function () {
            circle.addClass("active"); // console.log("!")

            lineAni3(0);
          });
        });
      };

      lineAni(0);
    }
  }
};
document.addEventListener("DOMContentLoaded", function () {
  UIeventEB.init();
  motion.init();
  var oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
  $(window).on('resize', function () {
    var newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';

    if (newWChk != oldWChk) {
      oldWChk = newWChk;
      $("#header .line, .footer_top .line").css({
        width: 0
      });
      $(".motion_item_area .line_wrap .line").css({
        height: 0
      });
      $("#header .logo").css({
        width: '',
        height: '',
        marginBottom: ''
      });
      $("#header h2").css({
        width: '',
        height: '',
        marginBottom: ''
      });
      $(" #nav").css({
        marginTop: ''
      });
      $("#header>.wrap, .footer_top>.wrap").css({
        opacity: ''
      });
      setTimeout(function () {
        motion.startMotion();
      }, 200);
    }
  });
});
$(document).on('ready', function () {
  /* a태그 이벤트 막기 */
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault();
  });
});
"use strict";

var USE9 = {
  scrollOff: function scrollOff() {
    $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function (e) {
      e.preventDefault();
      return;
    });
    $(window).on("keydown.disableScroll", function (e) {
      var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];

      for (var i = 0; i < eventKeyArray.length; i++) {
        if (e.keyCode === eventKeyArray[i]) {
          e.preventDefault();
          return;
        }
      }
    });
  },
  scrollOn: function scrollOn() {
    $(window).off(".disableScroll");
  },
  getUrlVars: function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }

    return vars;
  },
  getUrlVar: function getUrlVar(name) {
    return USE9.getUrlVars()[name];
  },
  setUrlVar: function setUrlVar(name, value) {
    var url = window.location.href;

    if (USE9.getUrlVar(name)) {
      url = url.replace(name + "=" + USE9.getUrlVar(name), name + "=" + value);
    } else {
      url += "&" + name + "=" + value;
    }

    return url;
  },
  get_share_link_url: function get_share_link_url(sns_type) {
    var url = "";

    if (location.pathname == "/mobile/index.asp") {
      url = "http://guesstheday.co.kr/#/?pagename=collection";
    } else if (location.pathname == "/mobile/video.asp") {
      url = "http://guesstheday.co.kr/#/?pagename=video";
    } else if (location.pathname == "/mobile/lookbook.asp") {
      url = "http://guesstheday.co.kr/#/?pagename=lookbook";
    } else if (location.pathname == "/mobile/event.asp") {
      url = "http://guesstheday.co.kr/#/?pagename=collection";
    } else if (location.pathname == "/mobile/info.asp") {
      url = "http://guesstheday.co.kr/#/?pagename=storeinfo";
    } else {
      url = location.href;
    }

    url = url.replace("#", "%23");
    url = url.replace(/&/gi, "%26");
    var share_url;

    if (sns_type == "fb") {
      share_url = 'http://www.facebook.com/sharer.php?t=GUESSTHEDAY&u=' + url;
    } else if (sns_type == "ka") {
      share_url = url;
    }

    return share_url;
  },
  getScreenType: function getScreenType() {
    var type = "";

    if ($(window).width() >= 980) {
      type = "desktop";
    } else {
      type = "mobile";
    }

    return type;
  } //함수에 배열을 넣어주면 가장 적은 value의 인덱스값을 리턴
  ,
  getMinArrayNum: function getMinArrayNum(ary) {
    var minNum = Math.min.apply(Math, ary);
    var returnValue = 0;
    console.log(minNum + "min num");
    $.each(ary, function (index, value) {
      console.log(value + "///" + minNum + "min num");

      if (value == minNum) {
        returnValue = index;
        return false;
      }
    });
    return returnValue;
  },
  getInternetExplorerVersion: function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.    

    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    }

    return rv;
  },
  htmlEncode: function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    //return $('<div/>').html(decodeURIComponent(value));
    temp = decodeURIComponent(value);
    temp = temp.replace("+", " ");
    console.log(temp);
    return temp;
  },
  getExtensionOfFilename: function getExtensionOfFilename(filename) {
    var _fileLen = filename.length;
    /** 
     * lastIndexOf('.') 
     * 뒤에서부터 '.'의 위치를 찾기위한 함수
     * 검색 문자의 위치를 반환한다.
     * 파일 이름에 '.'이 포함되는 경우가 있기 때문에 lastIndexOf() 사용
     */

    var _lastDot = filename.lastIndexOf('.'); // 확장자 명만 추출한 후 소문자로 변경


    var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();

    return _fileExt;
  },
  htmlDecode: function htmlDecode(value) {
    var temp = decodeURIComponent(value);
    temp = temp.replace("+", " ");
    return temp;
  },
  return_deviceSize: function return_deviceSize() {
    var winW = $(window).width();
    var device = "";

    if (winW > 768) {
      device = "desktop";
    } else {
      device = "mobile";
    }

    return device;
  },
  checkMobile: function checkMobile() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

    if (varUA.indexOf('android') > -1) {
      //안드로이드
      return "android";
    } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
      //IOS
      return "ios";
    } else {
      //아이폰, 안드로이드 외
      return "other";
    }
  }
};
var cookieF = {
  setCookieMobile: function setCookieMobile(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toUTCString() + ';';
  },
  getCookieMobile: function getCookieMobile(name) {
    var obj = name + "=";
    var x = 0;
    var endOfCookie = '';

    while (x <= document.cookie.length) {
      var y = x + obj.length;

      if (document.cookie.substring(x, y) == obj) {
        if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) endOfCookie = document.cookie.length;
        return unescape(document.cookie.substring(y, endOfCookie));
      }

      x = document.cookie.indexOf(" ", x) + 1;
      if (x == 0) break;
    }

    return "";
  }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwYXA3LmpzIiwiYXBhcDdfZWIuanMiLCJqcy51c2U5LmtyLmpzIl0sIm5hbWVzIjpbIlVJZXZlbnRzIiwiaW5pdCIsInNlbGVjdFR5cGUyRXZlbnQiLCJib2R5Q2xpY2tFdmVudCIsInNlbGVjdGJveCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNlbGVjdGVkX2JveCIsIm9wdGlvbnNfYm94Iiwib3B0aW9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZm9yRWFjaCIsIm9wdGlvbiIsInZhbHVlIiwiZ2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJleGNlcHRlZENsaWNrU2VsZWN0VHlwZTIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiY2xpY2siLCJ0aGF0IiwiYm9keSIsImUiLCIkIiwib24iLCJVSWV2ZW50RUIiLCJoYW1DbGljayIsImxuYk9wZW4iLCJhY2NvcmRpb25CdG5DbGljayIsIm1lbnVCdG4iLCJpc01lbnVPcGVuIiwic3RvcCIsImFuaW1hdGUiLCJ3aWR0aCIsImNzcyIsIm92ZXJmbG93IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImlkeCIsImluZGV4IiwiZXEiLCJhY3RpdmUiLCJoYXNDbGFzcyIsIndpblciLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwid2luV0NoayIsImFjYyIsImkiLCJqIiwiY2xpY2tMaXN0ZW5lciIsImxlbmd0aCIsInRvZ2dsZSIsImZpbmQiLCJ0b2dnbGVDbGFzcyIsInBhbmVsIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwibWF4SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwibW90aW9uIiwicm9sbGluZ0Jhbm5lciIsInNjcm9sbEhlYWRlciIsInNjcm9sbEZvb3RlciIsImduYkhvdmVyIiwic2Nyb2xsTW90aW9uMiIsImNpcmNsZU1vdGlvbiIsImN1cnNvckNvc3RvbSIsInN0YXJ0TW90aW9uIiwiJHdpbmRvdyIsIm9sZFdDaGsiLCJob3ZlclBsdXMiLCJuZXdXQ2hrIiwiY3Vyc29ySW5pdCIsIm9mZiIsIm51bSIsImN1cnNvciIsImdldEVsZW1lbnRCeUlkIiwiZG90cyIsIm1vdXNlIiwieCIsInkiLCJEb3QiLCJub2RlIiwibiIsImNyZWF0ZUVsZW1lbnROUyIsImNsYXNzTmFtZU5TIiwiYXBwZW5kQ2hpbGQiLCJwcm90b3R5cGUiLCJkcmF3IiwidHJhbnNmb3JtIiwiZCIsInB1c2giLCJkb3QiLCJuZXh0RG90IiwibGluZSIsImV2ZW50IiwicGFnZVgiLCJwYWdlWSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9yaWdpbmFsSUQiLCJjbG9uZUlEIiwicm9sbGVyIiwiaWQiLCJjbG9uZSIsImNsb25lTm9kZSIsImZsb3dCYW5uZXJBY3QiLCJzdG9wUm9sbGVyIiwibGVmdCIsIm9mZnNldFdpZHRoIiwicm9sbGVyV2lkdGgiLCJiZXR3ZWVuRGlzdGFuY2UiLCJzdGFydFJvbGxlciIsInNldEludGVydmFsIiwiYmV0d2VlblJvbGxDYWxsYmFjayIsInBhcnNlSW50IiwiY2xlYXJJbnRlcnZhbCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsTnVtIiwiaGVhZGVySCIsImhlYWRlclNjb2xsSCIsImxvZ29XIiwibG9nb0giLCJsb2dvU2Nyb2xsVyIsImxvZ29TY3JvbGxIIiwidHh0VyIsInR4dEgiLCJ0eHRTY3JvbGxXIiwidHh0U2Nyb2xsSCIsImlubmVySGVpZ2h0IiwiaGVhZGVyIiwibG9nbyIsInR4dCIsIm5hdiIsImRlTW90aW9uIiwiaGVpZ2h0IiwibWFyZ2luQm90dG9tIiwibWFyZ2luVG9wIiwiZm9vdGVyVG9wIiwiZm9vdGVySCIsInBhZ2VIIiwiZm9vdGVyVG9wSCIsImZvb3RlclBvaW50Iiwic21vb3RoU2Nyb2xsIiwiaGVhZGVyTW90aW9uIiwib3BhY2l0eSIsIm1haW5Nb3Rpb24iLCJoZWFkZXJMaW5lIiwibGVuZyIsImxlbmcyIiwibGluZUFuaSIsImFuaW1hdGVGbGFnIiwiZHVyYXRpb24iLCJzdGVwIiwibm93IiwiZngiLCJzdGFydCIsImNvbXBsZXRlIiwibGluZUFuaTMiLCJsaW5lQW5pMiIsInNjcm9sbE1vdGlvbiIsImNpcmNsZSIsImNpcmNsZUxpbmUiLCJzdHJva2VEYXNob2Zmc2V0Iiwic3Ryb2tlRGFzaGFycmF5Iiwic2V0VGltZW91dCIsImxhc3RTY3JvbGxZIiwic2Nyb2xsWSIsImRpcmVjdGlvbiIsImRlbGF5UG9zaXRpb24iLCJ3aW5kb3doZWlnaHQiLCJpbnNlcnRUYXJnZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwic2Nyb2xsVG9wIiwidGFyZ2V0MDEiLCJvdXRlckhlaWdodCIsImVhY2giLCJkYXRhIiwib2Zmc2V0IiwidG9wIiwiaXRlbSIsImRlc2t0b3BNb3Rpb24iLCJtb01vdGlvbiIsInNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwiVVNFOSIsInNjcm9sbE9mZiIsImV2ZW50S2V5QXJyYXkiLCJrZXlDb2RlIiwic2Nyb2xsT24iLCJnZXRVcmxWYXJzIiwidmFycyIsImhhc2giLCJoYXNoZXMiLCJsb2NhdGlvbiIsImhyZWYiLCJzbGljZSIsImluZGV4T2YiLCJzcGxpdCIsImdldFVybFZhciIsIm5hbWUiLCJzZXRVcmxWYXIiLCJ1cmwiLCJyZXBsYWNlIiwiZ2V0X3NoYXJlX2xpbmtfdXJsIiwic25zX3R5cGUiLCJwYXRobmFtZSIsInNoYXJlX3VybCIsImdldFNjcmVlblR5cGUiLCJ0eXBlIiwiZ2V0TWluQXJyYXlOdW0iLCJhcnkiLCJtaW5OdW0iLCJNYXRoIiwibWluIiwiYXBwbHkiLCJyZXR1cm5WYWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRJbnRlcm5ldEV4cGxvcmVyVmVyc2lvbiIsInJ2IiwibmF2aWdhdG9yIiwiYXBwTmFtZSIsInVhIiwidXNlckFnZW50IiwicmUiLCJSZWdFeHAiLCJleGVjIiwicGFyc2VGbG9hdCIsIiQxIiwiaHRtbEVuY29kZSIsInRlbXAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJnZXRFeHRlbnNpb25PZkZpbGVuYW1lIiwiZmlsZW5hbWUiLCJfZmlsZUxlbiIsIl9sYXN0RG90IiwibGFzdEluZGV4T2YiLCJfZmlsZUV4dCIsInN1YnN0cmluZyIsInRvTG93ZXJDYXNlIiwiaHRtbERlY29kZSIsInJldHVybl9kZXZpY2VTaXplIiwiZGV2aWNlIiwiY2hlY2tNb2JpbGUiLCJ2YXJVQSIsImNvb2tpZUYiLCJzZXRDb29raWVNb2JpbGUiLCJleHBpcmVkYXlzIiwidG9kYXlEYXRlIiwiRGF0ZSIsInNldERhdGUiLCJnZXREYXRlIiwiY29va2llIiwiZXNjYXBlIiwidG9VVENTdHJpbmciLCJnZXRDb29raWVNb2JpbGUiLCJvYmoiLCJlbmRPZkNvb2tpZSIsInVuZXNjYXBlIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFFBQVEsR0FBRTtBQUNaQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVU7QUFDWixTQUFLQyxnQkFBTDtBQUNBLFNBQUtDLGNBQUw7QUFDSCxHQUpXO0FBS1hELEVBQUFBLGdCQUFnQixFQUFFLDRCQUFVO0FBQ3pCLFFBQU1FLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGdCQUF2QixLQUE0QyxJQUE5RDs7QUFDQSxRQUFHLENBQUNGLFNBQUosRUFBYztBQUNWLGFBQU8sS0FBUDtBQUNIOztBQUVELFFBQU1HLFlBQVksR0FBSUgsU0FBUyxDQUFDRSxhQUFWLENBQXdCLDhCQUF4QixDQUF0QjtBQUNBLFFBQU1FLFdBQVcsR0FBSUosU0FBUyxDQUFDRSxhQUFWLENBQXdCLDZCQUF4QixDQUFyQjtBQUNBLFFBQU1HLE9BQU8sR0FBR0wsU0FBUyxDQUFDTSxnQkFBVixDQUEyQix3QkFBM0IsQ0FBaEI7QUFFQU4sSUFBQUEsU0FBUyxDQUFDTyxnQkFBVixDQUEyQixPQUEzQixFQUFtQyxZQUFVO0FBQ3pDLFVBQUdILFdBQVcsQ0FBQ0ksS0FBWixDQUFrQkMsT0FBbEIsS0FBNEIsTUFBL0IsRUFBc0M7QUFDbENMLFFBQUFBLFdBQVcsQ0FBQ0ksS0FBWixDQUFrQkMsT0FBbEIsR0FB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RixHQUxZO0FBTVpDLEVBQUFBLGVBQWUsRUFBQyx5QkFBU3hELElBQVQsRUFBYztBQUM5QixRQUFJeUQsR0FBRyxHQUFHekQsSUFBSSxHQUFHLEdBQWpCO0FBQ0EsUUFBSXhILENBQUMsR0FBRyxDQUFSO0FBQ0EsUUFBSWtMLFdBQVcsR0FBQyxFQUFoQjs7QUFDQSxXQUFRbEwsQ0FBQyxJQUFJakYsUUFBUSxDQUFDOFAsTUFBVCxDQUFnQnpNLE1BQTdCLEVBQ0E7QUFDQyxVQUFJNkIsQ0FBQyxHQUFJRCxDQUFDLEdBQUNpTCxHQUFHLENBQUM3TSxNQUFmOztBQUNBLFVBQUtyRCxRQUFRLENBQUM4UCxNQUFULENBQWdCZCxTQUFoQixDQUEyQi9KLENBQTNCLEVBQThCQyxDQUE5QixLQUFxQ2dMLEdBQTFDLEVBQ0E7QUFDQyxZQUFJLENBQUNDLFdBQVcsR0FBQ25RLFFBQVEsQ0FBQzhQLE1BQVQsQ0FBZ0J4RCxPQUFoQixDQUF5QixHQUF6QixFQUE4QnBILENBQTlCLENBQWIsS0FBbUQsQ0FBQyxDQUF4RCxFQUNDaUwsV0FBVyxHQUFHblEsUUFBUSxDQUFDOFAsTUFBVCxDQUFnQnpNLE1BQTlCO0FBQ0QsZUFBTytNLFFBQVEsQ0FBRXBRLFFBQVEsQ0FBQzhQLE1BQVQsQ0FBZ0JkLFNBQWhCLENBQTJCOUosQ0FBM0IsRUFBOEJpTCxXQUE5QixDQUFGLENBQWY7QUFDQTs7QUFDRGxMLE1BQUFBLENBQUMsR0FBR2pGLFFBQVEsQ0FBQzhQLE1BQVQsQ0FBZ0J4RCxPQUFoQixDQUF5QixHQUF6QixFQUE4QnJILENBQTlCLElBQW9DLENBQXhDO0FBQ0EsVUFBS0EsQ0FBQyxJQUFJLENBQVYsRUFDQztBQUNEOztBQUNELFdBQU8sRUFBUDtBQUVBO0FBekJZLENBQWQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVUlldmVudHMgPXtcbiAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnNlbGVjdFR5cGUyRXZlbnQoKTtcbiAgICAgICAgdGhpcy5ib2R5Q2xpY2tFdmVudCgpO1xuICAgIH1cbiAgICAsc2VsZWN0VHlwZTJFdmVudDogZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc3Qgc2VsZWN0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3QtLXR5cGUyXCIpIHx8IG51bGw7XG4gICAgICAgIGlmKCFzZWxlY3Rib3gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZF9ib3ggPSAgc2VsZWN0Ym94LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0LS10eXBlMl9fc2VsZWN0ZWRfYm94XCIpO1xuICAgICAgICBjb25zdCBvcHRpb25zX2JveCA9ICBzZWxlY3Rib3gucXVlcnlTZWxlY3RvcihcIi5zZWxlY3QtLXR5cGUyX19vcHRpb25zX2JveFwiKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHNlbGVjdGJveC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdC0tdHlwZTJfX29wdGlvblwiKTtcblxuICAgICAgICBzZWxlY3Rib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihvcHRpb25zX2JveC5zdHlsZS5kaXNwbGF5PT09J25vbmUnKXtcbiAgICAgICAgICAgICAgICBvcHRpb25zX2JveC5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QtLXR5cGUyLS1hY3RpdmVcIik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBvcHRpb25zX2JveC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdC0tdHlwZTItLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpOyBcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1vcHRpb24nKTsgXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfYm94LnRleHRDb250ZW50PSBvcHRpb247XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfYm94LnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIix2YWx1ZSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLGV4Y2VwdGVkQ2xpY2tTZWxlY3RUeXBlMjogZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgY29uc3Qgc2VsZWN0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3QtLXR5cGUyXCIpIHx8IG51bGw7XG4gICAgICAgIGlmKCFzZWxlY3Rib3gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9uc19ib3ggPSAgc2VsZWN0Ym94LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0LS10eXBlMl9fb3B0aW9uc19ib3hcIik7XG4gICAgICAgIGlmICghdGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3QtLXR5cGUyJykpe1xuICAgICAgICAgICAgaWYob3B0aW9uc19ib3guc3R5bGUuZGlzcGxheSE9J25vbmUnKXtcbiAgICAgICAgICAgICAgICBzZWxlY3Rib3guY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gICBcbiAgICAsYm9keUNsaWNrRXZlbnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnN0IHRoYXQ9IHRoaXM7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgIFxuICAgICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgdGhhdC5leGNlcHRlZENsaWNrU2VsZWN0VHlwZTIodGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIGNvbnN0IGNvbW1lbnRzID17XG4vLyAgICAgaW5pdDpmdW5jdGlvbigpe1xuLy8gICAgICAgICB0aGlzLm9uQ2xpY2tBZGRDb21tZW50KCk7XG4vLyAgICAgfVxuLy8gICAgICx2YWw6IHtcbi8vICAgICAgICAgc2VjdGlvbklEOicnXG4vLyAgICAgICAgICx2YWx1ZTonJ1xuLy8gICAgICAgICAsY29vcmQ6e31cbi8vICAgICAgICAgLGNyZWF0ZWRfYXQ6Jydcbi8vICAgICB9XG4vLyAgICAgLG9uQ2xpY2tBZGRDb21tZW50OmZ1bmN0aW9uKCl7XG4vLyAgICAgICAgIGNvbnN0IHRoYXQgPXRoaXM7XG4vLyAgICAgICAgIGNvbnN0IGJ1dHRvbiAgPSAkKFwiLmFkZEltYWdlQ29tbWVudFwiKTtcbiAgICAgIFxuLy8gICAgICAgICBidXR0b24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudHMoXCIuYWRkSW1hZ2VDb21tZW50c0lzc3VlXCIpO1xuLy8gICAgICAgICAgICAgY29uc3QgdmlldyA9IHBhcmVudC5maW5kKFwiLmFkZEltYWdlQ29tbWVudHNBcmVhXCIpO1xuXG4vLyAgICAgICAgICAgICBpZighJCh0aGlzKS5oYXNDbGFzcyhcImJ0bi0tdHlwZTJBLS1hY3RpdmVcIikpe1xuLy8gICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJidG4tLXR5cGUyQS0tYWN0aXZlXCIpO1xuXG4vLyAgICAgICAgICAgICAgICAgY29uc3Qgdmlld1cgPSB2aWV3LndpZHRoKCksXG4vLyAgICAgICAgICAgICAgICAgICAgIHZpZXdIID0gdmlldy5oZWlnaHQoKTtcbi8vICAgICAgICAgICAgICAgICB2aWV3Lm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuLy8gICAgICAgICAgICAgICAgICAgICAvLzEtMS4g7YG066atIOyngOygkCDsooztkZwg7Y287IS87Yq4IOy2lOy2nFxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgcGNudFgsIHBjbnRZO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gZS5vZmZzZXRYO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gZS5vZmZzZXRZO1xuLy8gICAgICAgICAgICAgICAgICAgICBwY250WCA9IHgvdmlld1cqMTAwO1xuLy8gICAgICAgICAgICAgICAgICAgICBwY250WSA9IHkvdmlld0gqMTAwO1xuLy8gICAgICAgICAgICAgICAgICAgICBwY250WCA9IHBjbnRYLnRvRml4ZWQoMSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHBjbnRZID0gcGNudFkudG9GaXhlZCgxKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdGhhdC52YWwuY29vcmQueCA9IHBjbnRYO1xuLy8gICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbC5jb29yZC55ID0gcGNudFk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQudmFsLmNvb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vMS0yLiDsg53shLHrgqDsp5wg7LaU7LacIFxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdGhhdC52YWwuY3JlYXRlZF9hdCA9IGRhdGU7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQudmFsLmNyZWF0ZWRfYXQpO1xuICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgICAgLy8xLTMuIHNlY3Rpb25JROqwkiDstpTstpxcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbklEID0gcGFyZW50LmF0dHIoXCJkYXRhLWlkXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbC5zZWN0aW9uSUQgPSBzZWN0aW9uSUQ7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQudmFsLnNlY3Rpb25JRCk7XG4gICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICAvLzItMS4g7YG066atIOyngOygkOyXkCDrsoTtirwg7IK97J6FXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vICBodG1sIOuzgOqyvSDsmIjsoJVcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWVudHNfaHRtbCA9IGAgPGRpdiBjbGFzcz1cImNvbW1lbnRcIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyBsZWZ0OiR7cGNudFh9JTsgdG9wOiR7cGNudFl9JTtcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnRfX2lubmVyXCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnRfX29yZGVyXCI+MTwvc3Bhbj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50X19zZWxlY3RfYm94XCI+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCLshKDtg50xXCIgbmFtZT1cIuyEoO2DnTFcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwi7ISg7YOdMVwiPjxzcGFuPjwvc3Bhbj7shKDtg50xPC9sYWJlbD5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCLshKDtg50yXCIgbmFtZT1cIuyEoO2DnTJcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwi7ISg7YOdMlwiPjxzcGFuPjwvc3Bhbj7shKDtg50yPC9sYWJlbD5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnRfX2J1dHRvbl9ib3hcIj5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbW1lbnRfX2NvbmZpcm1cIj48c3Bhbj7shKDtg53smYTro4w8L3NwYW4+PC9idXR0b24+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjb21tZW50X19jYW5jbGVcIj48c3Bhbj7ri6vquLA8L3NwYW4+PC9idXR0b24+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZpZXcucHJlcGVuZChjb21tZW50c19odG1sKTtcblxuLy8gICAgICAgICAgICAgICAgICAgICAvLzItMi4g7L2U66mY7LigIOuNlO2VmOq4sCDquLDriqUg66eJ6riwXG4vLyAgICAgICAgICAgICAgICAgICAgIHZpZXcub2ZmKFwiY2xpY2tcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgIC8vMi0zLiDrsoTtirwg7YG066atIOydtOuypO2KuCDsi6Ttlolcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gJChcIi5jb21tZW50XCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICBidXR0b24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3B1cCA9ICQodGhpcykuZmluZChcIi5jb21tZW50X19zZWxlY3RfYm94XCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYocG9wdXAuY3NzKFwiZGlzcGxheVwiKT09PVwibm9uZVwiKXtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5zaG93KCk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLtjJ3sl4Ug7Jik7ZSIXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAuaGlkZSgpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7Yyd7JeFIO2BtOuhnOymiFwiKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIC8vMy4gXG4gICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pOyAgICBcbi8vICAgICAgICAgICAgIH1lbHNle1xuLy8gICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJidG4tLXR5cGUyQS0tYWN0aXZlXCIpO1xuLy8gICAgICAgICAgICAgICAgIC8vMi4g7L2U66mY7LigIOuNlO2VmOq4sCDquLDriqUg7KCc6rGwXG4vLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gICAgICxvbkNsaWNrQ29tbWVudEJ1dHRvbjogZnVuY3Rpb24oZSl7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCfrsoTtirwg7YG066atJyk7XG5cbi8vICAgICAgICAgY29uc3QgYnV0dG9uID0gJChcIi5jb21tZW50XCIpO1xuLy8gICAgICAgICBidXR0b24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICBjb25zdCBwb3B1cCA9ICQodGhpcykuZmluZChcIi5jb21tZW50X19zZWxlY3RfYm94XCIpO1xuLy8gICAgICAgICAgICAgaWYocG9wdXAuY3NzKFwiZGlzcGxheVwiKT09PVwibm9uZVwiKXtcbi8vICAgICAgICAgICAgICAgICBwb3B1cC5zaG93KCk7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLtjJ3sl4Ug7Jik7ZSIXCIpO1xuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfWVsc2V7XG4vLyAgICAgICAgICAgICAgICAgcG9wdXAuaGlkZSgpO1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi7Yyd7JeFIO2BtOuhnOymiFwiKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4vLyAgICAgfVxuLy8gfVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgVUlldmVudHMuaW5pdCgpO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdyZWFkeScsZnVuY3Rpb24oKXtcbiAgICAvLyBjb21tZW50cy5pbml0KCk7XG59KTtcblxuXG5cblxuXG4iLCJjb25zdCBVSWV2ZW50RUIgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmhhbUNsaWNrKCk7XHJcbiAgICAgICAgdGhpcy5sbmJPcGVuKCk7XHJcbiAgICAgICAgdGhpcy5hY2NvcmRpb25CdG5DbGljaygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLGhhbUNsaWNrIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+uplOuJtOuyhO2KvCwgZ25iIOy7qO2KuOuhpFxyXG4gICAgICAgIGNvbnN0IG1lbnVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhhbV9idG5cIik7XHJcbiAgICAgICAgbGV0IGlzTWVudU9wZW4gPSBmYWxzZTtcclxuICAgICAgICBtZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICghaXNNZW51T3Blbikge1xyXG4gICAgICAgICAgICAvLyAgIG1lbnVCdG4uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICQoXCIuaGFtX2J0bj4uaW5uZXI+c3BhblwiKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIzN3B4XCJcclxuICAgICAgICAgICAgICB9LDEyMCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICAgICAgICAgIH0sMTIwLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2VcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgJChcImh0bWwgYm9keVwiKS5jc3Moe292ZXJmbG93OiBcImhpZGRlblwifSk7XHJcbiAgICAgICAgICAgICAgJChcIiNoZWFkZXJcIikuYWRkQ2xhc3MoXCJnbmJfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICQoXCIjbmF2XCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWVudUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICQoXCIuaGFtX2J0bj4uaW5uZXI+c3BhblwiKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIzN3B4XCJcclxuICAgICAgICAgICAgICB9LDEyMCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI2K1wicHhcIlxyXG4gICAgICAgICAgICAgICAgfSwxMjApO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoXCJodG1sIGJvZHlcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiBcInZpc2libGVcIlxyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICAkKFwiI25hdlwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgJChcIiNoZWFkZXJcIikucmVtb3ZlQ2xhc3MoXCJnbmJfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaXNNZW51T3BlbiA9ICFpc01lbnVPcGVuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLGxuYk9wZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgJChcIiNuYXYgLmduYiA+bGlcIikub24oJ21vdXNlZW50ZXInLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHRoYXQuaW5kZXgoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaWR4KVxyXG4gICAgICAgICAgICAkKFwiI25hdiAuZ25iID5saVwiKS5yZW1vdmVDbGFzcyhcIm9uXCIpXHJcbiAgICAgICAgICAgIHRoYXQuYWRkQ2xhc3MoXCJvblwiKVxyXG4gICAgICAgICAgICAkKFwiI2hlYWRlciAubG5iX2FyZWFcIikuYWRkQ2xhc3MoXCJvblwiKTtcclxuICAgICAgICAgICAgJChcIiNoZWFkZXIgLmxuYl9hcmVhIC5sbmJfbWVudVwiKS5yZW1vdmVDbGFzcyhcIm9uXCIpO1xyXG4gICAgICAgICAgICAkKFwiI2hlYWRlciAubG5iX2FyZWEgLmxuYl9tZW51XCIpLmVxKGlkeCkuYWRkQ2xhc3MoXCJvblwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyAkKFwiI2hlYWRlciAubG5iX2FyZWFcIikub24oJ21vdXNlZW50ZXInLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gICAgICQoXCIuaGVhZGVyXCIpLmFkZENsYXNzKFwib25cIik7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmU7XHJcbiAgICAgICAgaWYoJChcIiNuYXYgLmduYiA+bGlcIikuaGFzQ2xhc3MoXCJvblwiKSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRydWVcIilcclxuICAgICAgICAgICAgYWN0aXZlID0gJChcIiNuYXYgLmduYiA+bGkub25cIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKFwiI2hlYWRlciAubG5iX2FyZWFcIikub24oXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQoXCIjaGVhZGVyIC5sbmJfYXJlYVwiKS5yZW1vdmVDbGFzcyhcIm9uXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYXYgLmduYiA+bGlcIikucmVtb3ZlQ2xhc3MoXCJvblwiKVxyXG4gICAgICAgICAgICAgICAgYWN0aXZlLmFkZENsYXNzKFwib25cIilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI2hlYWRlciAubG5iX2FyZWFcIikub24oXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQoXCIjaGVhZGVyIC5sbmJfYXJlYVwiKS5yZW1vdmVDbGFzcyhcIm9uXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNuYXYgLmduYiA+bGlcIikucmVtb3ZlQ2xhc3MoXCJvblwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmUpXHJcbiAgICB9XHJcbiAgICAsYWNjb3JkaW9uQnRuQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB3aW5XID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgdmFyIHdpbldDaGsgPSAnJztcclxuICAgICAgICB2YXIgYWNjID0gJChcIi5hY2NvcmRpb25fYnRuXCIpO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBqO1xyXG5cclxuICAgICAgICB2YXIgY2xpY2tMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWNjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhY2NbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIi5idG5fdHlwZTNcIikuc3RvcCgpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcGFuZWwgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgICAgaWYgKHBhbmVsLnN0eWxlLm1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYW5lbC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gICBcclxufVxyXG5jb25zdCBtb3Rpb24gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnJvbGxpbmdCYW5uZXIoKTtcclxuICAgICAgICB0aGlzLnNjcm9sbEhlYWRlcigpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRm9vdGVyKCk7XHJcbiAgICAgICAgLy8gdGhpcy5tYWluTW90aW9uKCk7XHJcbiAgICAgICAgdGhpcy5nbmJIb3ZlcigpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsTW90aW9uMigpO1xyXG4gICAgICAgIHRoaXMuY2lyY2xlTW90aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3Vyc29yQ29zdG9tKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRNb3Rpb24oKTtcclxuICAgIH1cclxuICAgICxjdXJzb3JDb3N0b206IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG4gICAgICAgIGxldCBvbGRXQ2hrID0gJyc7XHJcbiAgICAgICAgdmFyIGhvdmVyUGx1cyA9ICQoXCJhLCAuaG92ZXJfcGx1c1wiKTtcclxuICAgICAgICAkd2luZG93Lm9uKCdsb2FkIHJlc2l6ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBuZXdXQ2hrID0gd2luZG93LmlubmVyV2lkdGggPiAxMDI0ID8gJ3BjJyA6ICdtbyc7XHJcbiAgICAgICAgICAgIGlmIChuZXdXQ2hrICE9IG9sZFdDaGspIHtcclxuICAgICAgICAgICAgICAgIG9sZFdDaGsgPSBuZXdXQ2hrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdXQ2hrID09ICdwYycpIHtcclxuICAgICAgICAgICAgICAgIGN1cnNvckluaXQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdXQ2hrID09ICdtbycpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cub2ZmKFwibW91c2Vtb3ZlXCIpO1xyXG4gICAgICAgICAgICAgICAgaG92ZXJQbHVzLm9mZihcIm1vdXNlZW50ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBob3ZlclBsdXMub2ZmKFwibW91c2VsZWF2ZVwiKTtcclxuICAgICAgICAgICAgICAgIGhvdmVyUGx1cy5jc3MoXCJjdXJzb3JcIixcInBvaW50ZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmdW5jdGlvbiBjdXJzb3JJbml0KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIG51bSA9IDAuNTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vyc29yJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBob3ZlclBsdXMub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKGN1cnNvcikuYWRkQ2xhc3MoXCJtb3VzZV9wbHVzXCIpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJjdXJzb3JcIixcIm5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICBudW0gPSAwLjJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGhvdmVyUGx1cy5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoY3Vyc29yKS5yZW1vdmVDbGFzcyhcIm1vdXNlX3BsdXNcIik7XHJcbiAgICAgICAgICAgICAgICBudW0gPSAwLjVcclxuICAgICAgICAgICAgfSk7ICAgXHJcbiAgICBcclxuICAgICAgICAgICAvLyBkb3RzIGlzIGFuIGFycmF5IG9mIERvdCBvYmplY3RzLFxyXG4gICAgICAgICAgICAvLyBtb3VzZSBpcyBhbiBvYmplY3QgdXNlZCB0byB0cmFjayB0aGUgWCBhbmQgWSBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAvLyBvZiB0aGUgbW91c2UsIHNldCB3aXRoIGEgbW91c2Vtb3ZlIGV2ZW50IGxpc3RlbmVyIGJlbG93XHJcbiAgICAgICAgICAgIHZhciBkb3RzID0gW10sXHJcbiAgICAgICAgICAgIG1vdXNlID0ge1xyXG4gICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgeTogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVGhlIERvdCBvYmplY3QgdXNlZCB0byBzY2FmZm9sZCB0aGUgZG90c1xyXG4gICAgICAgICAgICB2YXIgRG90ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy55ID0gMDtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZSA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIG4gPSBkb3QuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIC8vIG4uYXBwZW5kVG8oJyNjdXJzb3InKVxyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIG47XHJcbiAgICAgICAgICAgICAgICAvLyB9KCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgdmFyIG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwicGF0aFwiKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgbi5jbGFzc05hbWVOUyA9IFwiY3Vyc29yX2NpcmNsZVwiO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIG4uYXBwZW5kVG8oJyNjdXJzb3InKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJzb3JcIikuYXBwZW5kQ2hpbGQobik7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBuO1xyXG4gICAgICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gVGhlIERvdC5wcm90b3R5cGUuZHJhdygpIG1ldGhvZCBzZXRzIHRoZSBwb3NpdGlvbiBvZiBcclxuICAgICAgICAgICAgLy8gdGhlIG9iamVjdCdzIDxkaXY+IG5vZGVcclxuICAgICAgICAgICAgRG90LnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnZCcsIGBNNTkuMiwzMGMwLDE2LjEtMTMuMSwyOS4yLTI5LjIsMjkuMlMwLjgsNDYuMSwwLjgsMzBDMC44LDEzLjksMTMuOSwwLjgsMzAsMC44UzU5LjIsMTMuOSw1OS4yLDMwemApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLngrXCJweCxcIit0aGlzLnl9cHgpIHNjYWxlKCR7bnVtfSlgO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlcyB0aGUgRG90IG9iamVjdHMsIHBvcHVsYXRlcyB0aGUgZG90cyBhcnJheVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDYwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICB2YXIgZCA9IG5ldyBEb3QoKTtcclxuICAgICAgICAgICAgICAgICBkb3RzLnB1c2goZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIHNjcmVlbiByZWRyYXcgZnVuY3Rpb25cclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhdygpIHtcclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBtb3VzZSBwb3NpdGlvbiBpcyBzZXQgZXZlcnl0aW1lXHJcbiAgICAgICAgICAgIC8vIGRyYXcoKSBpcyBjYWxsZWQuXHJcbiAgICAgICAgICAgIHZhciB4ID0gbW91c2UueCxcclxuICAgICAgICAgICAgICAgIHkgPSBtb3VzZS55O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVGhpcyBsb29wIGlzIHdoZXJlIGFsbCB0aGUgOTBzIG1hZ2ljIGhhcHBlbnNcclxuICAgICAgICAgICAgZG90cy5mb3JFYWNoKGZ1bmN0aW9uKGRvdCwgaW5kZXgsIGRvdHMpIHtcclxuICAgICAgICAgICAgdmFyIG5leHREb3QgPSBkb3RzW2luZGV4ICsgMV0gfHwgZG90c1swXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvdC54ID0geDtcclxuICAgICAgICAgICAgZG90LnkgPSB5O1xyXG4gICAgICAgICAgICBkb3QuZHJhdygpO1xyXG4gICAgICAgICAgICB4ICs9IChuZXh0RG90LnggLSBkb3QueCkgKiAuMTtcclxuICAgICAgICAgICAgeSArPSAobmV4dERvdC55IC0gZG90LnkpICogLjE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3Vyc29yIC5saW5lXCIpXHJcbiAgICAgICAgICAgICR3aW5kb3cuc3RvcCgpLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbW91c2UueCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICBtb3VzZS55ID0gZXZlbnQucGFnZVk7XHJcbiAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGB0cmFuc2Zvcm06dHJhbnNsYXRlKCR7KG1vdXNlLnggLSAyNCkrXCJweCxcIisgKG1vdXNlLnkgLSAyNCl9cHgpYCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYW5pbWF0ZSgpIGNhbGxzIGRyYXcoKSB0aGVuIHJlY3Vyc2l2ZWx5IGNhbGxzIGl0c2VsZlxyXG4gICAgICAgICAgICAvLyBldmVyeXRpbWUgdGhlIHNjcmVlbiByZXBhaW50cyB2aWEgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICAgICAgICAgIGRyYXcoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBBbmQgZ2V0IGl0IHN0YXJ0ZWQgYnkgY2FsbGluZyBhbmltYXRlKCkuXHJcbiAgICAgICAgICAgIGFuaW1hdGUoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICAscm9sbGluZ0Jhbm5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsSUQsIGNsb25lSUQ7XHJcbiAgICAgICAgbGV0IHJvbGxlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9sbGVyXCIpO1xyXG4gICAgICAgIHJvbGxlci5pZCA9IFwicm9sbGVyMVwiO1xyXG5cclxuICAgICAgICBsZXQgY2xvbmUgPSByb2xsZXIuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIGNsb25lLmlkID0gXCJyb2xsZXIyXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb2xsaW5nX2Jhbm5lclwiKS5hcHBlbmRDaGlsZChjbG9uZSk7XHJcblxyXG4gICAgICAgIGZsb3dCYW5uZXJBY3QoKTtcclxuXHJcbiAgICAgICAgLy/rsJjsnZHtmJUgOjog65SU67CU7J207Iqk6rCAIOuzgOqyvSDrkKAg65WM66eI64ukIOuwsOuEiCDroaTrp4Eg7LSI6riw7ZmUXHJcbiAgICAgICAgbGV0IG9sZFdDaGsgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQgPyAncGMnIDogJ21vJztcclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3V0NoayA9IHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCA/ICdwYycgOiAnbW8nO1xyXG4gICAgICAgICAgICBpZiAobmV3V0NoayAhPSBvbGRXQ2hrKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRXQ2hrID0gbmV3V0NoaztcclxuICAgICAgICAgICAgICAgICQoXCIjcm9sbGVyMVwiKS5vZmYoXCJtb3VzZWVudGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNyb2xsZXIyXCIpLm9mZihcIm1vdXNlZW50ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3JvbGxlcjFcIikub2ZmKFwibW91c2VsZWF2ZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjcm9sbGVyMlwiKS5vZmYoXCJtb3VzZWxlYXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgZmxvd0Jhbm5lckFjdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZmxvd0Jhbm5lckFjdCgpIHtcclxuICAgICAgICAgICAgc3RvcFJvbGxlcigpO1xyXG4gICAgICAgICAgICAvL+ychOy5mCDsp4DsoJVcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xsZXIxXCIpLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGxlcjJcIikuc3R5bGUubGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm9sbGVyIHVsXCIpLm9mZnNldFdpZHRoKydweCc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb2xsZXIuY2xhc3NMaXN0LmFkZCgnb3JpZ2luYWwnKTtcclxuICAgICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZCgnY2xvbmUnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByb2xsZXJXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xsZXIgdWwnKS5vZmZzZXRXaWR0aDsvL+2ajOyghCDrsLDrhIgg64SI67mE6rCSXHJcbiAgICAgICAgICAgIGxldCBiZXR3ZWVuRGlzdGFuY2UgPSAxOy8v7J2064+ZIO2BrOq4sCAtIOygleyImOyXrOyVvCDtlahcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v66Gk66eBIOyLnOyekVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzdGFydFJvbGxlcigpe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmV0d2VlblJvbGxDYWxsYmFjayhiZXR3ZWVuRGlzdGFuY2UsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb2xsZXIxJykpO1xyXG4gICAgICAgICAgICAgICAgfSxwYXJzZUludCgxMDAwLzUwKSk7XHJcbiAgICAgICAgICAgICAgICBjbG9uZUlEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBiZXR3ZWVuUm9sbENhbGxiYWNrKGJldHdlZW5EaXN0YW5jZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JvbGxlcjInKSk7XHJcbiAgICAgICAgICAgICAgICB9LHBhcnNlSW50KDEwMDAvNTApKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+uhpOungSDsoJXsp4BcclxuICAgICAgICAgICAgZnVuY3Rpb24gc3RvcFJvbGxlcigpe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChvcmlnaW5hbElEKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2xvbmVJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v66eI7Jqw7IqkIO2YuOuyhOyLnCDroaTrp4HsnbQg66mI7LaU7JeI64ukIOuyl+yWtOuCmOuptCDri6Tsi5wg66Gk66eB7J20IOuQmOuPhOuhnSDsspjrpqxcclxuICAgICAgICAgICAgJChcIiNyb2xsZXIxXCIpLnN0b3AoKS5vbihcIm1vdXNlZW50ZXJcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLsi6TtlokhIVwiKVxyXG4gICAgICAgICAgICAgICAgc3RvcFJvbGxlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNyb2xsZXIyXCIpLnN0b3AoKS5vbihcIm1vdXNlZW50ZXJcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc3RvcFJvbGxlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNyb2xsZXIxXCIpLnN0b3AoKS5vbihcIm1vdXNlbGVhdmVcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuyLpO2WiSEhXCIpXHJcbiAgICAgICAgICAgICAgICBzdGFydFJvbGxlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNyb2xsZXIyXCIpLnN0b3AoKS5vbihcIm1vdXNlbGVhdmVcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc3RhcnRSb2xsZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xsZXIxJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsKCk9Pnsgc3RvcFJvbGxlcigpOyBjb25zb2xlLmxvZyhcIkBcIil9KTtcclxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGxlcjInKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywoKT0+e3N0b3BSb2xsZXIoKX0pO1xyXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sbGVyMScpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCgpPT57c3RhcnRSb2xsZXIoKX0pO1xyXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sbGVyMicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCgpPT57c3RhcnRSb2xsZXIoKX0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/snbjthLDrsowg7JWg64uI66mU7J207IWYIO2VqOyImCjqs7XsmqkpXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBiZXR3ZWVuUm9sbENhbGxiYWNrKGQsIHJvbGxlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IHBhcnNlSW50KHJvbGxlci5zdHlsZS5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxlZnQpXHJcbiAgICAgICAgICAgICAgICByb2xsZXIuc3R5bGUubGVmdCA9IChsZWZ0IC0gZCkrJ3B4JzsvL+ydtOuPmVxyXG4gICAgICAgICAgICAgICAgLy/sobDqsbTrtoAg7JyE7LmYIOumrOyFi1xyXG4gICAgICAgICAgICAgICAgaWYocm9sbGVyV2lkdGggKyAobGVmdCAtIGQpIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGxlci5zdHlsZS5sZWZ0ID0gcm9sbGVyV2lkdGgrJ3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3RhcnRSb2xsZXIoKTsvL+uhpOungSDstIjquLDtmZRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLHNjcm9sbEhlYWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBhZ2VZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgIHZhciBzY3JvbGxOdW07XHJcbiAgICAgICAgdmFyIHdpblcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICB2YXIgd2luV0NoayA9ICcnO1xyXG4gICAgICAgIHZhciBoZWFkZXJIO1xyXG4gICAgICAgIHZhciBoZWFkZXJTY29sbEg7Ly/tl6TrjZQg67m87JW87ZWY64qUIOuGkuydtFxyXG4gICAgICAgIHZhciBsb2dvVzsvL+uhnOqzoOuEk+ydtFxyXG4gICAgICAgIHZhciBsb2dvSDsgLy/roZzqs6DrhpLsnbRcclxuICAgICAgICB2YXIgbG9nb1Njcm9sbFc7Ly/roZzqs6Ag67m87JW87ZWY64qUIOuEk+ydtFxyXG4gICAgICAgIHZhciBsb2dvU2Nyb2xsSDsvL+uhnOqzoCDrubzslbztlZjripQg64aS7J20XHJcblxyXG4gICAgICAgIHZhciB0eHRXOy8vaDLrhJPsnbRcclxuICAgICAgICB2YXIgdHh0SDsgLy9oMuuGkuydtFxyXG4gICAgICAgIHZhciB0eHRTY3JvbGxXOy8vaDIg67m87JW87ZWY64qUIOuEk+ydtFxyXG4gICAgICAgIHZhciB0eHRTY3JvbGxIOy8vaDIg67m87JW87ZWY64qUIOuGkuydtFxyXG5cclxuICAgICAgICAkKHdpbmRvdykub24oJyBzY3JvbGwgcmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzaXplXCIpXHJcbiAgICAgICAgICAgIHdpblcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgcGFnZVkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih3aW5XQ2hrICE9ICdtbycgJiYgd2luVyA8PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICAvL+uqqOuwlOydvFxyXG4gICAgICAgICAgICAgICAgd2luV0NoayA9ICdtbyc7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJIID0gNzI7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJTY29sbEggPSAwO1xyXG4gICAgICAgICAgICAgICAgdHh0VyA9ICQoXCIjaGVhZGVyIGgyXCIpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIHR4dEggPSAkKFwiI2hlYWRlciBoMlwiKS5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbG9nb1cgPSAkKFwiI2hlYWRlciAubG9nb1wiKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICBsb2dvSCA9ICQoXCIjaGVhZGVyIC5sb2dvXCIpLmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSAgaWYod2luV0NoayAhPSAncGMnICYmIHdpblcgPj0gMTAyNSkge1xyXG4gICAgICAgICAgICAgICAgLy9QQyDthYzruJTrpr9cclxuICAgICAgICAgICAgICAgIHdpbldDaGsgPSAncGMnO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVySCA9IDE2MDtcclxuICAgICAgICAgICAgICAgIGhlYWRlclNjb2xsSCA9IDk2O1xyXG4gICAgICAgICAgICAgICAgbG9nb1cgPSAkKFwiI2hlYWRlciAubG9nb1wiKS5pbm5lcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICBsb2dvSCA9ICQoXCIjaGVhZGVyIC5sb2dvXCIpLmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBsb2dvU2Nyb2xsVyA9IDE5MjtcclxuICAgICAgICAgICAgICAgIGxvZ29TY3JvbGxIID0gNjU7XHJcblxyXG4gICAgICAgICAgICAgICAgdHh0VyA9ICQoXCIjaGVhZGVyIGgyXCIpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIHR4dEggPSAkKFwiI2hlYWRlciBoMlwiKS5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgdHh0U2Nyb2xsVyA9IDE2MTtcclxuICAgICAgICAgICAgICAgIHR4dFNjcm9sbEggPSAxNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY3JvbGxOdW0gPSBwYWdlWSAvIDQwMCAqIDEwMDtcclxuICAgICAgICAgICAgaWYoc2Nyb2xsTnVtPjEwMCl7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxOdW0gPSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGhlYWRlciA9ICQoXCIjaGVhZGVyID4ud3JhcFwiKTtcclxuICAgICAgICAgICAgbGV0IGxvZ28gPSAkKFwiI2hlYWRlciAubG9nb1wiKTtcclxuICAgICAgICAgICAgbGV0IG51bSA9IChzY3JvbGxOdW0gLyAxMDApO1xyXG4gICAgICAgICAgICBsZXQgdHh0ID0gJChcIiNoZWFkZXIgaDJcIik7XHJcbiAgICAgICAgICAgIGxldCBuYXYgPSAkKFwiICNuYXZcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBoZWFkZXIuY3NzKHtcclxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IChoZWFkZXJIIC0gKGhlYWRlclNjb2xsSCAqIG51bSkpK1wicHhcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRlTW90aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsb2dvLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IChsb2dvVyAtIChsb2dvU2Nyb2xsVyAqIG51bSkpK1wicHhcIixcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IChsb2dvSCAtIChsb2dvU2Nyb2xsSCAqIG51bSkpK1wicHhcIixcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICgyNCAtICgxNSAqIG51bSkpK1wicHhcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm06IFwic2NhbGUoXCIrKDEgLSAoMC41ODUgKiBudW0pKStcIilcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0eHQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogKHR4dFcgLSAodHh0U2Nyb2xsVyAqIG51bSkpK1wicHhcIixcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICh0eHRIIC0gKHR4dFNjcm9sbEggKiBudW0pKStcInB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAoMjQgLSAoMTUgKiBudW0pKStcInB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtOiBcInNjYWxlKFwiKygxIC0gKDEgKiBudW0pKStcIilcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcGFjaXR5OiAoMSAtICgxICogbnVtKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFyZ2luQm90dG9tOiAoMjYgLSAoMTUgKiBudW0pKStcInB4XCIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG5hdi5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogKDEwOSAtICg4OCAqIG51bSkpK1wicHhcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbldDaGsgPT0gJ3BjJykge1xyXG4gICAgICAgICAgICAgICAgZGVNb3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICxzY3JvbGxGb290ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlclRvcCA9ICQoXCIjZm9vdGVyIC5mb290ZXJfdG9wXCIpO1xyXG4gICAgICAgIHZhciBmb290ZXJIID0gJChcIiNmb290ZXJcIikuaW5uZXJIZWlnaHQoKTtcclxuICAgICAgICB2YXIgcGFnZVkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgdmFyIHBhZ2VIID0gJChcIi50b3RhbF93cmFwXCIpLmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgdmFyIGZvb3RlclRvcEggPSBmb290ZXJUb3AuaW5uZXJIZWlnaHQoKTtcclxuICAgICAgICBsZXQgZm9vdGVyUG9pbnQgPSAocGFnZUggLSAoKHdpbmRvdy5pbm5lckhlaWdodCArIGZvb3RlckgpIC0gZm9vdGVyVG9wSCkpO1xyXG4gICAgICAgIGxldCBvbGRXQ2hrID0gJyc7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwgcmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdXQ2hrID0gd2luZG93LmlubmVyV2lkdGggPiAxMDI0ID8gJ3BjJyA6ICdtbyc7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhZ2VZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgZm9vdGVySCA9ICQoXCIjZm9vdGVyXCIpLmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHBhZ2VZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBwYWdlSCA9ICQoXCIudG90YWxfd3JhcFwiKS5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgICAgICBmb290ZXJUb3BIID0gZm9vdGVyVG9wLmlubmVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZvb3RlckgsIHBhZ2VZLCBwYWdlSCwgZm9vdGVyVG9wSCwgd2luZG93LmlubmVySGVpZ2h0KVxyXG4gICAgICAgICAgICBmb290ZXJQb2ludCA9IChwYWdlSCAtICgod2luZG93LmlubmVySGVpZ2h0ICsgZm9vdGVySCkgLSBmb290ZXJUb3BIKSk7XHJcbiAgICAgICAgICAgIGlmKHBhZ2VZID49IGZvb3RlclBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJUb3AuYWRkQ2xhc3MoXCJzdGlja3lcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJUb3AucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5ld1dDaGsgIT0gb2xkV0Noaykge1xyXG4gICAgICAgICAgICAgICAgb2xkV0NoayA9IG5ld1dDaGs7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAsc21vb3RoU2Nyb2xsOiBmdW5jdGlvbigpIHt9XHJcbiAgICAsaGVhZGVyTW90aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiI2hlYWRlcj4ud3JhcFwiKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6MVxyXG4gICAgICAgIH0sNzAwKTtcclxuICAgICAgICAkKFwiLmZvb3Rlcl90b3A+LndyYXBcIikuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OjFcclxuICAgICAgICB9LDcwMCk7XHJcbiAgICB9XHJcbiAgICAsbWFpbk1vdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoJChcIiNjb250ZW50c1dyYXBcIikuaGFzQ2xhc3MoXCJtYWluX3BhZ2VcIikgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1haW5cIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBsZW5nID0gJChcIi5jb2x1bW5fYXJlYSAubGluZV93cmFwIC5saW5lXCIpLmxlbmd0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhlYWRlckxpbmUoKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhlYWRlckxpbmUoKSB7XHJcbiAgICAgICAgICAgICAgIGxldCBsZW5nID0gJChcIiNoZWFkZXI+LmxpbmVcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICBsZXQgbGVuZzIgPSAkKFwiI2Zvb3Rlcl90b3AgLmxpbmVcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICBjb25zdCBsaW5lQW5pID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW1hdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICQoXCIjaGVhZGVyPi5saW5lXCIpLmVxKGlkeCkuYW5pbWF0ZSh7IHdpZHRoOiAxMDArXCIlXCJ9LHtcclxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246NTAwLFxyXG4gICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbiggbm93LCBmeCApe1xyXG4gICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGZ4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmeC5zdGFydD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihub3c+NjAgJiYgYW5pbWF0ZUZsYWcpeyAvL2FuaWFtdGlvbiA3MCUg7J207IOB7J2066m0IOuLpOydjCB0YXJnZXQgYW5pbWF0aW9uIOyLpO2WiVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lQW5pKCsraWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWR4PT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUFuaTMoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVBbmkyKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGlmKGlkeD09PWxlbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5lQW5pMygwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDsmYTro4zsi5wg7KKF66OMIFxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVBbmkyID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi7Iuk7ZaJXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW1hdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmZvb3Rlcl90b3AgLmxpbmVcIikuZXEoaWR4KS5hbmltYXRlKHsgd2lkdGg6IDEwMCtcIiVcIn0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246NTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24oIG5vdywgZnggKXtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coZngpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmeC5zdGFydD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobm93PjYwICYmIGFuaW1hdGVGbGFnKXsgLy9hbmlhbXRpb24gNzAlIOydtOyDgeydtOuptCDri6TsnYwgdGFyZ2V0IGFuaW1hdGlvbiDsi6TtlolcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVBbmkyKCsraWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpZHg9PT1sZW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGluZUFuaTMoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZU1vdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8g7JmE66OM7IucIOyiheujjCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUFuaTMgPSAoaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW1hdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbHVtbl9hcmVhIC5saW5lX3dyYXAgLmxpbmVcIikuZXEoaWR4KS5zdG9wKCkuYW5pbWF0ZSh7IGhlaWdodDogMTAwK1wiJVwifSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjoyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbiggbm93LCBmeCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhmeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZ4LnN0YXJ0PT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZihub3c+ODAgJiYgYW5pbWF0ZUZsYWcpeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVBbmkzKCsraWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaWR4PT09bGVuZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3Rpb24uc2Nyb2xsTW90aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3Rpb24uaGVhZGVyTW90aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZU1vdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNpcmNsZSA9ICQoXCIuaXRlbV93cmFwIC5jaXJjbGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNpcmNsZUxpbmUgPSAkKFwiLml0ZW1fd3JhcCAuY2lyY2xlIHN2ZyBlbGxpcHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZUxpbmUuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxzdHJva2VEYXNoYXJyYXk6IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwxNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZS5maW5kKFwiLmJnXCIpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6MVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LDQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZS5maW5kKFwiLmxheWVyXzJcIikuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eToxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sNDAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXJjbGUuYWRkQ2xhc3MoXCJhY3RpdmVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUFuaTMoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgbGluZUFuaSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG9sZFdDaGsgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQgPyAncGMnIDogJ21vJztcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdXQ2hrID0gd2luZG93LmlubmVyV2lkdGggPiAxMDI0ID8gJ3BjJyA6ICdtbyc7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3V0NoayAhPSBvbGRXQ2hrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkV0NoayA9IG5ld1dDaGs7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNoZWFkZXIgLmxpbmVcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmNvbHVtbl9hcmVhIC5saW5lX3dyYXAgLmxpbmVcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNoZWFkZXIgLmxvZ29cIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxoZWlnaHQ6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxtYXJnaW5Cb3R0b206ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNoZWFkZXIgaDJcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxoZWlnaHQ6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxtYXJnaW5Cb3R0b206ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiAjbmF2XCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJydcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2hlYWRlcj4ud3JhcCwgLmZvb3Rlcl90b3A+LndyYXBcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTonJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLGNpcmNsZU1vdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGxhc3RTY3JvbGxZID0gMDtcclxuICAgICAgICB2YXIgYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY2lyY2xlID0gJChcIi5jaXJjbGVcIilcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICBjaXJjbGUuY3NzKHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVZKC1cIit3aW5kb3cucGFnZVlPZmZzZXQgLyAxMDAgK1wiJSlcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOydtOyghOydmCDsiqTtgazroaQg7JyE7LmY7JmAIOu5hOq1kO2VmOq4sFxyXG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzY3JvbGxZID4gbGFzdFNjcm9sbFkgPyBcIlNjcm9sbCBEb3duXCIgOiBcIlNjcm9sbCBVcFwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8g7ZiE7J6s7J2YIOyKpO2BrOuhpCDqsJLsnYQg7KCA7J6lXHJcbiAgICAgICAgICAgIGxhc3RTY3JvbGxZID0gc2Nyb2xsWTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJTY3JvbGwgVXBcIikge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2UgaWYoZGlyZWN0aW9uID09PSBcIlNjcm9sbCBEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICxzY3JvbGxNb3Rpb246ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcclxuICAgICAgICB2YXIgIHdpblcgPSAkd2luZG93LmlubmVyV2lkdGgoKVxyXG4gICAgICAgICAgICAgLGRlbGF5UG9zaXRpb24gPSAtMTAwXHJcbiAgICAgICAgICAgICAsd2luZG93aGVpZ2h0O1xyXG4gICAgICAgIGluc2VydFRhcmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gJHdpbmRvdy5zY3JvbGxUb3AoKSArIHdpbmRvd2hlaWdodCArIGRlbGF5UG9zaXRpb247XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbW90aW9uLnRhcmdldDAxKCQoXCIuYWN0aXZlX2l0ZW1cIikscG9zaXRpb24pO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgbGV0IG9sZFdDaGsgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQgPyAncGMnIDogJ21vJztcclxuICAgICAgICAkd2luZG93Lm9uKCdsb2FkIHJlc2l6ZSBzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5ld1dDaGsgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQgPyAncGMnIDogJ21vJztcclxuICAgICAgICAgICAgaW5zZXJ0VGFyZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gJHdpbmRvdy5zY3JvbGxUb3AoKSArIHdpbmRvd2hlaWdodCArIGRlbGF5UG9zaXRpb247XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBtb3Rpb24udGFyZ2V0MDEoJChcIi5hY3RpdmVfaXRlbVwiKSxwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIGluc2VydFRhcmdldFBvc2l0aW9uKCkge1xyXG4gICAgICAgICAgICB3aW5kb3doZWlnaHQgPSAkd2luZG93Lm91dGVySGVpZ2h0KCk7IFxyXG4gICAgICAgICAgICAkKCcuYWN0aXZlX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICQodGhpcykuZGF0YSgnb2Zmc2V0VG9wJywgKCQodGhpcykub2Zmc2V0KCkudG9wKSk7IFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAsdGFyZ2V0MDE6IGZ1bmN0aW9uKHRhcmdldCxwb3NpdGlvbikge1xyXG4gICAgICAgICQodGFyZ2V0KS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKCEkKHRoaXMpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICYmICQodGhpcykuZGF0YSgnb2Zmc2V0VG9wJykgPCBwb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInJlYWR5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAsZ25iSG92ZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi53YXZlX3R4dCAudG9wXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5maW5kKFwic3BhblwiKTtcclxuICAgICAgICAgICAgZm9yKGxldCBqPSAwOyBqIDwgaXRlbS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgJCgkKGl0ZW0pW2pdKS5jc3Moeyd0cmFuc2l0aW9uLWRlbGF5JzowLjArai8yMCsncyd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIud2F2ZV90eHQgLmJ0XCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCh0aGlzKS5maW5kKFwic3BhblwiKTtcclxuICAgICAgICAgICAgZm9yKGxldCBqPSAwOyBqIDwgaXRlbS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgJCgkKGl0ZW0pW2pdKS5jc3Moeyd0cmFuc2l0aW9uLWRlbGF5JzowLjArai8yMCsncyd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLHNjcm9sbE1vdGlvbjI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG4gICAgICAgIGxldCBvbGRXQ2hrID0gJyc7XHJcbiAgICAgICAgJHdpbmRvdy5vbignbG9hZCByZXNpemUgc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IG5ld1dDaGsgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQgPyAncGMnIDogJ21vJztcclxuICAgICAgICAgICAgaWYgKG5ld1dDaGsgIT0gb2xkV0Noaykge1xyXG4gICAgICAgICAgICAgICAgb2xkV0NoayA9IG5ld1dDaGs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3V0NoayA9PSAncGMnKSB7XHJcbiAgICAgICAgICAgICAgICBkZXNrdG9wTW90aW9uKHdpbmRvdy5wYWdlWU9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld1dDaGsgPT0gJ21vJykge1xyXG4gICAgICAgICAgICAgICAgbW9Nb3Rpb24od2luZG93LnBhZ2VZT2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIGRlc2t0b3BNb3Rpb24oc2Nyb2xsKXtcclxuICAgICAgICAgICAgJChcIi5kX3Njb2xsX3R5cGUxXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWSgtXCIrc2Nyb2xsIC8gNDAwICtcIiUpXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIuZF9zY29sbF90eXBlMlwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVkoXCIrc2Nyb2xsIC8gNDAwICtcIiUpXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIuZF9zY29sbF90eXBlM1wiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVkoXCIrc2Nyb2xsIC8gMzUwICtcIiUpXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG1vTW90aW9uKHNjcm9sbCl7XHJcbiAgICAgICAgICAgICQoXCIubV9zY29sbF90eXBlMVwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2Zvcm1cIjpcInRyYW5zbGF0ZVkoLVwiK3Njcm9sbCAvIDQwMCArXCIlKVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKFwiLm1fc2NvbGxfdHlwZTJcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGVZKC1cIitzY3JvbGwgLyA0MDAgK1wiJSlcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIi5tX3Njb2xsX3R5cGUzXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWShcIitzY3JvbGwgLyAzNTAgK1wiJSlcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIi5tX3Njb2xsX3R5cGU0XCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zZm9ybVwiOlwidHJhbnNsYXRlWSgtXCIrc2Nyb2xsIC8gNTAwICtcIiUpXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICxzdGFydE1vdGlvbjogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgbGVuZyA9ICQoXCIubW90aW9uX2l0ZW1fYXJlYSAubGluZV93cmFwIC5saW5lXCIpLmxlbmd0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgaGVhZGVyTGluZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGhlYWRlckxpbmUoKSB7XHJcbiAgICAgICAgICAgIGxldCBsZW5nID0gJChcIiNoZWFkZXI+LmxpbmVcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgbGVuZzIgPSAkKFwiI2Zvb3Rlcl90b3AgLmxpbmVcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lQW5pID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgdmFyIGFuaW1hdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICQoXCIjaGVhZGVyPi5saW5lXCIpLmVxKGlkeCkuYW5pbWF0ZSh7IHdpZHRoOiAxMDArXCIlXCJ9LHtcclxuICAgICAgICAgICAgICAgZHVyYXRpb246NTAwLFxyXG4gICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbiggbm93LCBmeCApe1xyXG4gICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGZ4KTtcclxuICAgICAgICAgICAgICAgICBpZihmeC5zdGFydD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICBpZihub3c+NjAgJiYgYW5pbWF0ZUZsYWcpeyAvL2FuaWFtdGlvbiA3MCUg7J207IOB7J2066m0IOuLpOydjCB0YXJnZXQgYW5pbWF0aW9uIOyLpO2WiVxyXG4gICAgICAgICAgICAgICAgICAgICBsaW5lQW5pKCsraWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgaWYoaWR4PT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgbGluZUFuaTMoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxpbmVBbmkyKDApO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGlmKGlkeD09PWxlbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAvLyBsaW5lQW5pMygwKTtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyDsmYTro4zsi5wg7KKF66OMIFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGNvbnN0IGxpbmVBbmkyID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi7Iuk7ZaJXCIpXHJcbiAgICAgICAgICAgICAgICAgdmFyIGFuaW1hdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAkKFwiLmZvb3Rlcl90b3AgLmxpbmVcIikuZXEoaWR4KS5hbmltYXRlKHsgd2lkdGg6IDEwMCtcIiVcIn0se1xyXG4gICAgICAgICAgICAgICAgICAgZHVyYXRpb246NTAwLFxyXG4gICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24oIG5vdywgZnggKXtcclxuICAgICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coZngpO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZihmeC5zdGFydD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYobm93PjYwICYmIGFuaW1hdGVGbGFnKXsgLy9hbmlhbXRpb24gNzAlIOydtOyDgeydtOuptCDri6TsnYwgdGFyZ2V0IGFuaW1hdGlvbiDsi6TtlolcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVBbmkyKCsraWR4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZihpZHg9PT1sZW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGluZUFuaTMoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZU1vdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8g7JmE66OM7IucIOyiheujjCBcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgY29uc3QgbGluZUFuaTMgPSAoaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgdmFyIGFuaW1hdGVGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAkKFwiLm1vdGlvbl9pdGVtX2FyZWEgLmxpbmVfd3JhcCAubGluZVwiKS5lcShpZHgpLnN0b3AoKS5hbmltYXRlKHsgaGVpZ2h0OiAxMDArXCIlXCJ9LHtcclxuICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOjIwMCxcclxuICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCBub3csIGZ4ICl7XHJcbiAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGZ4KTtcclxuICAgICAgICAgICAgICAgICAgICAgaWYoZnguc3RhcnQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmKG5vdz44MCAmJiBhbmltYXRlRmxhZyl7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGluZUFuaTMoKytpZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZihpZHg9PT1sZW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIG1vdGlvbi5zY3JvbGxNb3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIG1vdGlvbi5oZWFkZXJNb3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgY29uc3QgY2lyY2xlTW90aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICBsZXQgY2lyY2xlID0gJChcIi5pdGVtX3dyYXAgLmNpcmNsZVwiKTtcclxuICAgICAgICAgICAgICAgICBsZXQgY2lyY2xlTGluZSA9ICQoXCIuaXRlbV93cmFwIC5jaXJjbGUgc3ZnIGVsbGlwc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgY2lyY2xlTGluZS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgLHN0cm9rZURhc2hhcnJheTogXCJub25lXCJcclxuICAgICAgICAgICAgICAgICB9LDE1MDAsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgY2lyY2xlLmZpbmQoXCIuYmdcIikuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eToxXHJcbiAgICAgICAgICAgICAgICAgICAgIH0sNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgY2lyY2xlLmZpbmQoXCIubGF5ZXJfMlwiKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OjFcclxuICAgICAgICAgICAgICAgICAgICAgfSw0MDAsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZS5hZGRDbGFzcyhcImFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQW5pMygwKTtcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICBsaW5lQW5pKDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7XHJcbiAgICBVSWV2ZW50RUIuaW5pdCgpO1xyXG4gICAgbW90aW9uLmluaXQoKTtcclxuXHJcbiAgICBsZXQgb2xkV0NoayA9IHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCA/ICdwYycgOiAnbW8nO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmV3V0NoayA9IHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCA/ICdwYycgOiAnbW8nO1xyXG4gICAgICAgIGlmIChuZXdXQ2hrICE9IG9sZFdDaGspIHtcclxuICAgICAgICAgICAgb2xkV0NoayA9IG5ld1dDaGs7XHJcbiAgICAgICAgICAgICQoXCIjaGVhZGVyIC5saW5lLCAuZm9vdGVyX3RvcCAubGluZVwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIubW90aW9uX2l0ZW1fYXJlYSAubGluZV93cmFwIC5saW5lXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIjaGVhZGVyIC5sb2dvXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJydcclxuICAgICAgICAgICAgICAgICxoZWlnaHQ6ICcnXHJcbiAgICAgICAgICAgICAgICAsbWFyZ2luQm90dG9tOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNoZWFkZXIgaDJcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgLGhlaWdodDogJydcclxuICAgICAgICAgICAgICAgICxtYXJnaW5Cb3R0b206ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKFwiICNuYXZcIikuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoXCIjaGVhZGVyPi53cmFwLCAuZm9vdGVyX3RvcD4ud3JhcFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTonJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbW90aW9uLnN0YXJ0TW90aW9uKCk7XHJcbiAgICAgICAgICAgIH0sMjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5vbigncmVhZHknLCBmdW5jdGlvbigpe1xyXG4gICAgLyogYe2DnOq3uCDsnbTrsqTtirgg66eJ6riwICovXHJcbiAgICAkKCdhW2hyZWY9XCIjXCJdJykub24oXCJjbGlja1wiLGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxufSk7IiwidmFyIFVTRTkgPSB7XG5cdHNjcm9sbE9mZjpmdW5jdGlvbigpe1xuXHRcdCQod2luZG93KS5vbihcIm1vdXNld2hlZWwuZGlzYWJsZVNjcm9sbCBET01Nb3VzZVNjcm9sbC5kaXNhYmxlU2Nyb2xsIHRvdWNobW92ZS5kaXNhYmxlU2Nyb2xsXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHJldHVybjtcblx0XHR9KTtcblx0XHQkKHdpbmRvdykub24oXCJrZXlkb3duLmRpc2FibGVTY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIGV2ZW50S2V5QXJyYXkgPSBbMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MF07XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50S2V5QXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PT0gZXZlbnRLZXlBcnJheSBbaV0pIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0LHNjcm9sbE9uOmZ1bmN0aW9uKCl7XG5cdFx0ICQod2luZG93KS5vZmYoXCIuZGlzYWJsZVNjcm9sbFwiKTtcblx0fVxuXHQsZ2V0VXJsVmFyczpmdW5jdGlvbigpe1xuXHRcdHZhciB2YXJzID0gW10sIGhhc2g7XG5cdFx0dmFyIGhhc2hlcyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNsaWNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJz8nKSArIDEpLnNwbGl0KCcmJyk7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhhc2hlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFzaCA9IGhhc2hlc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0dmFycy5wdXNoKGhhc2hbMF0pO1xuXHRcdFx0dmFyc1toYXNoWzBdXSA9IGhhc2hbMV07XG5cdFx0fVxuXHRcdHJldHVybiB2YXJzO1xuXHR9XG5cdCxnZXRVcmxWYXI6ZnVuY3Rpb24obmFtZSl7XG5cdFx0cmV0dXJuIFVTRTkuZ2V0VXJsVmFycygpW25hbWVdO1xuXHR9XG5cdCxzZXRVcmxWYXI6ZnVuY3Rpb24obmFtZSx2YWx1ZSl7XG5cdFx0dmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXHRcdGlmKFVTRTkuZ2V0VXJsVmFyKG5hbWUpKVxuXHRcdHtcblx0XHRcdHVybCA9IHVybC5yZXBsYWNlKG5hbWUrXCI9XCIrVVNFOS5nZXRVcmxWYXIobmFtZSksbmFtZStcIj1cIit2YWx1ZSkgO1xuXHRcdH1lbHNlXG5cdFx0e1xuXHRcdFx0dXJsICs9IFwiJlwiK25hbWUrXCI9XCIrdmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiB1cmw7XG5cdH1cblx0LGdldF9zaGFyZV9saW5rX3VybDpmdW5jdGlvbihzbnNfdHlwZSl7XG5cdFx0dmFyIHVybCA9IFwiXCI7XG5cdFx0XG5cblx0XHRpZihsb2NhdGlvbi5wYXRobmFtZSA9PVwiL21vYmlsZS9pbmRleC5hc3BcIil7XG5cdFx0XHR1cmwgPSBcImh0dHA6Ly9ndWVzc3RoZWRheS5jby5rci8jLz9wYWdlbmFtZT1jb2xsZWN0aW9uXCI7XG5cdFx0fWVsc2UgaWYobG9jYXRpb24ucGF0aG5hbWUgPT1cIi9tb2JpbGUvdmlkZW8uYXNwXCIpe1xuXHRcdFx0dXJsID0gXCJodHRwOi8vZ3Vlc3N0aGVkYXkuY28ua3IvIy8/cGFnZW5hbWU9dmlkZW9cIjtcblx0XHR9ZWxzZSBpZihsb2NhdGlvbi5wYXRobmFtZSA9PVwiL21vYmlsZS9sb29rYm9vay5hc3BcIil7XG5cdFx0XHR1cmwgPSBcImh0dHA6Ly9ndWVzc3RoZWRheS5jby5rci8jLz9wYWdlbmFtZT1sb29rYm9va1wiO1xuXHRcdH1lbHNlIGlmKGxvY2F0aW9uLnBhdGhuYW1lID09XCIvbW9iaWxlL2V2ZW50LmFzcFwiKXtcblx0XHRcdHVybCA9IFwiaHR0cDovL2d1ZXNzdGhlZGF5LmNvLmtyLyMvP3BhZ2VuYW1lPWNvbGxlY3Rpb25cIjtcblx0XHR9ZWxzZSBpZihsb2NhdGlvbi5wYXRobmFtZSA9PVwiL21vYmlsZS9pbmZvLmFzcFwiKXtcblx0XHRcdHVybCA9IFwiaHR0cDovL2d1ZXNzdGhlZGF5LmNvLmtyLyMvP3BhZ2VuYW1lPXN0b3JlaW5mb1wiO1xuXHRcdH1lbHNle1xuXHRcdFx0dXJsID0gbG9jYXRpb24uaHJlZjtcblx0XHR9XG5cblx0XHR1cmwgID0gdXJsLnJlcGxhY2UoXCIjXCIsXCIlMjNcIik7XG5cdFx0dXJsICA9IHVybC5yZXBsYWNlKC8mL2dpLFwiJTI2XCIpO1xuXG5cblx0XHRcblx0XHR2YXIgc2hhcmVfdXJsO1x0XG5cdFx0aWYoc25zX3R5cGUgPT0gXCJmYlwiKXtcblx0XHRcdHNoYXJlX3VybCA9J2h0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dD1HVUVTU1RIRURBWSZ1PScgKyB1cmw7XG5cdFx0fWVsc2UgaWYoc25zX3R5cGUgPT0gXCJrYVwiKXtcblx0XHRcdHNoYXJlX3VybCA9dXJsO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gc2hhcmVfdXJsO1xuXHR9XG5cdCxnZXRTY3JlZW5UeXBlOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHR5cGUgPSBcIlwiXG5cdFx0aWYoJCh3aW5kb3cpLndpZHRoKCk+PTk4MCl7XG5cdFx0XHR0eXBlID0gXCJkZXNrdG9wXCI7XG5cdFx0fWVsc2V7XG5cdFx0XHR0eXBlID0gXCJtb2JpbGVcIjtcblx0XHR9XG5cdFx0cmV0dXJuIHR5cGU7XG5cblx0fVxuXG5cdC8v7ZWo7IiY7JeQIOuwsOyXtOydhCDrhKPslrTso7zrqbQg6rCA7J6lIOyggeydgCB2YWx1ZeydmCDsnbjrjbHsiqTqsJLsnYQg66as7YS0XG5cdCxnZXRNaW5BcnJheU51bTpmdW5jdGlvbihhcnkpe1xuXHRcdHZhciBtaW5OdW0gPSBNYXRoLm1pbi5hcHBseShNYXRoLCBhcnkpO1xuXHRcdHZhciByZXR1cm5WYWx1ZSA9IDA7XG5cdFx0Y29uc29sZS5sb2cobWluTnVtK1wibWluIG51bVwiKTtcblx0XHQkLmVhY2goYXJ5LCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuXHRcdFx0Y29uc29sZS5sb2codmFsdWUrXCIvLy9cIittaW5OdW0rXCJtaW4gbnVtXCIpO1xuXHRcdFx0aWYodmFsdWU9PW1pbk51bSl7XG5cdFx0XHRcdHJldHVyblZhbHVlPWluZGV4O1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXR1cm5WYWx1ZTtcblx0fVxuXHQsZ2V0SW50ZXJuZXRFeHBsb3JlclZlcnNpb246ZnVuY3Rpb24oKSB7ICAgIFxuICAgICAgICAgdmFyIHJ2ID0gLTE7IC8vIFJldHVybiB2YWx1ZSBhc3N1bWVzIGZhaWx1cmUuICAgIFxuICAgICAgICAgaWYgKG5hdmlnYXRvci5hcHBOYW1lID09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7ICAgICAgICBcbiAgICAgICAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDsgICAgICAgIFxuICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKFwiTVNJRSAoWzAtOV17MSx9W1xcLjAtOV17MCx9KVwiKTsgICAgICAgIFxuICAgICAgICAgICAgICBpZiAocmUuZXhlYyh1YSkgIT0gbnVsbCkgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHJ2ID0gcGFyc2VGbG9hdChSZWdFeHAuJDEpOyAgICBcbiAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgcmV0dXJuIHJ2OyBcbiAgICB9XG4gICAgLGh0bWxFbmNvZGU6ZnVuY3Rpb24odmFsdWUpe1xuXHQgIC8vY3JlYXRlIGEgaW4tbWVtb3J5IGRpdiwgc2V0IGl0J3MgaW5uZXIgdGV4dCh3aGljaCBqUXVlcnkgYXV0b21hdGljYWxseSBlbmNvZGVzKVxuXHQgIC8vdGhlbiBncmFiIHRoZSBlbmNvZGVkIGNvbnRlbnRzIGJhY2sgb3V0LiAgVGhlIGRpdiBuZXZlciBleGlzdHMgb24gdGhlIHBhZ2UuXG5cdCAgLy9yZXR1cm4gJCgnPGRpdi8+JykuaHRtbChkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblx0ICBcblx0ICB0ZW1wID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0ICB0ZW1wID0gdGVtcC5yZXBsYWNlKFwiK1wiLFwiIFwiKTtcblx0ICBjb25zb2xlLmxvZyh0ZW1wKVxuXHQgIHJldHVybiB0ZW1wO1xuXG5cdH1cblx0LGdldEV4dGVuc2lvbk9mRmlsZW5hbWU6ZnVuY3Rpb24oZmlsZW5hbWUpIHtcblxuXHRcdHZhciBfZmlsZUxlbiA9IGZpbGVuYW1lLmxlbmd0aDtcblxuXHRcdC8qKiBcblx0XHQgKiBsYXN0SW5kZXhPZignLicpIFxuXHRcdCAqIOuSpOyXkOyEnOu2gO2EsCAnLifsnZgg7JyE7LmY66W8IOywvuq4sOychO2VnCDtlajsiJhcblx0XHQgKiDqsoDsg4kg66y47J6Q7J2YIOychOy5mOulvCDrsJjtmZjtlZzri6QuXG5cdFx0ICog7YyM7J28IOydtOumhOyXkCAnLifsnbQg7Y+s7ZWo65CY64qUIOqyveyasOqwgCDsnojquLAg65WM66y47JeQIGxhc3RJbmRleE9mKCkg7IKs7JqpXG5cdFx0ICovXG5cdFx0dmFyIF9sYXN0RG90ID0gZmlsZW5hbWUubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdC8vIO2ZleyepeyekCDrqoXrp4wg7LaU7Lac7ZWcIO2bhCDshozrrLjsnpDroZwg67OA6rK9XG5cdFx0dmFyIF9maWxlRXh0ID0gZmlsZW5hbWUuc3Vic3RyaW5nKF9sYXN0RG90LCBfZmlsZUxlbikudG9Mb3dlckNhc2UoKTtcblxuXHRcdHJldHVybiBfZmlsZUV4dDtcblx0fVxuXHQsaHRtbERlY29kZTpmdW5jdGlvbih2YWx1ZSl7XG4gICAgICB2YXIgdGVtcCA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICB0ZW1wID0gdGVtcC5yZXBsYWNlKFwiK1wiLFwiIFwiKTtcbiAgICAgIHJldHVybiB0ZW1wO1xuICAgfVxuICAgLHJldHVybl9kZXZpY2VTaXplOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3aW5XID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgIHZhciBkZXZpY2UgPSBcIlwiO1xuICAgICAgICBpZih3aW5XPjc2OCl7XG4gICAgICAgICAgICBkZXZpY2UgPSBcImRlc2t0b3BcIjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkZXZpY2UgPSBcIm1vYmlsZVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXZpY2U7XG5cdH1cblx0LGNoZWNrTW9iaWxlOmZ1bmN0aW9uKCl7XG5cdFx0dmFyIHZhclVBID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyAvL3VzZXJBZ2VudCDqsJIg7Ja76riwXG4gXG5cdFx0aWYgKCB2YXJVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAtMSkge1xuXHRcdFx0Ly/slYjrk5zroZzsnbTrk5xcblx0XHRcdHJldHVybiBcImFuZHJvaWRcIjtcblx0XHR9IGVsc2UgaWYgKCB2YXJVQS5pbmRleE9mKFwiaXBob25lXCIpID4gLTF8fHZhclVBLmluZGV4T2YoXCJpcGFkXCIpID4gLTF8fHZhclVBLmluZGV4T2YoXCJpcG9kXCIpID4gLTEgKSB7XG5cdFx0XHQvL0lPU1xuXHRcdFx0cmV0dXJuIFwiaW9zXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8v7JWE7J207Y+wLCDslYjrk5zroZzsnbTrk5wg7Jm4XG5cdFx0XHRyZXR1cm4gXCJvdGhlclwiO1xuXHRcdH1cblx0fVxufVxuXG52YXIgY29va2llRiA9IHtcblx0c2V0Q29va2llTW9iaWxlOmZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSwgZXhwaXJlZGF5cyApe1xuXHQgICB2YXIgdG9kYXlEYXRlID0gbmV3IERhdGUoKTtcblx0ICAgdG9kYXlEYXRlLnNldERhdGUoIHRvZGF5RGF0ZS5nZXREYXRlKCkgKyBleHBpcmVkYXlzICk7XG5cdCAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyBlc2NhcGUoIHZhbHVlICkgKyAnOyBwYXRoPS87IGV4cGlyZXM9JyArIHRvZGF5RGF0ZS50b1VUQ1N0cmluZygpICsgJzsnXG5cdH1cblx0LGdldENvb2tpZU1vYmlsZTpmdW5jdGlvbihuYW1lKXsgXG5cdFx0dmFyIG9iaiA9IG5hbWUgKyBcIj1cIjsgXG5cdFx0dmFyIHggPSAwO1xuXHRcdHZhciBlbmRPZkNvb2tpZT0nJzsgXG5cdFx0d2hpbGUgKCB4IDw9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGggKSBcblx0XHR7IFxuXHRcdFx0dmFyIHkgPSAoeCtvYmoubGVuZ3RoKTsgXG5cdFx0XHRpZiAoIGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoIHgsIHkgKSA9PSBvYmogKSBcblx0XHRcdHsgXG5cdFx0XHRcdGlmICgoZW5kT2ZDb29raWU9ZG9jdW1lbnQuY29va2llLmluZGV4T2YoIFwiO1wiLCB5ICkpID09IC0xICkgXG5cdFx0XHRcdFx0ZW5kT2ZDb29raWUgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xuXHRcdFx0XHRyZXR1cm4gdW5lc2NhcGUoIGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoIHksIGVuZE9mQ29va2llICkgKTsgXG5cdFx0XHR9IFxuXHRcdFx0eCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCBcIiBcIiwgeCApICsgMTsgXG5cdFx0XHRpZiAoIHggPT0gMCApIFxuXHRcdFx0XHRicmVhazsgXG5cdFx0fSBcblx0XHRyZXR1cm4gXCJcIjsgXG5cblx0fVxuIH0iXX0=
