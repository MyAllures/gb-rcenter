define(['site/plugin/template','range','css!themesCss/jquery.range.css','css!themesCss/gfwf.css'], function (Template) {
    return Class.extend({
        //大彩种
        type: null,
        //小彩种
        code: null,
        //基本路径
        baseUrl: null,
        layerInfo : null,
        layerTishi1 : null,
        layerTishi2 : null,
        layerInfoInsert : null,
        playGroupId : 1,
        gfwfPlJson : null,
        tmpBetContent : null,
        alertContext:null,
        init: function () {
            this.type = $('[name=type]').val();
            this.code = $('[name=code]').val();
            this.baseUrl = root + '/' + this.type;
            this.bindButtonEvents();
            this.onPageLoad();
            this.setShortcutkeyButton();
            this.getGfwfAllOdd();
            this.getStringFormat();
        },
        onPageLoad: function () {
            //移除加载中效果
            $("div.loader").remove();
        },
        bindButtonEvents: function () {
            var _this = this;
            // 点击投注选项
            this.bindTdInput();
            //下注
            $("#subContent .btns button[type='submit']").click(function () {
                _this.placeOrder();
            });
            // 重置按钮
            $("#subContent .btns .btn-2").click(function () {
                _this.clearTdInput();
            });
            // 只能输入整数
            $('#subContent input').keyup(function () {
                // 首位不为0
                this.value = this.value.replace(/^0/g, "").replace(/[^0-9]/g, "");
            });
            //官方玩法。
            _this.clickGfwf();
        },
        //如果有特殊玩法除了重置页面input之外的其他操作,请继承该js,重写该方法
        clearTdInput : function(){
            page.reset();
        },
        //点击投注选项
        bindTdInput : function(){
            var _this = this;
            $(".main-left .table-common tbody tr td").click(function () {
                if($(this).hasClass("new-ball-st")){
                    return;
                }
                if ($(".main-left .fl input").length == 0) {
                    return;
                }
                if ($(this).find("input").length > 0) {
                    return;
                }
                var betNum = $(this).attr("data-num");
                var val = $(".main-left .fl input").val();
                if (typeof val == 'undefined' || !val) {
                    if($(this).hasClass("bg-yellow")){
                        _this.removeYellow(betNum);
                    }
                    return;
                }
                if ($(this).hasClass("bg-yellow")) {
                    _this.removeYellow(betNum);
                } else {
                    _this.addYellow(betNum);
                }
            });
            $(".main-left .table-common tbody tr td.new-ball-st").click(function () {
                if ($(this).hasClass("bg-yellow")) {
                    $(this).removeClass("bg-yellow");
                } else {
                    if(_this.xianZhiLHCZhuShu()){
                        $(this).addClass("bg-yellow");
                    }
                }
            });
        },
        //六合彩连码.全不中限制注数;
        xianZhiLHCZhuShu: function () {
          return true;
        },

        /** 下注 */
        placeOrder: function () {
            var _this = this;
            var betForm = this.getBetOrder();
            if (typeof betForm != 'object') {
                return;
            }
            if (betForm.betOrders.length == 0) {
                layer.msg("请选择");
                return;
            }

            var content = '<p class="place-tip">共计：￥<b> ' + betForm.totalMoney + ' </b>/<b> ' + betForm.quantity + ' </b>&nbsp;注，您确定要下注吗？</p>';
            $.each(betForm.betOrders, function (index, value) {
                content += '<p><span>[&nbsp;' + value.memo + '&nbsp;]</span><span>&nbsp;@' + value.odd + '&nbsp;X&nbsp;' + value.betAmount + '</span></p>';
            });

            // 询问框
            layer.confirm(content, {
                btn: ['确认', '取消'], //按钮
                title: "<font color='red'>" + $('i#expect').text() + "期</font>下注清单"
            }, function () {
                _this.confirmOrder(betForm);
            });

            $(".layui-layer-title").addClass('place-title');
            $(".layui-layer-close").addClass('place-close');
        },
        /** 获取注单 */
        getBetOrder: function () {
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            $(".main-left .table-common input").each(function () {
                var betAmount = $(this).val();
                if (typeof betAmount != 'undefined' && betAmount != '') {
                    //改为attr取值，防止值变动，这里的$(this).data值不变
                    betForm.betOrders.push({
                        expect: $('i#expect').text(),
                        code: _this.code,
                        betCode: $(this).attr('data-bet-code'),
                        playCode: $(this).attr('data-play'),
                        betNum: $(this).attr('data-bet-num'),
                        odd: $(this).attr("data-odds"),
                        betAmount: betAmount,
                        memo: $(this).attr("data-name")
                    });
                    betForm.totalMoney = add(betForm.totalMoney, betAmount);
                    betForm.quantity = add(betForm.quantity, 1);
                }
            });
            return betForm;
        },
        /** 确认下注 */
        confirmOrder: function (betForm) {
            if (typeof betForm != 'object') {
                return;
            }
            var data = {
                code: this.code,
                quantity: betForm.quantity,
                totalMoney: betForm.totalMoney,
                betOrders: []
            };
            $.each(betForm.betOrders, function (index, value) {
                data.betOrders.push({
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
            var _this = this;
            _this.saveBetOrder(JSON.stringify(data));
        },
        //官方，双面玩法提交表单方法。
        saveBetOrder: function(betForm) {
            var _this = this;
            if($("button#gfwfBetForm_submit") != undefined && $("button#gfwfBetForm_submit").attr("disabled") != 'disabled' ||
                $("div.layui-layer button[type=submit]") != undefined && $("div.layui-layer button[type=submit]").attr("disabled") != 'disabled' ){
                ajaxRequest({
                    url: _this.baseUrl + '/' + _this.code + '/saveBetOrder.html',
                    data: {
                        "gb.token":$("#gameContent [name='gb.token']").val(),
                        betForm: betForm
                    },
                    beforeSend: function () {
                        $("button#gfwfBetForm_submit").attr("disabled","disabled");//官方玩法
                        $("div.layui-layer button[type=submit]").attr("disabled","disabled");//传统玩法
                        layer.closeAll();
                        page.showLoading();
                    },
                    success: function (data) {
                        if(data && data.token){
                            $("#gameContent input[name='gb.token']").val(data.token);
                        }
                        var d = data.code[0];
                        //code代码为100表示成功
                        if (d && d.code && d.code == '100') {
                            // 清空临时变量（传统玩法）
                            _this.tmpBetContent = null;
                            //刷新玩家数据
                            parent.index.refreshPlayer();
                            layer.msg(d.msg, {icon: d.icon});
                            if($("#bottomInfo .tabs .acti").length>0 && $("#bottomInfo .tabs .acti").data("tab") == 'myBet'){
                                // 刷新我的投注
                                page.getMyOrders();
                            }
                            _this.clearContent();
                            _this.clearTdInput();
                        } else {
                            layer.msg(d.msg, {icon: d.icon});
                        }
                    },
                    complete: function (XMLHttpRequest,textStatus) {
                        var state = XMLHttpRequest.getResponseHeader("headerStatus") || XMLHttpRequest.status;
                        if (state != 608) {//重复请求不显示消息
                            $("button#gfwfBetForm_submit").removeAttr("disabled");//官方玩法
                            $("div.layui-layer button[type=submit]").removeAttr("disabled");//传统玩法
                            page.hideLoading();
                        }
                    },error:function(XMLHttpRequest, textStatus, errorThrown){
                        Tools.log({
                            "XMLHttpRequest": XMLHttpRequest,
                            "textStatus": textStatus,
                            "errorThrown": errorThrown
                        });
                        var state = XMLHttpRequest.getResponseHeader("headerStatus") || XMLHttpRequest.status;
                        if (state == 600) {
                            layer.msg('下注失败：请先登录', {icon: 5});
                        }else if(state != 608){//重复请求不显示消息
                            layer.msg('下注失败：请求异常，请刷新界面后再下注', {icon: 5});
                        }
                        _this.setLtToken();
                    }
                });
            }
        },
        setLtToken : function(){
            ajaxRequest({
                url: root + "/commonLottery/getLtToken.html",
                async:false,
                dataType:"text",
                success: function (data) {
                    if(data){
                        $("#gameContent input[name='gb.token']").val(data);
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    Tools.log({
                        "XMLHttpRequest": XMLHttpRequest,
                        "textStatus": textStatus,
                        "errorThrown": errorThrown
                    });
                }
            });
        },
        /**
         * 投注项标黄
         * @param betNum
         */
        addYellow: function (betNum) {
            var quickAmount = $(".main-left .fl input").val();
            var obj = $(".main-left .table-common tbody tr").find("td[data-num=" + betNum + "]");
            for (var i = 0; i < obj.length; i++) {
                if ($(obj[i]).find("input").length == 0) {
                    $(obj[i]).addClass("bg-yellow");
                }
            }
            if (quickAmount) {
                obj.find("input").val(quickAmount);
            }
        },
        /**
         * 投注项取消选择
         * @param betNum
         */
        removeYellow: function (betNum) {
            var obj = $(".main-left .table-common tbody tr").find("td[data-num=" + betNum + "]");
            for (var i = 0; i < obj.length; i++) {
                if ($(obj[i]).find("input").length == 0) {
                    $(obj[i]).removeClass("bg-yellow");
                }
            }
            obj.find("input").val("");
        },
        /** 快捷按钮 */
        setShortcutkeyButton: function () {
            $(".clearfix .kjanniu a").click(function () {
                var num =parseInt($(this).data('num'));
                $('.clearfix .main-left .clearfix .fl input').first().val(num);
            });
        },

        /*=============================================官方玩法=========================================================*/
        //ssc
        initArrNum : function(){
        },
        //ssc
        arrNumAll : function (obj) {
            obj.parent().toggleClass('acti'); //变色
        },
        //ssc任选
        zuChengFangan :function () {
        },
        //ssc
        teShuHaoClick : function () {
        },
        //去除重复号码
        delRrepet : function (){
        },
        //特殊玩法
        checkTeshu : function (plSelName,plSelIndex) {
            return $("#jiangjin-change").data("value");
        },
        //随机特殊号
        suiJiTeshu : function (code) {
            return $("#jiangjin-change").data("value");
        },
        //gfwf赔率
        getGfwfAllOdd :function () {
        },
        //官方玩法切换事件
        clickGfwf :function () {
        },
        selectFun_1num:function($obj,num){
            if($.inArray(num, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]) >= 0) {
                $obj.addClass("acti");
            }
        },
        selectFun_2num :function($obj,num){
            if ($.inArray(num, [5, 6, 7, 8, 9,10]) >= 0) {
                $obj.addClass("acti");
            }
        },
        selectFun_3num :function($obj,num){
            if ($.inArray(num, [0, 1, 2, 3, 4]) >= 0) {
                $obj.addClass("acti");
            }
        },



        //加减号。
        initJjh: function() {
            var _this = this;
            $(".Single .layout .add_spot .left .sopt_wrap .down .down_menu i").click(function () {
                var text = $(this).text();
                $(this).parent().parent().find('input').val(text);
                $(this).parent().hide();

                $(this).parent().parent().find('input').data("money", parseInt(text));
                _this.renderZhushu();
            });
            $(".yjf-wrap span").click(function () {
                $(".yjf-wrap span").removeClass("selected");
                $(this).addClass("selected");
                _this.renderZhushu();
            });
            $(".Single .layout .add_spot .left .sopt_wrap .down span").click(function () {
                $(this).parent().find(".down_menu").show();
            });

            $(".Single .layout .add_spot .left .sopt_wrap .down .down_menu i").parent().parent().hover(function () {
            }, function () {
                $(this).find(".down_menu").hide();
            });

            $(".Single .layout .add_spot .left .sopt_wrap .reduce a.fl").click(function () {
                var val = parseInt($(".Single .layout .add_spot .left .sopt_wrap .reduce input").val());
                if (isNaN(val) || typeof val != 'number') {
                    val = 1;
                }
                val = parseInt(val);

                --val;
                val = val < 1 ? 1 : val;
                $(".Single .layout .add_spot .left .sopt_wrap .reduce input").data("beishu", val).val(val);
                _this.renderZhushu();
            });

            $(".Single .layout .add_spot .left .sopt_wrap .reduce a.fr").click(function () {
                var val = parseInt($(".Single .layout .add_spot .left .sopt_wrap .reduce input").val());
                if (isNaN(val) || typeof val != 'number') {
                    val = 1;
                }
                val = parseInt(val);

                ++val;
                val = val < 1 ? 1 : val;
                $(".Single .layout .add_spot .left .sopt_wrap .reduce input").data("beishu", val).val(val);
                _this.renderZhushu();
            });
        },


        initSubPage: function () {
            var _this = this;
            // 初始化11选5计数器变量
            this.initArrNum();
            // 初始化模板
            $("#subPage").html(Template("template_" + _this.getPlayPlTemplateName()));
            $("#subJRange").html(Template("template_jRange"));

            // 内容点击，触发统计注数函数
            $(".Pick ul li span i").click(function () {
                var nowFlag = $(".re-5x-i i").hasClass('acti');

                if (nowFlag == true) {
                    $(".re-5x-i i").removeClass('acti');
                }
                var nameNow = $(this).parent().parent().attr('data-flag');
                if (typeof nameNow != 'undefined' || nameNow == "bdDanXuan") {
                    var nowFlag = $(this).parent().hasClass('acti');
                    if (nowFlag == true) {
                        $(this).parent().removeClass('acti');
                    } else {
                        $(this).parent().parent().find('span.acti').removeClass('acti');
                        $(this).parent().toggleClass('acti');
                    }
                } else {
                    _this.arrNumAll($(this));
                }
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });

            _this.teShuHaoClick();

            // 手动输入，触发统计注数函数
            $('.content_jiang .content_tex').keyup(function () {
                _this.renderZhushu();
            });

            _this.zuChengFangan();

            //输入倍数十重新计算
            $("#inputBeishu").keyup(function () {
                var val = parseInt($(this).val());
                if (isNaN(val) || typeof val != 'number') {
                    val = 1;
                }
                if(val>1000000){
                    $("#inputBeishu").val("1");
                    layer.msg("倍数不能大于1000000");
                    return ;
                }
                val = parseInt(val);
                val = val < 1 ? 1 : val;
                $(this).data("beishu", val).val(val);
                _this.renderZhushu();
            });

            //输入倍数失去焦点计算
            $("#inputBeishu").blur(function () {
                var valStr = $("#inputBeishu").val();
                if (typeof valStr == "undefined" || valStr == "" || valStr == null) {
                    $("#inputBeishu").val("1");
                }
                _this.renderZhushu();
            });

            // 加减号
            _this.initJjh();

            var plAndMaxFd = _this.getPlAndMaxFd();   // 获取当前选中的玩法赔率和返点
            var maxPlayPl;  // 最高赔率
            var maxFandian;  // 最大返点
            var minPl;  // 最低赔率
            var convertBlMoney;  // 每1%转换赔率
            if (plAndMaxFd instanceof Array) {  // 多赔率
                maxPlayPl = plAndMaxFd[0].odd;  // 最高赔率
                maxFandian = plAndMaxFd[0].rebate*100;    // 最大返点
                minPl = _this.getArgNum((plAndMaxFd[0].odd-Number(plAndMaxFd[0].baseNum)*plAndMaxFd[0].rebate)) // 最低赔率
            } else {
                maxPlayPl = plAndMaxFd.odd;  // 最高赔率
                maxFandian = plAndMaxFd.rebate*100;    // 最大返点
                minPl =_this.getArgNum((plAndMaxFd.odd-Number(plAndMaxFd.baseNum)*plAndMaxFd.rebate));   // 最低赔率
            }

            if(maxFandian ==0){
                // 返点比例
                var fandianBili = 0; // 当前滚动条移动的比例
                $("#fandian-bfb").data("value", fandianBili);
                $("#fandian-bfb").html(fandianBili + "%");    // 渲染界面中百分比部分

                // 渲染界面中赔率部分
                if (plAndMaxFd instanceof Array) {  // 多赔率
                    var pl = _this.getArgNum((maxPlayPl - fandianBili * plAndMaxFd[0].baseNum/100));
                    $("#jiangjin-change").data("value", pl);
                    var strArr = [];
                    $.each(plAndMaxFd, function (index, value) {
                        strArr.push(_this.getArgNum((value.odd - fandianBili* value.baseNum/100 )));
                    });
                    $("#jiangjin-change").html(strArr.join('|'));
                    $("#jiangjin-change").data("plStr", strArr.join('|'));
                } else {
                    var pl = _this.getArgNum((maxPlayPl - fandianBili * plAndMaxFd.baseNum/100));
                    $("#jiangjin-change").data("value", pl);
                    $("#jiangjin-change").html(pl);
                    $("#jiangjin-change").data("plStr",pl);
                }
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            }

            // 初始化返点赔率滚动条
            $('.slider-input').jRange({
                from: 0,
                to: maxFandian, // 最大返点
                step: 0.1,  // 每步
                format: '%s',
                width: $(".cl-1004").width(),   // 滚动条总长度
                theme: 'theme-green my-slide-theme',
                showLabels: false,
                showScale: false,
                snap: true,
                onstatechange: function () {
                    // 返点比例
                    var fandianBili = parseFloat($(".slider-input").val()).toFixed(1); // 当前滚动条移动的比例
                    $("#fandian-bfb").data("value", fandianBili);
                    $("#fandian-bfb").html(fandianBili + "%");    // 渲染界面中百分比部分
                    fandianBili = parseFloat(fandianBili);
                    // 渲染界面中赔率部分
                    if (plAndMaxFd instanceof Array) {  // 多赔率
                        var pl = _this.getArgNum((maxPlayPl - fandianBili * plAndMaxFd[0].baseNum/100));
                        $("#jiangjin-change").data("value", pl);
                        var strArr = [];
                        $.each(plAndMaxFd, function (index, value) {
                            strArr.push(_this.getArgNum((value.odd - fandianBili* value.baseNum/100)));
                        });
                        $("#jiangjin-change").html(strArr.join('|'));
                        $("#jiangjin-change").data("plStr", strArr.join('|'));
                    } else {
                        var pl = _this.getArgNum((maxPlayPl - fandianBili* plAndMaxFd.baseNum/100 ));
                        $("#jiangjin-change").data("value", pl);
                        $("#jiangjin-change").html(pl);
                        $("#jiangjin-change").data("plStr",pl);
                    }
                    // 渲染中部注数，赔率，返点等等
                    _this.renderZhushu();
                }
            });
            $(".my-slide-theme .back-bar .pointer").attr("tabIndex", -1);    // 滑块添加tabIndex来获得focus事件
        },


        /**
         * 渲染中部注数，赔率，返点等等
         */
        renderZhushu: function() {
            var _this = this;
            // 注数算法
            var zhushuFun = _this.getPlayPlFun_zhushu();
            if (typeof zhushuFun != 'undefined'||zhushuFun!=isNaN()) {
                var zhushu = eval("_this."+zhushuFun + "()");   // 注数
                if (typeof zhushu == "undefined" || zhushu < 0) {
                    return;
                }
                var inputBeishu = $("#inputBeishu").val();
                var inputFandianBili = ($("#fandian-bfb").data("value") / 100).toFixed(3);
                var mode = _this.getSelectMode();//获取模式
                var moneyMode = _this.getMode(mode);
                $('.p1 .i0').html(zhushu);  // 渲染注数
                $('.p1 .i_beishu').html($("#inputBeishu").val());   // 渲染倍数
                // 投注总金额 = 倍数 * 注数 * 单注金额
                var totalMoney = parseFloat((moneyMode * inputBeishu * zhushu * $("#inputMoney").attr("data-money")).toFixed(3));
                $('.p1 .i_money').html(totalMoney);
                // 返点金额 = 投注总金额 * 返点比例
                var fandianMoney = _this.getArgNum((totalMoney * inputFandianBili));
                $('.p1 .i_fanD').html(fandianMoney);
            }
        },

        /**
         * 获取当前赔率注数算法
         */
        getPlayPlFun_zhushu:function() {
            return $(".playPlIdBtn.acti").attr("data-fun_zhushu");
        },

        /**
         * 获取当前赔率模板名称
         */
        getPlayPlTemplateName: function() {
            return $(".playPlIdBtn.acti").attr("data-name");
        },

        /**
         * 获取当前赔率内容算法
         */
        getPlayPlFun_content: function() {
            return $(".playPlIdBtn.acti").attr("data-fun_content");
        },
        /**
         * 获取当前赔率随机算法
         */
        getPlayPlFun_suiji: function() {
            return $(".playPlIdBtn.acti").attr("data-fun_suiji");
        },

        /**
         * 获取当前赔率ID
         */
        getPlayPlId: function() {
            return $(".playPlIdBtn.acti").attr("data-play_pl_id");
        },

        /**
         * 获取当前投注玩法：betCode
         */
        getPlayId: function() {
            return $(".playPlIdBtn.acti").attr("data-play_id");
        },
        /**
         * 获取当前彩种玩法
         */
        getPlayCode: function() {
            return $(".playPlIdBtn.acti").attr("data-play_Code");
        },
        /**
         * 获取当前期数
         */
        getNumber: function() {
            return  $('i#expect').text();
        },


        // 获取选中的模式
        getSelectMode: function() {
            var mode = $(".yjf-wrap span.selected").text();
            if (mode == '元') {
                return 1;
            } else if (mode == '角') {
                return 10;
            } else if (mode == '分') {
                return 100;
            }
            return;
        },

        getMode: function(mode) {
            if (mode == 1) {    // 元
                return 1;
            } else if (mode == 10) { // 角
                return 0.1;
            } else if (mode == 100) { // 分
                return 0.01;
            }
            return;
        },

        //处理金额，截取三位小数。
        getArgNum:function (num) {
            var numstr = num + "";
            if (numstr.indexOf(".")!=-1){
                var xs = 3;
                if(numstr.split(".")[1].length<3){
                    xs = numstr.split(".")[1].length;
                }
                numstr = numstr.split(".")[0]+"."+numstr.split(".")[1].substring(0,xs);
            }
            return Number(numstr);
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
            } else {// 单一赔率
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

        /**
         * 清除状态
         */
        clearStateTouZhu: function() {
            $('.p1 .i0').html('0');
            $('.p1 .i_beishu').html('1');
            $('.p1 .i_fanD').html('0');
            $('.p1 .i_money').html('0');
            $('.slider-input').jRange("setValue", '0');
        },

        // 官方玩法数据转换，转换为提交格式
        //获取内容算法
        tjzd: function() {
            var _this = this;
            var plSelIndex = 0; //特殊号多赔率
            var plSelName = ''; //特殊号多赔率名称
            var plSelVal = 0; //特殊号赔率值
            var contentFun = _this.getPlayPlFun_content();    // 内容算法
            var zhushuFun = _this.getPlayPlFun_zhushu();  // 注数算法
            if (typeof contentFun == 'undefined' || typeof zhushuFun == 'undefined') {
                return;
            }
            this.alertContext = "";
            _this.delRrepet();
            var data = eval("_this."+contentFun + "()");
            var zhushu = eval("_this."+zhushuFun + "()");
            if (data == -1) {
                return;
            }
            if (_this.alertContext != ''){
                _this.alertmsg('');
            }
            if (typeof data == 'undefined' || typeof zhushu == 'undefined' || zhushu <= 0) {
                _this.alertmsg("号码选择不完整，请重新选择");
                return;
            }
            plSelVal=_this.checkTeshu(plSelName,plSelIndex);

            var obj = {};
            //======函数获取=====
            obj.showPlayName = data.showPlayName;
            obj.showContent = data.showContent;
            obj.betContent = _this.getBetNum(data.betContent);
            //======动态获取=====
            obj.betPerMoney = $("#inputMoney").data("money");
            obj.betZhushu = zhushu;
            obj.betBeishu = $("#inputBeishu").data("beishu");
            obj.betMode = _this.getSelectMode();
            obj.betTotalMoney = (obj.betZhushu * obj.betPerMoney * _this.getMode(obj.betMode) * obj.betBeishu).toFixed(3);
            obj.betPlayGroupId = _this.playGroupId;
            obj.betFandian = $("#fandian-bfb").data("value");
            obj.betPlayPl = plSelVal;
            var strPlId = _this.getPlayPlId();
            if (strPlId.toString().indexOf('|') > 0) {
                obj.betPlayPlId = (strPlId.toString().split("|"))[plSelIndex];
            } else {
                obj.betPlayPlId = _this.getPlayPlId();
            }
            obj.betPlayCode = _this.getPlayCode();
            obj.betPlayId = _this.getPlayId();

            _this.clearSelected();
            _this.clearTextarea();
            _this.clearStateTouZhu();
            _this.addYuxuan(obj);
            _this.calcAll();
        },

        //清除手动输入区域
        clearTextarea: function() {
            $(".content_jiang textarea").val('');
            this.clearStateTouZhu();
        },

        addYuxuan: function(betForm) {
            $("#zhudanList .noRecord").remove();
            var html = Template("template_touzhu", betForm);
            $("#zhudanList").append(html);
            this.bindYuxuan();
        },

        bindYuxuan: function() {
            this.unbindYuxuan();
            $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").hover(
                function() {
                    $("#moreZhudan").remove();
                    var width = $(this).width() / 2;
                    var top = $(this).offset().top - 150;
                    var left = $(this).offset().left + $(this).width() / 2 * 1 / 3;
                    var html = Template("template_moreZhudan", {
                        top: top,
                        left: left,
                        showPlayName: $(this).attr("data-show_play_name"),
                        showContent: $(this).attr("data-show_content"),
                        showMode: $(this).attr("data-bet_mode"),
                        showFandian: $(this).attr("data-bet_fandian"),
                        showPlayPl: $(this).attr("data-bet_play_pl"),
                        betPerMoney: $(this).attr("data-bet_per_money"),
                        betTotalMoney: $(this).attr("data-bet_total_money"),
                        betZhushu: $(this).attr("data-bet_zhushu"),
                        bet_beishu: $(this).attr("data-bet_beishu")
                    });
                    $("body").append(html);
                }, function() {
                    $("#moreZhudan").remove();
                }
            );
        },

        unbindYuxuan: function() {
            $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").unbind('mouseenter').unbind('mouseleave');
        },

        //清除手动选中内容
        clearSelected: function() {
            $(".Single .layout .Pick ul li span.acti").removeClass("acti");
            $(".re-5x-i i.acti").removeClass("acti");
            $(".Pick ul li span.acti_tsh").removeClass("acti_tsh");
            $("#zhushuInfo").data("zhushu", 0);
            if (typeof this.clearStateTouZhu == 'function') {
                this.clearStateTouZhu();
            }
            this.initArrNum();
        },

        // 当前注数内容状态
        calcAll: function() {
            var totalZhushu = 0;
            var totalBeishu = 0;
            var totalMoney = 0;
            var valStr = $("#inputBeishu").val();
            var str = '';

            $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").each(function () {
                totalZhushu = add(totalZhushu, $(this).data("bet_zhushu"));
                totalBeishu = add(totalBeishu, $(this).data("bet_beishu"));
                totalMoney = add(totalMoney, $(this).data("bet_total_money"));
            });

            str = '总投 <span>' + totalZhushu + '</span> 注，<span>' + totalBeishu + '</span> 倍，共 <span class="totalM">' + totalMoney + '</span> 元。';
            $("#zongtouInfo").html(str);
            $(".i_beishu").html(valStr);
        },

        // 字符串格式化函数
        getStringFormat: function () {
            String.prototype.format = function (args) {
                var result = this;
                if (arguments.length > 0) {
                    if (arguments.length == 1 && typeof (args) == "object") {
                        for (var key in args) {
                            if (args[key] != undefined) {
                                var reg = new RegExp("({" + key + "})", "g");
                                result = result.replace(reg, args[key]);
                            }
                        }
                    }else {
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
        },

        // 数字批量选择算法
        selectFun_1: function(obj) {
            var _this=this;
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                _this.selectFun_1num($(this),num);
            });

            var objName = $(obj).parent().parent().parent().find("li").eq(0).find(".numLines").attr('class');
            // var maName = '';
            // if(typeof objName != 'undefined'){
            //     maName = objName.split(' ')[1];
            //     var objBtn = getCommonObj(obj, maName);
            //     var btnFlag = "quan";
            //     changeActi(btnFlag, objBtn);
            // }

            this.renderZhushu();
        },
        selectFun_2: function(obj) {
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                _this.selectFun_2num($(this),num);
            });
            this.renderZhushu();
        },


        selectFun_4: function(obj) {
            var _this = this ;
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                if ($.inArray(num, [1, 3, 5, 7, 9,11]) >= 0) {
                    $(this).addClass("acti");
                }
            });
            // var objName = $(obj).parent().parent().parent().find("li").eq(0).find(".numLines").attr('class');
            // var maName = '';
            // if(typeof objName != 'undefined'){
            //     maName = objName.split(' ')[1];
            //     var objBtn = _this.getCommonObj(obj, maName);
            //     var btnFlag = "qi";
            //     changeActi(btnFlag, objBtn);
            // }

            this.renderZhushu();
        },

        selectFun_5: function(obj) {
            var _this = this ;
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                if ($.inArray(num, [0, 2, 4, 6, 8, 10]) >= 0) {
                    $(this).addClass("acti");
                }
            });

            // var objName = $(obj).parent().parent().parent().find("li").eq(0).find(".numLines").attr('class');
            // var maName = '';
            // if(typeof objName != 'undefined'){
            //     maName = objName.split(' ')[1];
            //     var objBtn = getCommonObj(obj, maName);
            //     var btnFlag = "ou";
            //     _this.changeActi(btnFlag, objBtn);
            // }

            this.renderZhushu();
        },
        selectFun_6: function(obj) {
            $(obj).parent().parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");
            this.clearStateTouZhu();//清除投注状态栏
            this.renderZhushu();//重新计算注数
        },

        //右侧选择号码点击事件
        selectFun_3: function(obj) {
            var _this=this;
            $(obj).parent().find(".acti").removeClass("acti");
            $(obj).addClass("acti");

            var objArr = $(obj).parent().parent().find("span");
            objArr.each(function () {
                $(this).removeClass("acti");
                var num = parseInt($(this).find("i").html());
                _this.selectFun_3num($(this),num);
            });
            this.renderZhushu();
        },


        daoRu:function(){
            this.showloadTxtTemplate1();
        },
        //导入点击事件
        showloadTxtTemplate1: function() {
            var _this = this;
            if (this.layerInfoInsert != null) {
                return;
            }
            var tiShi_template = '\
                <div class="tzTishiTemplate del-Tishi tzInsertTemplate">\
                    <h3>文件载入</h3>\
                    <span id="block_close"></span>\
                    <table style="width: 100%">\
                         <tobody>\
                             <tr>\
                                 <td>\
                                    <h4>\
                                          <span class="txtinfo">请选择你要载入的文件(只支持txt文件)</span>\
                                    </h4>\
                                    <h4 class="txt-select">\
                                          <input type="file" id="file" name="file" size="30" value="未选择任何文件">\
                                          <span class="errorTxt"></span>\
                                    </h4>\
                                 </td>\
                             </tr>\
                             <tr>\
                                <td class="btns">\
                                    <button type="button" onclick=" page.PlayWay.ajaxSubmit()">导入文件</button>\
                                </td>\
                              </tr>\
                         </tobody>\
                    </table>\
                </div>\
            ';

            //页面层
            this.layerInfoInsert = layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['536px', '256px'], //宽高
                content: tiShi_template
            });

            $(".tzInsertTemplate").parent().parent().css({"border": "6px solid #ccc", "border-radius": "8px"});
            $("#block_close").click(function () {
                _this.closeLayerInsert();
            });
        },

        getSuiji: function(total) {
            var _this = this;
            var zhushu = 1;
            var plSelName = '';
            var plSelIndex = 0;
            var plSelVal = 0;
            var suijiFun = _this.getPlayPlFun_suiji();
            if (typeof suijiFun == 'undefined') {
                return;
            }
            // 获取随机注数
            for (var i = 0; i < total; ++i) {
                var data = eval("_this."+suijiFun + "()");
                if (typeof data == 'undefined' || data.length <= 0) {
                    return;
                }
                //位置选择不正确（rx2,rx3,rx4中）
                if (data == -1) {
                    return;
                }
                plSelVal=_this.suiJiTeshu(data.betContent);
                var obj = {};
                //======函数获取=====
                obj.showPlayName = data.showPlayName;
                obj.showContent = data.showContent;
                zhushu = (typeof data.betZhushu != 'undefined' || data.betZhushu > 1) ? data.betZhushu : zhushu;
                obj.betContent = _this.getBetNum(data.betContent);
                obj.betPlayGroupId = data.playGroupId;
                //========动态获取=====
                obj.betPerMoney = $("#inputMoney").data("money");
                obj.betZhushu = zhushu;
                obj.betBeishu = $("#inputBeishu").data("beishu");
                obj.betMode = _this.getSelectMode();
                obj.betTotalMoney = (obj.betZhushu * obj.betPerMoney * _this.getMode(obj.betMode) * obj.betBeishu).toFixed(3);
                obj.betPlayPl = plSelVal;
                obj.betFandian = $("#fandian-bfb").data("value");
                var strPlId = _this.getPlayPlId();
                if (strPlId.toString().indexOf('|') > 0) {
                    obj.betPlayPlId = (strPlId.toString().split("|"))[plSelIndex];
                } else {
                    obj.betPlayPlId = _this.getPlayPlId();
                }
                obj.betPlayCode = _this.getPlayCode();
                obj.betPlayId = _this.getPlayId();
                // 添加预算
                _this.addYuxuan(obj);
            }
            // 统计右侧注数，金额
            _this.calcAll();

            //改变追号模板内每期总额值
            // var optionVal = parseInt($('#lt_zh_qishu').val());
            // _this.selectedCheckboxtbzh(optionVal);

            //点击随机数时计算追号总额
            // $("#zhInfo .tabs ul li:first-child").trigger('click');
            // $('.zhfbzjetxt').html(_this.getFbTotelMoney());
            // $('.zhzjetxt').html(_this.getTbTotelMoney());
        },

        //计算购买追号同倍总金额
        // getTbTotelMoney: function(){
        //     var _this = this;
        //     var totelMoney = 0;
        //     var tempMoney = 0;
        //     $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").each(function () {
        //         var perMoney = $(this).data('bet_per_money');   //每注金额
        //         var zhushu = $(this).data('bet_zhushu');  //注数
        //         var mode = $(this).data('bet_mode');  //模式
        //         var modeVal = _this.getMode(mode);
        //         tempMoney = perMoney * zhushu * modeVal;
        //         totelMoney += tempMoney;
        //     });
        //
        //     var num = _this.selectedZhqishu();
        //     return (totelMoney * num).toFixed(2);
        // },

        //计算购买追号翻倍总金额
        // getFbTotelMoney: function(){
        //     var zhTotelMoney = 0;
        //     $(".fbulzh li span.content_money").each(function () {
        //         var flagStatus = $(this).parent().find('input').prop('checked');
        //         if(flagStatus){
        //             var strMoney = ($(this).html()).toString();
        //             zhTotelMoney += parseFloat(strMoney.substr(1,strMoney.length));
        //         }
        //     });
        //     return zhTotelMoney.toFixed(2);
        // },

        //选中的追号期数
        // selectedZhqishu:function() {
        //     var zongQiShu = 0;
        //     this.changeBgColor();
        //     $(".ulzh li").each(function () {
        //         var flagStatus = $(this).find('input').prop('checked');
        //         if (flagStatus) {
        //             zongQiShu++;
        //         }
        //     });
        //     return zongQiShu;
        // },

        //改变选中checkbox 行的背景颜色
        changeBgColor: function() {
            $(".ulzh li").each(function () {
                var flagStatus = $(this).find('input').prop('checked');
                if (flagStatus == true) {
                    $(this).addClass('checkbox_selected');
                } else {
                    var hasSelect = $(this).hasClass('checkbox_selected');
                    if (hasSelect) {
                        $(this).removeClass('checkbox_selected');
                    }
                }
                // 更换input背景
                if (!flagStatus) {
                    $(this).find('input[type="text"]').attr("disabled", "disabled");
                } else {
                    $(this).find('input[type="text"]').removeAttr("disabled");
                }
            });
        },

        //获取下注号码
        getBetNum:function(betNum) {
            if (betNum.toString().indexOf('|') < 0) {
                betNum = betNum.replace(new RegExp(",","gm"),"|");
            }
            return betNum;
        },

        //选中checkbox
        selectedCheckboxtbzh: function(countLi) {
            var _this = this;
            $("#tbLiList li").each(function(i, v) {
                if (i < countLi) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            $(".ulzh li").each(function () {
                var flagStatus = $(this).find('input').prop('checked');
                if (flagStatus) {
                    $(this).find("input[type='checkbox']").removeAttr("checked");
                }
            });
            for (var i = 0; i < countLi; i++) {
                $(".content_heigth .ulzh li:eq(" + i + ") input").prop("checked", true);
            }
            _this.changeBgColor();
            // _this.changeContent();
        },

        //改变被选中checkbox行的内容--同倍追号
        // changeContent:function() {
        //     var totelMoney = 0;
        //     $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").each(function () {
        //         var perMoney = $(this).data('bet_per_money');
        //         totelMoney += perMoney;
        //     });
        //     $(".ulzh li").each(function () {
        //         var flagStatus = $(this).find('input').prop('checked');
        //         if (!flagStatus) {
        //             $(this).find('input[type="text"]').val('0');
        //             $(this).find('.content_money').html('￥0.0');
        //         } else {
        //             var beishu = $("#startBeiShuZh").val();
        //             beishu = beishu == '' ? 1 : beishu;
        //             $(this).find('input[type="text"]').val(beishu);
        //             $(this).find('.content_money').html('￥' + (beishu * totelMoney));
        //         }
        //     });
        // },

        // renderZhuihao: function(strZh, obj) {
        //     var _this = this;
        //     var totelMoney = 0;
        //     var len = $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").length;
        //     if (len <= 0) {
        //         _this.showTishi2Template();
        //         $(".del-TishiType2 .des-txt").empty();
        //         $(".del-TishiType2 .des-txt").html("请先添加投注内容");
        //         return;
        //     }
        //
        //     //点击追加按钮执行
        //     if (strZh == null) {
        //         _this.zhTempletHideOrShow(); //追号模板显示与隐藏
        //     }
        //
        //     $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").each(function () {
        //         var perMoney = $(this).data('bet_per_money');
        //         totelMoney += perMoney;
        //     });
        //
        //     _this.getZhuihaoList(function() {
        //         // 模板逻辑处理.......
        //         var dataContent = {
        //             listContent: []
        //         };
        //
        //         $.each(zhuihaoSscOpenTimeList, function(index, value) {
        //             dataContent.listContent.push({
        //                 zhqishu: value.number,
        //                 zhbeishu: $("#startBeiShu.Zh").val(),
        //                 totelMoney: '￥' + totelMoney,
        //                 zhkjshijian: Tools.formatDate(value.openTime)
        //             });
        //         });
        //
        //         var strZh = $("#zhInfo .hy-info.acti").data("opertype");
        //         if (typeof strZh == 'undefined' || strZh == 'tbzh') {
        //             var container = $(".tbzh");
        //             var html = template('tbzhTemplate', dataContent);
        //             $(container).html(html);
        //             $("#lt_zh_qishu").val(10);  //默认选中第10期选项
        //             _this.selectedCheckboxtbzh(10);
        //         } else {
        //             var containerfbzh = $(".fbzh");
        //             var htmlfbzh = template('fbzhTemplate', dataContent);
        //             $(containerfbzh).html(htmlfbzh);
        //             $("#rt_zh_qishu").val(10);  //默认选中第10期选项
        //             _this.selectedCheckboxfbzh(10);
        //         }
        //
        //         //总金额
        //         var num = _this.selectedZhqishu();
        //         $('.zhzjetxt').html(totelMoney * num);
        //         $('.zhfbzjetxt').html(getTotelMoney());
        //
        //         //单行点击选中事件
        //         $(".content_heigth .ulzh li input[type='checkbox']").click(function () {
        //             var selectedbox = $(this).prop('checked');
        //             var beishu = $("#startBeiShuZh").val();
        //
        //             if (!selectedbox) {
        //                 $(this).parent().removeClass('checkbox_selected');
        //                 $(this).parent().find('input[type="text"]').attr("disabled", "disabled");
        //                 $(this).parent().find('input[type="text"]').val('0');
        //             } else {
        //                 $(this).parent().addClass('checkbox_selected');
        //                 $(this).parent().find('input[type="text"]').removeAttr("disabled");
        //                 $(this).parent().find('input[type="text"]').val(beishu);
        //             }
        //             var num = _this.selectedZhqishu();
        //             $(".zhqishutxt").html(num);
        //
        //             _this.changeContent();
        //             _this.changeContentFbzh();
        //
        //             $('.zhzjetxt').html(getTotelMoney());
        //             $('.zhfbzjetxt').html(getTotelMoney());
        //         });
        //
        //         //输入倍数时改变选中倍数input值
        //         $("#startBeiShuZh").keyup(function () {
        //             _this.changeContent();
        //             $('.zhzjetxt').html(getTotelMoney());
        //         });
        //
        //         //输入倍数失去焦点计算
        //         $("#startBeiShuZh").blur(function () {
        //             var valStr = $("#startBeiShuZh").val();
        //             if (typeof valStr == "undefined" || valStr == "" || valStr == null) {
        //                 $("#startBeiShuZh").val(1);
        //             }
        //             _this.changeContent();
        //             $('.zhzjetxt').html(getTotelMoney());
        //         });
        //
        //         $("#rt_trace_diff").keyup(function () {
        //             _this.changeContentFbzh();
        //             $('.zhfbzjetxt').html(getTotelMoney());
        //         });
        //
        //         $("#rt_trace_diff").blur(function () {
        //             var valStr = $("#rt_trace_diff").val();
        //             if (typeof valStr == "undefined" || valStr == "" || valStr == null) {
        //                 $("#rt_trace_diff").val(1);
        //             }
        //             _this.changeContentFbzh();
        //             $('.zhfbzjetxt').html(getTotelMoney());
        //         });
        //
        //         $("#rt_trace_times_diff").keyup(function () {
        //             _this.changeContentFbzh();
        //             $('.zhfbzjetxt').html(getTotelMoney());
        //         });
        //
        //         $("#rt_trace_times_diff").blur(function () {
        //             var valStr = $("#rt_trace_times_diff").val();
        //             if (typeof valStr == "undefined" || valStr == "" || valStr == null) {
        //                 $("#rt_trace_times_diff").val(1);
        //             }
        //             _this.changeContentFbzh();
        //             $('.zhfbzjetxt').html(getTotelMoney());
        //         });
        //
        //         //选择选项-同倍追号
        //         // $(document).on("change", 'select#lt_zh_qishu', function () {
        //         //     var optionVal = parseInt($(this).val());
        //         //
        //         //     $(".zhqishutxt").html(optionVal);
        //         //     $('.zhzjetxt').html(totelMoney * selectedZhqishu());
        //         //     _this.selectedCheckboxtbzh(optionVal);
        //         //     $('.zhzjetxt').html(getTotelMoney());
        //         // });
        //
        //         //选择选项-翻倍追号
        //         // $(document).on("change", 'select#rt_zh_qishu', function () {
        //         //     var optionVal = parseInt($(this).val());
        //         //
        //         //     $(".zhqishutxt").html(optionVal);
        //         //     $('.zhfbzjetxt').html(getTotelMoney());
        //         //     selectedCheckboxfbzh(optionVal);
        //         //     $('.zhfbzjetxt').html(getTotelMoney());
        //         // });
        //     });
        // },

        //清除注单内容提示框
        showTishi1Template: function(infoStr) {
            if (this.layerTishi1 != null) {
                return;
            }

            var tiShi_template = '\
                <div class="tzTishiTemplate del-Tishi">\
                    <h3>温馨提示</h3>\
                    <span id="block_close"></span>\
                    <table style="width: 100%">\
                         <tobody>\
                             <tr>\
                                 <td>\
                                    <h4>\
                                          <i class="imgTishi"></i>\
                                          <sapn class="des-txt">是否清空确认区中所有投注内容？</span>\
                                    </h4>\
                                 </td>\
                             </tr>\
                             <tr>\
                                <td class="btns">\
                                    <button type="button" onclick=" page.PlayWay.enterType1()">确定</button>\
                                    <button type="button" onclick=" page.PlayWay.cancelType1()">取消</button>\
                                </td>\
                              </tr>\
                         </tobody>\
                    </table>\
                </div>\
            ';

            layer.closeAll();
            //页面层
            this.layerTishi1 = layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['370px', '220px'], //宽高
                content: tiShi_template
            });
        },

        //无注单内容提示框
        showTishi2Template:function(infoStr) {
            var _this = this;
            if (this.layerTishi2 != null) {
                return;
            }

            var tiShi_template = '\
                <div class="tzTishiTemplate del-Tishi del-TishiType2">\
                    <h3>温馨提示</h3>\
                    <span id="block_close"></span>\
                    <table style="width: 100%">\
                         <tobody>\
                             <tr>\
                                 <td>\
                                    <h4>\
                                          <i class="imgTishi"></i>\
                                          <sapn class="des-txt">无添加投注内容</span>\
                                    </h4>\
                                 </td>\
                             </tr>\
                             <tr>\
                                <td class="btns">\
                                    <button type="button" onclick=" page.PlayWay.enterType2()">确定</button>\
                                </td>\
                              </tr>\
                         </tobody>\
                    </table>\
                </div>\
            ';

            layer.closeAll();
            //页面层
            this.layerTishi2 = layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['282px', '222px'], //宽高
                content: tiShi_template
            });

            $("#block_close").click(function () {
                _this.closeLayer2();
            });
            $(".del-TishiType2").parent().parent().css({"border": "6px solid #ccc", "border-radius": "8px", "top": "150px"});
        },

        //投注信息框
        showloadTxtTemplate: function() {
            if (this.layerInfo != null) {
                return;
            }
            var loadTxt_template = '\
                <div class="tzTishiTemplate">\
                    <h3>温馨提示</h3>\
                    <span id="block_close"></span>\
                    <table style="width: 100%">\
                         <tobody>\
                             <tr>\
                                 <td>\
                                    <h4>\
                                          <i class="imgTishi"></i>\
                                          <sapn class="qiTishi">您确定加入 <var class="qihao"></var> 期？</span>\
                                    </h4>\
                                    <div class="tz-data">\
                                         <table class="content-table" style="border: 0; width: 100%;">\
                                               <tobody>\
                                                  <tr class="head-tr">\
                                                     <td width="110">玩法</td>\
                                                     <td width="180">内容</td>\
                                                     <td width="80">注数</td>\
                                                     <td width="40">每注</td>\
                                                     <td width="30">模式</td>\
                                                     <td width="40">倍数</td>\
                                                     <td >金额</td>\
                                                  </tr>\
                                                  <span class="content-td">\
                                                  </span>\
                                               </tobody>\
                                         </table>\
                                    </div>\
                                    <div class="binfo">\
                                        <span class="bbm">\
                                           投注总金额: <span class="total-money">2</span> 元\
                                        </span>\
                                    </div>\
                                  </td>\
                             </tr>\
                             <tr>\
                                <td class="btns">\
                                    <input type="hidden" id="gfwfBetForm_input">\
                                    <button type="button" id="gfwfBetForm_submit">确定</button>\
                                    <button type="button" onclick=" page.PlayWay.cancel()">取消</button>\
                                </td>\
                              </tr>\
                         </tobody>\
                    </table>\
                </div>\
            ';
            layer.closeAll();
            //页面层
            this.layerInfo = layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['615px', '428px'], //宽高1
                content: loadTxt_template
            });
        },

        closeLayer2: function() {
            if (this.layerTishi2 != null) {
                layer.close(this.layerTishi2);
                this.layerTishi2 = null;
            }
        },
        closeLayer: function() {
            if (this.layerTishi1 != null) {
                layer.close(this.layerTishi1);
                this.layerTishi1 = null;
            }
        },

        //清除注单内容按钮
        clearZhudan: function() {
            var _this =this;
            var len = $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").length;
            if (len > 0) {
                _this.showTishi1Template();
                $("#block_close").click(function () {
                    _this.closeLayer();
                });
                $(".del-Tishi").parent().parent().css({"border": "6px solid #ccc", "border-radius": "8px", "top": "150px"});
            } else {
                _this.showTishi2Template();
                $("#block_close").click(function () {
                    _this.closeLayer2();
                });
                $(".del-TishiType2").parent().parent().css({
                    "border": "6px solid #ccc",
                    "border-radius": "8px",
                    "top": "150px"
                });
            }

        },

        //清除投注内容确认按钮
        enterType1: function() {
            var _this = this;
            var len = $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").length;
            if (len > 0) {
                _this.closeLayer();
                _this.clearContent();
            } else {
                _this.closeLayer();
            }
            //清除追号模板
            // var flag = $(".clearLiZhudanbtn").attr('sp');
            // if (flag == 1) {
            //     // _this.zhTempletHideOrShow();
            // }

        },

        //清除注单内容
        clearContent: function() {
            $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").remove();
            this.calcAll();
            if ($("#zhudanList .re_touzhu_tem").length <= 0) {
                $("#zhudanList").html('<tr class="noRecord"><td>暂无投注项</td></tr>');
            }
            $("#moreZhudan").remove();
        },

        //清除注单提示取消按钮
        cancelType1:function() {
            this.closeLayer();
        },
        //清除
        enterType2: function() {
            this.closeLayer2();
        },

        cancel:function() {
            if (this.layerInfo != null) {
                layer.close(this.layerInfo);
                this.layerInfo = null;
            }
        },

        buyBtn: function() {
            var _this = this;
            var len = $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").length;
            var totalM = 0;
            if (len > 0) {
                _this.showloadTxtTemplate();
                var flagsp = $('.clearLiZhudanbtn').attr('sp');
                if (flagsp == 1) {
                    var nameF = '';
                    var num = _this.selectedZhqishu();
                    // var moneyValTb = $('.zhzjetxt').html(); //同倍追号总金额值
                    // var moneyValFb = $('.zhfbzjetxt').html(); //翻倍追号总金额值
                    $('.reBetting .tabs ul li').each(function () {
                        var ft = $(this).hasClass('acti');
                        if (ft) {
                            nameF = $(this).attr('data-opertype');
                        }
                    });

                    // $('.tzTishiTemplate').find('.qiTishi').html("确定要追号" + num + "期？");
                    // if (nameF == 'tbzh') {
                    //     $('.tzTishiTemplate').find('.total-money').html(moneyValTb);
                    //     totalM = moneyValTb;
                    // } else if(nameF == 'fbzh') {
                    //     $('.tzTishiTemplate').find('.total-money').html(moneyValFb);
                    //     totalM = moneyValFb;
                    // }
                } else {
                    totalM = $("#zongtouInfo .totalM").html();
                    $(".total-money").html(totalM);
                }

                $(".tzTishiTemplate").parent().parent().css({
                    "border": "6px solid #ccc",
                    "border-radius": "8px",
                    "top": "80px"
                });
                $("#block_close").click(function () {
                    if (_this.layerInfo != null) {
                        layer.close(_this.layerInfo);
                        _this.layerInfo = null;
                    }
                });

                //投注内容显示处理
                $(".tzTishiTemplate .content-table tr:not(.head-tr)").each(function () {
                    var strNr = $(this).find("td:eq(1)").html();
                    $(this).find("td:eq(1)").html(strNr);
                });

                //投注内容模板
                var htmlStr = _this.addContent();
                $(".tzTishiTemplate .content-table .head-tr").after(htmlStr);

                $(".qihao").html(_this.getNumber());

                // 注单内容
                var betForm = {
                    code: _this.code,
                    totalMoney: 0,
                    quantity: 0,
                    playModel:1,//1表官方玩法
                    betOrders: []
                };

                $("#zhudanList .re_touzhu_tem").each(function () {
                    betForm.betOrders.push({
                        code: _this.code,//彩种
                        expect: _this.getNumber(),//期号
                        playCode: $(this).attr("data-bet_play_code"),//彩种玩法
                        betCode: $(this).attr("data-bet_play_id"),//投注玩法
                        betCount: $(this).attr("data-bet_zhushu"),//注数
                        betAmount: $(this).attr("data-bet_total_money"),//单注金额
                        betNum: $(this).attr("data-bet_content"),//下注号码
                        odd: $(this).attr("data-bet_play_pl"),//奖金
                        multiple: $(this).attr("data-bet_beishu"),//倍数
                        bonusModel: $(this).attr("data-bet_mode"),//元角分模式
                        rebate: (Number($(this).attr("data-bet_fandian"))/100).toFixed(3)//返点比例
                    });

                    betForm.totalMoney += parseFloat($(this).attr("data-bet_total_money"));
                    betForm.quantity += Number($(this).attr("data-bet_zhushu"));
                });
                //追号
                var money = 0;
                betForm.totalMoney = (betForm.totalMoney).toFixed(3);
                betForm = JSON.stringify(betForm);
                // 解决双引号冲突
                tmpBetContent = betForm;
                // 确定按钮
                $("#gfwfBetForm_submit").click(function () {
                    _this.saveBetOrder(tmpBetContent);
                    //清除追号模板
                    // var flag = $(".clearLiZhudanbtn").attr('sp');
                    // if(flag == 1){
                    //     _this.zhTempletHideOrShow();
                    // }
                    //清除弹框layerInfo
                    _this.cancel();
                });
            } else {
                _this.showTishi2Template();
            }
        },

        addContent: function(){
            var strHtml = '';
            $(".Detailedlist .layout .boxt .left table tbody tr.re_touzhu_tem").each(function(){
                var modelStr = '';
                var playName = $(this).data('show_play_name');
                var model = $(this).data('bet_mode');
                var betContent = $(this).data('bet_content');
                var showContent = $(this).data("show_content");
                var zhushu = $(this).data('bet_zhushu');
                var perMoney = $(this).data('bet_per_money');
                var beishu = $(this).data('bet_beishu');
                var totalMoney = $(this).data('bet_total_money');

                if(model == 1){
                    modelStr = '元';
                } else if(model == 10){
                    modelStr = '角';
                } else if(model == 100){
                    modelStr = '分';
                }

                var newStr = '<tr>' +
                    '<td>' + playName + '</td>' +
                    '<td>' + showContent + '</td>' +
                    '<td>' + zhushu + '</td>' +
                    '<td>' + perMoney + '</td>' +
                    '<td>' + modelStr + '</td>' +
                    '<td>' + beishu + '</td>' +
                    '<td>' + totalMoney + '</td>' +
                    '</tr>';
                strHtml += newStr;
            });
            return strHtml;
        },

        closeLayerInsert: function() {
            if (this.layerInfoInsert != null) {
                layer.close(this.layerInfoInsert);
                this.layerInfoInsert = null;
            }
        },
        ajaxSubmit: function() {
            var _this = this;
            if (typeof(FileReader) == "undefined") {
                _this.alertmsg("你的浏览器不支持文件读取");
                return;
            }
            var file = document.getElementById("file").files[0];
            if (typeof file == "undefined") {
                return;
            }
            var flag = false; //状态
            var name = file.name;
            var removeSpan = null;

            var arr = ["txt", "csv"];
            //取出上传文件的扩展名
            var index = name.lastIndexOf(".");
            var ext = name.substr(index + 1);
            //循环比较
            for (var i = 0; i < arr.length; i++) {
                if (ext == arr[i]) {
                    flag = true; //一旦找到合适的，立即退出循环
                    break;
                }
            }
            //条件判断
            if (flag) {
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (data) {
                    $(".content_tex").val(this.result);
                    _this.renderZhushu();
                }
            } else {
                $(".tzInsertTemplate .errorTxt").html("文件名不合法,只能上传txt格式");
                removeSpan = setInterval(function () {
                    $(".tzInsertTemplate .errorTxt").empty();
                    _this.clearInterval(removeSpan);
                }, 5000);
                return;
            }
            _this.closeLayerInsert();
        },

        //注单列表删除事件
        removeThisItem:function(obj) {
            var _this = this;
            $(obj).parent().parent().trigger("mouseout");
            $(obj).parent().parent().remove();
            _this.calcAll();
            _this.bindYuxuan();
            if ($("#zhudanList .re_touzhu_tem").length <= 0) {
                $("#zhudanList").html('<tr class="noRecord"><td>暂无投注项</td></tr>');
                //清除追号模板
                var flag = $(".clearLiZhudanbtn").attr('sp');
                if(flag == 1){
                    _this.zhTempletHideOrShow();
                }
            } else{
                $("#zhInfo .tabs ul li:first-child").trigger('click');
            }
        },

        // 清除和显示追号模板
        // zhTempletHideOrShow: function() {
        //     var obj = $('.clearLiZhudanbtn').children();
        //     var spStauts = $(obj).parent().attr("sp");
        //
        //     //是追加按钮点击执行
        //     $("#zhInfo").show();
        //     $("#zhInfo .list_wrap_zh").hide();
        //     var f_Or_t = $(obj).find(".imgZh").hasClass('imgZhCancle');
        //
        //     if (spStauts == 1) {
        //         if (f_Or_t == true) {
        //             $(obj).children().removeClass('imgZhCancle');
        //         }
        //         $(obj).parent().attr("sp", "0");
        //         $("#zhInfo").hide();
        //     } else if (spStauts == 0) {
        //         if (f_Or_t == false) {
        //             $(obj).children().addClass('imgZhCancle');
        //         }
        //         $(obj).parent().attr("sp", "1");
        //         $("#zhInfo .tabs ul li:first-child").trigger('click');
        //         $("#zhInfo .list_wrap_zh").eq(0).show();
        //     }
        // },

        //获取错误重组双色红球号码格式
        getReNum:function (str){
            var num1 = str[0].toString().length; //红码字符串长度
            var num1str = str[0].toString();
            var numArr = [];
            var numArrStr = '';

            if (num1 % 2 == 0) {
                var weiN1 = 0;
                for (var n1 = 0; n1 < num1; n1 += 2) {
                    numArr.push(num1str.substr(n1, 2));
                    weiN1 += (weiN1 + 2);
                }
            } else {
                var weiN2 = 0;
                for (var n2 = 0; n2 <= num1 / 2; n2++) {
                    if (n2 == num1 / 2) {
                        numArr.push(num1str.substr(weiN2, num1 / 2));
                    } else {
                        numArr.push(num1str.substr(weiN2, 2));
                    }
                    weiN2 += (weiN2 + 2);
                }
            }

            for(var x = 0; x < numArr.length; x++){
                if(x != numArr.length -1 ){
                    numArrStr += numArr[x] + ' ';
                } else{
                    numArrStr += numArr[x];
                }
            }

            return numArrStr;
        },

        //追号信息获取
        // getZhuihaoList: function(callback) {
        //     if (typeof zhuihaoSscOpenTimeList == 'undefined') {
        //         return;
        //     }
        //     ajaxRequest({
        //         url: CONFIG.BASEURL + "ssc/ajaxGetLatestOpenTimeList.json",
        //         data: {
        //             playGroupId: playGroupId   // 全局变量
        //         },
        //         beforeSend: function(){
        //         },success: function(json) {
        //             if (json.result != 1) {
        //                 return;
        //             }
        //             zhuihaoSscOpenTimeList = json.sscOpenTimeList;
        //             if (typeof callback == 'function') {
        //                 callback();
        //             }
        //         }
        //     });
        // },

        //获取赔率基数,用于计算滑条最低奖金
        getPljs:function(){
            return $(".playPlIdBtn.acti").attr("data-pljs");
        },

        getNoWeiStr:function (arr) {
            var checkArr = [], checkStrArr = [];
            checkArr = arr;
            for (var i = 0; i < checkArr.length; i++) {
                if (checkArr[i] == 1) {
                    checkStrArr.push("万");
                } else if (checkArr[i] == 2) {
                    checkStrArr.push("千");
                } else if (checkArr[i] == 3) {
                    checkStrArr.push("百");
                } else if (checkArr[i] == 4) {
                    checkStrArr.push("十");
                } else if (checkArr[i] == 5) {
                    checkStrArr.push("个");
                }
            }
            return checkStrArr;
        },

        alertmsg : function(context){
            if (this.alertContext != ''){
                this.alertContext = this.alertContext +"<br>"
            }
            layer.alert(this.alertContext+context, {
                title: '温馨提示',
                skin: 'layui-layer-popup layui-layer-rim', //加上边框
                area: ['300px', '150px'], //宽高
            });
            if (context != ''){
                this.alertContext = '';
            }
        },


        //后三直选--获取所选号码分散为三位所有组合的和值
        getHezNewArrs:function (hZArr) {
            var heZhiArr = [], shuArr = [], tempArr = [];
            var sumTemp = 0;
            var num = 0; //当前号码
            var fjHaoZuhe = []; //分解号组合

            heZhiArr = hZArr;

            //号码分解---所选号分解成所有组合的值等于此号的所有组合
            for (var i = 0; i < heZhiArr.length; i++) {
                var temp = [];
                sumTemp = parseInt(heZhiArr[i]);
                num = parseInt(heZhiArr[i]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                //所选号码分解至零，被分解出所有的号码三个为一组，所组成的所有组合的每一组值等于所选号的值的组合数
                for (var n = 0; n < temp.length; n++) {
                    for (var m = 0; m < temp.length; m++) {
                        for (var mn = 0; mn < temp.length; mn++) {
                            if (temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9) {
                                fjHaoZuhe.push(temp[n] + "" + temp[m] + "" + temp[mn]);
                            }
                        }
                    }
                }
                tempArr = fjHaoZuhe.uniqueArr();
            }
            return tempArr;
        },

// 获取万、千、百、十、个固定位数的个数所组成5位所有组合
        getNewArrs: function(wanA, qianA, baiA, shiA, geA) {
            var wArr = [], qArr = [], bArr = [], sArr = [], gArr = [];
            wArr = wanA;
            qArr = qianA;
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var w = 0; w < wArr.length; w++) {
                for (var q = 0; q < qArr.length; q++) {
                    for (var b = 0; b < bArr.length; b++) {
                        for (var s = 0; s < sArr.length; s++) {
                            for (var g = 0; g < gArr.length; g++) {
                                tempArr.push(wArr[w] + "" + qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                            }
                        }
                    }
                }
            }
            return tempArr;
        },
        // 获取千、百、十、个固定位数的个数所组成4位所有组合
        getFourNewArrs:function (qianA, baiA, shiA, geA) {
            var qArr = [], bArr = [], sArr = [], gArr = [];
            qArr = qianA;
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var q = 0; q < qArr.length; q++) {
                for (var b = 0; b < bArr.length; b++) {
                    for (var s = 0; s < sArr.length; s++) {
                        for (var g = 0; g < gArr.length; g++) {
                            tempArr.push(qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                        }
                    }
                }
            }
            return tempArr;
        },
        // 获取百、十、个固定位数的个数所组成(后三直选--后三组合)
        getHszhNewArrs:  function (baiA, shiA, geA) {
            var bArr = [], sArr = [], gArr = [];
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                        tempArr.push(sArr[s] + "" + gArr[g]);
                        tempArr.push(gArr[g]);
                    }
                }
            }
            return tempArr;
        },
// 后三直选-跨度所选跨度值所有组合
        getKaduNewArrs: function(kDArr) {
            var kaDuArr = [], tempArr1 = [], tempArr2 = [], tempArr3 = [];
            var allArr = [];
            for (var t = 0; t < 10; t++) {
                tempArr1[t] = t;
                tempArr2[t] = t;
                tempArr3[t] = t;
            }
            var maxZhi = 0, minZhi = 0, tempZhi = 0;
            kaDuArr = kDArr;
            for (var i = 0; i < kaDuArr.length; i++) {
                tempZhi = parseInt(kaDuArr[i]);
                for (var n = 0; n < tempArr1.length; n++) {
                    for (var n1 = 0; n1 < tempArr2.length; n1++) {
                        for (var n2 = 0; n2 < tempArr3.length; n2++) {
                            maxZhi = tempArr1[n] > tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                            maxZhi = maxZhi > tempArr3[n2] ? maxZhi : tempArr3[n2];
                            minZhi = tempArr1[n] < tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                            minZhi = minZhi < tempArr3[n2] ? minZhi : tempArr3[n2];
                            if ((maxZhi - minZhi) == tempZhi) {
                                allArr.push(n + "" + n1 + "" + n2);
                                maxZhi = 0;
                                minZhi = 0;
                            }
                        }
                    }
                }
            }
            return allArr;
        },
        /**
         * 后三组选-组三复式
         */
        getZuXuanNewArrs:function(zuXuanArr) {
            var tempArr = [], zxArr = [];
            zxArr = zuXuanArr;

            for (var i = 0; i < zxArr.length - 1; i++) {
                for (var i1 = 1; i1 < zxArr.length; i1++) {
                    if (zxArr[i1] != zxArr[i]) {
                        tempArr.push(zxArr[i] + "" + zxArr[i1] + "" + zxArr[i1]);
                        tempArr.push(zxArr[i1] + "" + zxArr[i] + "" + zxArr[i]);
                    }
                }
            }
            tempArr = tempArr.uniqueArr();
            return tempArr;
        },


        //后三组选-组选包胆
        getZxbdNewArrs:function(zuXuanArr) {
            var tempArr = [], bdArr = [];
            bdArr = zuXuanArr;
            for (var n = 0; n < bdArr.length; n++) {
                for (var n1 = 0; n1 < 10; n1++) {
                    for (var n2 = 0; n2 < 10; n2++) {
                        if (bdArr[n] != n1 && bdArr != n2 && n1 != n2 || n1 == n2 && bdArr[n] != n2 || n2 == bdArr[n] && bdArr[n] != n1 || n1 == bdArr[n] && bdArr[n] != n2) {
                            var sortArr = [];
                            sortArr.push(bdArr[n]);
                            sortArr.push(n1);
                            sortArr.push(n2);
                            sortArr.sort();
                            tempArr.push(sortArr.join(""));
                        }
                    }
                }
            }

            tempArr = tempArr.uniqueArr();
            return tempArr;
        },

        //后三组选-组六复式
        getZuLiuNewArrs:function(zuXuanArr) {
            var tempArr = [], zxArr = [];
            zxArr = zuXuanArr;
            for (var i = 0; i < zxArr.length; i++) {
                for (var i1 = 0; i1 < zxArr.length; i1++) {
                    for (var i2 = 0; i2 < zxArr.length; i2++) {
                        if (zxArr[i] != zxArr[i1] && zxArr[i1] != zxArr[i2] && zxArr[i] != zxArr[i2]) {
                            var sortArr = [];
                            sortArr.push(zxArr[i]);
                            sortArr.push(zxArr[i1]);
                            sortArr.push(zxArr[i2]);
                            sortArr.sort();
                            tempArr.push(sortArr.join(""));
                        }
                    }
                }
            }
            tempArr = tempArr.uniqueArr();
            return tempArr;
        },

        //后三组选-组选和值
        getZxhzNewArrs:function(zuXuanArr) {
            var heZhiArr = [], tempArr = [];
            var sumTemp = 0;
            var num = 0; //当前号码
            var fjHaoZuhe = []; //分解号组合

            heZhiArr = zuXuanArr;
            //号码分解---所选号分解成所有组合的值等于此号的所有组合
            for (var i = 0; i < heZhiArr.length; i++) {
                var temp = [];
                sumTemp = parseInt(heZhiArr[i]);
                num = parseInt(heZhiArr[i]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                //获取所选号的组选三和组选六形态的所有组数（不包含豹子号、顺序不限）
                for (var n = 0; n < temp.length; n++) {
                    for (var m = 0; m < temp.length; m++) {
                        for (var mn = 0; mn < temp.length; mn++) {
                            if (temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9) {
                                if (temp[m] != temp[n] && temp[n] != temp[mn] && temp[mn] != temp[n]) {
                                    var sortArr = [];
                                    sortArr.push(temp[n]);
                                    sortArr.push(temp[m]);
                                    sortArr.push(temp[mn]);
                                    sortArr.sort();
                                    fjHaoZuhe.push(sortArr.join(""));

                                }
                            }
                        }
                    }
                }

            }
            tempArr = fjHaoZuhe.uniqueArr();
            return tempArr;
        },
        // 获取百、十、个固定位数的个数所组成3位所有组合
        getThreeNewArrs:function(baiA, shiA, geA) {
            var bArr = [], sArr = [], gArr = [];
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                    }
                }
            }
            return tempArr;
        }

    });

});
