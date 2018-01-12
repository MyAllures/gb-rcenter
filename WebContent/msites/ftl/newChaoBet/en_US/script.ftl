<#include "../../commonPage/en_US/script.ftl">
<#include "../../commonPage/commonScript/msiteScript.ftl">
<script>
    /*全局变量：是否已经登录*/
    var isLogin = false;

    $(function () {
        init();
    });

    function init(){
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
            $(this).find(".enter-link").text("Start Game");
        }).mouseleave(function() {
            $(this).find(".enter-link").text(orgi);
        })
    }
</script>

