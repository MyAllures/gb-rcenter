/**
 * Created by legend on 18-2-21.
 */
$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    $('.fqa dt:first-child+.mui-content').show();
    initStyle();
});

/**
 * 页面初始化
 */
function initStyle() {
    //图片设置宽度，免得手机打开展示图片过大，无法展示图片全面
    $(".mui-content img").width("100%");
}

function chooseQuestion(obj,options) {
    var $next = $(obj).next("dd");
    if($next.is(":hidden")) {
        $(".fqa dd").hide();
        var $table = $(this).next().find("table");
        if($table.size()>0){
            setTimeout(tableScroll($table),1000);
        }
        $next.show();

    } else {
        var $table = $next.find("table");
        if($table.size()>0){
            setTimeout(tableScroll($table),1000);
        }
        $(".fqa dd").hide();
    }

}

function tableScroll(value) {

        var $table = $(value).parent().find("table");
        for (var i = 0; i <= $table.size(); i++) {
            if (!($($table.get(i)).parent().attr("class") == 'mui-scroll')) {
                //给表格添加横向滚动
                $($table.get(i)).wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control " +
                    "mui-segmented-control-inverted'> " +
                    "<div class='mui-scroll'></div></div>");
                mui(".scroll2").scroll();

                var scrollHeight = $($table.get(i)).height();
                $($table.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
            }
        }
    
}


