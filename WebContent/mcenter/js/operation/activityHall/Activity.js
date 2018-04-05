/**
 * Created by eagle on 15-8-27.
 */

define(['common/BaseListPage', 'bootstrapswitch'], function (BaseListPage,bootstrapSwitch) {

    return BaseListPage.extend({

        init:function() {
            this._super();
        },
        bindEvent: function () {
            var _this = this;
            $(this.formSelector).on("switchChange.bootstrapSwitch", 'input[name="my-checkbox"]',function(event , status) {
                var $this = $(this);
                var id = $this.attr('pid');
                var code = $this.attr('code');
                var _states = $this.attr('states');
                var oldDisplay = $this.attr("isDisplay");
                var _msgTitle = "";
                var _msg = "";
                $this.bootstrapSwitch('indeterminate',true);
                if(_states=='notStarted') {
                    _msg =window.top.message.operation_auto['当前活动尚未开始']
                } else if(_states=='processing') {
                    _msg =window.top.message.operation_auto['当前活动正在进行中']
                } else {
                    _msg=window.top.message.operation_auto['关闭后将不在玩家中心展示'];
                }
                if(code=='money'){
                    if(oldDisplay == "false"){
                        if (status) {
                            _msgTitle="<h3 class='al-center'>".concat(window.top.message.operation_auto['确认继续开启吗']).concat("</h3><div class='al-center'>").concat(window.top.message.operation['activityMoneySaveDisplayTips']).concat("</div>");
                        }
                    }else{
                        _msgTitle="<h3 class='al-center'>".concat(window.top.message.operation_auto['确认继续关闭吗']).concat("</h3><div class='al-center'>").concat(_msg).concat("</div>");
                    }
                }else{
                    if (status) {
                        _msgTitle="<h3 class='al-center'>".concat(window.top.message.operation_auto['确认继续开启吗']).concat("</h3><div class='al-center'>").concat(window.top.message.operation_auto['开启后将在玩家中心展示']).concat("</div>");
                    } else {
                        _msgTitle="<h3 class='al-center'>".concat(window.top.message.operation_auto['确认继续关闭吗']).concat("</h3><div class='al-center'>").concat(_msg).concat("</div>");
                    }
                }
                window.top.topPage.showConfirmDynamic(window.top.message.operation_auto['消息'],_msgTitle,window.top.message.operation_auto['确认'],window.top.message.operation_auto['取消'],function (confirm) {
                    if(confirm){
                        _this._changeDisplayState(event, event.currentTarget, confirm, id, status);
                        $this.bootstrapSwitch('indeterminate',false);
                    }else{
                        $this.bootstrapSwitch('indeterminate',false);
                        $this.bootstrapSwitch('state', !status,true);
                    }
                })
            });
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            this.unInitSwitch($("[name='my-checkbox']")).bootstrapSwitch();
            _this.bindActivityEdit();
        },

        _changeDisplayState: function (e, _target, confirm, id, isDisplay) {
            var _this=this;
            if (confirm) {
                window.top.topPage.ajax({
                    url: root + "/activityHall/changeDisplayStatus.html",
                    type: "post",
                    dataType: "json",
                    data: {"result.id": id, "result.isDisplay": isDisplay},
                    success: function (data) {
                        if (data.state) {
                            $(_target).siblings('input').bootstrapSwitch('disabled', false);
                            $(_target).siblings('input').bootstrapSwitch('state', isDisplay);
                            $(_target).siblings('input').bootstrapSwitch('disabled', true);
                            $(_target).siblings('input').attr('isDisplay', isDisplay);
                            _this.query(e,{});
                            //window.top.page.query({currentTarget:e.currentTarget,page:_this});
                        }
                    }
                });
            }
        },

        bindActivityEdit:function(e) {
            var _this = this;
            $(".activityEdit").click(function(e){
                e.preventDefault();
                var _msgTitle = window.top.message.operation_auto['确认继续编辑吗'];
                var id = $(e.currentTarget).attr("data-id");
                var states = $(e.currentTarget).attr("data-states");
                var status = $(e.currentTarget).attr("data-status");
                var account = $(e.currentTarget).attr("data-acount");
                var url = "/activityHall/activityType/activityEdit.html?search.id="+id;
                var _msgContent = window.top.message.operation_auto['当前'].replace("[0]",account);
                if (status == 'notStarted') {
                    /*_msg = "<h3 class='al-center'>"+_msgTitle+"</h3><div class='al-center'>"+_msg1+_msg2+"</div>";
                     window.top.topPage.showConfirmDynamic(window.top.message.operation_auto['消息'],_msg,window.top.message.operation_auto['继续编辑'],window.top.message.operation_auto['取消'],function (confirm) {
                     if (confirm) {
                     _this.showActivityEdit(e,url+"&states="+states);
                     }
                     },true);*/
                } else if (status == 'processing') {
                    if (account == 0) {
                        /*//未审核数为0
                         _msg = "<h3 class='al-center'>"+_msgTitle+"</h3><div class='al-center'>"+_msg1+_msg2+"</div>";
                         window.top.topPage.showConfirmDynamic(window.top.message.operation_auto['消息'],_msg,window.top.message.operation_auto['继续编辑'],window.top.message.operation_auto['取消'],function (confirm) {
                         if (confirm) {
                         _this.showActivityEdit(e,url+"&states="+states);
                         }
                         },true);*/
                    } else {
                        //未审核数不为0
                        _msg = "<h3 class='al-center'>"+_msgTitle+"</h3><div class='al-center'>"+_msgContent+"</div>";
                        window.top.topPage.showConfirmDynamic(window.top.message.operation_auto['消息'],_msg,window.top.message.operation_auto['审核'],window.top.message.operation_auto['继续编辑'],function (confirm) {
                            if (confirm) {
                                url = "/activityHall/vActivityPlayerApply/activityPlayerApply.html?search.id="+id;
                                _this.showActivityEdit(e,url);
                            } else {
                                _this.showActivityEdit(e,url+"&states="+states);
                            }
                        },true);
                    }
                }
                $(e.currentTarget).unlock();
                return false;
            })
        },

        showActivityEdit:function (e,url) {
            window.setTimeout(function(){
                $(e.currentTarget).attr("nav-target","mainFrame");
                $(e.currentTarget).attr("href",url);
                window.top.topPage._doNavigate(e);
            },500);
        }
    });


});
