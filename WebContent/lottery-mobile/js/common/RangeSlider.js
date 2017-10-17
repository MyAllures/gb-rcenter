/**
 * 初始化滚动条
 * @param cfg
 */
$.fn.RangeSlider = function(cfg) {
    var min = cfg.min;    // 最小值
    var max = cfg.max;    // 最大值
    var step = cfg.step;    // 每步
    var width = cfg.width ? cfg.width : '100%';  // 容器长度
    // var orientation = cfg.orientation ? cfg.orientation : 'vertical';
    var leftColor = cfg.leftColor ? cfg.leftColor : "#fa6200";
    // var rightColor = cfg.rightColor ? cfg.rightColor : "#fa6200";

    $(this).attr("min", min).attr("max", max).attr("step", step).attr("step", step).attr("value", 0);
    $(this).css({
        width: width
    });

    var callback = cfg.onChange;
    $(this).bind("input", function(e){
        $(this).attr('value', this.value);
        var bfb = (this.value - min) / max * 100;
        $(this).css( 'background', 'linear-gradient(to right, ' + leftColor + ' 0%, ' + leftColor + ' ' + bfb + '%,#fff ' + bfb + '%, #fff)' );
        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};

// 字符串格式化函数
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}