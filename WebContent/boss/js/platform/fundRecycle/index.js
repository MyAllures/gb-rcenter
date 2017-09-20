/**
 * Created by fei on 16-8-23.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
            if (!$('[name="search.siteId"]').val()) {
                $('a._search').addClass('disabled').lock();
            }
        },
        bindEvent : function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
        },
        
        changeSite: function (e, opt) {
            if (e.key) {
                var $form = $(window.top.topPage.getCurrentForm(e));
                if(!$form.valid || $form.valid()) {
                    window.top.topPage.ajax({
                        loading: true,
                        url:window.top.topPage.getCurrentFormAction(e),
                        headers: {
                            "Soul-Requested-With":"XMLHttpRequest"
                        },
                        type:"post",
                        data:this.getCurrentFormData(e),
                        success:function(data){
                            var $result=$(".search-list-container",$form);
                            $result.html(data);
                            e.page.onPageLoad();
                            e.page.toolBarCheck(e);
                            $(e.currentTarget).unlock()},
                        error:function(data, state, msg){
                            window.top.topPage.showErrorMessage(data.responseText);
                            $(e.currentTarget).unlock();
                        }});
                } else {
                    $(e.currentTarget).unlock();
                }
            }
        },

        myCallBack:function(e,opt){
            var _this = this;
            if(opt.data.state){
                window.topPage.showSuccessMessage(window.top.message.common['operation.success'],function(state){
                    if(state){
                        _this.callBackQuery(e);
                    }
                });
            }else{
                window.topPage.showErrorMessage(window.top.message.common['operation.failed'],function(state){
                    if(state){
                        _this.callBackQuery(e);
                    }
                });
            }

        },
        syncBalance:function(e, opt){
            var apiId = opt.api_id;
            $('.sync_' + apiId).addClass('fa-spin');
            window.top.topPage.ajax({
                url: root + '/fundRecycle/syncApiBalance.html?search.apiId=' + apiId + '&search.siteId=' + opt.site_id,
                cache: false,
                type: "POST",
                dataType: 'json',
                success: function (data) {
                    if (data.err) {
                        $(e.currentTarget).unlock();
                        window.top.topPage.showWarningMessage(data.err);
                        $('.sync_' + apiId).removeClass('fa-spin');
                        return;
                    }
                    if (data && data.balance) {
                        if (data.balance != 0) {
                            $("#balance_" + apiId).text(data.balance);
                        }
                    }
                    $('.sync_' + apiId).removeClass('fa-spin');
                }
            });
            $(e.currentTarget).unlock();
        }
        
    });
});