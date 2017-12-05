/*界面初始化*/
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
        init: pullUpRefreshOption('#pullrefresh', pullfresh, false)
    };
    muiInit(options);
    promoInfo();
});


/*上拉请求数据*/
function pullfresh() {
    setTimeout(function () {
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
        var pageNumber = parseInt($("#pageNumber").val());
        var lastPageNumber = parseInt($("#lastPageNumber").val());
        if (pageNumber == lastPageNumber) {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
        }
        var options = eval("(" + $(".promo-sorts .active").attr('data-rel') + ")" );
        var type = options.activityType;
        getPromoInfo(type, pageNumber + 1)
    }, 0);
}

/*获取正在进行中的类型和活动*/
function promoInfo() {
    var option = {
        url: root + "/discounts/activityType.html",
        success: function (data) {
            if (data != null) {
                if (data.type != null) {
                    var type = data.type;
                    var a = '';
                    for (var d in data.type) {
                        var option ={
                            opType:'function',
                            target:'activityType',
                            text:'',
                            activityType:type[d].key
                        };
                        var rel ='';
                        rel = JSON.stringify(option).toString();
                        a = a+"<a class='mui-btn btn-promo-sort' data-rel='"+rel+"'>" + type[d].value + "</a>";
                    }
                    $(".promo-sorts").append(a);
                }
                appendActivity(data);
            }
        }
    };
    muiAjax(option);
}

/*点击活动类型*/
function activityType(obj, options) {
    $(".promo .promo-list").html("");
    var type =options.activityType;
    $(".promo-sorts a").removeClass("active");
    $(obj).addClass("active");
    var pageNumber = 1;
    getPromoInfo(type, pageNumber);
    $(obj).unlock();
    mui('#pullrefresh').pullRefresh().refresh(true); //切换类型不能上拉
}

function getPromoInfo(type, pageNumber) {
    var option = {
        url: root + "/discounts/promo.html",
        data: {
            type: type,
            pageNumber: pageNumber
        },
        success: function (data) {
            if (data != null) {
                appendActivity(data);
            }
        }
    };
    muiAjax(option);
}

/*拼接活动列表*/
function appendActivity(data) {
    if (data != null) {
        if (data.pageNumber != null) {
            $("#pageNumber").val(data.pageNumber);
        }
        if (data.lastPageNumber != null) {
            $("#lastPageNumber").val(data.lastPageNumber);
        }
        if (data.message != null) {
            var message = data.message;
            var b = '';
            for (var m in message) {
                var option ={
                    opType:'href',
                    target: root + '/promo/promoDetail.html?search.id=' + message[m].id,
                    text:''
                };
                var rel ='';
                rel = JSON.stringify(option).toString();
                b = b + '<li><a data-rel='+rel+'><img src="' + message[m].activityAffiliated + '"/></a></li>';
            }
            $(".promo .promo-list").append(b);
        }
    }
}