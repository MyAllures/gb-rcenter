define(['site/hall/GfwfCommon', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },

        checkNoSon : function (betCode,thisClassList){
            var _this = this;
            $("div.s-menu.second").hide();
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.mui-active").attr("data-code");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            if($("a.selected-btn.main.mui-active").size()>0){
                dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            }
            if(    dataCode !="3star"
                && dataCode !="First2"
                && dataCode !="After2"
            //只有一个子菜单直接关闭遮照
            /*  && dataCode !="DingWeiDan"
             && dataCode !="BuDingWei"*/
            ){
                $('div.gfwf-bg').slideUp();
                $('div.selected-wrap').slideUp();
            }
            //三星
            if(betCode =="3star" && jspName==undefined){
                jspName="3star";
            }
            //前二
            if(betCode =="First2" && jspName==undefined){
                jspName="First2Zxfs";
            }
            //后二
            if(betCode =="After2" && jspName==undefined){
                jspName="After2Zxfs";
            }
            //定位胆
            if(betCode =="DingWeiDan" && jspName==undefined){
                jspName="YixingDwd";
            }
            //不定位
            if(betCode =="Sxymbdw" && jspName==undefined){
                jspName="Sxymbdw";
            }

            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },

        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "pl3_sanxing_zhixuan_fs","jspStr":"3star"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },



    });
});