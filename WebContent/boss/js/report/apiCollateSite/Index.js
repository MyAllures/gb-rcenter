define(['common/BaseListPage','calendar'], function (BaseListPage,Calendar) {

    return BaseListPage.extend({
        init: function (formSelector) {
            this.formSelector = this.formSelector || formSelector ||"#mainFrame form";
            this._super();
            var myDate = new Date();
            $("#dateSelector").DateSelector({
                ctlYearId: 'idYear',
                ctlMonthId: 'idMonth',
                ctlDayId: 'idDay',
                ctlDaySelected:true,
                defYear: myDate.getFullYear(),
                defMonth: (myDate.getMonth()+1),
                defDay: myDate.getDate(),
                minYear: 2015,
                maxYear: (myDate.getFullYear()+1)
            });
        },

        onPageLoad: function () {
            this._super();
        },


        bindEvent: function () {
            this._super();
            $("#api").click(function(e,opt){
                $("#apiI18n input[type='checkbox']").prop('checked',$(this).prop('checked'));
                var id_array=new Array();
                $("#apiI18n input[type='checkbox']:checked").each(function(){
                    id_array.push($(this).val());
                });
            });

            /**
             * 全选后点击某个checkbox 去掉全选选中
             */
            $("[name='search.apiIds']").on("click",function(e){
                if(!this.checked) {
                    $("#api").attr("checked", false);
                }
            })
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
            /*if($("[name='paging.totalCount']").val()==0){
                window.top.topPage.showWarningMessage("查询无数据,无法导出");
                $(e.currentTarget).unlock();
                return;
            }
            opt.target =  opt.target.replace('{siteId}',siteId);*/
            return true;
        }

    });
});