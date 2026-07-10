const UIevents ={
    init: function(){
        this.selectType2Event();
        this.bodyClickEvent();
    }
    ,selectType2Event: function(){
        const selectbox = document.querySelector(".select--type2") || null;
        if(!selectbox){
            return false
        }

        const selected_box =  selectbox.querySelector(".select--type2__selected_box");
        const options_box =  selectbox.querySelector(".select--type2__options_box");
        const options = selectbox.querySelectorAll(".select--type2__option");

        selectbox.addEventListener('click',function(){
            if(options_box.style.display==='none'){
                options_box.style.display="block";
                this.classList.add("select--type2--active");
            }else{
                options_box.style.display="none";
                this.classList.remove("select--type2--active");
            }
        });

        options.forEach(option => {
            option.addEventListener('click',function(){
                const value = this.getAttribute('data-value'); 
                const option = this.getAttribute('data-option'); 
                selected_box.textContent= option;
                selected_box.setAttribute("data-value",value);

            });
        });
    }
    ,exceptedClickSelectType2: function(target){
        const selectbox = document.querySelector(".select--type2") || null;
        if(!selectbox){
            return false
        }
        const options_box =  selectbox.querySelector(".select--type2__options_box");
        if (!target.closest('.select--type2')){
            if(options_box.style.display!='none'){
                selectbox.click();
            }
        }
    }   
    ,bodyClickEvent: function(){
        const that= this;
        const body = document.querySelector('body');
        
        body.addEventListener('click',function(e){
            const target = e.target;
            that.exceptedClickSelectType2(target);
            
        });
    }
}

// const comments ={
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

document.addEventListener("DOMContentLoaded", () => {
    UIevents.init();
});

$(document).on('ready',function(){
    // comments.init();
});





