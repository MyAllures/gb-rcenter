//转换为i18n
$.views.converters("showI18n", function (msg) {
    if (window[window.i18n] && window[window.i18n][msg]) {
        return window[window.i18n][msg];
    } else {
        return msg;
    }
});