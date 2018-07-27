
    //消息中心
    $('.notice1').on("click","li",function () {
        var dian = $(this).data("dian");
        var img = $(this).data("img");
        $("li").removeClass("system-btn-a");
        $(this).addClass("system-btn-a");
    })

    //    关闭弹窗
    $('body').on("click",".img-age",function heid() {
    //        console.log($(this));
        $(this).css("animation","cpm 0.35s");
        $(this).parent().parent().parent().fadeOut(400);
    });


    //    仓库福利
    //    切换寄存和支取
    $('.entrepot-nav').on("click","div",function () {
        if($(this).hasClass("btn-j")){
            $(this).siblings(".btn-z").removeClass("btn-z-active");
            $(this).addClass("btn-j-active");
            $('.entrepot-box1').addClass("dis-no");
            $('.entrepot-box').removeClass("dis-no");
        }else if($(this).hasClass("btn-z")){
            $(this).siblings(".btn-j").removeClass("btn-j-active");
            $(this).addClass("btn-z-active");
            $('.entrepot-box').addClass("dis-no");
            $('.entrepot-box1').removeClass("dis-no");
        }
    });
    //    切换按钮颜色
    $('.list-btn').click(function () {
        $(".list-btn").removeClass("cun-a");
        $(this).addClass("cun-a");
    })
    //   跟换
    $('body').on("click",".img-dian",function () {
        var dian = $(this).data("dian");
    //        console.log(dian);
        var img = $(this).data("img");
        if($(this).hasClass(dian)){
    //            $(this).removeClass(img);
            $(this).siblings().removeClass(dian);
            $(this).removeClass(dian);
        }else {
    //            $(this).removeClass(dian);
            $(this).siblings().removeClass(dian);
            $(this).addClass(dian);
        }

    })
    //    切换登录注册
    $('.login-nav').on("click","div",function () {
        var dian = $(this).data("dian");
        console.log(dian);
        var img = $(this).data("img");
        if($(this).hasClass("login-btn")){
            $(this).siblings().removeClass(dian);
            $(this).addClass(dian);
            $('.login-box').removeClass("dis-no");
            $('.register-box').addClass("dis-no");
        }else if($(this).hasClass("register-btn")){
            $(this).siblings().removeClass(dian);
            $(this).addClass(dian);
            $('.register-box').removeClass("dis-no");
            $('.login-box').addClass("dis-no");
        }
    });
    //选中
    $('.xuan').click(function () {
        if($(".login-xuan").hasClass("iconfont")){
            $(".login-xuan").removeClass("iconfont").removeClass("icon-gou5");
        }else {
            $(".login-xuan").addClass("iconfont").addClass("icon-gou5");
        }
    })
    //注册选中
    $('.xuan1').click(function () {
        if($(".register-xuan").hasClass("iconfont")){
            $(".register-xuan").removeClass("iconfont").removeClass("icon-gou5");
        }else {
            $(".register-xuan").addClass("iconfont").addClass("icon-gou5");
        }
    })

    //    切换活动
    $('.activity-nav').on("click","div",function () {
        var dian = $(this).data("dian");
        var img = $(this).data("img");
        if($(this).hasClass("activity-btn")){
    //        $(this).siblings(".song-btn").removeClass("activity-btn-a");
            $(this).siblings(".word-btn").removeClass("activity-btn-a");
            $(this).addClass("activity-btn-a");
            $(this).removeClass("dis-no");
    //        $(this).siblings().addClass("dis-no");
            $('.activity-box').removeClass("dis-no");
    //        $('.song-box').addClass("dis-no");
            $('.word-box').addClass("dis-no");
        }else  if($(this).hasClass("word-btn")){
            $(this).siblings(".activity-btn").removeClass("activity-btn-a");
    //        $(this).siblings(".song-btn").removeClass("activity-btn-a");
            $(this).addClass("activity-btn-a");
            $(this).removeClass("dis-no");
    //        $('.login-box').addClass("dis-no");
            $('.word-box').removeClass("dis-no");
            $('.activity-box').addClass("dis-no");
    //        $('.song-box').addClass("dis-no");
        }
    });
    //    安全中心
    $('.security-nav').on("click","div",function () {
        var dian = $(this).data("dian");
        var img = $(this).data("img");
        if($(this).hasClass("security-btn")){
            $(this).siblings(".pwd-btn").removeClass("security-btn-a");
            $(this).siblings(".card-btn").removeClass("security-btn-a");
            $(this).siblings(".conversion-btn").removeClass("security-btn-a");
            $(this).siblings(".SFZ-btn").removeClass("security-btn-a");
            $(this).addClass("security-btn-a");
            $(this).removeClass("dis-no");
            // console.log(11);
    //        $(this).siblings().addClass("dis-no");
            $('.security-box').removeClass("dis-no");
            $('.pwd-box').addClass("dis-no");
            $('.card-box').addClass("dis-no");
            $('.conversion-box').addClass("dis-no");
            $('.SFZ-box').addClass("dis-no");
        }else  if($(this).hasClass("card-btn")){
            $(this).siblings(".security-btn").removeClass("security-btn-a");
            $(this).siblings(".pwd-btn").removeClass("security-btn-a");
            $(this).siblings(".conversion-btn").removeClass("security-btn-a");
            $(this).siblings(".SFZ-btn").removeClass("security-btn-a");
            $(this).addClass("security-btn-a");
            $(this).removeClass("dis-no");
            // console.log(22);
    //        $('.login-box').addClass("dis-no");
            $('.card-box').removeClass("dis-no");
            $('.security-box').addClass("dis-no");
            $('.pwd-box').addClass("dis-no");
            $('.conversion-box').addClass("dis-no");
            $('.SFZ-box').addClass("dis-no");
        }else  if($(this).hasClass("pwd-btn")){
            $(this).siblings(".security-btn").removeClass("security-btn-a");
            $(this).siblings(".card-btn").removeClass("security-btn-a");
            $(this).siblings(".conversion-box").removeClass("security-btn-a");
            $(this).siblings(".SFZ-btn").removeClass("security-btn-a");
            $(this).addClass("security-btn-a");
            $(this).removeClass("dis-no");
            //        $('.login-box').addClass("dis-no");
            // console.log(1);
            $('.pwd-box').removeClass("dis-no");
            $('.security-box').addClass("dis-no");
            $('.card-box').addClass("dis-no");
            $('.conversion-box').addClass("dis-no");
            $('.SFZ-box').addClass("dis-no");
        }else  if($(this).hasClass("conversion-btn")){
            $(this).siblings(".pwd-btn").removeClass("security-btn-a");
            $(this).siblings(".security-btn").removeClass("security-btn-a");
            $(this).siblings(".card-btn").removeClass("security-btn-a");
            $(this).siblings(".SFZ-btn").removeClass("security-btn-a");
            $(this).addClass("security-btn-a");
            $(this).removeClass("dis-no");
            // console.log(2);
            //        $('.login-box').addClass("dis-no");
            $('.conversion-box').removeClass("dis-no");
            $('.security-box').addClass("dis-no");
            $('.card-box').addClass("dis-no");
            $('.pwd-box').addClass("dis-no");
            $('.SFZ-box').addClass("dis-no");
        }else  if($(this).hasClass("SFZ-btn")){
            $(this).siblings(".pwd-btn").removeClass("security-btn-a");
            $(this).siblings(".security-btn").removeClass("security-btn-a");
            $(this).siblings(".card-btn").removeClass("security-btn-a");
            $(this).siblings(".conversion-btn").removeClass("security-btn-a");
            $(this).addClass("security-btn-a");
            $(this).removeClass("dis-no");
            // console.log(3);
            //        $('.login-box').addClass("dis-no");
            $('.SFZ-box').removeClass("dis-no");
            $('.security-box').addClass("dis-no");
            $('.card-box').addClass("dis-no");
            $('.conversion-box').addClass("dis-no");
            $('.pwd-box').addClass("dis-no");
        }
    })



// 点击弹窗
    //福利仓库
    $(".footer_right").find("div:first-child").click(function () {
        // console.log(1);
            $(".entrepot").removeClass("dis-no").fadeIn();;
    })

//收益
    $(".footer_right").children('div').eq(1).click(function () {
        // console.log(1);
        $(".yield").removeClass("dis-no").fadeIn();
    })
//分享
    $(".footer_right").children('div').eq(2).click(function () {
        // console.log(1);
        $(".share").removeClass("dis-no").fadeIn();
    })
//个人设置
    var via =  false;
    $(".header_via").click(function () {
        // console.log(1);
        if(via){
            $(".cpm").removeClass("dis-no").fadeIn();
        }else {
            $(".login").removeClass("dis-no").fadeIn();
        }

    })
    $(".header_name").click(function () {
        // console.log(1);
        if(via){
            $(".cpm").removeClass("dis-no").fadeIn();
        }else {
            $(".login").removeClass("dis-no").fadeIn();
        }
    })
    $(".btn1").click(function () {
        // console.log(1);
        $(".set").removeClass("dis-no").fadeIn();
    })
    $(".btn2").click(function () {
        // console.log(1);
        $(".exit").removeClass("dis-no").fadeIn();
    })
    //优惠活动
    $(".header_right").children('a').eq(0).click(function () {
        // console.log(1);
        $(".activity").removeClass("dis-no").fadeIn();
    })
//福利记录
    $(".right_pop_box_bottom").children('a').eq(0).click(function () {
        // console.log(1);
        $(".weal-cpm").removeClass("dis-no").fadeIn();
    })
    //棋牌记录
    $(".right_pop_box_bottom").children('a').eq(1).click(function () {
        // console.log(1);
        $(".party").removeClass("dis-no").fadeIn();
    })
    //安全中心
    $(".right_pop_box_bottom").children('a').eq(2).click(function () {
        // console.log(1);
        $(".security").removeClass("dis-no").fadeIn();
    })
    //绑定银行卡
    $(".id-input>.img-btn-a").click(function () {
        // console.log(1);
        $(".security").removeClass("dis-no").fadeIn();
    })
    //选择银行
    $(".card-ka").click(function () {
        $(".card-yin").show();
    })
    $(".card-yin").on("click","li",function () {
        $(".card-con").text($(this).text());
        setTimeout(function(){
            $(".card-yin").hide();
        }, 100);
    })
    //选择问题
    $(".wen-ti").click(function () {
//        $(".xuan-wt").removeClass("dis-no");
        $(".xuan-wt").show();
    })
    $(".xuan-wt li").click(function () {
        $(".con-rong").text($(this).text());
        setTimeout(function(){
            $(".xuan-wt").hide();
        }, 100);
    })




//    音量滑动
var aac=false;
var isscroll;
$('.r-bar-img').on('touchstart',function() {
    aac = true;
    isscroll = true;
})
$('.r-bar-img1').on('touchstart',function() {
    aac = false;
    isscroll = true;
})
$(window).on('touchend',function() {
    isscroll = false;
})

var startPosition = {}, deltaY, endPosition = {};
document.addEventListener('touchstart', touch, false);
document.addEventListener('touchmove', touch, false);
document.addEventListener('touchend', touch, false);
/**
function touch(event) {
    var event = event || window.event;
    switch (event.type) {
        case "touchstart":
            var touch = event.touches[0];
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
            break;
        case "touchend":
            break;
        case "touchmove":
            var touch = event.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
            deltaY = endPosition.y - startPosition.y;
            break;
    }
    let boxLeft = $(".r-bar").offset().left;
    let boxWidth = $(".r-bar").width();
    let allWidth = boxLeft - boxWidth;
    if(isscroll){
        if(aac){
            if (endPosition.x <= boxLeft) {
                $('.r-bar-b').css('width', '0%');
            } else if (endPosition.x >= boxLeft + boxWidth) {
                $('.r-bar-b').css('width', '91%');
            } else {
                let a = endPosition.x - boxLeft;
                let b = parseFloat(a/boxWidth,4)*100;
                $('.r-bar-b').css('width', b + '%');
            }
        }else{
            if (endPosition.x <= boxLeft) {
                $('.r-bar-b1').css('width', '0%');
            } else if (endPosition.x >= boxLeft + boxWidth) {
                $('.r-bar-b1').css('width', '91%');
            } else {
                let a = endPosition.x - boxLeft;
                let b = parseFloat(a/boxWidth,4)*100;
                $('.r-bar-b1').css('width', b + '%');
            }
        }
    }
}**/