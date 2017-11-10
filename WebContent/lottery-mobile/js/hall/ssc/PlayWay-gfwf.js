define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({

        init: function () {
            this._super();
        },

        getInitbetCode : function (betCode) {
            //后三初始化
            if(betCode =="ssc_sanxing_hs"){
                betCode="ssc_sanxing_zhixuan_hsfs";
            }
            //前三初始化
            if(betCode =="ssc_sanxing_qs"){
                betCode="ssc_sanxing_zhixuan_qsfs";
            }
            //前二初始化
            if(betCode =="ssc_erxing"){
                betCode="ssc_erxing_zhixuan_qefs";
            }
            //不定位初始化
            if(betCode =="ssc_budingwei"){
                betCode="ssc_budingwei_q3ym";
            }else
            //任选二初始化
            if(betCode =="R2"){
                betCode="ssc_renxuan2_zxfs";
            }
            //大小单双初始化
            if(betCode =="ssc_daxiaodanshuang"){
                betCode="ssc_daxiaodanshuang_q2";
            }
            return betCode;
        },

        checkBaodan : function ($this) {
            var betCode=$("a.selected-btn.mui-col-xs-4.main.mui-active").attr("data-code");
            if(betCode =="ssc_sanxing_zuxuan_hszxbd" || betCode =="ssc_sanxing_zuxuan_qszxbd" || betCode =="ssc_erxing_zuxuan_qebd"){
                $("div.newball-item-20 a.n-btn").removeClass("mui-active");
            }
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




    });
});