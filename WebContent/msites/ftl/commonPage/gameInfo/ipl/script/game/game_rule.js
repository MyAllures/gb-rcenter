/*global jQuery*/
/*jslint browser : true, devel: true, regexp: true */
jQuery(document).ready(function ($) {
    $(window).resize(function () {
        //重新設定卷軸高度
        scrollbarEvent();
        //重新設定上標題距離跟修正IOS拖拉留白問題
        resetViewPosition();
    });
    scrollbarEvent();
    resetViewPosition();

    function resetViewPosition() {
        //修正IOS safari取高度值有誤差
        var getHeight = window.innerHeight ? window.innerHeight : $(window).height();
        var getWidth = $(window).width();
        var gettopHeight = $('.navbar-theme').height();
        $(".main-box").css({
            "margin-top": (gettopHeight + 5) - (getHeight / 2),
            "margin-left": 0 - (getWidth / 2),
            "top": '50%',
            "left": '50%',
            "width": getWidth
        });
        // $('.content').css('width', getWidth-20);
    }

    function scrollbarEvent() {
        $.event.special.mousewheel.settings.adjustOldDeltas = false;
        var setScollbarHeight = $(window).height();
        var topHeight = $('.navbar-theme').height();
        $(".main-box").height(setScollbarHeight - topHeight - 10);
        $(".main-box").mCustomScrollbar({
            theme: "minimal-dark", // 設定捲軸樣式
            setHeight: setScollbarHeight - topHeight - 10,
            mouseWheelPixels: 200,
            contentTouchScroll: true
        });
    }

    $('.top').css("background-color","#FFFFFF").css('border-color',"#CCC");
    $('.top').click(function () {
        $(".main-box").mCustomScrollbar("scrollTo", 0);
    });
    var lang = getUrlParameter('Lang'),
        gametype = getUrlParameter('GameType'),
        mobile = getUrlParameter('Mobile'),
        version = getUrlParameter('Version'),
        imageslamg;
    switch (lang) {
    case 'tw':
        imageslamg = 'tw';
        break;
    case 'cn':
        imageslamg = 'cn';
        break;
    case 'ug': case 'lo': case 'km': case 'lao':
        lang = 'us';
        imageslamg = 'us';
        break;
    default:
        imageslamg = 'us';
        break;
    };
   /* $('img').each(function (index, el) {
        var src = $(this).prop('src');
        var newSrc = src.replace(/(.*\/images\/game\/rule\/\d{4,5}\/)[^/]*(\/[^/]*)$/, "$1" + imageslamg + "$2");
        // newSrc = newSrc.replace(/(.*)(\/images\/game\/rule\/.*)$/, "$1/ipl$2");
        $(this).prop('src', newSrc);
    });*/

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    $('.select-lang').children().each(function () {
        if ($(this).val() == lang) {
            $(this).prop('selected', true);
        }
    });
    $('.select-lang').on('change', function (e) {
        var valueSelected = this.value;
        window.location.replace(location.pathname + '?GameType=' + gametype + '&Lang=' + valueSelected + '&Mobile=' + mobile + '&Version=' + version);
    });
    $('span[title]').removeAttr('title');
});