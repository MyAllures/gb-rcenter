define(['site/plugin/template'], function (Template) {
    return Class.extend({
        //大彩种
        type: null,
        //小彩种
        code: null,
        //基本路径
        baseUrl: null,
        init: function () {
            this.type = $('[name=type]').val();
            this.code = $('[name=code]').val();
            this.baseUrl = root + '/' + this.type;
            this.bindButtonEvents();
            this.onPageLoad();
            this.setShortcutkeyButton();
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
            })
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
                    $(this).addClass("bg-yellow");
                }
            });
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
            ajaxRequest({
                url: _this.baseUrl + '/' + _this.code + '/saveBetOrder.html',
                data: {betForm: JSON.stringify(data)},
                beforeSend: function () {
                    layer.closeAll();
                    page.showLoading();
                    $("button[type=submit]").attr("disabled","disabled");
                },
                success: function (data) {
                    var d = data.code[0];
                    //code代码为100表示成功
                    if (d && d.code && d.code == '100') {
                        layer.msg(d.msg, {icon: d.icon});
                        $("font#money",parent.document).text(data.balance);
                        if($("#bottomInfo .tabs .acti").length>0 && $("#bottomInfo .tabs .acti").data("tab") == 'myBet'){
                            // 刷新我的投注
                            page.getMyOrders();
                        }
                        // 重置表格
                        _this.clearTdInput();
                    } else {
                        layer.msg(d.msg + '[' + d.code + ']', {icon: d.icon});
                    }
                },
                complete: function () {
                    $("button[type=submit]").removeAttr("disabled");
                    page.hideLoading();
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
        }
    });

});
