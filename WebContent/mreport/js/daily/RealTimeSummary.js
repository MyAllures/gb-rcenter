/**
 * 数据中心首页-首页js
 */
define(['site/swiper.min','site/MReport'], function (Swiper,MReport) {
    return MReport.extend({
        /**
         * 初使化
         */
        init: function () {
            'use strict';
            this._super();

            //初始化G2
            this.initG2('visitor');//默认展示实时访客

        },

        onPageLoad: function () {
            //初始化Swiper
            this.initSwiper(document.getElementById("dataBox").offsetWidth * 0.8);
        },

        initSwiper:function(width){
            var swiper = new Swiper('.swiper-info', {
                slidesPerView: 6,
                spaceBetween: 15,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                // width : $("#dataBox").offsetWidth
                width:width
                //direction: 'vertical',
                //loop: true
            });
        },
        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            var _this = this;
            $("#swiper-wrapper>.swiper-slide").click(function(e,option){
                $("#swiper-wrapper>.swiper-slide").removeClass("btn-primary");
                $(this).addClass("btn-primary");
                _this.changeCartogram(this);
            });

            //调节页面宽度
            $(window).resize(function() {
                _this.initSwiper(document.getElementById("dataBox").offsetWidth * 0.8);
            });

            //Sweiper滑动
            $('.swiper-info div .swiper-slide').mousedown(function(){
                $(this).addClass('btn-primary').removeClass('swp').siblings().addClass('swp').removeClass('btn-primary');
            })
        },

        initG2:function(realtimeType){
            $("#mountNode").html(null);
            if( 'deposit' == realtimeType || 'effcTransaction' == realtimeType || 'realtimeProfitLoss' == realtimeType){
                $("#explainText").html("以日合计 单位(￥)");
            }else{
                $("#explainText").html("以日合计 单位(个)");
            }
            const data = this.setData(realtimeType);
            if(data.length < 1) return;
            var keys = Object.keys(data[0]);
            keys.splice(0,1);
            if(keys == null || keys.length < 1 || !$("#mountNode").length) return;
            if('realtimeProfitLoss' == realtimeType){
                this.acreageChart(data,'mountNode',keys[0],500);
            }else{
                this.curveChart(data,'mountNode',keys,500);
            }
        },

        /**
         * 更换实时报表统计图
         */
        changeCartogram:function(e){
            var realtimeGroup = $(e).attr("realtimeGroup");
            this.initG2(realtimeGroup);
        },

        /**组装统计图数据*/
        setData: function(realtimeType){
            var array = [];
            var profilesStr = $("#profilesJson").val();
            if(!profilesStr) return array;
            var profilesJson = $.parseJSON(profilesStr);
            for(var i = 0; i<profilesJson.length; i++) {
                if(i > 23)continue;
                var data = {};
                var profile = profilesJson[i];
                data['time'] = i > 22 ? '23:59' : profile.realTime;
                if ('visitor' == realtimeType) {
                    data['访客量(全部)'] = profile.countVisitor;
                    data['访客量(PC端)'] = profile.visitorPc;
                    data['访客量(H5)'] = profile.visitorH5;
                } else if ('active' == realtimeType) {
                    data['实时活跃(全部)'] = profile.countActive;
                    data['实时活跃(PC端)'] = profile.activePc;
                    data['实时活跃(安卓App)'] = profile.activeAndroid;
                    data['实时活跃(H5)'] = profile.activeH5;
                    data['实时活跃(IOSapp)'] = profile.activeIos;
                } else if ('register' == realtimeType) {
                    data['注册用户数(全部)'] = profile.countRegister;
                    data['注册用户数(手机端)'] = profile.registerPhone;
                    data['注册用户数(PC)'] = profile.registerPc;
                    data['注册用户数(安卓App)'] = profile.registerAndroid;
                    data['注册用户数(H5)'] = profile.registerH5;
                    data['注册用户数(IOSapp)'] = profile.registerIos;
                } else if ('deposit' == realtimeType) {
                    data['终端存款金额(全部)'] = profile.countDeposit;
                    data['终端存款金额(手机端)'] = profile.depositPhone;
                    data['终端存款金额(PC)'] = profile.depositPc;
                    data['终端存款金额(安卓App)'] = profile.depositAndroid;
                    data['终端存款金额(H5)'] = profile.depositH5;
                    data['终端存款金额(IOSapp)'] = profile.depositIos;
                } else if ('effcTransaction' == realtimeType) {
                    data['有效投注额(全部)'] = profile.countEffcTransaction;
                    data['有效投注额(手机端)'] = profile.effcTransactionPhone;
                    data['有效投注额(PC)'] = profile.effcTransactionPc;
                    data['有效投注额(安卓App)'] = profile.effcTransactionAndroid;
                    data['有效投注额(H5)'] = profile.effcTransactionH5;
                    data['有效投注额(IOSapp)'] = profile.effcTransactionIos;
                } else if ('online' == realtimeType) {
                    data['实时在线(全部)'] = profile.countOnline;
                    data['实时在线(手机端)'] = profile.onlinePhone;
                    data['实时在线(PC)'] = profile.onlinePc;
                    data['实时在线(安卓App)'] = profile.onlineAndroid;
                    data['实时在线(H5)'] = profile.onlineH5;
                    data['实时在线(IOSapp)'] = profile.onlineIos;
                } else if ('realtimeProfitLoss' == realtimeType) {
                    data['损益'] = profile.realtimeProfitLoss;
                }
                array.push(data);
            }
            return array;
        }
    });
});