/*界面初始化*/
var allPageNumber = 1;
var successPageNumber = 1;
var noPassPageNumber = 1;
var unAuditPageNumber = 1;

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
    } else if (id == "item2" && successPageNumber < lastPageNumber) {
        getPullInfo(successPageNumber, "2", id);
    } else if (id == "item3" && noPassPageNumber < lastPageNumber) {
        getPullInfo(noPassPageNumber, "4", id);
    } else if (id == "item4" && unAuditPageNumber < lastPageNumber) {
        getPullInfo(unAuditPageNumber, "1", id);
    }
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