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
            var $year = $("[name='search.rakebackYear']");
            var $month = $("[name='search.rakebackMonth']");
            var $period = $("[name='search.id']");

            this.changePeriod($year.val(), $month.val(), $period);
        },

        /** 改变月 */
        changeMonth: function() {
            var $year = $("[name='search.rakebackYear']");
            var $month = $("[name='search.rakebackMonth']");
            if ($year.val()) {
                var $period = $("[name='search.id']");
                this.changePeriod($year.val(), $month.val(), $period);
            } else {
                window.top.topPage.showWarningMessage(window.top.message.report['tip.warn.selyear']);
                select.setIndex($month, 0);
            }
        },

        changePeriod: function(year, month, $period) {
            if (month) {
                window.top.topPage.ajax({
                    url: root + '/report/rakeback/detail/ajaxPeriods.html',
                    dataType: 'json',
                    type: 'POST',
                    data: {'search.rakebackYear': year, 'search.rakebackMonth':month, 'siteId':$('[name="search.siteId"]').val()},
                    success: function(data) {
                        select.clearOption($period, '');
                        if (data.length > 0) {
                            $('a.look').attr('class', 'btn btn-filter pull-right look');
                            $.each(data,function(index, obj){
                                select.addOption($period, obj.id, (obj.period + window.top.message.common['qi'] + obj.periodName));
                                select.setIndex($period, 0);
                            });
                        } else {
                            $('a.look').attr('class', 'btn btn-default pull-right ui-button-disable disabled look');
                        }
                    }
                });
            } else {
                select.clearOption($period, '');
                select.disable($period);
            }
        },

        /** 切换站点 */
        siteChange: function(e) {
            $('span.detail').addClass('hide');
            var $year = $('[name="search.rakebackYear"]');
            var $this = this;
            window.top.topPage.ajax({
                url: root + '/report/rakeback/detail/ajaxYears.html',
                dataType: 'json',
                type: 'POST',
                data: {'siteId': e.key},
                success: function(data) {
                    select.clearOption($year, '')
                    if (data.length > 0) {
                        $.each(data,function(index, obj){
                            select.addOption($year, obj, obj + window.top.message.common['year']);
                        });
                    }
                    select.setIndex($year, 0);
                    $this.changePeriod($year.val(), $("[name='search.rakebackMonth']").val(), $("[name='search.id']"));
                }
            });

        },

        /** 改变角色 */
        changeRole: function(e) {
            $('input.role').attr('name', e.key).val('');
        },

        /** 重写query方法 */
        query: function(event, option) {
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
                        var $result=$("#mainFrame");
                        $result.html(data);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
            } else {
                $(event.currentTarget).unlock();
            }
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