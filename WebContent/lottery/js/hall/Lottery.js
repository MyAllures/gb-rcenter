define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        success_time: {},  // 调用getHandicap成功时间
        hall_expect: {},//期数
        init: function () {
            parent.layer.closeAll();
            $('div.loader', parent.document).remove();
            this.initTime();
            this.initOpenData();
            this.bindButtonEvents();
        },
        initTime: function () {
            var _this = this;
            setInterval(function () {
                $("div.timer_wrap[data-name='time']").each(function () {
                    if ($(this).attr("data-time")) {
                        _this.loadLeftTime($(this));
                    }
                });
            }, 1000);
        },
        //正在开奖中的彩票需要定时再取近期开奖结果
        initOpenData: function () {
            var _this = this;
            $("p.lastOpenData[isOpening=true]").each(function () {
                var lotteryCode = $(this).attr("data-code");
                if (lotteryCode) {
                    _this.getLotteryResult(lotteryCode);
                }
            });
        },
        bindButtonEvents: function () {
            var _this = this;
            $("#ssc_list ul li.ssc_1 div.Result a").click(function () {
                _this.getPage($(this).data("page"));
            });
        },
        getPage: function (url) {
            parent.index.getPage(url);
        },
        getSscPage: function (url) {
            parent.index.getSscPage(url);
        },

        /** 显示剩余时间 */
        loadLeftTime: function ($left) {
            var time = $left.attr("data-time");
            var code = $left.attr("data-code");
            if (isNaN(time) || time < 0) {
                this.refreshHandicap($left, code);
            } else {
                this.showLeftTime($left);
            }

        },
        /**
         * 刷新盘口
         * @param $left
         * @param code
         */
        refreshHandicap: function ($left, code) {
            var _this = this;
            var successTime = this.success_time[code];
            // 30秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
            if (successTime && (new Date()).getTime() - successTime < 30 * 1000) {
                return;
            }
            this.hall_expect[code] = $("#expect" + code).text();
            ajaxRequest({
                url: root + '/hall/handicap.html',
                data: {code: code},
                success: function (data) {
                    _this.success_time[code] = new Date().getTime();
                    var handicap = data.handicap;
                    if (handicap && handicap.expect) {
                        var expect = $("#expect" + code).text();
                        if (expect && $("#expect" + code).text() == expect) { //重新获取盘口数据以防因为封盘时间比实际早，导致通过接口查询的期数值不对，要加１
                            handicap.expect = Number(expect) + 1;
                        }
                        $("#expect" + code).text(handicap.expect);
                        $(".timer_wrap[data-code=" + code + "]").attr("data-time", handicap.leftTime);
                        $(".timer_wrap[data-code=" + code + "]").attr("lottery-time", handicap.lotteryTime);
                        $left.attr("data-time", handicap.leftTime);
                    }
                    _this.handleResult(data, code);
                },
                error: function (e) {
                    console.log("error");
                }
            });
        },
        /**
         * 获取上一次开奖历史记录
         * @param code
         */
        getLotteryResult: function (code) {
            var _this = this;
            ajaxRequest({
                url: root + '/hall/lotteryResult.html',
                data: {code: code},
                success: function (data) {
                    _this.handleResult(data, code);
                },
                error: function (e) {
                }
            });
        },

        /**
         * 处理开奖结果
         * @param data
         * @param code
         */
        handleResult: function (data, code) {
            var _this = this;
            var lottery = data.lottery;
            if (lottery && lottery.length > 0) {
                var result = lottery[0];
                var expect = result.expect;
                if (!result.openCode) {
                    $("#lastOpenData" + code).removeClass("bj28").html(expect + "期正在开奖中...");
                    setTimeout(function () {
                        _this.getLotteryResult(code);
                    }, 30000);
                } else {
                    var numArr = result.openCode ? result.openCode.split(",") : [];
                    var html = '';
                    if (code == 'bjpk10' || code == 'xyft' || code == 'jspk10') {
                        html = Template('template_pk10', {numArr: numArr});
                        $("#lastOpenData" + code).addClass("bj28")
                    } else if (code == 'hklhc') {
                        html = Template('template_hklhc', {numArr: numArr});
                        $("#lastOpenData" + code).addClass("bj28")
                    }else if (code == 'bjkl8') {
                        html = Template('template_bjkl8', {numArr: numArr});
                        $("#lastOpenData" + code).addClass("bj28")
                    }else if(code == 'gdkl10' || code == 'cqxync'){
                        html = Template('template_result', {numArr: numArr});
                    } else {
                        html = '上期开奖';
                        html = html + Template('template_result', {numArr: numArr});
                    }
                    $("#lastOpenData" + code).html(html);
                }
            }
        },
        showLeftTime: function ($left) {
            var time = $left.attr("data-time");
            if (isNaN(time) || time < 0) {
                return;
            }
            var tmpTime = $left.attr("data-time");
            var hour = Math.floor(tmpTime / 60 / 60);
            tmpTime = tmpTime - hour * 60 * 60;
            var minute = Math.floor(tmpTime / 60);
            tmpTime = tmpTime - minute * 60;
            var second = tmpTime;
            var content = '';
            content += '<ol class="s">';
            content += '<span class="sp1">' + (Math.floor(hour / 10)) + '</span>';
            content += '<span class="sp2">' + (Math.floor(hour % 10)) + '</span>';
            content += '</ol>';
            content += '<ol class="f">';
            content += '<span class="sp1">' + (Math.floor(minute / 10)) + '</span>';
            content += '<span class="sp2">' + (Math.floor(minute % 10)) + '</span>';
            content += '</ol>';
            content += '<ol class="m">';
            content += '<span class="sp1">' + (Math.floor(second / 10)) + '</span>';
            content += '<span class="sp2">' + (Math.floor(second % 10)) + '</span>';
            content += '</ol>';
            $left.attr("data-time", --time).html(content);
        }
    })
});







