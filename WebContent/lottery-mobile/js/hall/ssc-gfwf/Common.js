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
                //检测是否为定位胆，五星，四星 直选复式事件
                if($(this).attr("data-code") !='zxfs'){
                    _this.menuClick(this.classList);
                }
            });

            //直选复式
            // mui(".x_3.gfwf-playName")[0].addEventListener('tap',function(){
            //     mui(".gfwf-wrap")[0].classList.toggle('Fixed');
            // });
            // mui(".gfwf-bg")[0].addEventListener('tap',function(){
            //     mui(".gfwf-wrap")[0].classList.remove('Fixed');
            // });

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
                $('div.gfwf-bg').slideUp();
                $('div.selected-wrap').slideUp();
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
                data: {"betCode": "ssc_yixing_dwd","jspStr":"SscWuxing"},
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


        /**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
                var ds;
                var dx;
                var lhh;
                if (sum % 2 == 0) {
                    ds="双";
                } else {
                    ds="单";
                }
                if (sum > 22) {
                    dx="大";
                } else {
                    dx="小";
                }
                if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                    lhh="龙";
                } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                    lhh="虎";
                } else {
                    lhh="和";
                }
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum: sum,
                        ds:ds,
                        dx:dx,
                        lhh:lhh
                    });
            });
            $("#recentHistory").html(openList);
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
            html += "<i class='lottery-block'>" + sum + "</i>";
            if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else {
                html += "<i class='lottery-block'>单</i>";
            }
            if (sum > 22) {
                html += "<i class='lottery-block'>大</i>";
            } else {
                html += "<i class='lottery-block'>小</i>";
            }
            if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                html += "<i class='lottery-block'>龙</i>";
            } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                html += "<i class='lottery-block'>虎</i>";
            } else {
                html += "<i class='lottery-block'>和</i>"
            }
            $("#lastOpenCode").html(html);
        },

    });
});