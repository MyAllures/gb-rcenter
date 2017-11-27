define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({

        init: function () {
            this._super();
        },

        getInitbetCode : function (betCode) {
            if(betCode =="3star"){
                betCode="pl3_sanxing_zhixuan_fs";
            }
            if(betCode =="First2"){
                betCode="pl3_erxing_zhixuan_qefs";
            }
            if(betCode =="After2"){
                betCode="pl3_erxing_zhixuan_hefs";
            }
            if(betCode =="Sxymbdw"){
                betCode="pl3_budingwei_sxym";
            }
            if(betCode =="DingWeiDan"){
                betCode="pl3_yixing_dwd";
            }
            return betCode;
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

        getBetName : function (name,betCode) {
            if(betCode=="pl3_yixing_dwd"){
                return name+"-定位胆-定位胆";
            }else if(betCode=="pl3_budingwei_sxym"){
                return name+"-不定位-一码";
            }
            else if(betCode=="pl3_sanxing_zhixuan_fs"){
                return name+"-三星-直选复式";
            }else if(betCode=="pl3_sanxing_zhixuan_hz"){
                return name+"-三星-直选和值";
            }else if(betCode=="pl3_sanxing_zuxuan_z3fs"){
                return name+"-三星-组三复式";
            }else if(betCode=="pl3_sanxing_zuxuan_z6fs"){
                return name+"-三星-组六复式";
            }else if(betCode=="pl3_sanxing_zuxuan_zxhz"){
                return name+"-三星-组选和值";
            }
            else if(betCode=="pl3_erxing_zhixuan_qefs"){
                return name+"-前二-直选复式";
            }else if(betCode=="pl3_erxing_zuxuan_qefs"){
                return name+"-前二-组选复式";
            }
            else if(betCode=="pl3_erxing_zhixuan_hefs"){
                return name+"-后二-直选复式";
            }else if(betCode=="pl3_erxing_zuxuan_hefs"){
                return name+"-后二-组选复式";
            }
        },


    });
});