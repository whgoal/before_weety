// ~~~~~~~~~~~~~~~~~~~~~~ 스크롤 탑 버튼

// 탑 버튼 클릭 시 최상단으로 이동하는 기능을 만들었는데 쓰지 않아도 되는 기능들도 주석처리 되어 들어가 있고 최대한 깔끔하고 보기 편한 코드로 다시 수정하고 싶다. 그리고 조금 더 간단한 방법으로 스크롤 값을 구하고 이동하는 버튼을 만들고 싶다

var mybutton = document.getElementById("myBtn");
      
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
  //   mybutton.style.display = "block";
  } else {
  //   mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// ~~~~~~~~~~~~~~~~~~~~~~ 이미지 슬라이드

// 제이쿼리를 써서 이미지 슬라이드를 만들었는데 소스가 너무 복잡하고 기존에 class 대신 id 값을 섞어서 써서 보기 어렵고 수정할 엄두가 안 난다 > 그래서 조금 더 간소화 하고 이미지 슬라이드를 조금 더 효율적으로 보여줄 수 있는 코드로 변경하고 싶다. 

$(document).ready(function(){
    var $dot = $("#dot ul li");
    var slideIndex = 0;
    var len = $(".slide li").length;

    $(".prev").on("click", function(){
      slideIndex -= 1; 
      if( slideIndex < 0 ) { slideIndex = len - 1; }
      if( slideIndex >= len ) { slideIndex = 0 ;} 
      console.log(slideIndex);
      $(".slide").animate({marginLeft:-1920 * slideIndex });
      $dot.css({background:"#DEDEDE"});
      $dot.eq(slideIndex).css({background:"#707070"});
    });

    $(".next").on("click", function(){
      slideIndex += 1; 
      if( slideIndex < 0 ) { slideIndex = len - 1; }
      if( slideIndex >= len ) { slideIndex = 0 ;} 
      $(".slide").animate({marginLeft:-1920 * slideIndex});
       $dot.css({background:"#DEDEDE"});
      $dot.eq(slideIndex).css({background:"#707070"});
    });

  $dot.on("click",function(){
    $(".slide").animate({marginLeft:-1920 * $(this).index()});
    $dot.css({"background":"#DEDEDE"});
    $(this).css({"background":"#707070"});
    slideIndex = $(this).index(); console.log(slideIndex);
  });

 });


//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 메뉴 이동

// 원스크롤 페이지기 때문에 버튼을 이용해 한 페이지 안에서 원하는 곳으로 이동해야하는데 기존엔 잘 움직이던 코드가 현재는 멈춘 상태로 더욱 간단하게 영역을 이동하는 버튼을 구현하고 싶다.

var scroll = function(){
    
    var $nav = null,
        $cnt = null,
        moveCnt = null,
        moveIndex = 0,
        moveCntTop = 0,
        winH = 0,
        time = false; // 새로 만든 변수

    $(document).ready(function(){
        init();
        initEvent();
    });
    
    var init = function(){
        $cnt = $(".content");
        $nav = $(".header a");
    };
    
    var initEvent = function(){
        $("html ,body").scrollTop(0);
        winResize();
        $(window).resize(function(){
            winResize();
        });
        $nav.on("click", function(){
            moveIndex = $(this).parent("li").index();
            moving(moveIndex);
            return false;
        });
    };
        
    var winResize = function(){
        winH = $(window).height();
        $cnt.children("div").height(winH);
        $("html ,body").scrollTop(moveIndex.scrollTop);
    };
    
    var wheel = function(e){
        if(e.originalEvent.wheelDelta < 0){
            if(moveIndex < 3){
                moveIndex += 1;
                moving(moveIndex);
            };
        }else{
            if(moveIndex > 0){
                moveIndex -= 1;
                moving(moveIndex);
            };
        };
    };
    


    
    var moving = function(index){
        time = true // 휠 이벤트가 실행 동시에 true로 변경
        moveCnt = $cnt.children("div").eq(index);
        moveCntTop = moveCnt.offset().top;
        $("html ,body").stop().animate({
            scrollTop: moveCntTop
        }, 1000, function(){
          time = false; // 휠 이벤트가 끝나면 false로 변경
        });
        $nav.parent("li").eq(index).addClass("on").siblings().removeClass("on");
    };
    
};

scroll();

