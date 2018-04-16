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
    $('div.load-bg').show();
    toIndex();
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


function toIndex() {
    setTimeout(function () {
        document.cookie = "ACCESS_TERMINAL=mobile;expires=0";
        goToUrl(root + '/mainIndex.html');
    }, 500);
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
