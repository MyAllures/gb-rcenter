$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left'],
        init: pullUpRefreshOption('#pullfresh', pullfresh, false)
    };
    muiInit(options);
    initBanner();
    floatList();
    loadData($('#lottery-id').val(),1);
});

/*轮播图*/
function initBanner() {
    mui('.mui-banner').slider({
        interval: 3000 // 自动轮播时长（毫秒），为0不自动播放，默认为0；
    });

    //关闭轮播图
    mui('.gb-banner').on('tap', '.mui-icon', function () {
        $('.gb-banner').slideUp();
        return false;
    });
}

/*公告弹窗*/
function showNotice(obj,options){
    var noticeA =noticeIndicator="";
    $(".notice .notice-list p a").each(function(){//生成公告html和indicator
        noticeA+="<div class='mui-slider-item'><a href='javascript:'>"+$(this).html()+"</a></div>";
        noticeIndicator+="<div class='mui-indicator'></div>"
    });
    var noticeHtml = $('<div><div class="mui-slider notice-slider"><div class="mui-slider-group">'+noticeA+'</div><div class="mui-slider-indicator">'+noticeIndicator+'</div></div></div></div>');
    var alertNotice = mui.alert(noticeHtml.html(),"公告","关闭");
    $(alertNotice.element).addClass('notice-alert');// 定义弹窗的class,方便修改样式
    var index = $(obj).index();//当前点击的公告index
    //初始化notice-slider
    var notice = mui('.mui-slider');
    notice.slider({
        interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    //点击公告，轮播跳转到对应的位置
    $(".notice-slider .mui-indicator").removeClass("mui-active");
    $(".notice-slider .mui-indicator:eq("+index+")").addClass("mui-active");
    notice.slider().gotoItem(index);
}

/*浮窗广告*/
function floatList(){
    /* 关闭浮窗广告 */
    mui(".ads-slider").on("tap",".icon-close",function(){
        $(".ads-slider").hide();
    });

    mui(".ads-slider").on("tap",".float_idx",function () {
        var activityId = $(this).attr("objectId");
        if(activityId){
            canShowLottery(activityId);
        }
    });
}

/* 导航tab切换 */
$(".nav").on("tap",".mui-control-item",function(){
    var target = $(this).data('item');
    $(".api-grid ul").removeClass('active');
    $(".api-grid div").removeClass('active');
    $(".api-grid ul[data-list='"+target+"']").addClass('active');
});
/*彩票导航菜单滚动*/
mui('.lottery-nav .mui-scroll-wrapper').scroll({
    scrollY: false, //是否竖向滚动
    scrollX:true, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});
/*彩票切换*/
$(".lottery-nav li").on("tap",function(){
    $(this).siblings().find("a").removeClass("mui-active");
    $(this).find("a").addClass("mui-active");
    var isLoadData = $(this).find("a").attr("loadData");
    var apiId = $(this).find("a").attr("data-lottery-id");
    $('#lottery-id').val(apiId);
    if(!isLoadData){
        loadData(apiId,1);
    }
    var pageNumber = parseInt($('#total-page-'+apiId).attr("pageNumber") == null ? "1":$('#total-page-'+apiId).attr("pageNumber"));
    var lastPageNumber = parseInt($('#total-page-'+apiId).val());
    if(pageNumber != lastPageNumber){
        mui('#pullfresh').pullRefresh().refresh(true);
        $('.mui-pull-caption-down').addClass('mui-hidden');
    }
});
/*彩票上拉请求数据*/
    function pullfresh() {
    setTimeout(function () {
        //mui('#pullfresh').pullRefresh().endPullupToRefresh(false);
        var type = $(".nav .mui-scroll .mui-active").attr("data-item");
        if(type == "lottery"){
            mui('#pullfresh').pullRefresh().endPullupToRefresh(false);

            var apiId = $("#lottery-id").val();
            var pageNumber = parseInt($('#total-page-'+apiId).attr("pageNumber"));
            var lastPageNumber = parseInt($('#total-page-'+apiId).val());
            if(pageNumber == lastPageNumber){
                mui('#pullfresh').pullRefresh().endPullupToRefresh(true);
            }else{
                pullUpLoadData(apiId,pageNumber+1);
            }
        }

    }, 2000);
}

function pullUpLoadData(apiId,pageNumber){
    var url = root + '/game/getGameByApiId.html?search.apiId='+apiId+'&search.apiTypeId=4&paging.pageNumber='+pageNumber;
    var options = {
        url:url,
        type:'GET',
        dataType:'html',
        headers:{
            'Content-Type': 'application/json',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        success:function(data){
            setTimeout(function() {
                $('#lottery-id').val(apiId);
                $('input#loading-' + apiId).val('false');
                $('div#lottery-' + apiId).append(data);
                $(".lottery-nav a[data-lottery-id='"+apiId+"']").attr("loadData","true");

                $("#total-page-"+apiId).attr("pageNumber",pageNumber);
            }, 1000);
        }
    };
    muiAjax(options);
}

/** 切换TAB加载数据 */
function loadData(apiId,pageNumber) {
    var url = root + '/game/getGameByApiId.html?search.apiId='+apiId+'&search.apiTypeId=4&paging.pageNumber='+pageNumber;
    var options={
        url:url,
        type:'GET',
        dataType:'html',
        headers:{
            'Content-Type': 'application/json',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        beforeSend:function(){
            showLoading(338);
        },
        success: function (data) {
            setTimeout(function() {
                $('#lottery-id').val(apiId);
                $('input#loading-' + apiId).val('false');
                $('div#lottery-' + apiId).append(data);
                $(".lottery-nav a[data-lottery-id='"+apiId+"']").attr("loadData","true");

                $("#total-page-"+apiId).attr("pageNumber",pageNumber);
            }, 1000);
        },
        complete: function () {
            hideLoad();
        }
    };
    muiAjax(options);
}

/** 显示Loading */
function showLoading(oth) {
    var winHeight = $(window).height();
    var navHeight = $('div#menu-slider').height();
    var banHeight = $('div#slider').height();
    $('div.loader').css({'height': winHeight - oth - navHeight - banHeight});
    $('div.com-loading').addClass('mui-show');
}

function hideLoad() {
    setTimeout(function () {
        $('div.com-loading').removeClass('mui-show');
    }, 1000);
}