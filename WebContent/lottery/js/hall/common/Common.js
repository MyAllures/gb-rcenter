define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        //大彩种
        type: null,
        //小彩种
        code: null,
        //基本路径
        baseUrl: null,
        //最后要开奖的期数
        curExpect: null,
        //判断盘口是否在查询
        isRunning: false,
        //上一次获取盘口时间
        successTime: null,
        //标志是否已弹窗
        layerId: null,
        //标志弹窗
        T: null,
        //是否正在开奖中
        isOpened: null,
        //是否加载声音播放器
        isLoadSwf: null,
        init: function () {
            //用于定义js版本号 在进入玩法获取不到js版本号
            window.top.rcVersion = rcVersion;
            this.type = $('[name=type]').val();
            this.code = $('[name=code]').val();
            this.baseUrl = root + '/' + this.type;
            this.bindButtonEvents();
            this.onPageLoad();
        },
        /**
         * 页面加载事件
         */
        onPageLoad: function () {
            var _this = this;
            this.getHandicap();
            setInterval(function () {
                _this.loadLeftTime();
            }, 1000);
            // 开奖记录切换
            tabs_cg(".game_name .box2_stage p span i", ".game_name .box2_stage .number", "click", "acti", "", "", 0);
            // 最近开奖记录
            this.getOpenHistory();
            this.getMyOrders();
            var navIndex = getQueryString("navIndex");    // 自定义导航子页面
            // 默认第一个玩法
            if (!navIndex || isNaN(navIndex)) {
                navIndex = 0;
            }
            $(".Playmethod ul li p span a").eq(navIndex).click();
            this.hideLoading();
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            //切换玩法
            $(".Playmethod ul li p span a").click(function () {
                var name_flag = $(this).parent().parent().data('name');
                if (name_flag == 'gfwf') {
                    var flag_acti = $(this).parent().parent().parent().next().find('b').hasClass('acti');
                    if (flag_acti == true) {
                        $(this).parent().parent().parent().next().find('b').removeClass('acti');
                    }
                    $(this).parent().parent().parent().find('b').addClass('acti');
                    $(".left_it0").show();
                    $(".right_it1").show();
                    $(".Detailedlist").show();

                } else {
                    var flag_acti = $(this).parent().parent().parent().prev().find("b").hasClass('acti');
                    if (flag_acti == true) {
                        $(this).parent().parent().parent().prev().find("b").removeClass('acti');
                    }
                    $(this).parent().parent().parent().find('b').addClass('acti');
                    $(".left_it0").hide();
                    $(".right_it1").hide();
                    $(".Detailedlist").hide();
                }
                $(".Playmethod ul li p span.acti").removeClass("acti");
                $(this).parent().addClass("acti");
                _this.getSubPage($(this).data("url"));
            });
            //切换我的投注、开奖号码
            $("#bottomInfo .tabs li[data-tab]").click(function () {
                $("#bottomInfo .tabs ul li.acti").removeClass("acti");
                $(this).addClass("acti");
                $("#bottomInfo .list_wrap").hide();

                var obj = $("#bottomInfo .list_wrap").eq($(this).index());
                $(obj).show();

                var tab = $(this).data("tab");
                if (tab == 'myBet') {
                    _this.getMyOrders();
                } else if (tab == 'myPrize') {
                    _this.getMyPrize(obj);
                }
            });
            $("#bottomInfo").on("click", "a[data-url]", function () {
                parent.index.getPage($(this).attr("data-url"));
            });
            $("body").on("click", "#confirmClear", function () {
                _this.closeClearPopup(true);
            });
            $("body").on("click", "#cancelClear", function () {
                _this.closeClearPopup(false);
            })
        },
        /**
         * 获取盘口信息
         * @param callback
         */
        getHandicap: function (callback) {
            if (this.isRunning) return;
            var _this = this;
            ajaxRequest({
                url: root + '/commonLottery/getExpect.html',
                data: {'code': this.code},
                beforeSend: function () {
                    this.isRunning = true;
                },
                success: function (data) {
                    if (data) {
                        var expect = $("i.expect").text();
                        $('i.expect').text(data.expect);
                        if (data.opening) {
                            $("div#leftTime").attr("data-time", data.leftTime);
                            $("p#tip").data("opening", data.opening);
                        }
                        if (expect && expect == data.expect) { //重新获取盘口数据以防因为封盘时间比实际早，导致通过接口查询的期数值不对，要加１
                            $('i.expect').text(Number(expect) + 1);
                        }
                        if (typeof callback == 'function') {
                            callback();
                        }
                    }
                },
                complete: function () {
                    this.isRunning = false;
                }
            });
        },
        /**
         * 加载计算倒计时
         */
        loadLeftTime: function () {
            var _this = this;
            var $left = $("div#leftTime");
            var time = $left.attr("data-time");
            if (isNaN(time) || time < 0) {
                // 5秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
                if (this.successTime != null && (new Date()).getTime() - this.successTime < 5 * 1000) {
                    return;
                }
                if (time == -1) {
                    //赋值，用来判断是否开奖中
                    this.curExpect = $("#expect").text();
                    this.showClearPopup();
                }
                this.getHandicap(function () {
                    _this.successTime = (new Date()).getTime();
                    _this.getOpenHistory();
                });
                $left.attr("data-time", --time);
                return;
            }
            this.showLeftTime(time);
        },
        /**
         * 显示倒计时
         */
        showLeftTime: function (time) {
            var tmpTime = time;
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
            $("div#leftTime").attr("data-time", --time).html(content);

            if (hour == 0 && minute == 0 && second <= 10 && second > 0) {
                var file = $("#selectCount").find("option:selected").attr("data-file");
                this.play(file);
            }
        },
        /**
         * 显示清零弹窗
         */
        showClearPopup: function () {
            if (this.layerId != null) {
                return;
            }
            var clearBet_template = '\
        <div class="clearBet_template">\
            <div class="l">\
                <span>\
                <i></i>\
                </span>\
            </div>\
            <div class="r">\
                <p>' + this.curExpect + '期已结束，是否要清空已投注内容？</p>\
                <p>要清空已投注内容请单击"确定",不刷新页面请点击"取消"</p>\
            </div>\
            <div style="clear:both"></div>\
            <div class="btns" style="text-align:center">\
                <button type="button" id="confirmClear">确定</button>\
                <button type="button" id="cancelClear">取消<font class="time"></font></button>\
            </div>\
        </div>\
        ';

            layer.closeAll();
            //页面层
            this.layerId = layer.open({
                type: 1,
                time: 15000,
                title: '温馨提示',
                skin: 'layui-layer-popup layui-layer-rim', //加上边框
                area: ['480px', '240px'], //宽高
                content: clearBet_template
            });

            var time = 5;
            var _this = this;
            if (!this.T) {
                this.T = setInterval(function () {
                    if (time == 0) {
                        _this.closeClearPopup();
                        return;
                    }
                    $(".clearBet_template .time").html('(' + time + ')');
                    --time;
                }, 1000);
            }
        },
        /**
         * 关闭弹窗
         */
        closeClearPopup: function (isReset) {
            if (this.T) {
                clearInterval(this.T);
                this.T = null;
            }
            if (this.layerId) {
                layer.close(this.layerId);
                this.layerId = null;
            }

            if (typeof isReset != 'undefined') {
                if (isReset && typeof this.reset == 'function') {
                    this.reset();
                }
            }
        },
        /**
         * 重置投注
         */
        reset: function () {
            $(".main-left .table-common input").each(function (index, value) {
                if ($(this).attr("type") == "checkbox") {
                    $(this).prop("checked", false);
                } else if ($(this).attr("type") == "text") {
                    $(this).val('');
                }
            });
            $(".bg-yellow").removeClass("bg-yellow");
            $(".main-left .fl input").each(function () {
                if ($(this).attr("type") != 'submit') {
                    $(this).val('');
                }
            });
        },
        /**
         * 获取开奖记录
         */
        getOpenHistory: function () {
            var _this = this;
            ajaxRequest({
                url: root + "/commonLottery/getRecent5Records.html",
                data: {code: this.code},
                success: function (data) {
                    if (data.length > 0) {
                        var open = data[0];
                        var numArr = open.openCode ? open.openCode.split(",") : [];
                        if (!open.openCode) { //开奖中
                            var expect = open.expect;
                            $("#lastNumber").html('第' + expect + '期<var>开奖中</var>');
                            var nb;
                            switch (open.type) {
                                case "ssc":
                                    nb = 5;
                                    break;
                                case "lhc":
                                    nb = 7;
                                    break;
                                case "pk10":
                                    nb = 10;
                                    break;
                                case "k3":
                                    nb = 3;
                                    break;
                                case "pl3":
                                    nb = 3;
                                    break;
                                case "keno":
                                    nb = 20;
                                    break;
                                case "sfc":
                                    nb = 8;
                                    break;
                                case "xy28":
                                    nb = 3;
                                    break;
                                default:
                            }
                            if (!_this.isOpened) {
                                _this.isOpened = setInterval(function () {
                                    _this.randomNumber(nb);
                                }, 100);
                            }
                            // 循环读取开奖数据，15秒
                            setTimeout(function () {
                                _this.getOpenHistory();
                            }, 15000);

                        } else {
                            if (_this.isOpened != null) {
                                clearInterval(_this.isOpened);
                                _this.isOpened = null;
                            }
                            $("#lastNumber").html($(".box1_name h2").html() + '第<var>' + open.expect + '</var>期');
                            //渲染最后一期
                            _this.renderLastOpenCode(numArr);
                            //两面长龙、统计数据
                            if ($(".main-right").length > 0) {
                                _this.refreshView();
                            }
                        }
                    }
                    //渲染近5期历史记录
                    _this.renderRecent5OpenCode(data);
                    //今日开奖号码（实际上是指最新5期）
                    _this.getTodayOpen(data);
                }
            })
        },
        /**
         * 渲染近5期历史记录
         */
        renderRecent5OpenCode: function (data) {
            var openList = '';
            var _this = this;
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var arr = new Array;
                for (var i = 0; i < numArr.length; i++) {
                    var data = {};
                    data.num = numArr[i];
                    data.colour = _this.numColour(data.num);
                    arr.push(data);
                }
                openList += Template('template_openDataHistory', {number: value.expect, list: arr});
            });
            $("#lastOpenCodeList ul").html(openList);
        },
        // 随机号码
        randomNumber: function (len) {
            var tmpStr = '';
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10);
                if (len > 5) {
                    num += 1;
                    if (num < 10) {
                        num = "0" + num;
                    }
                }
                tmpStr += '<span>' + num + '</span>';
            }
            $("#lastOpenCode").html(tmpStr);
        },

        /**
         * 渲染最近一期开奖号
         */
        renderLastOpenCode: function (openCodeArr) {
            var arr = new Array;
            for (var i = 0; i < openCodeArr.length; i++) {
                var data = {};
                data.num = openCodeArr[i];
                data.colour = this.numColour(data.num);
                arr.push(data);
            }
            var tmpStr = Template('template_recent1History', {list: arr});
            $("#lastOpenCode").html(tmpStr);
        },
        /**
         * 渲染双面长龙排行等 有需要的彩种请重写这个方法
         */
        refreshView: function () {

        },
        /**
         * 获取球颜色
         * @returns {string}
         */
        numColour: function (xvalue) {
            var value = parseInt(xvalue);
            var num = getBose(value);
            var numStr = '';
            if (num == 0) {
                numStr = 'ball-red';
            } else if (num == 1) {
                numStr = 'ball-blue';
            } else {
                numStr = 'ball-green';
            }
            return numStr;
        },
        /**
         * 获取子页
         * @param url
         */
        getSubPage: function (url) {
            var _this = this;
            ajaxRequest({
                url: _this.baseUrl + "/" + url.split("-").join("/") + ".html",
                type: 'GET',
                dataType: 'html',
                beforeSend: function () {
                    $("#subContent").html('<img src="' + resRoot + '/themes/default/img/base_loading.gif" style="display: block;margin: auto;margin: 50px auto;">');
                },
                success: function (html) {
                    // 读取HTML页内容
                    $("#subContent").html(html);
                    //原来这里有初始化内容js统一放在PlayWay.js里
                }
            });
        },
        /**
         * 播放提示音
         */
        play: function (file) {
            if (!this.isLoadSwf) {
                var sounds = {};
                var params = {wmode: "transparent"};
                var attributes = {};
                swfobject.embedSWF(resRoot + "/js/plugin/swfobject/sound.swf", "soundContainer", "1", "1", "9.0.0", resRoot + "/js/plugin/swfobject/expressInstall.swf", sounds, params, attributes);
                this.isLoadSwf = true;
            }
            var sound = swfobject.getObjectById('soundContainer');
            if (sound) {
                sound.SetVariable("f", file);
                sound.GotoFrame(1);
            }
        },
        /** 获取我的投注记录 */
        getMyOrders: function () {
            var container = $('div.myBet');
           /* var isLogin = sessionStorage.getItem("is_login");
            if(isLogin && isLogin == 'false') {
                $(container).html('<li class="init-tip">您还未登录，请先登录</li>');
                return;
            }*/
            ajaxRequest({
                url: root + '/bet/getMyOrders.html',
                beforeSend: function () {
                    $(container).html('<li class="init-tip"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
                },
                success: function (data) {
                    if (data.length == 0) {
                        $(container).html('<li class="init-tip">暂无投注</li>');
                        return;
                    }
                    var html = Template('template_myBetTemplate', {list: data});
                    $(container).html(html);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var state = XMLHttpRequest.getResponseHeader("headerStatus") || XMLHttpRequest.status;
                    if (state == 600) {//Session过期
                        $(container).html('<li class="init-tip">您还未登录，请先登录</li>')
                    }
                }
            });
        },
        /** 我的中奖记录 */
        getMyPrize: function () {
            var container = $(".myPrize");
           /* var isLogin = sessionStorage.getItem("is_login");
            if(isLogin && isLogin == 'false') {
                $(container).html('<li class="init-tip">您还未登录，请先登录</li>');
                return;
            }*/
            ajaxRequest({
                url: root + '/bet/getMyReward.html',
                beforeSend: function () {
                    $(container).html('<li class="init-tip"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
                },
                success: function (data) {
                    if (data.length == 0) {
                        $(container).html('<li class="init-tip">暂无投注</li>');
                        return;
                    }
                    var html = Template('template_myPrizeTemplate', {list: data});
                    $(container).html(html);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var state = XMLHttpRequest.getResponseHeader("headerStatus") || XMLHttpRequest.status;
                    if (state == 600) {//Session过期
                        $(container).html('<li class="init-tip">您还未登录，请先登录</li>')
                    }
                }
            });
        },
        /** 今日中奖号码 */
        getTodayOpen: function (data) {
            var openList = Template('template_todayOpenTemplate', {list: data});
            $(".todayOpen").html(openList);
        }
    });
});