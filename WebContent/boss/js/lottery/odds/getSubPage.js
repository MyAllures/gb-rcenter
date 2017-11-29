$(function () {
    $(".lot_three_menu a").click(function (e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var betCode =$(this).attr("betCode");
        var play =$(this).attr("play");
        var page =$(this).attr("page");
        var code = $('.sys_tab_wrap .ssc-active').attr('code');
        var siteId=$("#search_id").val();
        // $("#editable_wrapper").load(root + '/lottery/odds/'+code+'/'+play+'/'+betCode+'/Index.html?page='+page+"&siteId="+siteId);
        $.ajax({
            url:root + "/lottery/odds/code/play/betCode/Index.html",
            type:"post",
            data:{"category":play,"betCode":betCode,"page":page,"siteId":siteId,"code":code},
            success: function (data) {
                $("#editable_wrapper").html(data);
            }
        })
    });

    if (!$(".lot_three_menu a").hasClass('active')) {
        $(".lot_three_menu a").eq(0).trigger("click");
    }
});
