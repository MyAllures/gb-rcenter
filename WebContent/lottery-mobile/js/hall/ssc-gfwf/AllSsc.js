define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        tmpBetContent:null,
        gfwfPlJson : null,
        _this: null,
        init: function () {
            _this = this;
            this._super();
            this.selectFun();
            this.bindEvent();
            this.getGfwfAllOdd();
            this.isGfwf();
        },

        //传统,官方玩法切换
        isGfwf: function () {
            var _this = this;
            mui("body").on("tap", "a#is-gfwf", function () {
                var flag = $(this).attr("data-flag");
                _this.gotoUrl(root + '/' + _this.type + '/' + _this.code + '/index.html?betCode=&isGfwf='+flag);
            });
        },

        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("a[data-bet-num]");
                        var $tds = $(this).find("td");
                        oddsar = data[subCode];
                    });
                }
            })
        },

        selectFun: function () {
            var _this = this;
            document.getElementById("show-t-gfwf").addEventListener('tap',function(){
                document.getElementById("dingdan").classList.toggle('mui-active');
            });

            //直选复式
            mui(".x_3.gfwf-playName")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.toggle('Fixed');
            });
            mui(".gfwf-bg")[0].addEventListener('tap',function(){

                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            });

            //头部选择
            mui("div.s-menu").on('tap','a',function(){
                $("a.selected-btn.mui-active").removeClass("mui-active");
                this.classList.toggle('mui-active');
                var dataCode=$("a.selected-btn.mui-active").attr("data-code");
                var dataPlayId="";
                    $("a.selected-btn.main.mui-active").attr("data-play_id");
                if($("a.selected-btn.main.mui-active").size()>0){
                    dataPlayId=$("a.selected-btn.main.mui-active").attr("data-play_id");
                }
                _this.gotoUrl(root + '/' + _this.type + '/' + _this.code + '/index.html?betCode=' + dataCode+'&isGfwf=1&playCode='+dataPlayId);
                if(dataCode=="ssc_yixing" || dataCode=="ssc_wuxing_zhixuan" || dataCode=="ssc_sixing_zhixuan" ){
                    mui(".gfwf-wrap")[0].classList.remove('Fixed');
                }
                _this.getOdds();
                _this.getGfwfAllOdd();
            });

            //选择球
            mui(".screen-munber.gfwf").on('tap','a',function(){
                this.classList.toggle('mui-active');
                $(this).parent().parent().parent().prev().find("i.mui-control-item").removeClass("mui-active");
                _this.getZhuShu();
            });
            //清
            mui(".newball-content-top").on('tap','.qing',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                _this.getZhuShu();

            });
            //全
            mui(".newball-content-top").on('tap','.quan',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).addClass("mui-active");
                _this.getZhuShu();
            });
            //大
            mui(".newball-content-top").on('tap','.da',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                var Aarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                var Barr = [, , , , , 5, 6, 7, 8, 9];
                for (var i = 0; i <= Aarr.length; ++i) {
                    if (Aarr[i] == Barr[i]) {
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //小
            mui(".newball-content-top").on('tap','.xiao',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                var Aarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                var Barr = [0, 1, 2, 3, 4, , , , ,];
                for (var i = 0; i <= Aarr.length; ++i) {
                    if (Aarr[i] == Barr[i]) {
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //奇
            mui(".newball-content-top").on('tap','.ji',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                for (var i = 0; i < 12; i++) {
                    if (i%2 != 0) {   //奇数
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //偶
            mui(".newball-content-top").on('tap','.ou',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                for (var i = 0; i < 12; i++) {
                    if (i%2 == 0) {   //奇数
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });

            //机选
            mui(".btn-jixuan-gfwf")[0].addEventListener('tap',function(){
                this.classList.remove('mui-active');
                $("div.newball-item-20 a").removeClass("mui-active");
                mui(".btn-reset-gfwf")[0].classList.add('mui-active');
                var randomName=$("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-fun_random");
                eval("_this."+randomName + "()");
                _this.getZhuShu();
            });
            //机选清除
            mui(".btn-reset-gfwf")[0].addEventListener('tap',function(){
                this.classList.remove('mui-active');
                mui(".btn-jixuan-gfwf")[0].classList.add('mui-active');
                $("div.newball-item-20 a").removeClass("mui-active");
                _this.getZhuShu();
            });

        },

        //获取注数
        getZhuShu : function () {
            var zhushuName = $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-fun_zhushu");
            var zhushu = eval("_this."+zhushuName + "()");
            $("#quantity").text(zhushu);
            $("#inputMoney").text(zhushu*2);//目前写死
        },

        bindEvent: function () {
            var _this=this;
            mui("#betCodeDiv").on('tap', 'a', function () {
                $("#betCodeDiv a").removeClass("mui-active");
                $(this).addClass("mui-active");
                _this.getOdds();
            });
            //清除下注按钮点击事件
            mui("body").on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });

            // 确认事件绑定
            mui("#dingdan").on('tap','#queding',function(){
                // 注单
                var betForm = {
                    totalMoney: parseFloat($("#betContent_totalMoney").text())+"",
                    quantity: Number($("#betContent_zhushu").text()),
                    playModel:1,//1代表官方玩法
                    betOrders: []
                };
                betForm.betOrders.push({
                    code: _this.code,//彩种
                    expect: $('font#expect').text(),//期号
                    playCode: $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-code"),//彩种玩法
                    betCode:  $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_id"),//投注玩法
                    betCount: $("#quantity").text(),//注数
                    betAmount: $("#betContent_totalMoney").text(),//下注总额。
                    betNum: _this.tmpBetContent,//下注号码
                    odd: $("#betContent_playPl").text(),//奖金
                    multiple: $("#betContent_inputBeishu").val(),//倍数
                    bonusModel: $("span.mode_select.selected").attr("data-value"),//元角分模式
                    rebate: Number($("#betContent_fanli").attr("data-value"))/100+""//返点比例
                });

                mui.ajax(root + '/' + _this.type + '/' + _this.code + '/saveBetOrder.html', {
                    data: {betForm: JSON.stringify(betForm)},
                    dataType: 'json',
                    type: 'POST',
                    beforeSend: function () {
                        _this.closeConfirmOrder();
                        _this.gfwfCloseConfirmOrder();
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
                // Tools.toast("号码选择不完整，请重新选择");
                this.toast("号码选择不完整，请重新选择");
                return;
            }

            var plAndMaxFd = _this.getPlAndMaxFd();   // 获取当前选中的玩法赔率和返点
            /*var pljs = this.getPljs();   // 当前基数*/
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
                maxPlayPl = plAndMaxFd[0].odd;  // 最高赔率
                maxFandian = plAndMaxFd[0].rebate*100;    // 最大返点
                // var pljsarr = pljs.split('|');
                // minPl = Math.floor((plAndMaxFd[0].odd-Number(plAndMaxFd[0].baseNum)*plAndMaxFd[0].rebate)*1000)/1000;   // 最低赔率
                minPl = _this.getArgNum((plAndMaxFd[0].odd-Number(plAndMaxFd[0].baseNum)*plAndMaxFd[0].rebate)) // 最低赔率
            } else {
                maxPlayPl = plAndMaxFd.odd;  // 最高赔率
                maxFandian = plAndMaxFd.rebate*100;    // 最大返点
                minPl =_this.getArgNum((plAndMaxFd.odd-Number(plAndMaxFd.baseNum)*plAndMaxFd.rebate));   // 最低赔率
            }
            convertBlMoney = (maxPlayPl - minPl) / maxFandian;  // 每1%转换赔率

            // 投注内容
            _this.tmpBetContent = data;

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
            var content = Template('gfwf_template_order', {"quantity": Number($("#quantity").text()),"firstShowPl":firstShowPl,"totalMoney":Number($("#quantity").text())*2, "canWin": parseFloat((2 * maxPlayPl * 1).toFixed(3))});
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
                    _this.renderZhushu();
                }
            });


            // 单注金额变化
            $("#betContent_inputMoney").keyup(function() {
                // 渲染下注总额，奖金等等
                _this.renderZhushu();
            });

            // 倍数变化
            $("#betContent_inputBeishu").keyup(function() {
                // 渲染下注总额，奖金等等
                _this.renderZhushu();
            });


            // $("#ischange").change(function() {
            //     alert("checked");
            // });

            // 模式选择
            $(".mode_select").click(function() {
                $(".mode_select.selected").removeClass("selected");
                $(this).addClass("selected");
                // 渲染下注总额，奖金等等
                _this.renderZhushu();
            });

            // 加号
            $(".dzje_add").click(function() {
                $("#betContent_inputMoney").val(parseInt($("#betContent_inputMoney").val()) + 1);
                // 渲染下注总额，奖金等等
                _this.renderZhushu();
            });

            $(".beishu_add").click(function() {
                $("#betContent_inputBeishu").val(parseInt($("#betContent_inputBeishu").val()) + 1);
                // 渲染下注总额，奖金等等
                _this.renderZhushu();
            });

            $(".beishu_remove").click(function() {
                var num = parseInt($("#betContent_inputBeishu").val()) - 1;
                if(num <= 0){
                    return;
                }
                $("#betContent_inputBeishu").val(parseInt($("#betContent_inputBeishu").val()) - 1);
                // 渲染下注总额，奖金等等
                _this.renderZhushu();
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
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-fun_content");
        },
        /**
         * 获取当前赔率注数算法
         */
        getPlayPlFun_zhushu:function() {
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-fun_zhushu");
        },
        /**
         * 获取当前玩法ID
         */
        getPlayId:function () {
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_id");
        },


        /**
         * 获取当前赔率ID
         */
        getPlayPlId: function() {
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_pl_id");
        },

        /**
         * 获取当前期数
         */
        getNumber:function() {
            return $("#number").attr("data-number");
        },

        /*//获取赔率基数,用于计算滑条最低奖金
        getPljs:function(){
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-pljs");
        },*/

        /**
         * 获取当前赔率ID2
         */
        getPlayPlId2 : function() {
            var arrTemp = null;
            var indexStr = ($("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_pl_id")).toString();
            if(indexStr.indexOf("|") > 0){
                arrTemp = indexStr;
            }else {
                arrTemp = $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_pl_id");
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
            if (mode == 0) {
                tmpMode = 1;
            } else if (mode == 1) {
                tmpMode = 0.1;
            } else if (mode == 2) {
                tmpMode = 0.01;
            } else {
                return;
            }

            var totalMoney = parseFloat((money * zhushu * beishu * tmpMode).toFixed(3));  // 总金额
            var canWin = parseFloat(money * beishu * playPl * tmpMode);  // 可获奖金

            $("#betContent_totalMoney").html(totalMoney.toFixed(3));
            $("#betContent_canWin").html(canWin.toFixed(3));
        },

        /** 显示Loading */
        gfwfShowLoading: function () {
            if ($("#loadingPopover").length > 0) {
                $("#loadingPopover").addClass("mui-active");
            } else {
                var html = '<div id="loadingPopover" class="mui-popover popup-up-diy loading-diy mui-active">'
                    + '<div id="loading"><img src="' + resRoot + '/images/three-dots.svg"></div>'
                    + '<div class="mui-backdrop mui-active" style=""></div></div>';
                $("body").append(html);
            }
        },


        /**
         * 关闭下注清单
         */
        gfwfCloseConfirmOrder: function () {
            $("#dingdan").html('');
            $("#dingdan").removeClass('mui-active');
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
        uniqueArr:function (obj) {
            var temp = new Array();
            obj.sort();
            for(i = 0; i < obj.length; i++) {
                if( obj[i] == obj[i+1]) {
                    continue;
                }
                temp[temp.length]=obj[i];
            }
            return temp;
        }

    });
});