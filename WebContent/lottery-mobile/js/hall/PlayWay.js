/**基本投注玩法**/
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        /**
         * 大彩种
         */
        type: null,
        //小彩种
        code: null,
        //玩法
        betCode: null,
        //上一次获取盘口时间
        successTime: null,
        //是否正在获取盘口数据
        isRunning: false,
        //判断是否正在开奖中
        cur_expect: null,
        /*投注js*/
        betPage: null,
        /*随机数生成器*/
        randomNumInterval: null,
        /*清除弹窗显示标志*/
        clearPopFlag: null,
        /**清除弹窗对象标识*/
        clearPopLayer: null,
        /**标志上一次执行计时器时间,以防止手机后台计时器停止*/
        lastIntervalTime: null,
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
            this.betCode = $(this.formSelector + " .ssc-method-list .ssc-method-label a.mui-active").attr("data-code");
            //获取赔率
            this.getOdds();
            //获取盘口数据
            this.getHandicap();
            var _this = this;
            window.setInterval(function () {
                _this.loadLeftTime();
            }, 1000);
            this.getOpenHistory();
            this.muiInit();
            this.iosGoBack();
            if(this.os == 'pc') {
                //已应对在h5下金额输入框不能输入
                $("input#inputMoney").focus();
            }
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
                    if (data.opening) {
                        if (_this.code == 'hklhc' && data.leftOpenTime >0){

                            $("font#leftTime").attr("data-time", data.leftOpenTime);
                            //六合彩前端封盘控制
                            $(".fengPan").addClass("disabled");
                            $("#show-t").addClass("disabled-btn");
                            $("#show-t").removeAttr("id");
                            $("#inputMoney").attr("placeholder","已封盘");
                        }else {

                            var expect = $("#expect").text();
                            $("#expect").html(data.expect);
                            $("#leftTime").attr("data-time", data.leftTime);
                            if (expect && expect == data.expect) { //重新获取盘口数据以防因为封盘时间比实际早，导致通过接口查询的期数值不对，要加１
                                $("#expect").html(Number(expect) + 1);
                            }
                            if (typeof callback == 'function') {
                                callback();
                            }
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
        /**
         * 获取赔率
         */
        getOdds: function () {
            // var betCode=this.betCode;
            // if(betCode);
            var url = root + '/' + this.type + '/' + this.code + '/' + this.betCode + 'Odd.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    _this.templateOdd(data);
                }
            })
        },
        /**
         * 组装赔率（各自玩法各自组装赔率）
         * @param data
         */
        templateOdd: function (data) {
            $(".bet-table-list td[data-bet-num]").each(function () {
                var betNum = $(this).attr('data-bet-num');
                var bet = data[betNum];
                $(this).attr("data-odds", bet.odd);
                $(this).attr("data-bet-code", bet.betCode);
                $(this).children("span[name=odd]").text(bet.odd);
            })
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            //点击下注选项
            mui("body").on('tap', 'div.bet-table-list td,div.bet-table-list .n-btn', function () {
                // $(this).toggleClass('mui-active');
                // $("#quantity").text($("div.bet-table-list td.mui-active").length);
                _this.bindTdInput(this);
            });
            //清除下注项
            mui("body").on('tap', 'a#del-bet', function () {
                _this.resetBet();
            });
            //投注
            mui("body").on("tap", 'a#show-t', function () {
                _this.betOrder();
            });


            //跳转其他玩法页面
            mui(this.formSelector).on("tap", "a.mui-control-item[data-code]", function () {
                var dataCode = $(this).attr("data-code");
                _this.gotoUrl(root + '/' + _this.type + '/' + _this.code + '/index.html?betCode=' + dataCode);
            });

            //确认清空选项
            mui("body").on("tap", 'button#confirmClearPop', function () {
                _this.closeClearPopup(true);
            });
            mui("body").on("tap", 'button#cancelPop', function () {
                _this.closeClearPopup();
            });
            //取消下注
            mui("body").on("tap", "#cancel", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
            });
            //确认投注
            mui("body").on("tap", "#confirmOrder", function () {
                var betForm = _this.getBetOrder();
                _this.confirmOrder(betForm);
            });
        },

        /**
         * 确定下注
         */
        confirmOrder: function (betForm) {
            var _this = this;
            var type = $("input[name=type]").val();
            var code = $("input[name=code]").val();
            if (typeof betForm != 'object') {
                return;
            }
            var ajaxData = {
                code: code,
                quantity: betForm.quantity,
                totalMoney: betForm.totalMoney,
                betOrders: []
            };
            $.each(betForm.betOrders, function (index, value) {
                ajaxData.betOrders.push({
                    expect: value.expect,
                    code: value.code,
                    betCode: value.betCode,
                    playCode: value.playCode,
                    betNum: value.betNum,
                    odd: value.odd,
                    betAmount: value.betAmount,
                    memo: ""
                });
            });

            mui.ajax(root + '/' + type + '/' + code + '/saveBetOrder.html', {
                data: {betForm: JSON.stringify(ajaxData)},
                dataType: 'json',
                type: 'POST',
                beforeSend: function () {
                    _this.closeConfirmOrder();
                    _this.showLoading();
                },
                success: function (data) {
                    var d = data.code[0];
                    //code代码为100表示成功
                    if (d && d.code && d.code == '100') {
                        _this.toast(d.msg);
                        sessionStorage.removeItem("betForm");
                        $("div.bet-table-list .mui-active").removeClass("mui-active");
                        $(".balance").text(data.balance);
                        _this.resetBet();
                    } else {
                        _this.toast(d.msg + '[' + d.code + ']');
                    }
                },
                complete: function () {
                    _this.hideLoading();
                },error:function(xhr,type,errorThrown){
                    _this.toast('下注失败：请求异常');
                }
            })
        },
        /**
         * 关闭下注清单
         */
        closeConfirmOrder: function () {
            $("#dingdan").html('');
            $("#dingdan").removeClass('mui-active');
        },
        //点击投注选项
        bindTdInput: function (obj) {
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
            }
            $("#quantity").text($("div.bet-table-list .mui-active").length);
        },
        /**
         * 投注
         */
        betOrder: function () {
            if (!this.checkBetOrder()) {
                return;
            }
            var betForm = this.getBetOrder();
            if (typeof betForm != 'object') {
                return;
            }
            if (betForm.betOrders.length == 0) {
                this.toast("请选择");
                return;
            }
            sessionStorage.betForm = JSON.stringify(betForm);
            this.placeOrder(betForm);
            $("#dingdan").addClass('mui-active');
        },

        /**
         * 验证是否符合下注条件
         * @returns {boolean}
         */
        checkBetOrder: function () {
            var betAmount = $("input#inputMoney").val();
            var g = /^[1-9]*[1-9][0-9]*$/;
            if(!g.test(betAmount)){
                this.toast("请输入正整数投注金额");
                return false;
            }
            return true;
        },
        /**
         * 下注清单
         * @param betForm
         */
        placeOrder: function (betForm) {
            var content = Template('template_order', {data: betForm});
            $("#dingdan").html(content);
        },

        getBetOrder: function () {
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 0,
                totalMoney: 0
            };
            $("div.bet-table-list .mui-active").each(function () {
                betForm.betOrders.push({
                    code: code,
                    expect: expect,
                    betAmount: betAmount,
                    betCode: $(this).attr('data-bet-code'),
                    playCode: $(this).attr('data-play'),
                    betNum: $(this).attr('data-bet-num'),
                    odd: $(this).attr("data-odds"),
                    memo: $(this).attr("data-name")
                });
                betForm.totalMoney = betForm.totalMoney + betAmount;
                betForm.quantity = betForm.quantity + 1;
            });
            return betForm;
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
                this.resetBet();
            }
        },
        /**
         * 重置下注选项
         */
        resetBet: function () {
            $("div.bet-table-list td").removeClass("mui-active");
            $("div.bet-table-list li a").removeClass("mui-active");
            $("#quantity").text($("div.bet-table-list td.mui-active").length);
            $("input#inputMoney").val("");
            $("input#inputMoney").blur();
        }

    });
});