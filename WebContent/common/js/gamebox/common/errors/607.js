/**
 * 登录退出相关脚本
 * author: Longer
 */
define(['jqcountdown'], function (jqcountdown) {
    return Class.extend({


        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this.countDownMaintainTime();
        },

        countDownMaintainTime: function () {
            var _that = this;
            var startTimeObj =  $("input[name='startTime']");
            var endTimeObj = $("input[name='endTime']");
            var seconds = parseInt(endTimeObj.val()) - parseInt(startTimeObj.val());
            var countdownTime = new Date(new Date().getTime()+seconds);
            if (!isNaN(seconds)){

                $(".count-down01").countdown(countdownTime).on('update.countdown', function(event) {
                    if (countdownTime.getTime() - new Date().getTime() > 500) {
                        var $this = $(this).html(event.strftime(''
                            + ' <div class="col-xs-3"><div class="time">%-d</div><p class="font-bold text-white">天</p></div>'
                            + ' <div class="col-xs-3"><div class="time">%H</div><p class="font-bold text-white">小时</p></div>'
                            + ' <div class="col-xs-3"><div class="time">%M</div><p class="font-bold text-white">分</p></div>'
                            + ' <div class="col-xs-3"><div class="time">%S</div><p class="font-bold text-white">秒</p></div>'
                        ));
                    }else {
                        _that.redirctUrl();
                    }
                });
            }else {
                if ($("input[name='state']").val()=='1'){
                    _that.redirctUrl();
                }
                $(".count-down01").html(
                    '<div class="col-xs-3"><div class="time">0</div><p class="font-bold text-white">天</p></div>'
                    + ' <div class="col-xs-3"><div class="time">0</div><p class="font-bold text-white">小时</p></div>'
                    + ' <div class="col-xs-3"><div class="time">0</div><p class="font-bold text-white">分</p></div>'
                    + ' <div class="col-xs-3"><div class="time">0</div><p class="font-bold text-white">秒</p></div>'
                );
            }
        },
        redirctUrl:function(){
            var path = window.location.pathname.split("/")[1];
            var rUrl = window.location.host +"/";
            if (path!="errors"){
                rUrl= rUrl +path;
            }
            window.location="http://"+rUrl;
        }


    });
});