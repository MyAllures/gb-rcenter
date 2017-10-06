$(function () {
    $(".lot_three_menu a").click(function (e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var betCode =$(this).attr("betCode");
        var play =$(this).attr("play");
        var page =$(this).attr("page");
        var code = $('.sys_tab_wrap .ssc-active').attr('code')+"gf";
        var siteId=$("#search_id").val();
        $("#editable_wrapper").load(root + '/lottery/odds/'+code+'/'+play+'/'+betCode+'/Index.html?page='+page+"&siteId="+siteId);
    });

    if (!$(".lot_three_menu a").hasClass('active')) {
        $(".lot_three_menu a").eq(0).trigger("click");
    }
});
