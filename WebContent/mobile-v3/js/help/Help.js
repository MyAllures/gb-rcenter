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

});


function chooseQuestion(obj,options) {
    var $next = $(obj).next("dd");
    if($next.is(":hidden")) {
        $(".fqa dd").hide();
        var $table = $(this).next().find("table");
        if($table.size()>0){
            setTimeout(_this.tableScroll($table),1000);
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


