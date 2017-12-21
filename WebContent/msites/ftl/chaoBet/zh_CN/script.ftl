<#include "../../commonPage/zh_CN/script.ftl">
<script>
    /*全局变量：是否已经登录*/
    var isLogin = false;

    $(function () {
        init();
    });

    function init(){
        // 公告-左滚动
        $('.notice-list>ul>li').css('display', 'inline-block');
        $('.notice-list').Marquee({
            isMarquee: true,
            isEqual: false, // 元素等长
            scrollDelay: 30, // 时长
            direction: 'left'
        });

        // 赞助商logo动画
        $('.footer-partner ul li a').hover(function() {
            $('span', this).stop().animate({
                'opacity': 1
            }, 300);
            $(this).stop().animate({
                "backgroundPositionY": "40px"
            });
            $(".hontu-wrap").css("z-index", "0");
        }, function() {
            $('span', this).stop().animate({
                'opacity': 0
            }, 300);
            $(this).stop().animate({
                "backgroundPositionY": 0
            });
            $(".hontu-wrap").css("z-index", "-1");
        });

        // 轮播图前进、后退滑入显示动画
        jQuery(".slide").hover(function() {
            jQuery(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.5)
        }, function() {
            jQuery(this).find(".prev,.next").fadeOut()
        });
        jQuery(".slide").slide({
            titCell: ".slide-indicators ul",
            mainCell: ".slide-inner ul",
            effect: "fold",
            autoPlay: true,
            interTime: 2500,
            autoPage: true,
            trigger: "click",
            // 切换图片时，才加载图片
            startFun: function(i) {
                var curLi = jQuery(".slide .slide-inner li").eq(i);
                if (!!curLi.attr("data-src")) {
                    curLi.css("background-image", curLi.attr("data-src")).removeAttr("data-src")
                }
            }
        });

        // 二级下拉菜单-左右滚动
        $('.api-games-casino').Marquee({
            distance: 282, // 移动距离
            time: 2,
            btnGo: {
                left: '.api-prev',
                right: '.api-next'
            },
            direction: 'left'
        });
        // 二级下拉菜单-左右滚动
        $('.api-games-sports').Marquee({
            distance: 282, // 移动距离
            time: 2,
            btnGo: {
                left: '.api-prev',
                right: '.api-next'
            },
            direction: 'left'
        });
        // 二级下拉菜单-左右滚动
        $('.api-games-live').Marquee({
            distance: 212, // 移动距离
            time: 2,
            btnGo: {
                left: '.api-prev',
                right: '.api-next'
            },
            direction: 'left'
        });
        //鼠标滑入切换文字
        var orgi;
        $(".api-item").mouseenter(function() {
            orgi = $(this).find(".enter-link").text();
            $(this).find(".enter-link").text("开始游戏");
        }).mouseleave(function() {
            $(this).find(".enter-link").text(orgi);
        })
    }


    //点击api的时候，加上active类名
    $("#api-tabs li").on("click",function(){
        $("#api-tabs li").removeClass("active");
        var $dataApi = $(this).find('a').attr("data-api");
        $("#api-tabs li a[data-api='"+$dataApi+"']").parent().addClass("active");
    });
    //页面加载的时候，默认第一个加active
    $("#api-tabs li").each(function($index){
        if($index==0&&window.location.search==""){
            var $dataApi = $(this).find('a').attr("data-api");
            $("#api-tabs li a[data-api='"+$dataApi+"']").parent().addClass("active");
        }
    });

</script>

