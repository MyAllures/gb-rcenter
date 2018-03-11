/**
 * 资金管理-玩家检测
 */
define(['common/BaseListPage', 'knob'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=detectForm]";
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //回车提交
            this.enterSubmit(".enter-submit");

            //玩家api刷新按钮显示
            $(this.formSelector).on('mouseover', "dl.funds-wrap dd", function () {
                $(this).children("a.refresh").show();
            })
            //玩家api刷新按钮隐藏
            $(this.formSelector).on('mouseleave', "dl.funds-wrap dd", function () {
                $(this).children("a.refresh").hide();
            })

            $("[name='search.username']").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });
            //onkeyup="this.value=this.value.replace(/^\s+|\s+$/g,'')"
            $("[name='search.username']").keyup(function () {
                var oldStr = this.value;
                var newStr =oldStr.replace(/^\s+|\s+$/g,'');
                if(oldStr!=newStr){
                    this.value = newStr ;
                }
            });
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function (form) {
            this._super(form);
            var _this=this;
            var playerId = $("input[name='playerId']").val();
            var username = $("input[name='search.username']").val();
            if (playerId != undefined && playerId != '') {
                this.loadFundRecord(null, null, playerId);
                this.loadGameOrder(playerId);
                this.loadSale(playerId,username);
                this.loadLoginIp(playerId, username);
                this.loadBank(playerId);
                this.loadRemark(playerId);
            }
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });

        },
        loadRemark: function (playerId) {
            var _this = this;
            var url = "fund/playerDetect/remarkList.html";
            window.top.topPage.ajax({
                data: {"playerId": playerId},
                url: url,
                success: function (data) {
                    $("#remarkDiv").html(data);
                    //_this.initSelect();
                    _this.checkNoRecords();
                },
                error: function (data) {

                }
            });
        },
        loadLoginIp: function (playerId, username) {
            var url = "fund/playerDetect/loginIpList.html";
            window.top.topPage.ajax({
                data: {"playerId": playerId, "username": username},
                url: url,
                success: function (data) {
                    $("#loginIpDiv").html(data);
                    $('[data-toggle="popover"]',"#loginIpDiv").popover({
                        trigger: 'hover',
                        placement: 'top'
                    });
                },
                error: function (data) {

                }
            });
        },
        loadFundRecord: function (e, option, playerId) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/playerDetect/fundRecord.html?type=all&search.playerId=" + playerId + "&t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.fund-record").html(data);
                    _this.initKnob();
                    _this.isRefresh();
                },
                error: function (data) {

                }
            });
        },

        loadBank: function (playerId) {
            var _this = this;
            var url = "fund/playerDetect/bankList.html";
            window.top.topPage.ajax({
                data: {"playerId": playerId},
                url: url,
                success: function (data) {
                    $("#bankDiv").html(data);
                },
                error: function (data) {

                }
            });
        },

        loadGameOrder: function(playerId) {
            var _this = this;
            var url = "fund/playerDetect/gameOrder.html";
            window.top.topPage.ajax({
                data: {"playerId": playerId},
                url: url,
                success: function (data) {
                    $("#gameOrderDiv").html(data);
                },
                error: function (data) {

                }
            });
        },

        loadSale: function(playerId,username) {
            var _this = this;
            var url = "fund/playerDetect/sale.html";
            var rakeback = $("#saleDiv").attr("rakeback");
            window.top.topPage.ajax({
                data: {"playerId": playerId,"username":username,"rakeback":rakeback},
                url: url,
                success: function (data) {
                    $("#saleDiv").html(data);
                    $('[data-toggle="popover"]',"#saleDiv").popover({
                        trigger: 'hover',
                        placement: 'top'
                    });
                },
                error: function (data) {

                }
            });
        },

        checkQuery: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    url: window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: window.top.topPage.getCurrentFormData(event),
                    success: function (data) {
                        var form = window.top.topPage.getCurrentForm(event);
                        var $result = $(".check-search-list", form);
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(msg);
                        $(event.currentTarget).unlock();
                    }
                });
            } else {
                $(event.currentTarget).unlock();
            }
        },
        loginIpException: function (e, p) {
            var _this = this;
            $('#loginIpException').modal('show');
            //$('.modal-dialog').css("width","1200px");
            $(e.currentTarget).unlock();
        },
        /**
         * 初始化knob
         */
        initKnob: function () {
            //环形样式
            $(".dial").knob(
                {
                    'format': function (v) {
                        return v + '%';
                    }
                }
            );
        },
        /**
         * 能否同步刷新
         */
        isRefresh: function () {
           /* var time = new Date(eval("(" + $("a.totalRefresh").attr("data-rel") + ")").nowTime);
            var timeNext = new Date(eval("(" + $("a.totalRefresh").attr("data-rel") + ")").synTime);
            time.setSeconds(time.getSeconds() - this.timeInterval);
            if (time <= timeNext) {
                $("a.totalRefresh").addClass("countdown");
                timeNext = new Date();
                timeNext.setSeconds(timeNext.getSeconds() + this.timeInterval);

                $("a.totalRefresh").countdown(timeNext, function (event) {
                }).on('finish.countdown', function () {
                    $("a.totalRefresh").removeClass("countdown");
                });
            }
            var _this = this;
            $("a.refreshApi").each(function () {
                var time = new Date(eval("(" + $(this).attr("data-rel") + ")").nowTime);
                var timeNext = new Date(eval("(" + $(this).attr("data-rel") + ")").synTime);
                time.setSeconds(time.getSeconds() - _this.timeInterval);
                if (time <= timeNext) {
                    $(this).addClass("countdown");
                    timeNext = new Date();
                    timeNext.setSeconds(timeNext.getSeconds() + _this.timeInterval);

                    $(this).countdown(timeNext, function (event) {
                    }).on('finish.countdown', function () {
                        $(this).removeClass("countdown");
                    });
                }
            });*/
        },
        refresh: function (e, option) {
            $("#refreshTime").hide();
            $("#totalAssets").hide();
            $("#walletBalance").hide();
            var playerId = option.playerId;
            var apiId = option.apiId;
            if (apiId){
                $(".api-"+apiId+"").hide();
                $(".loading-"+apiId+"").show();
            }else {
                $(".game").hide();
                $(".loading-api").show();
            }
            $(".m-loading-icon-x").show();

            var url = root + "/fund/playerDetect/fundRecord.html?search.playerId=" + playerId + "&t=" + new Date().getTime();
            if (apiId) {
                url = url + "&type=api&search.apiId=" + apiId;
            } else {
                url = url+"&type=all";
            }
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $(_this.formSelector + " .fund-record").html(data);
                    _this.initKnob();
                    $(e.currentTarget).unlock();
                },
                complete: function () {
                    var obj = $(".api-info");
                    for (var i = 0; i < obj.length; i++) {
                        $(obj[i]).next(".loading-api").hide();
                        $(obj[i]).show();
                    }
                    $(".m-loading-icon-x").hide();
                    $("#walletBalance").show();
                    $("#totalAssets").show();
                    $("#refreshTime").show();
                    $(e.currentTarget).unlock();
                }
            });
        },
        refreshPrecall: function (e, opt) {
           /* var $target = $(e.currentTarget);
            if ($target.hasClass("countdown")) {
                return false;
            }*/
            return true;
        }
    })
});