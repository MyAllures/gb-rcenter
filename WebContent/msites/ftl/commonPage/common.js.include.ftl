<#--通用脚本-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery-1.11.3.min.js"></script>
<#--浮窗js-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/float.js"></script>
<#--左下角广告轮播插件-->
<script src="${data.configInfo.ftlRootPath}commonPage/js/idangerous.swiper.min.js"></script>
<#--特定模板下需要特别处理的在该模板下覆盖同名脚本-->
<script>
    var fltRootPath = '${data.configInfo.ftlRootPath}';
    var message = ${data.message};
    //处理iframe引用的问题
    try{window.top.language='zh-CN';}catch(ex){window.language='zh-CN';}
    /* 检查轮播图,不在展示时间内的移除掉,由于初始化顺序，位置不可移动 By Faker */
    $.ajax({
        url:'/index/getUserTimeZoneDate.html',
        dataType:"json",
        success:function(data){
            var nowTime = data.time;
            $("._vr_carousels_check").each(function(){
                var st = $(this).attr("starttime");
                var et = $(this).attr("endtime");
                if(st>nowTime || et<nowTime){
                    $(this).remove();
                }
            })
        }
    });
</script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/gui-base.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/bootstrap-dialog.min.js"></script>
<script src="${data.configInfo.ftlRootPath}commonPage/js/jquery/jquery.super-marquee.js"></script>
<script src="${resComRoot}/js/jquery/plugins/jquery.validate/jquery.validate.js"></script>
<script src="${resComRoot}/js/gamebox/common/jquery.validate.extend.msites.js"></script>
<script src="${resComRoot}/js/bootstrap-daterangepicker/moment.js"></script><#--通用脚本-->
<link rel="stylesheet" href="${data.configInfo.ftlRootPath}commonPage/themes/hb/css/pc.css">

