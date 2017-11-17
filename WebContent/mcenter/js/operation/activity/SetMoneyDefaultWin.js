/**
 * 创建优惠活动-活动分类管理js
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        maxRange: 10,

        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            $('[data-toggle="popover"]',this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            //计算输入玩家账号人数
            $(_this.formSelector).on("blur", "textarea[name='usernames']", function () {
                _this.userNamesCuont();
                _this.validRemainCount(null,null,false);
            });

            $(_this.formSelector).on("blur","input[name='result.winCount']",function () {
                _this.validRemainCount(null,null,false);

            });
            //这里初始化所有的事件
        },

        myValidateFrom:function (e, opt) {
            if(!this.validateForm(e)){
                $(e.currentTarget).unlock();
                return false;
            }

            this.validRemainCount(e,opt,true);

            return false;
        },

        validRemainCount:function (e,opt,fromSaveBtn) {
            var _this = this;
            var input = $("[name='result.winCount']");
            var tv = $(input).val();
            if(!tv||tv<0){
                return;
            }
            var awardsId = $("[name='result.activityMoneyAwardsRulesId']").val();
            if(!awardsId){
                return;
            }
            var playerCount = $("[name='usernames']").val();
            if(!playerCount){
                return;
            }
            var pcArr = playerCount.split(",");
            var pcount = pcArr.length;
            window.top.topPage.ajax({
                url: root + '/activityMoneyDefaultWin/fetchActivityAwardsRules.html?id='+awardsId,
                dataType: "json",
                success: function (data) {
                    if(data){
                        var remainCount = data.remainCount;
                        var count = pcount*tv;
                        if(remainCount==0){
                            var msg = ""+window.top.message.operation['activity.defaultset.remaincount_empty']+"";
                            if(fromSaveBtn==true){
                                window.top.topPage.showConfirmMessage(msg,function (state) {});
                            }else {
                                page.showPopover({"currentTarget":$(input)},{},"danger",msg,true);
                            }

                            return;
                        }
                        if(count>remainCount){
                            var msg = "" + window.top.message.operation['activity.defalutset.remaincount.notEnough']+"";
                            msg = _this.formatStr(msg,remainCount,count);
                            if(fromSaveBtn==true){
                                window.top.topPage.showConfirmMessage(msg,function (state) {})
                            }else{
                                page.showPopover({"currentTarget":$(input)},{},"danger",msg,true);

                            }
                        }else{
                            if(fromSaveBtn){
                                window.top.topPage.doAjax(e,opt);
                            }

                        }
                    }else{
                        if(fromSaveBtn){
                            window.top.topPage.doAjax(e,opt);
                        }
                    }
                },
                error: function () {
                    $(e.currentTarget).unlock();
                }
            });
        },
        setAmount:function (e) {
            var _this = this;
            if(e.key){
                $("[name='result.amount']").val(e.value);
                _this.validRemainCount();
            }
        },

        showAllPlayerUsername:function (e, opt) {
            var dataId = opt.dataId;
            $("#all-player-username-"+dataId).removeClass("hide");
            $(".open-player-div-"+dataId).addClass("hide");
            $(".hide-player-div-"+dataId).removeClass("hide");
            page.resizeDialog();
            $(e.currentTarget).unlock();
        },
        hideAllPlayerUsername:function (e, opt) {
            var dataId = opt.dataId;
            $("#all-player-username-"+dataId).addClass("hide");
            $(".open-player-div-"+dataId).removeClass("hide");
            $(".hide-player-div-"+dataId).addClass("hide");
            page.resizeDialog();
            $(e.currentTarget).unlock();
        },
        /**
         * 确定删除有优惠的活动分类
         *
         */
        cancelDefaultWin: function (e,opt) {
            var _this = this;
            var id = opt.dataId;
            window.top.topPage.ajax({
                url: root + '/activityMoneyDefaultWin/cancelDefaultWin.html',
                data: {"search.id": id},
                dataType: "json",
                success: function (data) {
                    if (data.state) {
                        var msg = window.top.message.operation_auto['操作成功'];
                        if(data.msg){
                            msg = data.msg;
                        }
                        page.showPopover(e,{},"success",msg,true);
                        _this.resizeDialog();//重新定义弹窗窗口大小
                        _this.reloadDialog(e,opt);
                    } else {
                        //window.top.topPage.showErrorMessage(data.msg);
                        var msg = data.msg;
                        if(msg == ""){
                            msg = window.top.message.operation_auto['操作失败'];
                        }
                        page.showPopover(e,{},"danger",msg,true);
                    }
                    $(e.currentTarget).unlock();
                },
                error: function () {
                    $(e.currentTarget).unlock();
                }
            });
        },
        reloadDialog:function(e,opt){
            window.location.href =  window.location.href
        },
        /**
         * 计算输入玩家账号人数
         */
        userNamesCuont: function () {
            var userNames = $.trim($("textarea[name=usernames]").val());
            if (userNames != "") {
                var last = userNames.charAt(userNames.length - 1);
                if (last == '\n') {
                    userNames = userNames.substring(0, userNames.length - 1);
                }
                while (userNames.indexOf("\n")>-1){
                    userNames = userNames.replace("\n",",");
                }
                var newString = "";
                var spilt = userNames.split(",");
                var errorNames= "";
                for (var i = 0; i < spilt.length; i++) {
                    //
                    var newStr = spilt[i].replace(/^\s+|\s+$/g, '');
                    var bol = /^[a-zA-Z0-9_]{4,15}$/.test(newStr);
                    if(!bol){
                        errorNames += newStr+",";
                    }else{
                        newString += newStr + ",";
                    }


                }
                if(errorNames!=""){
                    errorNames = "<pre>"+errorNames+"</pre>";
                    var e={};
                    e.currentTarget = $("textarea[name=usernames]");
                    var msg = window.top.message.operation['activity.defaultset.playeraccount.formatErr'];
                    page.showPopover(e,{},"danger",msg,true);
                    $(".btn-save-defaultwin").attr("disabled",true);
                    return;
                }else{
                    $(".btn-save-defaultwin").attr("disabled",false);
                }
                if (newString != "") {
                    newString = newString.substring(0, newString.length - 1);
                    $("textarea[name=usernames]").val(newString);
                }
            }

        },
        /**
         * 示例删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            this.returnValue = true;
            if(option.data.state){
                //window.top.topPage.closeDialog();
                this.reloadDialog(e,option);
            }else{
                page.showPopover(e,{},"danger",option.data.msg,true);
            }

        },
        isPlayerWin:function (e, opt) {
            var _this = this;
            var id = opt.dataId;
            window.top.topPage.ajax({
                url: root + '/activityMoneyDefaultWin/hasUseDefaultWinPlayer.html',
                data: {"search.id": id},
                success: function (data) {
                    var tips1 = window.top.message.operation['cancelDefaultSetTips'];
                    if(data&&data!=""){
                        var tips2 = window.top.message.operation['cancelDefaultSetPlayerTips'];
                        tips2 = _this.formatStr(tips2,data);
                        window.top.topPage.showConfirmMessage(tips1+"</br>"+tips2,function (state) {
                            if(state){
                                window.top.topPage.doPageFunction(e,function () {
                                    _this.cancelDefaultWin(e,opt);
                                },opt);
                            }
                        })
                    }else{
                        //
                        window.top.topPage.showConfirmMessage(tips1,function (state) {
                            if(state){
                                window.top.topPage.doPageFunction(e,function () {
                                    _this.cancelDefaultWin(e,opt);
                                },opt);
                            }
                        })
                    }
                    $(e.currentTarget).unlock();
                },
                error: function () {
                    $(e.currentTarget).unlock();
                }
            });
        }
    });

});
