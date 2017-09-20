define(['common/BaseEditPage','bootstrapswitch','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function(BaseEditPage,Bootstrapswitch,nestable) {
    return BaseEditPage.extend({

        init : function() {
            this._super();
            //switch
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch();
        },

        bindEvent : function() {
            /*$("#li_top_2").addClass("active");*/
            var _this = this;/*
            $("[name='isTakeTurns']").on('switchChange.bootstrapSwitch', function(event, state) {
                if (state) {
                    $("[name='status']").val("true");
                } else {
                    $("[name='status']").val("false");
                }
            });*/
            $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
              var statusId= $(this).attr("index");
                if(state){
                    $("#status"+statusId).val("1");
                }else{
                    $("#status"+statusId).val("2");
                }

            });
            /**
             * 拖动排序初始化
             * @see https://github.com/dbushell/Nestable
             */
            $(".dragdd").nestable({
                rootClass:'dragdd',
                listNodeName:'tbody',
                listClass:'dd-list1',
                itemNodeName:'tr',
                handleClass:'td-handle1',
                itemClass:'dd-item1',
                maxDepth:1
            });

        },

        /**
         * 应用金流顺序
         * @param e
         * @param option
         */
        applyCashFlowOrder: function(e,option) {
            var _this = this;
            var cashOrder = {};
            var orderObj = [];
            $("tbody tr").each(function(index,obj){
                var bulitIn=$(obj).children().eq(0).val();
                var name=$(obj).children().eq(2).attr("val");
                var isRequired=$(obj).children().eq(3).attr("val");
                var isRegField=$(obj).children().eq(4).attr("val");
                if($.trim(name).length>0) {
                    orderObj.push({
                        "bulitIn": bulitIn,
                        "id": index + 1,
                        "sort": index + 1,
                        "name": name,
                        "isRequired": isRequired,
                        "isRegField": isRegField,
                        "status": "1"
                    });
                }
                cashOrder = orderObj;
            });
            $("input[name='result.paramValue']").val(JSON.stringify(cashOrder));
            return true;
        },
        /**
         * 应用回调刷新
         * @param e
         * @param option
         */
        requery:function() {

            $("a.current").trigger("click");
        },
        loadRegSetting: function () {
                $("#mainFrame").load(root + "/"+window.location.hash.slice(2));
        }

    });
});
