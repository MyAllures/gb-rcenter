/*获取用户信息*/
function userInfo() {
    var option = {
        url: root + "/memberCentre/getUserInfo.html",
        success: function (data) {
            console.log(data);
            if (data != null && data.username != null) {
                var currency = data.currency;

                if (data.username != null) {
                    $(".ct p").text(data.username);
                }
                if (data.walletBalance != null) {
                    $(".span .green").text(currency + data.walletBalance);
                }
                if (data.totalAssets != null) {
                    $(".span .orange").text(currency + data.totalAssets);
                }
                if (data.withdrawAmount != null) {
                    $(".withdrawAmount").text("处理中：" + currency + data.withdrawAmount);
                }
                if (data.preferentialAmount != null) {
                    $(".preferentialAmount").text("近7日收益:" + currency + data.preferentialAmount);
                }
                if (data.recomdAmount != null) {
                    $(".recomdAmount").text("昨日收益:" + currency + data.recomdAmount);
                }
                if (data.unReadCount != null) {
                    if(data.unReadCount == 0){
                        $(".unReadCount").hide();
                    }
                    $(".unReadCount").text(data.unReadCount);
                }
            }
        }
    };
    muiAjax(option);
}

$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*左侧菜单上下滚动，可自行指定范围*/
        leftMenuScroll: '.mui-scroll-wrapper.side-menu-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    userInfo();
})
