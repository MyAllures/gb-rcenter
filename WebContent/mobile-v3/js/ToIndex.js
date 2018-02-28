/**
 * Created by fei on 16-12-11.
 */
mui.init({});
mui('.mui-scroll-wrapper').scroll();

$(function () {
    muiInit();
    displayToIndex();
});

function displayToIndex() {
    var isOpen = $("input[name=isOpen]").val();
    if(os != 'app_ios' && os !='app_android') {
        $('div.load-bg').fadeIn();
        toIndex(isOpen);
    } else {
        lazy2Index(isOpen);
    }
}

function clickWelcome() {
    setTimeout(function () {
        var $bg = $('div.load-bg');
        $bg.fadeOut();
        setTimeout(function () {
            $bg.remove();
        }, 1000);
    }, 1000);
}


function lazy2Index(isOpen) {
    var b = "_OPEN_SPLASH";
    var a = getCookie(b);
    if (!a) {
        $("div.load-bg").fadeIn();
        setCookie(b, true, 0);
        setTimeout(function () {
            toIndex(isOpen);
        }, 1000);
    } else {
        $("div.load-bg").fadeOut();
        toIndex(isOpen);
    }
}

/**
 * isOpen: 是否未开站
 */
function toIndex(isOpen) {
    var openTime = '2017-07-18 23:59:59';
    var openTs = new Date(openTime.replace(/-/g, '/')).getTime();
    var nowTs = new Date().getTime();
    if (isOpen == 'true' && openTs >= nowTs) {
        document.cookie = "ACCESS_TERMINAL=pc;expires=0";
        window.location.replace(root + '/');
    } else {
        document.cookie = "ACCESS_TERMINAL=mobile;expires=0";
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
