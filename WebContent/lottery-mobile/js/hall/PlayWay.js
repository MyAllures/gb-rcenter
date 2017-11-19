/**基本投注玩法**/
define(['site/common/BasePage', 'site/plugin/template','RangeSlider'], function (BasePage, Template) {
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
        successTime: page.successTime,
        //下注号码
        betNum:null,
        //赔率Json
        gfwfPlJson: null,
        //空注单数据
        betForm:null,
        init: function (formSelector) {
            this._super(formSelector || ".mui-off-canvas-wrap");
            this.showTable();
            //获取赔率xy
            this.getOdds();
            //获取赔率gf
            this.getGfwfOdd();
        },
        /**
         * 页面加载
         */
        onPageLoad: function () {
            this._super();
            /** 小彩种 */
            this.code = $(this.formSelector + ' input[name=code]').val();
            this.type = $(this.formSelector + " input[name=type]").val();
            var _this = this;
            this.muiInit();
            this.iosGoBack();
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;
            /*==============================信用====================================*/
            //点击下注选项
            //开盘点击效果才有
            if(page.isOpen) {
                mui("body").off('tap', 'div.bet-table-list td,div.bet-table-list .n-btn').on('tap', 'div.bet-table-list td,div.bet-table-list .n-btn', function () {
                    _this.bindTdInput($(this));
                });
            }
            //清除下注项
            mui("body").off('tap','a#del-bet1').on('tap', 'a#del-bet1', function () {
                page.resetBet();
            });
            //投注
            mui("body").off('tap','a#show-t').on("tap", 'a#show-t', function () {
                _this.betOrder();
            });

            //取消下注
            mui("body").off('tap','#cancel').on("tap", "#cancel", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
            });
            //确认投注
            mui("body").off('tap','#confirmOrder').on("tap", "#confirmOrder", function () {
                // var betForm = _this.getBetOrder();
                _this.confirmOrder(_this.betForm);
            });

            /*==================================官方============================================*/
            //开盘点击效果才有
            if(page.isOpen){
                //gfwf投注
                mui("body").off('tap','a#show-t-gfwf').on("tap", 'a#show-t-gfwf', function () {
                    $("#dingdan").addClass("mui-active");
                    _this.showBetTemplate();
                });
            }

            //清除下注按钮点击事件
            mui("body").off('tap','a#del-bet').on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });

            //取消下注
            mui("body").off('tap','#quxiao').on("tap", "#quxiao", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
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

            //选择球
            mui("li.screen-munber").off('tap','a').on('tap','a',function(){
                //判断是否为SSC包胆,K3二同号单选
                _this.checkBaodan($(this));
                this.classList.toggle('mui-active');
                $(this).parent().parent().parent().prev().find("i.mui-control-item").removeClass("mui-active");
                _this.getZhuShu();
            });
            //开盘才有效果。
            if(page.isOpen){
                mui("body").off('tap','.btn-jixuan-gfwf').on('tap','.btn-jixuan-gfwf',function(){
                    _this.jixuan();
                });
                //机选清除
                mui("body").off('tap','.btn-reset-gfwf').on('tap','.btn-reset-gfwf',function(){
                    $("div.newball-content-top i.mui-control-item").removeClass("mui-active");
                    this.classList.remove('mui-active');
                    mui(".btn-jixuan-gfwf")[0].classList.add('mui-active');
                    $("div.newball-item-20 a").removeClass("mui-active");
                    _this.getZhuShu();
                });
            }

            //清除下注按钮点击事件
            mui("body").off('tap','a#del-bet').on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });

            // 确认事件绑定
            mui("#dingdan").off('tap','#queding').on('tap','#queding',function(){
                //判断倍数是否为空
                if(_this.checkBeishu()){
                    _this.saveBetOrder();
                }

            });

        },


        jixuan:function(){
            var _this=this;
            $("div.newball-content-top i.mui-control-item").removeClass("mui-active");
            $("div.newball-item-20 a.n-btn").removeClass("mui-active");
            $("a.bottom-bar-btn.btn-jixuan-gfwf").removeClass("mui-active");
            $("a.bottom-bar-btn.btn-reset-gfwf").addClass("mui-active");
            var randomName=$("div#guanfangWanfa a.selected-btn.main.mui-active").attr("data-fun_random");
            eval("_this."+randomName + "()");
            _this.getZhuShu();
        },

        /**
         * 验证下注倍数不能为空
         * @returns {boolean}
         */
        checkBeishu: function () {
            var beishu = $("input#betContent_inputBeishu").val();
            if(beishu =="" || beishu==0 || beishu==undefined){
                this.toast("下注倍数不能为空");
                return false;
            }
            return true;
        },

        saveBetOrder: function () {
            var _this=this;
            // 注单
            var betForm = {
                code: _this.code,
                totalMoney: parseFloat($("#betContent_totalMoney").text())+"",
                quantity: Number($("#betContent_zhushu").text()),
                playModel:1,//1代表官方玩法
                betOrders: []
            };
            betForm.betOrders.push({
                code: _this.code,//彩种
                expect: $('font#expect').text(),//期号
                playCode: $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_id"),//彩种玩法
                betCode:  $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-code"),//投注玩法
                betCount: $("#quantity-gfwf").text(),//注数
                betAmount: $("#betContent_totalMoney").text(),//下注总额。
                betNum: _this.betNum,//下注号码
                odd: _this.getBetOddl(),//奖金
                multiple: $("#betContent_inputBeishu").val(),//倍数
                bonusModel: $("span.mode_select.selected").attr("data-value"),//元角分模式
                rebate: (Number($("#betContent_fanli").attr("data-value"))/100).toFixed(3)//返点比例
            });

            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/saveBetOrder.html', {
                data: {betForm: JSON.stringify(betForm)},
                dataType: 'json',
                type: 'POST',
                beforeSend: function () {
                    _this.showLoading();
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
                        page.resetBet();
                    } else {
                        _this.toast(d.msg + '[' + d.code + ']');
                    }
                },
                complete: function () {
                    _this.hideLoading();
                },error:function(xhr,type,errorThrown){
                    _this.toast('下注失败：请求异常');
                }
            });
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
                this.toast("号码选择不完整，请重新选择");
                return;
            }
            var plAndMaxFd = _this.getPlAndMaxFd();   // 获取当前选中的玩法赔率和返点
            var maxPlayPl;  // 最高赔率
            var maxFandian;  // 最大返点
            var minPl;  // 最低赔率
            var convertBlMoney;  // 每1%转换赔率
            var plSelName = '',  //赔率名称
                plSelIndex = 0;  //获取赔率索引
            if (plAndMaxFd instanceof Array) {  // 多赔率
                maxPlayPl = plAndMaxFd[0].odd;  // 最高赔率
                maxFandian = plAndMaxFd[0].rebate*100;    // 最大返点
                minPl = _this.getArgNum((plAndMaxFd[0].odd-Number(plAndMaxFd[0].baseNum)*plAndMaxFd[0].rebate)) // 最低赔率
            } else {
                maxPlayPl = plAndMaxFd.odd;  // 最高赔率
                maxFandian = plAndMaxFd.rebate*100;    // 最大返点
                minPl =_this.getArgNum((plAndMaxFd.odd-Number(plAndMaxFd.baseNum)*plAndMaxFd.rebate));   // 最低赔率
            }
            convertBlMoney = (maxPlayPl - minPl) / maxFandian;  // 每1%转换赔率
            // 投注内容
            _this.betNum = data;
            var firstShowPl = maxPlayPl.toFixed(3);
            var maxCanWin = maxPlayPl.toFixed(3);
            // 渲染界面中赔率部分
            if (plAndMaxFd instanceof Array) {  // 多赔率
                var strArr = [];
                $.each(plAndMaxFd, function(index, value) {
                    strArr.push(value.odd.toFixed(3));
                });
                maxCanWin=0;
                if(_this.checkSanxingZuhe()){
                    for(var i=0;i<strArr.length;i++){
                        maxCanWin +=parseFloat(strArr[i]);
                    }
                }else{
                    maxCanWin=strArr[0];
                }
                firstShowPl = strArr.join('|');

            }
            //弹出订单
            var content = Template('gfwf_template_order',
                {"quantity": Number($("#quantity-gfwf").text()),
                    "firstShowPl":firstShowPl,
                    "totalMoney":Number($("#quantity-gfwf").text())*2,
                    "canWin": parseFloat((maxCanWin * 1)).toFixed(3),
                    "expect":$('font#expect').text()
                });

            $("#dingdan").html(content);
            $("#dingdan").addClass('mui-active');

            // 滑块事件绑定
            $("#block-range").RangeSlider({
                min: 0,
                max: maxFandian,
                step: 0.1,
                onChange: function(obj) {
                    // 返点比例
                    var fandianBili = parseFloat($(obj).val()).toFixed(1); // 当前滚动条移动的比例
                    $("#betContent_fanli").attr("data-value", fandianBili);
                    $("#betContent_fanli").html(fandianBili + "%");    // 渲染界面中百分比部分

                    // 渲染界面中赔率部分
                    if (plAndMaxFd instanceof Array) {  // 多赔率
                        var pl = _this.getArgNum((maxPlayPl - fandianBili/100 * plAndMaxFd[0].baseNum));
                        $("#betContent_playPl").attr("data-value", pl);
                        var strArr = [];
                        var zxzh  = 0;
                        $.each(plAndMaxFd, function (index, value) {
                            strArr.push(_this.getArgNum((value.odd - fandianBili/100 * value.baseNum)).toFixed(3));
                            zxzh = _this.getArgNum(zxzh +(value.odd - fandianBili/100 * value.baseNum));
                        });
                        $("#betContent_playPl").html(strArr.join('|'));
                        if(_this.checkSanxingZuhe()) {
                            $("#betContent_playPl").attr("data-value", zxzh);
                        }
                    } else {
                        var pl = _this.getArgNum((maxPlayPl - fandianBili/100 * plAndMaxFd.baseNum));
                        $("#betContent_playPl").attr("data-value", pl);
                        $("#betContent_playPl").html(pl.toFixed(3));
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


            // 模式选择
            $(".mode_select").click(function() {
                $(".mode_select.selected").removeClass("selected");
                $(this).addClass("selected");
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

        },

        //获取注数
        getZhuShu : function () {
            var _this=this;
            var zhushuName = $("a.selected-btn.main.mui-active").attr("data-fun_zhushu");
            var zhushu = eval("_this."+zhushuName + "()");
            if(zhushu !=undefined){
                $("#quantity-gfwf").text(zhushu);
                $("#inputMoney-gfwf").text(zhushu*2);//目前写死
            }

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
         * 获取当前期数
         */
        getNumber:function() {
            return $("#number").attr("data-number");
        },

        /**
         * 获取当前赔率ID
         */
        getPlayPlId: function() {
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-play_pl_id");
        },


        // 渲染下注总额，奖金等等
        renderZhushu : function() {
            var _this=this;
            var money = $("#betContent_inputMoney").val();//圆角分
            var beishu = $("#betContent_inputBeishu").val();//倍数
            var zhushu = parseInt($("#betContent_zhushu").html());//注数
            var playPl = parseFloat($("#betContent_playPl").attr("data-value"));//奖金
            var mode = parseInt($(".mode_select.selected").attr("data-value"));
            var tmpMode = 1;
            if (mode == 1) {
                tmpMode = 1;
            } else if (mode == 10) {
                tmpMode = 0.1;
            } else if (mode == 100) {
                tmpMode = 0.01;
            } else {
                return;
            }
            if(_this.checkSanxingZuhe()){
                var playPl1=0;
                var tmpArr = $("#betContent_playPl").attr("data-value").split('|');
                $.each(tmpArr, function (index, values) {
                    playPl1 +=parseFloat(tmpArr[index]);
                });
                playPl=playPl1;
            }
            var totalMoney = parseFloat((money * zhushu * beishu * tmpMode).toFixed(3));  // 总金额
            var canWin = parseFloat(tmpMode * beishu * playPl * 1);  // 可获奖金
            $("#betContent_totalMoney").html(totalMoney.toFixed(3));
            $("#betContent_canWin").html(canWin.toFixed(3));
        },


        /**
         * 获取当前betCode
         */
        getBetCode:function () {
            return $("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-code");
        },

        /**
         * 获取赔率和最高返点
         */
        getPlAndMaxFd:function() {
            var _this = this;
            // 全局赔率变量
            var playPlId = this.getPlayPlId();   // 当前赔率ID
            var betCode = this.getBetCode();   // 当前投注玩法
            if (playPlId.toString().indexOf('|') > 0) {    // 多赔率
                var result = [];
                var tmpArr = playPlId.split('|');
                $.each(tmpArr, function (index, values) {
                    result.push(_this.gfwfPlJson[values])
                });
                return result;
            } else {// 单一赔率
                var obj = null;
                obj = _this.gfwfPlJson[playPlId];
                return obj;
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

        getBetOddl: function(){
            var _this=this;
            var odd = $("#betContent_playPl").text();
            if (odd.indexOf('|') > 0) {
                var arrOdd=odd.split('|');
                odd=arrOdd[0];
            }
            return odd;
        },

        /**
         * 关闭下注清单
         */
        gfwfCloseConfirmOrder: function () {
            $("#dingdan").html('');
            $("#dingdan").removeClass('mui-active');
        },

        getGfwfOdd:function(){
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
        },
        //头部样式
        showTable : function (){
        },

        //选择大玩法，默认给一个小玩法。
        getInitbetCode:function (betCode) {
            return betCode;
        },

        //判断是否为SSC包胆,K3二同号单选重写
        checkBaodan : function ($this) {
        },

        //针对ssc三星组合
        checkSanxingZuhe:function () {
            return false;
        },



        /*=============================信用=================================*/
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

            this.betForm = betForm;
            var _this = this;
            sessionStorage.betForm = JSON.stringify(betForm);

            this.placeOrder(betForm);
            $("#dingdan").addClass('mui-active');
            //重新操作表单
            mui("body").off('tap','a.mui-btn.mui-btn-red').on('tap', 'a.mui-btn.mui-btn-red', function () {
                if($("div.mui-input-row.zd-wrap").size()>1){
                    $("#zhushu_new").text($("#zhushu_new").text()-1);
                    $("#zongjine_new").text($("#zongjine_new").text()-$(this).parents("li.mui-table-view-cell").find("input").val());
                    var len=$(this).parent().parent().index()-1;
                    _this.betForm.betOrders.splice(len,1);
                    $(this).parent().parent().remove();
                    _this.betForm.totalMoney=$("#zongjine_new").text();
                    _this.betForm.quantity=_this.betForm.quantity-1;
                }else{
                    $("#dingdan").html('');
                    $("#dingdan").removeClass('mui-active');
                }
            });
            $(".mui-input-numbox.jinge").keyup(function() {
                var sum = 0;
                $(".mui-input-numbox.jinge").each(function(index,value){
                    _this.betForm.betOrders[index].betAmount = Number($(this).val());
                    sum += Number($(this).val());
                })
                $("#zongjine_new").text(sum);
                _this.betForm.totalMoney=sum;
            });
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
                        page.resetBet();
                    } else {
                        _this.toast(d.msg + '[' + d.code + ']');
                    }
                },
                complete: function () {
                    $("font#pl").text("");
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

        /**信用玩法
         * 获取赔率
         */
        getOdds: function () {
        },

        /**
         * 组装赔率（各自玩法各自组装赔率）信用玩法
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

    });
});