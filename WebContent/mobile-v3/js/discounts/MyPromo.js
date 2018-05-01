/*界面初始化*/
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        /*containerScroll: '.mui-content.mui-scroll-wrapper',
         /!*右侧菜单上下滚动，可自行指定范围*!/
         rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
         /!*禁用侧滑手势指定样式*!/
         disabledHandSlip: ['mui-off-canvas-left'],*/
        init: pullUpRefreshOption('#refreshContainer', pullfresh, false)
    };
    muiInit(options);
    promoInfo(1);

    //android隐藏头部
    // hideHeader();
});

function promotionCategory(obj, options) {
    var name = options.code;
    if (name){
        var _this = $(".promo-records-warp[name="+name+"]");
    }
    $(".promo-records-warp").css("display","none");
    if (name == "awarded"){//已派奖
        // $(".promo-records-warp[name=awarded]").css("display","");
        _this.css("display","");
    }else if (name == "didNotPass"){//未通过
        // $(".promo-records-warp[name=didNotPass]").css("display","");
        _this.css("display","");
    }else if(name == "unaudited"){//未审核
        // $(".promo-records-warp[name=unaudited]").css("display","");
        _this.css("display","");
    }else{//全部
        $(".promo-records-warp").css("display","");
    }
    /*$(".promo-records-warp .mui-row").each(function () {
        var apiName = $(this).attr("name");
        if (apiName) {
            if (apiName.indexOf(name) != -1) {
                $(this).css("display", "")
            } else {
                $(this).css("display", "none")
            }
        }
    });*/

}

/*上拉请求数据*/
function pullfresh() {
    setTimeout(function () {
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
        var pageNumber = parseInt($("#pageNumber").val());
        var lastPageNumber = parseInt($("#lastPageNumber").val());
        if (pageNumber == lastPageNumber) {
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
        } else {
            promoInfo(pageNumber + 1);
        }
    }, 0);
}

/*获取正在进行中的类型和活动*/
function promoInfo(pageNumber) {
    var url = root + "/promo/myPromo.html";
    var data = {"paging.pageNumber": pageNumber};
    var options = {
        url: url,
        type: 'post',
        timeout: 10000,
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        dataType: 'html',
        success: function (data) {
            if (data != null) {
                $("#content").append(data);
                $("#pageNumber").val(pageNumber);
            }
        },
        error: function (e) {
            toast("加载失败");
        }
    };
    muiAjax(options);
}

/**
 * android隐藏头部
 */
function hideHeader() {
    if (os == 'app_android') {
        $('header.mui-bar-nav').remove();
        $(".mui-content").attr("style", "margin-top: -44px!important;");
    }
}