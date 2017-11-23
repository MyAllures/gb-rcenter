define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({

        init: function () {
            this._super();
        },

        getGfwfOdd:function(){
            var _this = this;
            var betCode=$("#gfwfBetCode").val();
            var betCode1=_this.getInitbetCode(betCode);
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/'+betCode+'/getOdds.html', {
                data: {"betCode": betCode1},
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        _this.gfwfPlJson = data;
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            });
        },

        bindButtonEvents: function () {
            var _this=this;
            _this._super();

            mui(".newball-content-top").off('tap','.da');
            mui(".newball-content-top").off('tap','.xiao');

            //大
            mui(".newball-content-top").on('tap','.da',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                var Aarr = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10];
                var Barr = [, , , , , 06, 07, 08, 09, 10];
                for (var i = 0; i < Aarr.length; ++i) {
                    if (Aarr[i] == Barr[i]) {
                        $("a."+flag+"."+(i+1)).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //小
            mui(".newball-content-top").on('tap','.xiao',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                var Aarr = [01, 02, 03, 04, 05, 06, 07, 08, 09 ,10];
                var Barr = [01, 02, 03, 4, 05, , , , ,];
                for (var i = 0; i < Aarr.length; ++i) {
                    if (Aarr[i] == Barr[i]) {
                        $("a."+flag+"."+(i+1)).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
        },


        getBetName : function (name,betCode) {
            if(betCode=="pk10_yixing_dwd"){
                return name+"-定位胆-直选复式";
            }else if(betCode=="pk10_zhixuan_qyfs"){
                return name+"-前一-直选复式";
            }else if(betCode=="pk10_zhixuan_qefs"){
                return name+"-前二-直选复式";
            }else if(betCode=="pk10_zhixuan_qsfs"){
                return name+"-前三-直选复式";
            }
        },




    });
});