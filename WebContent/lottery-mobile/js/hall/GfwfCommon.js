/**基本投注玩法**/
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        /**
         * 大彩种
         */
        type: null,
        //小彩种
        code: null,
        //上一次获取盘口时间
        successTime: null,
        //是否正在获取盘口数据
        isRunning: false,
        //判断是否正在开奖中
        cur_expect: null,
        /*随机数生成器*/
        randomNumInterval: null,
        /*清除弹窗显示标志*/
        clearPopFlag: null,
        /**清除弹窗对象标识*/
        clearPopLayer: null,
        /**标志上一次执行计时器时间,以防止手机后台计时器停止*/
        lastIntervalTime: null,
        //是否开盘
        isOpen:true,
        init: function (formSelector) {
            this._super(formSelector || ".mui-off-canvas-wrap");
        },
        /**
         * 页面加载
         */
        onPageLoad: function () {
            this._super();
            /** 小彩种 */
            this.code = $(this.formSelector + ' input[name=code]').val();
            this.type = $(this.formSelector + " input[name=type]").val();
            //传统，官方切换
            this.isGfwf();
            //获取盘口数据
            this.getHandicap();
            var _this = this;
            _this.changeList();
            window.setInterval(function () {
                _this.loadLeftTime();
            }, 1000);
            this.getOpenHistory();
            this.muiInit();
            this.iosGoBack();
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            //头部选择
            mui("div.s-menu").on('tap', 'a', function () {
                _this.checkNoSon($(this).attr("data-code"), this.classList);
            });

            //直选复式
            mui("body").on('tap', '.gfwf-playName', function () {
                $('div.selected-wrap').toggle();
                $('div.gfwf-bg').toggle();
            });

            mui("body").on('tap', '.gfwf-bg', function () {
                $('div.gfwf-bg').hide();
                $('div.selected-wrap').hide();
            });

            //确认清空选项
            mui("body").on("tap", 'button#confirmClearPop', function () {
                _this.closeClearPopup(true);
            });
            mui("body").on("tap", 'button#cancelPop', function () {
                _this.closeClearPopup();
            });
        },


        getBetTable: function(betCode,jspName){
            var _this=this;
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspName},
                type: 'POST',
                success: function (data) {
                    //betCode赋值
                    $("#gfwfBetCode").val(betCode);
                    $(".bet-table").html(data);
                    if(!_this.isOpen){
                        _this.closeHandicap();
                    }
                }
            });
        },


        /**
         * 重置下注选项
         */
        resetBet: function () {
            $("i.mui-control-item").removeClass("mui-active");
            $("a.n-btn").removeClass("mui-active");
            $("#dingdan").removeClass('mui-active');
            $("#quantity").text(0);
            $("#inputMoney").text(0);
            $("a.bottom-bar-btn.btn-jixuan-gfwf").addClass("mui-active");
            $("a.bottom-bar-btn.btn-reset-gfwf").removeClass("mui-active");
        },

        /**
         * 获取期数盘口数据
         */
        getHandicap: function (callback) {
            if (this.isRunning) {
                return;
            }
            var _this = this;
            var url = root + '/commonLottery/getExpect.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                async: false,
                data: {'code': this.code},
                beforeSend: function () {
                    _this.isRunning = true;
                },
                success: function (data) {
                    if (data) {
                        var expect = $("#expect").text();
                        $("#expect").html(data.expect);
                        $("#leftTime").attr("data-time", data.leftTime);
                        if (expect && expect == data.expect) { //重新获取盘口数据以防因为封盘时间比实际早，导致通过接口查询的期数值不对，要加１
                            $("#expect").html(Number(expect) + 1);
                        }
                        if (typeof callback == 'function') {
                            callback();
                        }
                    } else { //handicap为空
                        $(".mui-table-view-cell.mui-collapse").html('sorry,该彩票暂停!');
                    }
                },
                complete: function () {
                    _this.isRunning = false;
                }
            })
        },
        /**
         * 加载倒计时
         */
        loadLeftTime: function () {
            var $left = $("#leftTime");
            var time = $left.attr("data-time");
            //用来标志计时器是否是被冻结过
            if (!this.lastIntervalTime) {
                this.lastIntervalTime = new Date().getTime();
            }
            var interval = new Date().getTime() - this.lastIntervalTime;
            if (interval >= 3 * 1000) { //大于等于3s就表示有被置为后台，冻结了计时器
                time = time - interval / 1000;//相应的时间需要相应减去相应时间差
            }
            this.lastIntervalTime = new Date().getTime();
            if (isNaN(time) || time < 0) {
                // 5秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
                if (this.successTime != null && (new Date()).getTime() - this.successTime < 5 * 1000) {
                    return;
                }
                if (time == -1) {
                    //赋值，用来判断是否开奖中
                    this.cur_expect = $("#expect").text();
                    this.showClearPopup();
                }
                var _this = this;
                _this.getHandicap(function () {
                    _this.successTime = (new Date()).getTime();
                    _this.getOpenHistory();
                });
                return;
            }
            this.showLeftTime(time);
        },
        /**
         * 获取最近开奖历史记录
         */
        getOpenHistory: function () {
            // 是否已开奖（通常是最近一期）
            var isOpened = null;
            var _this = this;
            mui.ajax(root + '/commonLottery/getRecent5Records.html', {
                data: {code: _this.code},
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.length > 0) {
                        var open = data[0];
                        var numArr = open.openCode ? open.openCode.split(",") : [];
                        if (numArr.length == 0) { // 是否开奖中
                            // 循环读取开奖数据，30秒
                            window.setTimeout(function () {
                                _this.getOpenHistory();
                            }, 30000);
                        }
                        $(".gray-lump .mui-pull-left .style_blue").text(open.expect);
                        //是否展示开奖效果
                        _this.showOpeningStyle(numArr);
                        //展示上一期中奖号码
                        if (numArr && numArr.length > 0) {
                            _this.showLastOpenCode(numArr);
                        }
                        _this.showRecentHistory(data);
                    }
                },
                error: function (e) {
                }
            });
        },

        /**lot
         * 展示开奖效果
         * @param numArr
         */
        showOpeningStyle: function (numArr) {
            var _this = this;
            if (!numArr || numArr.length <= 0) {
                if (!this.randomNumInterval) {
                    this.randomNumInterval = setInterval(function () {
                        _this.randomNumber();
                    }, 450);
                }
                return;
            }
            if (this.randomNumInterval) {
                clearInterval(_this.randomNumInterval);
                _this.randomNumInterval = null;
            }
        },
        /**
         * 显示清除弹窗
         */
        showClearPopup: function () {
            if (this.clearPopFlag) {
                return;
            }
            var html = Template('template_clearPop', {expect: this.cur_expect});
            $("#clearPopDiv").html(html);
            $("#clearPopDiv").addClass('mui-active');
            var time = 5;
            var _this = this;
            this.clearPopLayer = setInterval(function () {
                if (time == 0) {
                    _this.closeClearPopup();
                    return;
                }
                $(".clearBet_time").html(time);
                --time;
            }, 1000)
        },

        /**
         * 关闭清除弹窗
         * @param reset
         */
        closeClearPopup: function (reset) {
            $("#clearPopDiv").html("");
            $("#clearPopDiv").removeClass('mui-active');
            this.clearPopFlag = null;
            var _this = this;
            clearInterval(_this.clearPopLayer);
            this.clearPopLayer = null;
            $("#betOrderDiv").hide();
            $("#offCanvasWrapper").show();
            $("#dingdan").html("");
            $("#dingdan").removeClass('mui-active');
            sessionStorage.removeItem("betForm");
            if (reset) {
                _this.resetBet();
            }
        },

        /**
         * 展示上一期中奖号码，可根据实际彩种直接重写
         * @param numArr
         */
        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            $("#lastOpenCode").html(html);
        },
        /**
         * 开奖中效果
         * @param type
         */
        randomNumber: function () {
            var len;
            switch (this.type) {
                case "ssc":
                    len = 5;
                    break;
                case "k3":
                    len = 3;
                    break;
                case "pl3":
                    len = 3;
                    break;
                case "lhc":
                    len = 7;
                    break;
                case "pk10":
                    len = 10;
                    break;
                case "keno":
                    len = 20;
                    break;
                case "xy28":
                    len = 3;
                    break;
                case "sfc":
                    len = 8;
                    break;
                default:
            }
            var html = this.getRandomNumber(len);
            $("#lastOpenCode").html(html);
        },
        getRandomNumber: function (len) {
            var tmpStr = '<span class="inline-list-1">';
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10);
                tmpStr += '<i class="lottery-ball">' + num + '</i>';
            }
            tmpStr += '</span>';
            return tmpStr
        },
        /**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length
                    });
            });
            $("#recentHistory").html(openList);
        },
        /**
         * 展示封盘倒计时时间
         * @param time
         */
        showLeftTime: function (time) {
            var tmpTime = time;
            var hour = Math.floor(tmpTime / 60 / 60);
            tmpTime = tmpTime - hour * 60 * 60;
            var minute = Math.floor(tmpTime / 60);
            tmpTime = tmpTime - minute * 60;
            var second = tmpTime;
            var content = Math.floor(hour / 10) + "" + Math.floor(hour % 10) + ':' + Math.floor(minute / 10) + "" + Math.floor(minute % 10) + ':' + Math.floor(second / 10) + "" + Math.floor(second % 10);
            $("#leftTime").attr("data-time", --time).html(content);
        },

        //传统,官方玩法切换
        isGfwf: function () {
            var _this = this;
            var lotteryGenra = $("input#lotteryGenra").val();
            mui("body").on("tap", "a#is-gfwf", function () {
                if(lotteryGenra ==1) {
                    var flag = $(this).attr("data-flag");
                    _this.gotoUrl(root + '/' +_this.type + '/' +_this.code + '/index.html?betCode=&isGfwf='+flag);
                }
            });
        },

        //判断是为没有小玩法的大玩法点击时间,给各自玩法重写。
        checkNoSon : function (betCode) {
        },
        //初始化各猜中默认第一个玩法页面。
        changeList : function () {
        },

        //封盘
        closeHandicap:function () {
            $("li.screen-munber").addClass("disabled");
            mui("body").off('tap', 'div.bet-table-list td,div.bet-table-list .n-btn');
        },
        //开盘
        openHandicap:function () {
            $("li.screen-munber").removeClass("disabled");
            if(typeof page.playway != 'undefined'){
                page.playway.bindButtonEvents();
            }
        },

    });
});