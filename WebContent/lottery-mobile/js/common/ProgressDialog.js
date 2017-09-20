/**
 * 通用progress dialog
 * Created by fei on 17-1-5.
 */
;(function ($) {
    $.ProgressDialog = function(options){
        var defaults = {
            tip : '载入中...'
        };
        var opts = $.extend(defaults, options);

        this.show = function (tip) {
            tip = (typeof tip == 'undefined') ? opts.tip : tip;
            var container = '<div class="loading-mask"><div class="gb-loading"></div></div>';
            var loading = '<div class="com-loading" style="display: block"><div class="loader">' +
                '<div class="loader-inner ball-pulse"><div></div><div></div><div></div></div></div></div>' +
                '<div class="loader-tip">' + tip + '</div>';
            $('body').append(container);
            var $gl = $('div.gb-loading');
            $gl.html(loading);
            var winHeight = $(window).height();
            $gl.css({'top': (winHeight - 100) / 2});
            $('div.loading-mask').show();
        };

        this.hide = function () {
            $('div.loading-mask').remove();
        };
        this.changeTip = function(newTip) {
            $('div.loader-tip').html(newTip);
        }
    };
})(jQuery);

var pd = new $.ProgressDialog({tip: '载入中...'});