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
                if($this.hasClass("mui-active")){
                    $("div.newball-item-20 a.n-btn").removeClass("mui-active");
                }else{
                    $("div.newball-item-20 a.n-btn").removeClass("mui-active");
                    $this.addClass('mui-active');
                }
                return true;
            }else{
                return false;
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

        getBetName : function (name,betCode) {
            if(betCode=="ssc_yixing_dwd"){
                return name+"-定位胆-定位胆";
            }else if(betCode=="ssc_wuxing_zhixuan_fs"){
                return name+"-五星-直选复式";
            }else if(betCode=="ssc_sixing_zhixuan_fs"){
                return name+"-四星-直选复式";
            }
            else if(betCode=="ssc_sanxing_zhixuan_hsfs"){
                return name+"-后三-直选复式";
            }else if(betCode=="ssc_sanxing_zhixuan_hshz"){
                return name+"-后三-直选和值";
            }else if(betCode=="ssc_sanxing_zhixuan_hskd"){
                return name+"-后三-直选跨度";
            }else if(betCode=="ssc_sanxing_zhixuan_hszh"){
                return name+"-后三-后三组合";
            }else if(betCode=="ssc_sanxing_zuxuan_hsz3fs"){
                return name+"-后三-组三复式";
            }else if(betCode=="ssc_sanxing_zuxuan_hsz6fs"){
                return name+"-后三-组六复式";
            }else if(betCode=="ssc_sanxing_zuxuan_hszxhz"){
                return name+"-后三-组选和值";
            }else if(betCode=="ssc_sanxing_zuxuan_hszxbd"){
                return name+"-后三-组选包胆";
            }else if(betCode=="ssc_sanxing_zuxuan_hshzws"){
                return name+"-后三-和值尾数";
            }else if(betCode=="ssc_sanxing_zuxuan_hsts"){
                return name+"-后三-特殊号";
            }
            else if(betCode=="ssc_sanxing_zhixuan_qsfs"){
                return name+"-前三-直选复式";
            }else if(betCode=="ssc_sanxing_zhixuan_qshz"){
                return name+"-前三-直选和值";
            }else if(betCode=="ssc_sanxing_zhixuan_qskd"){
                return name+"-前三-直选跨度";
            }else if(betCode=="ssc_sanxing_zhixuan_qszh"){
                return name+"-前三-前三组合";
            }else if(betCode=="ssc_sanxing_zuxuan_qsz3fs"){
                return name+"-前三-组三复式";
            }else if(betCode=="ssc_sanxing_zuxuan_qsz6fs"){
                return name+"-前三-组六复式";
            }else if(betCode=="ssc_sanxing_zuxuan_qszxhz"){
                return name+"-前三-组选和值";
            }else if(betCode=="ssc_sanxing_zuxuan_qszxbd"){
                return name+"-前三-组选包胆";
            }else if(betCode=="ssc_sanxing_zuxuan_qshzws"){
                return name+"-前三-和值尾数";
            }else if(betCode=="ssc_sanxing_zuxuan_qsts"){
                return name+"-前三-特殊号";
            }
            else if(betCode=="ssc_erxing_zhixuan_qefs"){
                return name+"-前二-直选复式";
            }else if(betCode=="ssc_erxing_zhixuan_qehz"){
                return name+"-前二-直选和值";
            }else if(betCode=="ssc_erxing_zhixuan_qekd"){
                return name+"-前二-直选跨度";
            }else if(betCode=="ssc_erxing_zuxuan_qefs"){
                return name+"-前二-组选复式";
            }else if(betCode=="ssc_erxing_zuxuan_qehz"){
                return name+"-前二-组选和值";
            }else if(betCode=="ssc_erxing_zuxuan_qebd"){
                return name+"-前二-组选包胆";
            }
            else if(betCode=="ssc_budingwei_q3ym"){
                return name+"-不定位-前三一码";
            }else if(betCode=="ssc_budingwei_q3em"){
                return name+"-不定位-前三二码";
            }else if(betCode=="ssc_budingwei_h3ym"){
                return name+"-不定位-后三一码";
            }else if(betCode=="ssc_budingwei_h3em"){
                return name+"-不定位-后三二码";
            }else if(betCode=="ssc_budingwei_q4ym"){
                return name+"-不定位-前四一码";
            }else if(betCode=="ssc_budingwei_q4em"){
                return name+"-不定位-前四二码";
            }else if(betCode=="ssc_budingwei_h4ym"){
                return name+"-不定位-后四一码";
            }else if(betCode=="ssc_budingwei_h4em"){
                return name+"-不定位-后四二码";
            }else if(betCode=="ssc_budingwei_wxem"){
                return name+"-不定位-五星二码";
            }else if(betCode=="ssc_budingwei_wxsm"){
                return name+"-不定位-五星三码";
            }
            // else if(betCode=="ssc_daxiaodanshuang_q2"){
            //     return name+"-大小单双-直选复式";
            // }else if(betCode=="ssc_daxiaodanshuang_h2"){
            //     return name+"-大小单双-直选和值";
            // }else if(betCode=="ssc_daxiaodanshuang_q3"){
            //     return name+"-大小单双-直选跨度";
            // }else if(betCode=="ssc_daxiaodanshuang_h3"){
            //     return name+"-大小单双-组选复式";
            // }
        },




    });
});