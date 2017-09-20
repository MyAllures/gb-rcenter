/**
 * Created by eagle on 15-9-10.
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        funMoreMenu:".wrapper .function-menu",
        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            $('.help-popover').popover();
        },

        allQuery:function(event,opt) {
            var that = this;
            //var $form = $(window.top.topPage.getCurrentForm(event));
                if(event.returnValue==true) {
                    that.querySingle(event);
                }
        },
        querySingle: function (event) {
            window.top.topPage.ajax({
                url: window.top.topPage.getCurrentFormAction(event),
                type: "post",
                data: window.top.topPage.getCurrentFormData(event),
                success: function (data) {
                    var form = window.top.topPage.getCurrentForm(event);
                    var $result = $("#mainFrame");
                    $result.html(data);
                    event.page.onPageLoad();
                    //$(event.currentTarget).unlock();
                }
            });
        },

        getIds:function(e,opt){
            var ids = this.getSelectIdsArray(e).join(",");
            opt.target =  opt.target.replace('{ids}',ids);
            return true;
        },
        hasReason: function (e, opt) {
            var _this = this;
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/operation/rebate/hasReason.html",
                dataType: "json",
                success: function (data) {
                    if(data.state){
                        _this.getIds(e,opt);
                        window.top.topPage.doDialog(e, opt);
                    }else{
                        window.top.topPage.showConfirmMessage(window.top.message.operation_auto['确认拒绝结算吗'], function (state) {
                            if(state){
                                _this.rejectSettlement(e,opt);
                            }
                        });
                    }
                    $(e.currentTarget).unlock();
                }
            });
            return false;
        },
        rejectSettlement: function (e,opt) {
            var _this = this;
            var ids =  this.getSelectIdsArray(e).join(",");
            var sid = $("[name='search.id']").val();
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/operation/rebateAgent/refuseSettlementNoReason.html?ids="+ids,
                dataType: "json",
                data:{"id":sid},
                success: function (data) {
                    if(data.state){
                        page.showPopover(e,{"callback": function (event) {
                            _this.querySingle(event);
                        }},"success",window.top.message.operation_auto['操作成功'],true);
                    }else{
                        page.showPopover(e,{},"danger",window.top.message.operation_auto['操作失败'],true);
                    }
                }
            });
        },

        toolBarCheck:function(e) {
            this._isShowTotalRow();
            var $funMoreMenu= $(this.funMoreMenu,this.getCurrentForm(e));
            if(e==undefined)
            {
                $funMoreMenu.children().addClass('ui-button-disable disabled');
                return;
            }

            if(!this.getSelectIdsArray(e).length)
            {
                $funMoreMenu.children().addClass('ui-button-disable disabled');
            }
            else
            {
                $funMoreMenu.children().removeClass('ui-button-disable disabled');
            }
        },

        cancelSelectAll : function(e) {
            e.page=this;
            $('thead input[type=checkbox]').prop('checked', false);
            $('tbody input[type=checkbox]',this.getCurrentForm(e)).each(function(node,obj) {
                if(!$(obj).prop('disabled')) {
                    $(obj).prop('checked', false);
                }
            });
            $('thead .bd-none').addClass('hide');
            /*隐藏公共区域*/
            $(this.funMoreMenu).children().removeClass('ui-button-disable disabled"');
            $('tbody tr',this.getCurrentForm(e)).removeClass("open");
            this.toolBarCheck(e);
            $(e.currentTarget).unlock();
        },
    });

});
