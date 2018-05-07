/*界面初始化*/
var allPageNumber = 1;
var successPageNumber = 1;
var noPassPageNumber = 1;
var unAuditPageNumber = 1;

var allTotal;
var successTotal;
var noPassTotal;
var unAuditTotal;
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left'],
        init: pullUpRefreshOption('#refreshContainer', pullfresh, false)
    };
    muiInit(options);
});

/*上拉请求数据*/
function pullfresh() {
    var lastPageNumber = parseInt($("#lastPageNumber").val());
    var id = $('.mui-control-content.mui-active').attr("id");
    if (id == "item1" && allPageNumber < lastPageNumber) {
        getPullInfo(allPageNumber, null, id);
    } else if (id == "item2" && judgeLastPageNumber(successPageNumber, successTotal, lastPageNumber)) {
        getPullInfo(successPageNumber, "2", id);
    } else if (id == "item3" && judgeLastPageNumber(noPassPageNumber, noPassTotal, lastPageNumber)) {
        getPullInfo(noPassPageNumber, "4", id);
    } else if (id == "item4" && judgeLastPageNumber(unAuditPageNumber, unAuditTotal, lastPageNumber)) {
        getPullInfo(unAuditPageNumber, "1", id);
    } else {
        mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
    }
}

/**
 *
 * @param beforePageNumber：当前页面数
 * @param totalPageNumber：当前页码总数
 * @param endPageNumber：初始总页码数
 * @returns {boolean}
 */
function judgeLastPageNumber(beforePageNumber, totalPageNumber, endPageNumber) {
    return !totalPageNumber ? beforePageNumber < endPageNumber : beforePageNumber < totalPageNumber;
}

/*获取上拉数据*/
function getPullInfo(pageNumber, state, item) {
    if (state != null) {
        setTimeout(function () {
            var requestData = {"paging.pageNumber": pageNumber + 1, "search.checkState": state};
            promoInfo(requestData, item);
        }, 3000);
    } else {
        setTimeout(function () {
            var requestData = {"paging.pageNumber": pageNumber + 1};
            promoInfo(requestData, item);
        }, 3000);
    }
}
//切换时打开下拉
function switchOffers() {
    var scrollView = mui('#refreshContainer');
    scrollView.scroll().scrollTo(0, 0);//重置高度
    scrollView.pullRefresh().enablePullupToRefresh();
    scrollView.pullRefresh().endPullupToRefresh(false);
}

/*获取正在进行中的类型和活动*/
function promoInfo(requestData, item) {
    var options = {
        url: root + "/promo/myPromo.html",
        type: 'post',
        timeout: 10000,
        data: requestData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        dataType: 'html',
        success: function (data) {
            if (data != null) {
                $('#' + item).find('.promo-record-content').append(data);
                addPageNumber(item);
                var number = $('#' + item).find("#partialPageNumber").attr("value");
                if (number == "1") {
                    mui("#refreshContainer").pullRefresh().endPullupToRefresh(true);
                    return;
                }
                var isRefresh = true;
                if (item == "item1") {
                    allTotal = number;
                    if (allPageNumber < allTotal) {
                        isRefresh = false;
                    }
                } else if (item == "item2") {
                    successTotal = number;
                    if (successPageNumber < successTotal) {
                        isRefresh = false;
                    }
                } else if (item == "item3") {
                    noPassTotal = number;
                    if (noPassPageNumber < noPassTotal) {
                        isRefresh = false;
                    }
                } else if (item == "item4") {
                    unAuditTotal = number;
                    if (unAuditPageNumber < unAuditTotal) {
                        isRefresh = false;
                    }
                }
                mui("#refreshContainer").pullRefresh().endPullupToRefresh(isRefresh);
            }
        },
        error: function (e) {
            toast("加载失败");
        }
    };
    muiAjax(options);
}

function addPageNumber(item) {
    if (item == 'item1') {
        allPageNumber = allPageNumber + 1;
    } else if (item == 'item2') {
        successPageNumber = successPageNumber + 1;
    } else if (item == 'item3') {
        noPassPageNumber = noPassPageNumber + 1;
    } else if (item == 'item4') {
        unAuditPageNumber = unAuditPageNumber + 1;
    }
}