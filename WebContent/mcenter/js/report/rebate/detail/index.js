//模板页面
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector ||"#mainFrame form";
            this._super();
        },
        /** 页面加载事件函数 */
        onPageLoad: function () {
            this._super();
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            //这里初始化所有的事件
        },

        /** 改变年 */
        changeYear: function() {
            var $month = $("[name='search.rebateMonth']");
            var $period = $("[name='search.id']");

            select.setIndex($month, 0);
            select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
        },

        /** 改变月 */
        changeMonth: function() {
            var $year = $("[name='search.rebateYear']");
            var $month = $("[name='search.rebateMonth']");
            if ($year.val()) {
                var $period = $("[name='search.id']");
                if ($month.val()) {
                    window.top.topPage.ajax({
                        url: root + '/report/rebate/detail/ajaxPeriods.html',
                        dataType: 'json',
                        type: 'POST',
                        data: {'search.rebateYear':$year.val(), 'search.rebateMonth':$month.val(), 'siteId':$('[name="search.siteId"]').val()},
                        success: function(data) {
                            select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
                            if (data.length > 0) {
                                select.enable($period);
                                $.each(data,function(index, obj){
                                    select.addOption($period, obj.id, (obj.period + window.top.message.common['qi'] + obj.periodName));
                                });
                            } else {
                                select.disable($period);
                            }
                        }
                    });
                } else {
                    select.clearOption($period, '-- ' + window.top.message.common['qi'] + ' --');
                    select.disable($period);
                }
            } else {
                window.top.topPage.showWarningMessage(window.top.message.report['tip.warn.selyear']);
                select.setIndex($month, 0);
                return;
            }
        },

        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event,option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var $result=$("div#mainFrame");
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
        },

        /** 改变角色 */
        changeRole: function(e) {
            $('#roleName').attr('name', e.key);
        },
        toExportHistory:function(e,opt){
            if(e.returnValue=="showProcess"){
                var btnOption = {};
                btnOption.target = root + "/share/exports/showProcess.html";
                btnOption.text=window.top.message['export.exportdata'];
                btnOption.type="post",
                    btnOption.callback = function (e) {
                        $("#toExportHistory").click();
                    };
                window.top.topPage.doDialog({}, btnOption);
            }else if(e.returnValue){
                $("#toExportHistory").click();
            }
        },
        exportData: function (e,opt) {
            var data = $("#conditionJson").val();
            return data;
        },
        validateData: function (e,opt) {
            if($("[name='paging.totalCount']").val()==0){
                window.top.topPage.showWarningMessage(window.top.message.report['tip.warn.export.nodata']);
                $(e.currentTarget).unlock();
                return;
            }
            return true;
        }
    });
});