/**
 * Created by fei on 16-12-11.
 */
mui.init({});
mui('.mui-scroll-wrapper').scroll();

mui(document.body).on('tap', '#welcome', function () {
    setTimeout(function () {
        var $bg = $('div.load-bg');
        $bg.fadeOut();
        setTimeout(function () {
            $bg.remove();
        }, 1000);
    }, 2000);
});

function lazy2Index() {
    var b = "_OPEN_SPLASH";
    var a = getCookie(b);
    if (!a) {
        $("div.load-bg").fadeIn();
        setCookie(b, true, 0);
        setTimeout(function () {
            toIndex();
        }, 2000);
    } else {
        toIndex();
    }
}

function toIndex() {
    if (os == 'app_ios') {
        window.location.href = root + '/mainIndex.html';
    } else {
        window.location.replace(root + '/mainIndex.html');
    }
}

window.addEventListener('load', function(e) {
    var cache = window.applicationCache;
    cache.addEventListener('updateready', function () {
        if (cache.status == cache.UPDATEREADY) {
            cache.swapCache();
            window.location.reload();
        }
    }, false)
}, false);

// 获取cookie
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

// 设置cookie
function setCookie(name,value,time) {
    if (time == 0) {
        document.cookie = name + "=" + escape(value) + ";expires=0";
    } else {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
}

