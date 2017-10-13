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
            //直选复式
            mui(".x_3.gfwf-playName")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.toggle('Fixed');
            });
            mui(".gfwf-bg")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            });
        },
        menuClick:function(thisClassList){
            var _this = this;
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.mui-active").attr("data-code");
            var dataPlayId=$("a.selected-btn.mui-active").attr("data-play_id");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            if($("a.selected-btn.main.mui-active").size()>0){
                dataPlayId=$("a.selected-btn.main.mui-active").attr("data-play_id");
                dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            }
            this.getBetTable(dataCode,jspName);
            if(dataCode !="ssc_sanxing_hs" && dataCode !="ssc_sanxing_qs" && dataCode !="ssc_erxing" && dataCode !="R2" ){
                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            }
            _this.resetBet();
        },
        getBetTable: function(betCode,jspName){
            var _this = this;
            var jspStr=_this.getJspName(betCode,jspName);

            mui.ajax(root + '/ssc/cqssc/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    //betCode赋值
                    $("#gfwfBetCode").val(betCode);
                    _this.showTable();
                    $(".bet-table").html(data);
                }
            });
        },
        changeList : function(){
            mui.ajax(root + '/ssc/cqssc/getBetTable.html', {
                data: {"betCode": "ssc_yixing_dwd","jspStr":"SscWuxing"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },

        showTable : function (){

        },

        getJspName : function (betCode,jspName) {
            //后三初始化
            if(betCode =="ssc_sanxing_hs" && jspName==undefined){
                jspName="SscHousan";
            }else
            //前三初始化
            if(betCode =="ssc_sanxing_qs" && jspName==undefined){
                jspName="SscQiansan";
            }else
            //前二初始化
            if(betCode =="ssc_erxing" && jspName==undefined){
                jspName="SscQianer";
            }else
            //不定位初始化
            if(betCode =="ssc_budingwi" && jspName==undefined){
                jspName="SscBudingwei";
            }else
            //任选二初始化
            if(betCode =="R2" && jspName==undefined){
                jspName="SscR2Zxfs";
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