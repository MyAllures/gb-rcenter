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
                _this.menuclick(this.classList);
            });
            //直选复式
            mui(".x_3.gfwf-playName")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.toggle('Fixed');
            });
            mui(".gfwf-bg")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            });
        },
        menuclick:function(thisClassList){
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
            if(dataCode !="ssc_sanxing_hs" && dataCode !="ssc_sanxing_qs"){
                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            }
            _this.resetBet();
        },
        getBetTable: function(betCode,jspName){
            //后三初始化
            if(betCode =="ssc_sanxing_hs" && jspName==undefined){
                jspName="SscHousan";
            }
            //前三初始化
            if(betCode =="ssc_sanxing_qs" && jspName==undefined){
                jspName="SscHousan";
            }
            var _this = this;
            mui.ajax(root + '/ssc/cqssc/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspName},
                type: 'POST',
                success: function (data) {
                    //betCode赋值
                    $("#gfwfBetCode").val(betCode);
                    //五星,四星,定位胆
                    if(betCode =="ssc_yixing_dwd" || betCode=="ssc_wuxing_zhixuan_fs" || betCode=="ssc_sixing_zhixuan_fs"){
                        $("div.s-menu.second").hide();
                        $("#zxfs").show();
                        $("a[data-code='zxfs']").addClass("mui-active");
                        $("x_3.gfwf-playName").text("直选复式");
                        if(betCode =="ssc_yixing_dwd"){
                            $("span.x_1.gfwf-tit").text("定位胆");
                            $(".s-title.title1 span").text("定位胆");
                        }
                        if(betCode =="ssc_wuxing_zhixuan_fs"){

                            $("span.x_1.gfwf-tit").text("五星");
                            $(".s-title.title1 span").text("五星");

                        }
                        if(betCode =="ssc_sixing_zhixuan_fs"){
                            $("span.x_1.gfwf-tit").text("四星");
                            $(".s-title.title1 span").text("四星");
                        }
                    }
                    //后三
                    if(betCode =="ssc_sanxing_hs" || betCode =="ssc_sanxing_zhixuan_hsfs" || betCode=="ssc_sanxing_zhixuan_hshz" || betCode=="ssc_sanxing_zhixuan_hskd" ||  betCode =="ssc_sanxing_zhixuan_hszh" || betCode=="ssc_sanxing_zuxuan_hsz3fs" || betCode=="ssc_sanxing_zuxuan_hsz6fs" ||  betCode =="ssc_sanxing_zuxuan_hszxhz" || betCode=="ssc_sanxing_zuxuan_hszxbd" || betCode=="ssc_sanxing_zuxuan_hshzws" || betCode=="ssc_sanxing_zuxuan_hsts"){
                        $("a[data-code='ssc_sanxing_hs']").addClass("mui-active");
                        $("div.s-menu.second").hide();
                        $("#housan").show();
                        $("span.x_1.gfwf-tit").text("后三");
                        $(".s-title.title1 span").text("后三");
                        if(betCode =="ssc_sanxing_hs"){
                            $("a[data-code='ssc_sanxing_zhixuan_hsfs']").addClass("mui-active");

                        }else{
                            $("#housan a").removeClass("mui-active");
                            $("a[data-code='"+betCode+"']").addClass("mui-active");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_hsfs"){
                            $(".x_3.gfwf-playName").text("直选复式")
                            $(".s-title.title2 span").text("直选复式");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_hshz"){
                            $(".x_3.gfwf-playName").text("直选和值")
                            $(".s-title.title2 span").text("直选和值");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_hskd"){
                            $(".x_3.gfwf-playName").text("直选跨度")
                            $(".s-title.title2 span").text("直选跨度");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_hszh"){
                            $(".x_3.gfwf-playName").text("后三组合")
                            $(".s-title.title2 span").text("后三组合");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_hsz3fs"){
                            $(".x_3.gfwf-playName").text("组三复式")
                            $(".s-title.title2 span").text("组三复式");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_hsfs"){
                            $(".x_3.gfwf-playName").text("直选复式")
                            $(".s-title.title2 span").text("直选复式");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_hsz6fs"){
                            $(".x_3.gfwf-playName").text("组六复式")
                            $(".s-title.title2 span").text("组六复式");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_hszxhz"){
                            $(".x_3.gfwf-playName").text("组选和值")
                            $(".s-title.title2 span").text("组选和值");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_hszxbd"){
                            $(".x_3.gfwf-playName").text("组选包胆")
                            $(".s-title.title2 span").text("组选包胆");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_hshzws"){
                            $(".x_3.gfwf-playName").text("和值尾数")
                            $(".s-title.title2 span").text("和值尾数");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_hsts"){
                            $(".x_3.gfwf-playName").text("特殊号")
                            $(".s-title.title2 span").text("特殊号");
                        }

                    }

                    //前三
                    if(betCode =="ssc_sanxing_qs" || betCode =="ssc_sanxing_zhixuan_qsfs" || betCode=="ssc_sanxing_zhixuan_qshz" || betCode=="ssc_sanxing_zhixuan_qskd" ||  betCode =="ssc_sanxing_zhixuan_qszh" || betCode=="ssc_sanxing_zuxuan_qsz3fs" || betCode=="ssc_sanxing_zuxuan_qsz6fs" ||  betCode =="ssc_sanxing_zuxuan_qszxhz" || betCode=="ssc_sanxing_zuxuan_qszxbd" || betCode=="ssc_sanxing_zuxuan_qshzws" || betCode=="ssc_sanxing_zuxuan_qsts"){
                        $("a[data-code='ssc_sanxing_qs']").addClass("mui-active");
                        $("div.s-menu.second").hide();
                        $("#qiansan").show();
                        $("span.x_1.gfwf-tit").text("前三");
                        $(".s-title.title1 span").text("前三");
                        if(betCode =="ssc_sanxing_qs"){
                            $("a[data-code='ssc_sanxing_zhixuan_qsfs']").addClass("mui-active");
                        }else{
                            $("#qiansan a").removeClass("mui-active");
                            $("a[data-code='"+betCode+"']").addClass("mui-active");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_qsfs"){
                            $(".x_3.gfwf-playName").text("直选复式")
                            $(".s-title.title2 span").text("直选复式");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_qshz"){
                            $(".x_3.gfwf-playName").text("直选和值")
                            $(".s-title.title2 span").text("直选和值");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_qskd"){
                            $(".x_3.gfwf-playName").text("直选跨度")
                            $(".s-title.title2 span").text("直选跨度");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_qszh"){
                            $(".x_3.gfwf-playName").text("后三组合")
                            $(".s-title.title2 span").text("后三组合");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_qsz3fs"){
                            $(".x_3.gfwf-playName").text("组三复式")
                            $(".s-title.title2 span").text("组三复式");
                        }
                        if(betCode =="ssc_sanxing_zhixuan_qsfs"){
                            $(".x_3.gfwf-playName").text("直选复式")
                            $(".s-title.title2 span").text("直选复式");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_qsz6fs"){
                            $(".x_3.gfwf-playName").text("组六复式")
                            $(".s-title.title2 span").text("组六复式");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_qszxhz"){
                            $(".x_3.gfwf-playName").text("组选和值")
                            $(".s-title.title2 span").text("组选和值");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_qszxbd"){
                            $(".x_3.gfwf-playName").text("组选包胆")
                            $(".s-title.title2 span").text("组选包胆");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_qshzws"){
                            $(".x_3.gfwf-playName").text("和值尾数")
                            $(".s-title.title2 span").text("和值尾数");
                        }
                        if(betCode =="ssc_sanxing_zuxuan_qsts"){
                            $(".x_3.gfwf-playName").text("特殊号")
                            $(".s-title.title2 span").text("特殊号");
                        }

                    }
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