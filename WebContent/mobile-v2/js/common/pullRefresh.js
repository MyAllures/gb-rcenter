/**
 * Created by bill on 16-12-11.
 */
/**
 * 上拉加载公用方法
 * url:访问地址
 * contentId:内容加载区id
 * pagenumber：下一页页码
 * lastPageNumberId：最后一页页码
 * scrollView：滚动区
 * data:请求的参数
 * isReload:重新加载或者显示更多
 */

function pullRefreshUp(url,contentId,pagenumber,lastPageNumberId,scrollView,data,isReload) {
    var lastPageNumber=document.getElementById(lastPageNumberId);
    if (lastPageNumber==null||pagenumber <= parseInt(lastPageNumber.value )) {
        mui.ajax(url, {
            type: 'post',//HTTP请求类型
            timeout: 10000,//超时时间设置为10秒；
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Soul-Requested-With': 'XMLHttpRequest'
            },
            success: function (data) {
                var info = document.getElementById(contentId);
                if(isReload)
                    info.innerHTML = data;
                else
                    info.innerHTML = info.innerHTML + data;
                if (document.getElementById(lastPageNumberId).value == pagenumber) {
                    scrollView.pullRefresh().endPullupToRefresh(true);
                } else {
                    scrollView.pullRefresh().endPullupToRefresh(false);
                    return pagenumber+1;
                }
            },
            error: function (e) {
                mui.toast(window.top.message.common_auto['加载失败']);
                scrollView.pullRefresh().endPullupToRefresh(true);
                //异常处理；
                console.log(e);
                return pagenumber;
            }
        });

    } else {
        scrollView.pullRefresh().endPullupToRefresh(true);
        return pagenumber;
    }
}
