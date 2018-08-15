/*界面初始化*/
function initPage(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper'
    };
    muiInit(options);
    if ($("#is_weixin").val()==='1') {
        $("#weixin-tip").show();
        $("#mui_scroll").find("a").attr("data-rel","");
        var tip = document.getElementById('weixin-tip');
        // var close = document.getElementById('close');
        // close.onclick = function () {
        //     tip.style.display = 'none';
        // }
    } else {
        $("#weixin-tip").hide();
    }
}

function download(obj, options) {
    var url = options.url;
    if (!url) {
        toast("暂无设置下载地址，请联系客服！");
        return;
    }
    complete(obj);
    //谷歌浏览器不支持新开跳转打开下载 、safari在设置为弹窗阻止时也是无法新开下载
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('chrome') >= 0 || ua.indexOf("safari") >= 0) {
        goToUrl(url);
        return;
    }
    var win = window.open(url);
    if (!win) {
        window.location.href = url;
    }
}

function complete(obj) {
    $(obj).addClass("loading");
    $(obj).html('<i class="spinner"></i>请到桌面查看进度');
}
