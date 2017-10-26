/**
 * Created by snekey on 15-8-5.
 */
define(['common/BaseEditPage'],function(BaseEditPage){
    return BaseEditPage.extend({
        init: function () {
            this._super();
            var conditions = window.parent.page.getFilters();
            var ids = conditions.ids;
            var length = conditions.ids.ids.split(',').length;
            $("._idsLength").text(length);
            this.findNoExportPlayer();
        },
        bindEvent : function() {
            this._super();
        },

        findNoExportPlayer:function(){
            var conditions = window.parent.page.getFilters();
            var ids = conditions.ids.ids.split(',');
            var param = {};
            param.ids = ids;
            window.top.topPage.ajax({
                contentType: 'application/json; charset=utf-8',
                type:"POST",
                url:root+'/userPlayer/findExportedPlayers.html',
                data:JSON.stringify(param),
                dataType:"JSON",
                error:function(data){

                },
                success:function(data){
                    $("#exportCount").text(data.count);
                    $("#exportIds").val(data.exportIds);
                    //$("#exportForm").submit();
                }
            });
        },

        getIds:function(e,opt){
            var conditions = window.parent.page.getFilters();
            var ids = conditions.ids.ids;
            var length = conditions.ids.ids.split(',').length;
            opt.target =  opt.target.replace('{playerIds}',ids);
            opt.target =  opt.target.replace('{length}',length);
            return true;
        },
        exportData:function(e,opt){
            //$("#exportForm").submit();
            var _this = this;
            window.top.topPage.ajax({
                loading:true,
                url:root+"/player/export.html",
                type:"post",
                dataType:"json",
                beforeSend: function () {

                },
                success:function(data){
                    if(data&&data.state){
                        _this.clearCallback();
                    }
                },
                error:function(data, state, msg){

                }
            });
        },
        validForm: function (e, opt) {
            var ckTypes = $("[name='contactType']");
            var flag = false;
            for(var i=0;i<ckTypes.length;i++){
                var val = $(ckTypes[i]).val();
                if($(ckTypes[i]).is(":checked")){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                var e = {};
                e.currentTarget = $("#type-div");
                page.showPopover(e, {}, 'warning', window.top.message.player_auto['请选择要清除的联系方式'], true);
            }

            return flag;
        },
        clearCallback: function (e, opt) {
            this.returnValue = "clearContract";
            this.closePage();
        }
    });
})