/**
 * 登录退出相关脚本
 * author: Longer
 */
define([], function () {
    return Class.extend({


        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this.getTemplateHeader();
        },
        buildEvent:function () {
            var _this = this;
            $(window).resize(function () {          //当浏览器大小变化时
                _this.resizeHeight();
            });
        },
        getTemplateHeader:function(){
            var _that = this;
            $.ajax({
                url: "/commonPage/error.html",
                dataType:"html",
                type:"POST",
                success:function(data){

                    $("._top").html($(data).find("div._topOri"));
                    $("._footer").html($(data).find("div._footerOri"));
                },
                complete: function () {
                    _that.resizeHeight();
                },
                error:function(){
                    console.log("公共错误页面不可用");
                }
            })
        },
        resizeHeight:function(){
            var resizeObj = $("._center");
            var topObj = $("._top");
            var footerObj = $("._footer");
            resizeObj.height($(window).height()-topObj.height() - footerObj.height());
        }


    });
});