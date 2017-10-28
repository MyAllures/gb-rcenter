define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.loadPage();
            this.bindEvent();
        },
        getOdds: function () {
        },
        loadPage: function () {
        },
        bindEvent:function(){
            var _this = this;
            _this.changeList();
            //头部选择
            mui("div.s-menu").on('tap','a',function(){
                _this.menuClick(this.classList);
            });

            mui("body").on('tap','.gfwf-playName',function(){
                // mui(".gfwf-wrap")[0].classList.toggle('Fixed');
                $('div.selected-wrap').toggle();
                $('div.gfwf-bg').toggle();
            });

            mui("body").on('tap','.gfwf-bg',function(){
                $('div.gfwf-bg').slideUp();
                $('div.selected-wrap').slideUp();
            });


        },
        menuClick:function(thisClassList){
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
            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },
        getBetTable: function(betCode,jspName){
            var _this = this;
            var pageName=_this.getJspName(betCode,jspName);
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getSubPage.html', {
                data: {"pageName":pageName},
                type: 'POST',
                success: function (data) {
                    //betCode赋值
                    $("#gfwfBetCode").val(betCode);
                    $("#subPage").html(data);
                }
            });
        },
        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getSubPage.html', {
                data: {"betCode": "pl3_sanxing_zhixuan_fs","pageName":"3star"},
                type: 'POST',
                success: function (data) {
                    $("#subPage").html(data);
                }
            });
        },

        getJspName : function (betCode,jspName) {
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

            return jspName;
        },


        /**
         * 重置下注选项
         */
        resetBet: function () {
            $("i.mui-control-item").removeClass("mui-active");
            $("a.n-btn").removeClass("mui-active");
            $("#dingdan").removeClass('mui-active');
            $("#quantity").text(0);
            $("#inputMoney").text(0);
            $("a.bottom-bar-btn.btn-jixuan-gfwf").addClass("mui-active");
            $("a.bottom-bar-btn.btn-reset-gfwf").removeClass("mui-active");
        },

    });
});