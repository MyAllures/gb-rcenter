/**
 * Created by eagle on 15-10-28.
 */

define([], function () {

    return Class.extend({
        timerId:null,
        secondcount:0,

        onPageLoad: function () {
            var that = this;
            if($("#activityRemainingTime").attr("states")=='processing') {
                this.secondcount = Number($("#activityRemainingTime").attr("secondcount"));

                this.timerId = setInterval(function(){
                    that.showTime(that.secondcount,that)
                },1000);
            }

        },

        showTime:function(secondcount,that) {
            var result = that.parseData(that.secondcount);
            var sec = that.secondcount--;
            if(sec==0) {
                clearInterval(that.timerId);
                var _tr = "<td class='salepop-lightblue gray salepop-line'>-</td>" +
                    "<td class='salepop-lightblue gray salepop-line'>-</td>" +
                    "<td class='salepop-lightblue gray salepop-line'>-</td>" +
                    "<td class='salepop-lightblue gray'>-</td>" +
                    "<td rowspan='2' class='salepop-bg-end'>活动已<br/>结束</td>";
                $("#activityRemainingTime").find("tr:first").html(_tr);
            } else {
                // 显示时间
                $("#time_d").text(result.day);
                $("#time_h").text(result.hour);
                $("#time_m").text(result.minute);
                $("#time_s").text(result.second);
            }
        },

        parseData:function(secondcount) {
            var daySecond = 60 * 60 * 24;
            var hourSecond = 60 * 60;
            var result = {};
            result.secondcount = secondcount;
            result.day = parseInt(secondcount / (daySecond));
            result.hour = parseInt((secondcount % (daySecond)) / (hourSecond));
            result.minute = parseInt((secondcount % (hourSecond)) / (60));
            result.second = parseInt((secondcount % 60) / (1));
            return result;
        }

    });

});
