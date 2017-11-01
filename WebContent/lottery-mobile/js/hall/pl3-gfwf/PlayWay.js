define(['site/hall/GfwfPlayWay', 'site/plugin/template'], function (PlayWay, Template) {
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
        }


    });
});