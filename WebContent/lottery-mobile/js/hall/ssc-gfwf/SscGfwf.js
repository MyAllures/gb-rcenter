define(['site/hall/ssc/AllSsc', 'site/plugin/template','RangeSlider'], function (PlayWay, Template) {

    return PlayWay.extend({
        gfwfPlJson : null,
        _this: null,
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            this.bindEvent();
            this.getGfwfAllOdd();
        },

        getOdds: function () {
            /*$(".s-menu a").removeClass("mui-active");*/
            var url = root + '/' + this.type + '/' + this.code + '/getGfwfOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".s-menu a").each(function () {
                        var dwd = data.ssc_yixing_dwd.定位胆;
                        $("a[data-code='ssc_yixing_dwd']").attr("data-odd", dwd.oddLimit).attr("data-num",dwd.rebateLimit).attr("data-play_pl_id",dwd.id);

                    });
                }
            })
        },

        bindEvent: function () {
            mui("#betCodeDiv").on('tap', 'a', function () {
                $("#betCodeDiv a").removeClass("mui-active");
                $(this).addClass("mui-active");
                _this.getOdds();
            });
            //清除下注按钮点击事件
            mui("body").on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });
        },
        //点击投注选项
        bindTdInput: function (thiz) {
            var flag = $(thiz).is('.not-selected');
            if (!flag) {
                $(thiz).toggleClass('mui-active');
            }
            var toua = Number($("#bettouli div a.mui-active").length);
            var zhonga = Number($("#betzhongli div a.mui-active").length);
            var weia = Number($("#betweili div a.mui-active").length);
            if (toua > 0 && weia > 0 && zhonga > 0) {
                $("#quantity").text(toua * weia * zhonga);
            } else {
                $("#quantity").text(0);
            }
        },

        getGfwfAllOdd: function () {
            var _this = this;
            var url = root + '/ssc/getGfwfAllOdd.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {code: _this.code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        _this.gfwfPlJson = data;
                        console.log(data)
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        },

        showBetTemplate:function() {
            var _this = this;
            var contentFun = _this.getPlayPlFun_content();    // 内容算法
            var zhushuFun = _this.getPlayPlFun_zhushu();  // 注数算法
            var type = $("input[name=type]").val();
            var code = $("input[name=code]").val();

            if (typeof contentFun == 'undefined' || typeof zhushuFun == 'undefined') {
                return;
            }

            var data = eval("_this."+contentFun + "()");
            var zhushu = eval("_this."+zhushuFun + "()");

            if(data == -1){
                return;
            }

            if (typeof data == 'undefined' || typeof zhushu == 'undefined' || zhushu <= 0) {
                Tools.toast("号码选择不完整，请重新选择");
                return;
            }

            var plAndMaxFd = _this.getPlAndMaxFd();   // 获取当前选中的玩法赔率和返点
            var pljs = this.getPljs();   // 当前基数
            var maxPlayPl;  // 最高赔率
            var maxFandian;  // 最大返点
            var minPl;  // 最低赔率
            var convertBlMoney;  // 每1%转换赔率

            var plSelName = '',  //赔率名称
                plSelIndex = 0;  //获取赔率索引

            if ($.inArray(parseInt(_this.getPlayId()), [515, 534, 936, 914, 639, 625, 1013, 991, 730, 708, 859, 837]) >= 0) {
                var l = $('.tshStr .wan_bottom .cus-flex-item span.active_gfwf').length;
                if (l == 1) {
                    $('.tshStr .wan_bottom .cus-flex-item').each(function () {
                        plSelName = $(this).parent().find(' span.active_gfwf').html();
                    });
                    if (plSelName == '豹子') {
                        plSelIndex = 0;
                    } else if (plSelName == '顺子') {
                        plSelIndex = 1;
                    } else if (plSelName == '对子') {
                        plSelIndex = 2;
                    }
                }
            }

            if (plAndMaxFd instanceof Array) {  // 多赔率
                maxPlayPl = plAndMaxFd[0].oddLimit;  // 最高赔率
                maxFandian = plAndMaxFd[0].rebateLimit*100;    // 最大返点
                var pljsarr = pljs.split('|');
                minPl = (plAndMaxFd[0].oddLimit-Number(pljsarr[0])*plAndMaxFd[0].rebateLimit).toFixed(3);   // 最低赔率
            } else {
                maxPlayPl = plAndMaxFd.oddLimit;  // 最高赔率
                maxFandian = plAndMaxFd.rebateLimit*100;    // 最大返点
                minPl = (plAndMaxFd.oddLimit-Number(pljs)*plAndMaxFd.rebateLimit).toFixed(3);   // 最低赔率
            }
            convertBlMoney = (maxPlayPl - minPl) / maxFandian;  // 每1%转换赔率

            // 投注内容
            tmpBetContent = data;

            var firstShowPl = maxPlayPl.toFixed(3);
            // 渲染界面中赔率部分
            if (plAndMaxFd instanceof Array) {  // 多赔率
                var strArr = [];
                $.each(plAndMaxFd, function(index, value) {
                    strArr.push(value.playPl.toFixed(3));
                });
                firstShowPl = strArr.join('|');
            }
            //弹出订单
            var content = Template('gfwf_template_order', {"quantity": Number($("#quantity").text()),"firstShowPl":firstShowPl,"totalMoney":2});
            $("#dingdan").html(content);
            $("#dingdan").addClass('mui-active');

            // 滑块事件绑定
            $("#block-range").RangeSlider({
                min: 0,
                max: maxFandian,
                step: 0.1,
                // leftColor: '#fa6200',
                onChange: function(obj) {
                    // 返点比例
                    var fandianBili = parseFloat($(obj).val()).toFixed(1); // 当前滚动条移动的比例
                    $("#betContent_fanli").attr("data-value", fandianBili);
                    $("#betContent_fanli").html(fandianBili + "%");    // 渲染界面中百分比部分

                    // 赔率 = 最大配率 - 返点比例 * 转换比例
                    var pl = (maxPlayPl - fandianBili * convertBlMoney).toFixed(3);
                    $("#betContent_playPl").attr("data-value", pl);

                    // 渲染界面中赔率部分
                    if (plAndMaxFd instanceof Array) {  // 多赔率
                        var strArr = [];
                        $.each(plAndMaxFd, function (index, value) {
                            var valTemp = value.rebateLimit;
                            var zxodd= value.oddLimit-Number(pljsarr[index])*(valTemp == 0 ? 1 : valTemp);
                            var tmpConvertBlMoney = (value.oddLimit - zxodd) /((valTemp == 0 ? 1 : valTemp)*100);
                            strArr.push((value.oddLimit - fandianBili * tmpConvertBlMoney).toFixed(3));
                        });
                        $("#betContent_playPl").html(strArr.join('|'));
                    } else {
                        $("#betContent_playPl").html(pl);
                    }
                    // 渲染下注总额，奖金等等
                    renderZhushu();
                }
            });

            // 取消事件绑定
            $("#no-btn").click(function() {
                layer.closeAll();
            });

            // 确认事件绑定
            mui("body").on('tap','#queding',function(){
                // 注单
                var betForm = {
                     totalMoney: parseFloat($("#betContent_totalMoney").text()),
                     quantity: Number($("#betContent_zhushu").text()),
                     playModel:1,//1代表官方玩法
                     betOrders: []
                 };
                 betForm.betOrders.push({
                     code: _this.code,//彩种
                     expect: $('font#expect').text(),//期号
                     playCode: $("a.selected-btn.mui-active").attr("data-code"),//彩种玩法
                     betCode:  $("a.selected-btn.mui-active").attr("data-play_id"),//投注玩法
                     betCount: Number($("#quantity").text()),//注数
                     betAmount: 2,//单注金额,   目前只支持2元一注，先写死。
                     betNum: _this.content_dwd(),//下注号码
                     odd: $("#betContent_playPl").text(),//奖金
                     multiple: $("#betContent_inputBeishu").val(),//倍数
                     bonusModel: $("span.mode_select.selected").attr("data-value"),//元角分模式
                     rebate: $("#betContent_fanli").attr("data-value")//返点比例
                 });

                mui.ajax(root + '/' + type + '/' + code + '/saveBetOrder.html', {
                    data: {betForm: JSON.stringify(betForm)},
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
                    }
                })

            });

            // 单注金额变化
            $("#betContent_inputMoney").keyup(function() {
                // 渲染下注总额，奖金等等
                renderZhushu();
            });

            // 倍数变化
            $("#betContent_inputBeishu").keyup(function() {
                // 渲染下注总额，奖金等等
                renderZhushu();
            });

            // 渲染下注总额，奖金等等
            function renderZhushu() {
                var money = $("#betContent_inputMoney").val();
                var beishu = $("#betContent_inputBeishu").val();
                var zhushu = parseInt($("#betContent_zhushu").html());
                var playPl = parseFloat($("#betContent_playPl").attr("data-value"));
                var mode = parseInt($(".mode_select.selected").attr("data-value"));
                var tmpMode = 1;
                if (mode == 1) {
                    tmpMode = 1;
                } else if (mode == 2) {
                    tmpMode = 0.1;
                } else if (mode == 3) {
                    tmpMode = 0.01;
                } else {
                    return;
                }

                var totalMoney = parseFloat((money * zhushu * beishu * tmpMode).toFixed(3));  // 总金额
                var canWin = parseFloat(money * beishu * playPl * tmpMode);  // 可获奖金

                $("#betContent_totalMoney").html(totalMoney.toFixed(3));
                $("#betContent_canWin").html(canWin.toFixed(3));
            }

            $("#ischange").change(function() {
                alert("checked");
            });

            // 模式选择
            $(".mode_select").click(function() {
                $(".mode_select.selected").removeClass("selected");
                $(this).addClass("selected");
                // 渲染下注总额，奖金等等
                renderZhushu();
            });

            // 加号
            $(".dzje_add").click(function() {
                $("#betContent_inputMoney").val(parseInt($("#betContent_inputMoney").val()) + 1);

                // 渲染下注总额，奖金等等
                renderZhushu();
            });

            $(".beishu_add").click(function() {
                $("#betContent_inputBeishu").val(parseInt($("#betContent_inputBeishu").val()) + 1);
                // 渲染下注总额，奖金等等
                renderZhushu();
            });

            $(".beishu_remove").click(function() {
                var num = parseInt($("#betContent_inputBeishu").val()) - 1;
                if(num <= 0){
                    return;
                }
                $("#betContent_inputBeishu").val(parseInt($("#betContent_inputBeishu").val()) - 1);
                // 渲染下注总额，奖金等等
                renderZhushu();
            });

            //取消下注
            mui("body").on("tap", "#quxiao", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
            });
        },






        /**
         * 获取当前赔率内容算法
         */
        getPlayPlFun_content:function() {
            return $("a.selected-btn.mui-active").attr("data-fun_content");
        },
        /**
         * 获取当前赔率注数算法
         */
        getPlayPlFun_zhushu:function() {
            return $("a.selected-btn.mui-active").attr("data-fun_zhushu");
        },
        /**
         * 获取当前玩法ID
         */
        getPlayId:function () {
            return $("a.selected-btn.mui-active").attr("data-play_id");
        },


        /**
         * 获取当前赔率ID
         */
        getPlayPlId: function() {
            return $("a.selected-btn.mui-active").attr("data-play_pl_id");
        },

        /**
         * 获取当前期数
         */
        getNumber:function() {
            return $("#number").attr("data-number");
        },

        //获取赔率基数,用于计算滑条最低奖金
        getPljs:function(){
            return $("a.selected-btn.mui-active").attr("data-pljs");
        },

        /**
         * 获取当前赔率ID2
         */
        getPlayPlId2 : function() {
            var arrTemp = null;
            var indexStr = ($("a.selected-btn.mui-active").attr("data-play_pl_id")).toString();
            if(indexStr.indexOf("|") > 0){
                arrTemp = indexStr;
            }else {
                arrTemp = $("a.selected-btn.mui-active").attr("data-play_pl_id");
            }
            return arrTemp;
        },

        /**
         * 获取赔率和最高返点
         */
        getPlAndMaxFd:function() {
            var _this = this;
            // 全局赔率变量
            var playPlId = this.getPlayPlId();   // 当前赔率ID
            var betCode = this.getPlayId();   // 当前投注玩法

            if (playPlId.toString().indexOf('|') > 0) {    // 多赔率
                var result = [];
                var tmpArr = playPlId.split('|');
                $.each(tmpArr, function (index, values) {
                    for (var i = 0; i < _this.gfwfPlJson.length; ++i) {
                        var o = _this.gfwfPlJson[i];
                        $.each(o, function (index, value) {
                            if (value.betNum == values && value.betCode == betCode) {
                                result.push(value);
                            }
                        });
                    }
                });
                return result;
            } else {    // 单一赔率
                var obj = null;
                for (var i = 0; i < this.gfwfPlJson.length; ++i) {
                    var o = this.gfwfPlJson[i];
                    $.each(o, function (index, value) {
                        if (value.betNum == playPlId && value.betCode == betCode) {
                            obj = value;
                        }
                    });
                }
                return obj;
            }
            return;
        },


        // 渲染下注总额，奖金等等
         renderZhushu : function() {
            var money = $("#betContent_inputMoney").val();
            var beishu = $("#betContent_inputBeishu").val();
            var zhushu = parseInt($("#betContent_zhushu").html());
            var playPl = parseFloat($("#betContent_playPl").attr("data-value"));
            var mode = parseInt($(".mode_select.selected").attr("data-value"));
            var tmpMode = 1;
            if (mode == 1) {
                tmpMode = 1;
            } else if (mode == 2) {
                tmpMode = 0.1;
            } else if (mode == 3) {
                tmpMode = 0.01;
            } else {
                return;
            }

            var totalMoney = parseFloat((money * zhushu * beishu * tmpMode).toFixed(3));  // 总金额
            var canWin = parseFloat(money * beishu * playPl * tmpMode);  // 可获奖金

            $("#betContent_totalMoney").html(totalMoney.toFixed(3));
            $("#betContent_canWin").html(canWin.toFixed(3));
        },


        /**************定位胆***************/
        /**
         * 注数-定位胆 / 时时彩与11选5共用注数方法
         */
        zhushu_dwd :function(){
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];
            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                qianArr.push($.trim($(this).html()));
            });
            $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function () {
                geArr.push($.trim($(this).html()));
            });
            var wanLength = wanArr.length;
            var qianLength = qianArr.length;
            var baiLength = baiArr.length;
            var shiLength = shiArr.length;
            var geLength = geArr.length;

            if (wanLength <= 0 && qianLength <= 0 && baiLength <= 0 && shiLength <= 0 && geLength <= 0) {
                return 0;
            }

            if (wanLength > 0) {
                newArr = newArr.concat(wanArr);
            }
            if (qianLength > 0) {
                newArr = newArr.concat(qianArr);
            }
            if (baiLength > 0) {
                newArr = newArr.concat(baiArr);
            }
            if (shiLength > 0) {
                newArr = newArr.concat(shiArr);
            }
            if (geLength > 0) {
                newArr = newArr.concat(geArr);
            }
            return newArr.length;
        },

        /**
         * 定位胆
         */
        content_dwd : function(){
            var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
            $.each($("ul.wangweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                wanArr.push($.trim($(this).html()));
            });
            $.each($("ul.qianweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                qianArr.push($.trim($(this).html()));
            });
              $.each($("ul.baiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                baiArr.push($.trim($(this).html()));
            });
            $.each($("ul.shiweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                shiArr.push($.trim($(this).html()));
            });
            $.each($("ul.geweisStr .screen-munber .newball-item-20 a.n-btn.mui-active"), function (index, value) {
                geArr.push($.trim($(this).html()));
            });

            var wanStr = wanArr.length > 0 ? wanArr.join(",") : "";
            var qianStr = qianArr.length > 0 ? qianArr.join(",") : "";
            var baiStr = baiArr.length > 0 ? baiArr.join(",") : "";
            var shiStr = shiArr.length > 0 ? shiArr.join(",") : "";
            var geStr = geArr.length > 0 ? geArr.join(",") : "";

            return $.trim(
                (wanStr == ' ' ? ' ' : wanStr ) + "|" +
                (qianStr == ' ' ? ' ' : qianStr) + "|" +
                (baiStr == ' ' ? ' ' : baiStr) + "|" +
                (shiStr == ' ' ? ' ' : shiStr) + "|" +
                (geStr == ' ' ? ' ' : geStr)
            );
        }


    });
});