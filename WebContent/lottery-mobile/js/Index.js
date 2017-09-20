/**基本投注玩法**/
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        //上一次获取盘口成功时间
        success_time: {},
        /**标志上一次执行计时器时间,以防止手机后台计时器停止*/
        lastIntervalTime: {},
        init: function (formSelector) {
            this._super(formSelector || "form");
            this.getLottery();
            this.muiInit();
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            mui('body').on('tap', 'li.diy-table-view-cell a[data-href]', function () {
                _this.gotoUrl($(this).data('href'));
            });
        },
        getLottery: function () {
            var _this = this;
            mui.ajax(root + "/hall/getLottery.html", {
                type: "post",
                dataType: "json",
                success: function (data) {
                    var html = Template('template_myLotteryTemplate', {list: data});
                    $("#contains").html(html);
                    _this.getHandicaps();
                }
            })
        },
        /**
         * 获取盘口
         */
        getHandicaps: function () {
            var _this = this;
            mui.ajax(root + '/hall/handicaps.html', {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $("span.lottery-time[data-name='time']").each(function () {
                        var code = $(this).attr("data-code");
                        $(this).attr("time", data[code]);
                    });
                    setInterval(function () {
                        $("span.lottery-time[data-name='time']").each(function () {
                            if ($(this).attr("time")) {
                                _this.loadLeftTime($(this));
                            }
                        });
                    }, 1000);
                },
                error: function (e) {

                }
            });
        },

        loadLeftTime: function ($left) {
            var time = $left.attr("time");
            var code = $left.attr("data-code");
            var lastTime = this.lastIntervalTime[code];
            if (!lastTime) {
                lastTime = new Date().getTime();
            }
            var interval = new Date().getTime() - lastTime;
            if (interval >= 3 * 1000) { //大于等于3s就表示有被置为后台，冻结了计时器
                time = time - interval / 1000;//相应的时间需要相应减去相应时间差
            }

            if (isNaN(time) || time < 0) {
                this.refreshHandicap($left, code);
            } else {
                $left.attr("time", time);
                this.showLeftTime($left);
            }
        },
        showLeftTime: function ($left) {
            var time = $left.attr("time");
            if (isNaN(time) || time < 0) {
                return;
            }
            var tmpTime = $left.attr("time");
            var hour = Math.floor(tmpTime / 60 / 60);
            tmpTime = tmpTime - hour * 60 * 60;
            var minute = Math.floor(tmpTime / 60);
            tmpTime = tmpTime - minute * 60;
            var second = tmpTime;
            var content = '';
            content += '<i>' + Math.floor(hour / 10) + '' + Math.floor(hour % 10) + '</i><font> : </font>';
            content += '<i>' + Math.floor(minute / 10) + '' + Math.floor(minute % 10) + '</i><font> : </font>';
            content += '<i>' + Math.floor(second / 10) + '' + Math.floor(second % 10) + '</i>';
            $left.attr("time", --time).html(content);
        },
        /**
         * 更新盘口
         * @param $left
         * @param code
         */
        refreshHandicap: function ($left, code) {
            var successTime = this.success_time[code];
            if (successTime && (new Date()).getTime() - successTime < 15 * 1000) {
                return;
            }
            var _this = this;
            mui.ajax(root + '/hall/handicap.html', {
                dataType: 'json',
                data: {"code": code},
                type: 'POST',
                success: function (data) {
                    if (data) {
                        _this.success_time[code] = new Date().getTime();
                        $left.attr("time", Number(data));
                    }
                }
            });
        }
    });
});