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

            mui("body").on('tap','.x_3.gfwf-playName.top',function(){
                mui(".gfwf-wrap")[0].classList.toggle('Fixed');
            });

            mui("body").on('tap','.gfwf-bg',function(){
                mui(".gfwf-wrap")[0].classList.toggle('Fixed');
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
            if(    dataCode !="ssc_sanxing_hs"
                && dataCode !="ssc_sanxing_qs"
                && dataCode !="ssc_erxing"
                && dataCode !="ssc_budingwei"
                && dataCode !="ssc_daxiaodanshuang"
                && dataCode !="R2"
                && dataCode !="R3"
                && dataCode !="R4"
            ){
                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            }
            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },
        getBetTable: function(betCode,jspName){
            var _this = this;
            var jspStr=_this.getJspName(betCode,jspName);
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspStr},
                type: 'POST',
                success: function (data) {
                    //betCode赋值
                    $("#gfwfBetCode").val(betCode);
                    $(".bet-table").html(data);
                }
            });
        },
        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "k3_tongxuan_santong","jspStr":"K3Tongxuan"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },

        getJspName : function (betCode,jspName) {
            //后三初始化
            if(betCode =="ssc_sanxing_hs" && jspName==undefined){
                jspName="SscHousan";
            }
            //前三初始化
            if(betCode =="ssc_sanxing_qs" && jspName==undefined){
                jspName="SscQiansan";
            }
            //前二初始化
            if(betCode =="ssc_erxing" && jspName==undefined){
                jspName="SscQianer";
            }
            //不定位初始化
            if(betCode =="ssc_budingwei" && jspName==undefined){
                jspName="SscBudingwei";
            }else
            //任选二初始化
            if(betCode =="R2" && jspName==undefined){
                jspName="SscR2Zxfs";
            }
            //任选三初始化
            if(betCode =="R3" && jspName==undefined){
                jspName="SscR3Zxfs";
            }
            //任选四初始化
            if(betCode =="R4" && jspName==undefined){
                jspName="SscR4Zxfs";
            }
            //大小单双初始化
            if(betCode =="ssc_daxiaodanshuang" && jspName==undefined){
                jspName="SscDaxiaodanshuangErxing";
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