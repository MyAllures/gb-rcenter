/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

        },
        onPageLoad:function () {

        },
        showEditInput:function (e, opt) {
            var id = opt.objId;
            if(!id){
                return;
            }
            $(".time-input-txt-"+id).attr("readonly",false);
            $(".btn-save-"+id).removeClass("hide");
            $(".btn-cancle-"+id).removeClass("hide");
            $(".btn-edit-"+id).addClass("hide");
            $(".btn-delete-"+id).addClass("hide");
            $(e.currentTarget).unlock();
        },
        cancleEdit:function (e, opt) {
            var id = opt.objId;
            if(!id){
                return;
            }
            $(".time-input-txt-"+id).attr("readonly",true);
            $(".btn-save-"+id).addClass("hide");
            $(".btn-edit-"+id).removeClass("hide");
            $(".btn-cancle-"+id).addClass("hide");
            $(".btn-delete-"+id).removeClass("hide");
            $(e.currentTarget).unlock();
        },
        saveRecord:function (e, opt) {
            var flag = true;
            var index = 0;
            $(this.getFirstParentByTag(e, 'tr')).find("input").each(function (idx, ipt) {
                if($(ipt).val()==""){
                    index = idx;
                    flag = false;
                    return false;
                }
            });
            var ipt = $(this.getFirstParentByTag(e, 'tr')).find("input:eq("+index+")");
            if(!flag){
                var obj = {currentTarget:ipt};
                page.showPopover(obj,opt,"danger","不能为空",true);
                $(e.currentTarget).unlock();
                return false;
            }
            var data = $(this.getFirstParentByTag(e, 'tr')).find("td").find("input").serialize();
            this.doSave(data,e,opt);
            $(e.currentTarget).unlock();
        },
        doSave:function (data,e,opt) {
            var _this = this;
            window.top.topPage.ajax({
                dataType:'json',
                data:data,
                type:"post",
                url:root+'/lotteryHandicapLhc/updateRecord.html',
                success:function(data){
                    if(data.state){
                        page.showPopover(e,{"callback":function (e,opt) {
                            _this.query(e,opt);
                        }},"success","保存成功",true);
                    }else{
                        var msg = "保存失败";
                        if(data.msg){
                            msg = data.msg;
                        }
                        page.showPopover(e,opt,"danger",msg,true);
                    }
                },
                error:function(data) {

                }
            });
        },
        deleteHandicap:function (e, opt) {
            var _this = this;
            var data = $(this.getFirstParentByTag(e, 'tr')).find("td").find("input").serialize();
            window.top.topPage.ajax({
                dataType:'json',
                data:data,
                type:"post",
                url:root+'/lotteryHandicapLhc/deleteHandicap.html',
                success:function(data){
                    if(data.state){
                        page.showPopover(e,{"callback":function (e, opt) {
                            _this.deleteNewRow(e,opt);
                        }},"success","删除成功",true);
                    }else{
                        var msg = "删除失败";
                        if(data.msg){
                            msg = data.msg;
                        }
                        page.showPopover(e,opt,"danger",msg,true);
                    }
                },
                error:function(data) {

                }
            });
        },
        addNewExpect:function (e, opt) {
            var newRow = $("#template-record").find("tr:eq(0)").clone(true)[0];
            /*var oldRow = $("#edit-table-tobdy").find("tr:eq(0)").clone(true)[0];
            $(oldRow).find("td:eq(1)").find("input[name='id']").remove();
            $(oldRow).find("td:eq(1)").find("input[name='expect']").remove();
            $(oldRow).find("td:eq(0)").html('<input type="text" name="expect" class="form-control" value="">');
            $(oldRow).find("td").find("input").attr("readonly",false);*/
            var table = document.getElementById("edit-table");
            var row = table.insertRow(0);
            var cella = row.insertCell(0);
            cella.innerHTML = "";
            $(newRow).find("td").each(function (idx, cptd) {
                var cell = row.insertCell(idx+1);
                cell.innerHTML = $(cptd).html();
            });
            $(e.currentTarget).unlock();
            //$('#edit-table-tobdy:first').after(newRow);
        },

        deleteNewRow:function (e, opt) {
            $(e.currentTarget).parent().parent().remove();
        }
    });
});