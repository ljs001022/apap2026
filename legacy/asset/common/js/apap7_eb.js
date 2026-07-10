const UIeventEB = {
    init: function() {
        
        this.hamClick();
        this.lnbOpen();
        this.accordionBtnClick();
        
    }
    ,hamClick : function(){
        //메뉴버튼, gnb 컨트롤
        const menuBtn = document.querySelector(".ham_btn");
        let isMenuOpen = false;
        menuBtn.addEventListener("click", function() {
          if (!isMenuOpen) {
            //   menuBtn.classList.add("close");
              $(".ham_btn>.inner>span").stop().animate({
                width: "37px"
              },120,function(){
                $(this).stop().animate({
                    width: 0
                },120,function(){
                    menuBtn.classList.add("close")
                });
              })
              $("html body").css({overflow: "hidden"});
              $("#header").addClass("gnb_active");
              $("#nav").addClass("active");
          } else {
            menuBtn.classList.remove("close");
            $(".ham_btn>.inner>span").stop().animate({
                width: "37px"
              },120,function(){
                $(this).stop().animate({
                    width: 26+"px"
                },120);
              })
            $("html body").css({
                overflow: "visible"
            }, 300);
            $("#nav").removeClass("active");
            $("#header").removeClass("gnb_active");
          }
          isMenuOpen = !isMenuOpen;
        });
    }
    ,lnbOpen: function() {
       $("#nav .gnb >li").on('mouseenter',function(){
            var that = $(this);
            var idx = that.index();
            // console.log(idx)
            $("#nav .gnb >li").removeClass("on")
            that.addClass("on")
            $("#header .lnb_area").addClass("on");
            $("#header .lnb_area .lnb_menu").removeClass("on");
            $("#header .lnb_area .lnb_menu").eq(idx).addClass("on");
        });
        // $("#header .lnb_area").on('mouseenter',function(){
        //     $(".header").addClass("on");
        // });

        var active;
        if($("#nav .gnb >li").hasClass("on")) {
            // console.log("true")
            active = $("#nav .gnb >li.on");
            
            $("#header .lnb_area").on("mouseleave",function(){
                $("#header .lnb_area").removeClass("on");
                $("#nav .gnb >li").removeClass("on")
                active.addClass("on")
            });
        }
        else {
            $("#header .lnb_area").on("mouseleave",function(){
                $("#header .lnb_area").removeClass("on");
                $("#nav .gnb >li").removeClass("on");
            });

        }
        // console.log(active)
    }
    ,accordionBtnClick: function() {
        var winW = window.innerWidth;
        var winWChk = '';
        var acc = $(".accordion_btn");
        var i;
        var j;

        var clickListener = function() {
            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
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
   
}
const motion = {
    init: function() {
        this.rollingBanner();
        this.scrollHeader();
        this.scrollFooter();
        // this.mainMotion();
        this.gnbHover();
        this.scrollMotion2();
        this.circleMotion();

        this.cursorCostom();

        this.startMotion();
    }
    ,cursorCostom: function() {
        var $window = $(window);
        let oldWChk = '';
        var hoverPlus = $("a, .hover_plus");
        $window.on('load resize', function(){
            let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
            if (newWChk != oldWChk) {
                oldWChk = newWChk;
            }
            if (newWChk == 'pc') {
                cursorInit()
            }
            if (newWChk == 'mo') {
                $window.off("mousemove");
                hoverPlus.off("mouseenter");
                hoverPlus.off("mouseleave");
                hoverPlus.css("cursor","pointer");
            }
        });
        function cursorInit() {

            var num = 0.5;
            
            var cursor = document.getElementById('cursor');
            
            hoverPlus.on('mouseenter', function () {
                $(cursor).addClass("mouse_plus");
                $(this).css("cursor","none");
                num = 0.2
            });
            hoverPlus.on('mouseleave', function () {
                $(cursor).removeClass("mouse_plus");
                num = 0.5
            });   
    
           // dots is an array of Dot objects,
            // mouse is an object used to track the X and Y position
               // of the mouse, set with a mousemove event listener below
            var dots = [],
            mouse = {
              x: 0,
              y: 0
            };
            
            // The Dot object used to scaffold the dots
            var Dot = function() {
                // this.x = 0;
                // this.y = 0;
                // this.node = (function(){
                // var n = dot.clone();
                // n.appendTo('#cursor')
                // return n;
                // }());
                this.x = 0;
                this.y = 0;
                this.node = (function(){
                  var n = document.createElementNS("http://www.w3.org/2000/svg","path");
        
                  n.classNameNS = "cursor_circle";
                  
                // n.appendTo('#cursor')
                document.getElementById("cursor").appendChild(n);
                  return n;
                }());
            };
            // The Dot.prototype.draw() method sets the position of 
            // the object's <div> node
            Dot.prototype.draw = function() {
                // console.log(this)
                this.node.setAttribute('d', `M59.2,30c0,16.1-13.1,29.2-29.2,29.2S0.8,46.1,0.8,30C0.8,13.9,13.9,0.8,30,0.8S59.2,13.9,59.2,30z`);
                this.node.style.transform = `translate(${this.x+"px,"+this.y}px) scale(${num})`;
            };
            
            // Creates the Dot objects, populates the dots array
            for (var i = 0; i < 60; i++) {
                 var d = new Dot();
                 dots.push(d);
            }
            
            // This is the screen redraw function
            function draw() {
            // Make sure the mouse position is set everytime
            // draw() is called.
            var x = mouse.x,
                y = mouse.y;
            
            // This loop is where all the 90s magic happens
            dots.forEach(function(dot, index, dots) {
            var nextDot = dots[index + 1] || dots[0];
            
            dot.x = x;
            dot.y = y;
            dot.draw();
            x += (nextDot.x - dot.x) * .1;
            y += (nextDot.y - dot.y) * .1;
            
            });
            }
            var line = document.querySelector("#cursor .line")
            $window.stop().on("mousemove", function(event) {
            //event.preventDefault();
            mouse.x = event.pageX;
            mouse.y = event.pageY;
            line.setAttribute('style', `transform:translate(${(mouse.x - 24)+"px,"+ (mouse.y - 24)}px)`);
            });
            
            // animate() calls draw() then recursively calls itself
            // everytime the screen repaints via requestAnimationFrame().
            function animate() {
            draw();
            requestAnimationFrame(animate);
            }
            
            // And get it started by calling animate().
            animate();

        }


    }
    ,rollingBanner: function() {
        var originalID, cloneID;
        let roller = document.querySelector(".roller");
        roller.id = "roller1";

        let clone = roller.cloneNode(true);
        clone.id = "roller2";
        document.querySelector(".rolling_banner").appendChild(clone);

        flowBannerAct();

        //반응형 :: 디바이스가 변경 될 때마다 배너 롤링 초기화
        let oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
        $(window).on('resize', function() {
            let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
            if (newWChk != oldWChk) {
                oldWChk = newWChk;
                $("#roller1").off("mouseenter");
                $("#roller2").off("mouseenter");
                $("#roller1").off("mouseleave");
                $("#roller2").off("mouseleave");
                flowBannerAct();
                // console.log("!");
            }
        });
        
        function flowBannerAct() {
            stopRoller();
            //위치 지정
            document.querySelector("#roller1").style.left = "0px";
            document.querySelector("#roller2").style.left = document.querySelector(".roller ul").offsetWidth+'px';
            
            roller.classList.add('original');
            clone.classList.add('clone');
            
            let rollerWidth = document.querySelector('.roller ul').offsetWidth;//회전 배너 너비값
            let betweenDistance = 1;//이동 크기 - 정수여야 함
            
            //롤링 시작
            function startRoller(){
                originalID = setInterval(function(){
                    betweenRollCallback(betweenDistance, document.querySelector('#roller1'));
                },parseInt(1000/50));
                cloneID = setInterval(function(){
                    betweenRollCallback(betweenDistance, document.querySelector('#roller2'));
                },parseInt(1000/50));
                
            }
            
            //롤링 정지
            function stopRoller(){
                clearInterval(originalID);
                clearInterval(cloneID);
            }
            
            //마우스 호버시 롤링이 멈추었다 벗어나면 다시 롤링이 되도록 처리
            $("#roller1").stop().on("mouseenter",function(){
                // console.log("실행!!")
                stopRoller();
            });
            $("#roller2").stop().on("mouseenter",function(){
                stopRoller();
            });
            $("#roller1").stop().on("mouseleave",function(){
                
                // console.log("실행!!")
                startRoller();
            });
            $("#roller2").stop().on("mouseleave",function(){
                startRoller();
            });
            // document.getElementById('roller1').addEventListener('mouseenter',()=>{ stopRoller(); console.log("@")});
            // document.getElementById('roller2').addEventListener('mouseenter',()=>{stopRoller()});
            // document.getElementById('roller1').addEventListener('mouseleave',()=>{startRoller()});
            // document.getElementById('roller2').addEventListener('mouseleave',()=>{startRoller()});
            
            //인터벌 애니메이션 함수(공용)

            function betweenRollCallback(d, roller){
                let left = parseInt(roller.style.left);
                // console.log(left)
                roller.style.left = (left - d)+'px';//이동
                //조건부 위치 리셋
                if(rollerWidth + (left - d) <= 0){
                    roller.style.left = rollerWidth+'px';
                }
            }
            
            startRoller();//롤링 초기화
        }

        
    }
    ,scrollHeader: function() {
        var pageY = window.pageYOffset;
        var scrollNum;
        var winW = window.innerWidth;
        var winWChk = '';
        var headerH;
        var headerScollH;//헤더 빼야하는 높이
        var logoW;//로고넓이
        var logoH; //로고높이
        var logoScrollW;//로고 빼야하는 넓이
        var logoScrollH;//로고 빼야하는 높이

        var txtW;//h2넓이
        var txtH; //h2높이
        var txtScrollW;//h2 빼야하는 넓이
        var txtScrollH;//h2 빼야하는 높이

        $(window).on(' scroll resize', function() {
            // console.log("resize")
            winW = window.innerWidth;
            pageY = window.pageYOffset;
            
            if(winWChk != 'mo' && winW <= 1024) {
                //모바일
                winWChk = 'mo';
                headerH = 72;
                headerScollH = 0;
                txtW = $("#header h2").innerWidth();
                txtH = $("#header h2").innerHeight();
                logoW = $("#header .logo").innerWidth();
                logoH = $("#header .logo").innerHeight();
            }
            else  if(winWChk != 'pc' && winW >= 1025) {
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
            if(scrollNum>100){
                scrollNum = 100;
            }
            let header = $("#header >.wrap");
            let logo = $("#header .logo");
            let num = (scrollNum / 100);
            let txt = $("#header h2");
            let nav = $(" #nav");
            
            header.css({
                "height": (headerH - (headerScollH * num))+"px",
            });
            

            
            const deMotion = function() {
                logo.css({
                    width: (logoW - (logoScrollW * num))+"px",
                    height: (logoH - (logoScrollH * num))+"px",
                    marginBottom: (24 - (15 * num))+"px",
                    // transform: "scale("+(1 - (0.585 * num))+")"
                });
                txt.css({
                    width: (txtW - (txtScrollW * num))+"px",
                    height: (txtH - (txtScrollH * num))+"px",
                    marginBottom: (24 - (15 * num))+"px",
                    // transform: "scale("+(1 - (1 * num))+")",
                    // opacity: (1 - (1 * num)),
                    // marginBottom: (26 - (15 * num))+"px",
                });
                nav.css({
                    marginTop: (109 - (88 * num))+"px",
                });
            }
            if(winWChk == 'pc') {
                deMotion();
            }
           
            
        });
    }
    ,scrollFooter: function() {
        const footerTop = $("#footer .footer_top");
        var footerH = $("#footer").innerHeight();
        var pageY = window.pageYOffset;
        var pageH = $(".total_wrap").innerHeight();
        var footerTopH = footerTop.innerHeight();
        let footerPoint = (pageH - ((window.innerHeight + footerH) - footerTopH));
        let oldWChk = '';
        $(window).on('scroll resize', function() {
            let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
           
            pageY = window.pageYOffset;

            footerH = $("#footer").innerHeight();
            pageY = window.pageYOffset;
            pageH = $(".total_wrap").innerHeight();
            footerTopH = footerTop.innerHeight();
            // console.log(footerH, pageY, pageH, footerTopH, window.innerHeight)
            footerPoint = (pageH - ((window.innerHeight + footerH) - footerTopH));
            if(pageY >= footerPoint) {
                footerTop.addClass("sticky");
            }
            else {
                footerTop.removeClass("sticky")
            }

            if (newWChk != oldWChk) {
                oldWChk = newWChk;
               
                
            }
            
        });
    }
    ,smoothScroll: function() {}
    ,headerMotion: function() {
        $("#header>.wrap").stop().animate({
            opacity:1
        },700);
        $(".footer_top>.wrap").stop().animate({
            opacity:1
        },700);
    }
    ,mainMotion: function() {
        if($("#contentsWrap").hasClass("main_page") == true) {
            // console.log("main")
            
            let leng = $(".column_area .line_wrap .line").length;
            
            headerLine();

            function headerLine() {
               let leng = $("#header>.line").length;
               let leng2 = $("#footer_top .line").length;
               const lineAni = (idx) => {
                var animateFlag = true;
                $("#header>.line").eq(idx).animate({ width: 100+"%"},{
                  duration:500,
                  step: function( now, fx ){
                  //   console.log(fx);
                    if(fx.start==0){
                      if(now>60 && animateFlag){ //aniamtion 70% 이상이면 다음 target animation 실행
                        lineAni(++idx);
                          animateFlag = false;
                      }
                    }
                },
                  complete:function(){
                    if(idx==1){
                        lineAni3(0);
                        lineAni2(0);
                    }
                      if(idx===leng){
                        // lineAni3(0);
                        return false; // 완료시 종료 
                      }
                  }
                });
                
              }
                const lineAni2 = (idx) => {
                    // console.log("실행")
                    var animateFlag = true;
                    $(".footer_top .line").eq(idx).animate({ width: 100+"%"},{
                      duration:500,
                      step: function( now, fx ){
                      //   console.log(fx);
                        if(fx.start==0){
                          if(now>60 && animateFlag){ //aniamtion 70% 이상이면 다음 target animation 실행
                            lineAni2(++idx);
                              animateFlag = false;
                          }
                        }
                    },
                      complete:function(){
                          if(idx===leng){
                            //lineAni3(0)
                            circleMotion()
                              return false; // 완료시 종료 
                          }
                      }
                  });
                    
                }
                const lineAni3 = (idx) => {
                    var animateFlag = true;
                    $(".column_area .line_wrap .line").eq(idx).stop().animate({ height: 100+"%"},{
                      duration:200,
                      step: function( now, fx ){
                      //   console.log(fx);
                        if(fx.start==0){
                          if(now>80 && animateFlag){ 
                            lineAni3(++idx);
                            animateFlag = false;
                          }
                        }
                    },
                      complete:function(){
                          if(idx===leng){
                            motion.scrollMotion();
                            motion.headerMotion();
                            return false;
                          }
                      }
                  })
                    
                } 
                const circleMotion = function(){
                    let circle = $(".item_wrap .circle");
                    let circleLine = $(".item_wrap .circle svg ellipse");
                    circleLine.stop().animate({
                        strokeDashoffset: 0
                        ,strokeDasharray: "none"
                    },1500,function(){
                        circle.find(".bg").stop().animate({
                            opacity:1
                        },400);
                        circle.find(".layer_2").stop().animate({
                            opacity:1
                        },400,function(){
                            circle.addClass("active")
                            // console.log("!")
                            lineAni3(0);
                        });
                    });
                }
                
              lineAni(0);
            }

            let oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
            $(window).on('resize', function() {
                let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
                if (newWChk != oldWChk) {
                    oldWChk = newWChk;
                    $("#header .line").css({
                        width: 0
                    });
                    $(".column_area .line_wrap .line").css({
                        height: 0
                    });
                    $("#header .logo").css({
                        width: ''
                        ,height: ''
                        ,marginBottom: ''
                    });
                    $("#header h2").css({
                        width: ''
                        ,height: ''
                        ,marginBottom: ''
                    });
                    $(" #nav").css({
                        marginTop: ''
                    });
                    $("#header>.wrap, .footer_top>.wrap").css({
                        opacity:''
                    });
                    setTimeout(function(){
                        headerLine();
                    },200);
                }
            });
        }
    }
    ,circleMotion: function() {
        let lastScrollY = 0;
        var active = true;
        let circle = $(".circle")
        addEventListener("scroll", e => {
            circle.css({
                "transform":"translateY(-"+window.pageYOffset / 100 +"%)"
            });

            const scrollY = window.scrollY;
            
            // 이전의 스크롤 위치와 비교하기
            const direction = scrollY > lastScrollY ? "Scroll Down" : "Scroll Up";
            
            // 현재의 스크롤 값을 저장
            lastScrollY = scrollY;
            
            //   console.log(direction);

            if(direction === "Scroll Up") {
                
                
            }else if(direction === "Scroll Down") {
               
            }
          
            
        });
    }
    ,scrollMotion:function(){
        var $window = $(window);
        var  winW = $window.innerWidth()
             ,delayPosition = -100
             ,windowheight;
        insertTargetPosition();
        var position = $window.scrollTop() + windowheight + delayPosition;
        setTimeout(function() {
            motion.target01($(".active_item"),position);
        }, 300);
        let oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
        $window.on('load resize scroll', function(){
            
            let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
            insertTargetPosition();
            var position = $window.scrollTop() + windowheight + delayPosition;
           
            setTimeout(function() {
                motion.target01($(".active_item"),position);
            }, 300);
            
        });
        function insertTargetPosition() {
            windowheight = $window.outerHeight(); 
            $('.active_item').each(function() {
              $(this).data('offsetTop', ($(this).offset().top)); 
            });
        }
    }
    ,target01: function(target,position) {
        $(target).each(function(){
            if(!$(this).hasClass("active") && $(this).data('offsetTop') < position){
                $(this).addClass("active");
                $(this).removeClass("ready");
            }
        });
    }
    ,gnbHover: function(){
        $(".wave_txt .top").each(function() {
            var item = $(this).find("span");
            for(let j= 0; j < item.length; j++) {
                $($(item)[j]).css({'transition-delay':0.0+j/20+'s'});
            }
        });
        $(".wave_txt .bt").each(function() {
            var item = $(this).find("span");
            for(let j= 0; j < item.length; j++) {
                $($(item)[j]).css({'transition-delay':0.0+j/20+'s'});
            }
        });
    }
    ,scrollMotion2: function() {
        var $window = $(window);
        let oldWChk = '';
        $window.on('load resize scroll', function(){
            let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
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
        function desktopMotion(scroll){
            $(".d_scoll_type1").css({
                "transform":"translateY(-"+scroll / 400 +"%)"
            });
            $(".d_scoll_type2").css({
                "transform":"translateY("+scroll / 400 +"%)"
            });
            $(".d_scoll_type3").css({
                "transform":"translateY("+scroll / 350 +"%)"
            });
        }
        function moMotion(scroll){
            $(".m_scoll_type1").css({
                "transform":"translateY(-"+scroll / 400 +"%)"
            });
            $(".m_scoll_type2").css({
                "transform":"translateY(-"+scroll / 400 +"%)"
            });
            $(".m_scoll_type3").css({
                "transform":"translateY("+scroll / 350 +"%)"
            });
            $(".m_scoll_type4").css({
                "transform":"translateY(-"+scroll / 500 +"%)"
            });
        }
    }

    ,startMotion: function(){
        let leng = $(".motion_item_area .line_wrap .line").length;
            
        headerLine();
        
        function headerLine() {
            let leng = $("#header>.line").length;
            let leng2 = $("#footer_top .line").length;
            const lineAni = (idx) => {
             var animateFlag = true;
             $("#header>.line").eq(idx).animate({ width: 100+"%"},{
               duration:500,
               step: function( now, fx ){
               //   console.log(fx);
                 if(fx.start==0){
                   if(now>60 && animateFlag){ //aniamtion 70% 이상이면 다음 target animation 실행
                     lineAni(++idx);
                       animateFlag = false;
                   }
                 }
             },
               complete:function(){
                 if(idx==1){
                     lineAni3(0);
                     lineAni2(0);
                 }
                   if(idx===leng){
                     // lineAni3(0);
                     return false; // 완료시 종료 
                   }
               }
             });
             
           }
             const lineAni2 = (idx) => {
                 // console.log("실행")
                 var animateFlag = true;
                 $(".footer_top .line").eq(idx).animate({ width: 100+"%"},{
                   duration:500,
                   step: function( now, fx ){
                   //   console.log(fx);
                     if(fx.start==0){
                       if(now>60 && animateFlag){ //aniamtion 70% 이상이면 다음 target animation 실행
                         lineAni2(++idx);
                           animateFlag = false;
                       }
                     }
                 },
                   complete:function(){
                       if(idx===leng){
                         //lineAni3(0)
                         circleMotion()
                           return false; // 완료시 종료 
                       }
                   }
               });
                 
             }
             const lineAni3 = (idx) => {
                 var animateFlag = true;
                 $(".motion_item_area .line_wrap .line").eq(idx).stop().animate({ height: 100+"%"},{
                   duration:200,
                   step: function( now, fx ){
                   //   console.log(fx);
                     if(fx.start==0){
                       if(now>80 && animateFlag){ 
                         lineAni3(++idx);
                         animateFlag = false;
                       }
                     }
                 },
                   complete:function(){
                       if(idx===leng){
                         motion.scrollMotion();
                         motion.headerMotion();
                         return false;
                       }
                   }
               })
                 
             } 
             const circleMotion = function(){
                 let circle = $(".item_wrap .circle");
                 let circleLine = $(".item_wrap .circle svg ellipse");
                 circleLine.stop().animate({
                     strokeDashoffset: 0
                     ,strokeDasharray: "none"
                 },1500,function(){
                     circle.find(".bg").stop().animate({
                         opacity:1
                     },400);
                     circle.find(".layer_2").stop().animate({
                         opacity:1
                     },400,function(){
                         circle.addClass("active")
                         // console.log("!")
                         lineAni3(0);
                     });
                 });
             }
             
           lineAni(0);
        }
    }
}
document.addEventListener("DOMContentLoaded",function(){
    UIeventEB.init();
    motion.init();

    let oldWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
    $(window).on('resize', function() {
        let newWChk = window.innerWidth > 1024 ? 'pc' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            $("#header .line, .footer_top .line").css({
                width: 0
            });
            $(".motion_item_area .line_wrap .line").css({
                height: 0
            });
            $("#header .logo").css({
                width: ''
                ,height: ''
                ,marginBottom: ''
            });
            $("#header h2").css({
                width: ''
                ,height: ''
                ,marginBottom: ''
            });
            $(" #nav").css({
                marginTop: ''
            });
            $("#header>.wrap, .footer_top>.wrap").css({
                opacity:''
            });
            setTimeout(function(){
                motion.startMotion();
            },200);
        }
    });
});

$(document).on('ready', function(){
    /* a태그 이벤트 막기 */
    $('a[href="#"]').on("click",function (e) {
        e.preventDefault();
    });
    
});